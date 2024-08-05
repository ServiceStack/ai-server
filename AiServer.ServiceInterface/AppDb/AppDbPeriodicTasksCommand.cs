using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Comfy;
using Microsoft.Extensions.Logging;
using ServiceStack;
using AiServer.ServiceInterface.Executor;
using AiServer.ServiceInterface.Queue;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.DependencyInjection;
using ServiceStack.Jobs;
using ServiceStack.Messaging;

namespace AiServer.ServiceInterface.AppDb;

[Tag(Tags.Database)]
public class AppDbPeriodicTasksCommand(ILogger<AppDbPeriodicTasksCommand> log, AppData appData, IMessageProducer mq, ICommandExecutor executor, IServiceProvider services) 
    : IAsyncCommand<PeriodicTasks>
{
    public async Task ExecuteAsync(PeriodicTasks request)
    {
        log.LogInformation("Executing {Type} {PeriodicFrequency} PeriodicTasks...", GetType().Name, request.PeriodicFrequency);

        if (request.PeriodicFrequency == PeriodicFrequency.Minute)
        {
            var allStatsTable = LogActiveApiProviderStats();
            LogDisabledOfflineWorkerStats(allStatsTable);
            
            var activeComfyWorkers = appData.GetActiveComfyWorkers().ToList();
            var allComfyStatsTable = LogActiveComfyWorkerStats(activeComfyWorkers);
            LogDisabledOfflineComfyWorkerStats(activeComfyWorkers, allComfyStatsTable);

            if (request.PeriodicFrequency == PeriodicFrequency.Minute)
                await DoFrequentTasksAsync();
        }
    }
    
    private static string LogActiveComfyWorkerStats(List<ComfyProviderWorker> activeWorkers)
    {
        var allStats = activeWorkers.Select(x => x.GetStats()).ToList();
        var allStatsTable = Inspect.dumpTable(allStats, new TextDumpOptions {
            Caption = "Worker Stats",
            Headers = [
                nameof(WorkerStats.Name),
                nameof(WorkerStats.Queued),
                nameof(WorkerStats.Received),
                nameof(WorkerStats.Completed),
                nameof(WorkerStats.Retries),
                nameof(WorkerStats.Failed),
            ],
        }).Trim();
        return allStatsTable;
    }
    
    private void LogDisabledOfflineComfyWorkerStats(List<ComfyProviderWorker> activeWorkers, string allComfyStatsTable)
    {
        var offlineWorkers = appData.ComfyApiProviders.Where(x => x is { Enabled: true, OfflineDate: not null }).Map(x => x.Name);
        var disabledWorkers = appData.ComfyApiProviders.Where(x => 
                activeWorkers.All(a => a.Name != x.Name) && !offlineWorkers.Contains(x.Name))
            .Map(x => x.Name); 

        log.LogInformation("""
                           Workers:
                           {Stats}

                           Offline:    {Offline}
                           Disabled:   {Disabled}

                           Delegating: {Delegating}
                           Executing:  {Executing}
                           """, 
            appData.StoppedAt == null ? allComfyStatsTable : $"Stopped at {appData.StoppedAt}",
            offlineWorkers.IsEmpty() ? "None" : offlineWorkers.Join(", "),
            disabledWorkers.IsEmpty() ? "None" : disabledWorkers.Join(", "),
            DelegateComfyWorkflowTasksCommand.Running,
            ExecuteComfyGenerationTasksCommand.Running);
    }

    private void LogDisabledOfflineWorkerStats(string allStatsTable)
    {
        var offlineWorkers = appData.ApiProviders
            .Where(x => x is { Enabled: true, OfflineDate: not null }).Map(x => x.Name);

        log.LogInformation("""
                           Workers:
                           {Stats}

                           Offline:    {Offline}
                           """, 
            appData.StoppedAt == null ? allStatsTable : $"Stopped at {appData.StoppedAt}",
            offlineWorkers.IsEmpty() ? "None" : offlineWorkers.Join(", "));
    }

    private string LogActiveApiProviderStats()
    {
        var jobs = services.GetRequiredService<IBackgroundJobs>();
        var allStats = jobs.GetWorkerStats();
        var allStatsTable = Inspect.dumpTable(allStats, new TextDumpOptions {
            Caption = "Worker Stats",
            Headers = [
                nameof(WorkerStats.Name),
                nameof(WorkerStats.Queued),
                nameof(WorkerStats.Received),
                nameof(WorkerStats.Completed),
                nameof(WorkerStats.Retries),
                nameof(WorkerStats.Failed),
            ],
        }).Trim();
        return allStatsTable;
    }

    async Task DoFrequentTasksAsync()
    {
        try
        {
            var frequency = PeriodicFrequency.Minute;
            var token = appData.Token;
            if (appData.IsStopped)
                return;

            if (appData.IsStopped)
                return;
            log.LogInformation("[{Frequency}]", frequency);

            mq.Publish(new NotificationTasks {
                SendPendingNotifications = new()
            });
        
            // Check if any offline providers are back online
            await CheckOpenAiProviderOnlineStatus(frequency, token);
            await CheckComfyProviderOnlineStatus(frequency, token);
        }
        catch (TaskCanceledException) {}
    }
    
    private async Task CheckComfyProviderOnlineStatus(PeriodicFrequency frequency, CancellationToken token)
    {
        var offlineComfyProviders = appData.ComfyProviderWorkers.Where(x => x is { Enabled:true, IsOffline:true }).ToList();
        if (offlineComfyProviders.Count > 0)
        {
            log.LogInformation("[{Frequency}] Rechecking {OfflineCount} offline providers", frequency, offlineComfyProviders.Count);
            foreach (var comfyProvider in offlineComfyProviders)
            {
                var provider = comfyProvider.GetProvider();
                if (await provider.IsOnlineAsync(comfyProvider, token))
                {
                    if (appData.IsStopped)
                        return;

                    log.LogInformation("[{Frequency}] Provider {Provider} is back online", frequency, comfyProvider.Name);
                    var changeStatusCommand = executor.Command<ChangeComfyProviderStatusCommand>();
                    await changeStatusCommand.ExecuteAsync(new() {
                        Name = comfyProvider.Name,
                        OfflineDate = null,
                    });
                }
            }
        }
    }

    private async Task CheckOpenAiProviderOnlineStatus(PeriodicFrequency frequency, CancellationToken token)
    {
        var offlineApiProviders = appData.ApiProviders.Where(x => x is { Enabled:true, OfflineDate:not null }).ToList();
        if (offlineApiProviders.Count > 0)
        {
            log.LogInformation("[{Frequency}] Rechecking {OfflineCount} offline providers", frequency, offlineApiProviders.Count);
            foreach (var apiProvider in offlineApiProviders)
            {
                var chatProvider = appData.GetOpenAiProvider(apiProvider);
                if (await chatProvider.IsOnlineAsync(apiProvider, token))
                {
                    if (appData.IsStopped)
                        return;

                    log.LogInformation("[{Frequency}] Provider {Provider} is back online", frequency, apiProvider.Name);
                    var changeStatusCommand = executor.Command<ChangeProviderStatusCommand>();
                    await changeStatusCommand.ExecuteAsync(new() {
                        Name = apiProvider.Name,
                        OfflineDate = null,
                    });
                }
            }
        }
    }
}
