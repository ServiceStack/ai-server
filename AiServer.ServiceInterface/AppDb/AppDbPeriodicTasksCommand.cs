using AiServer.ServiceInterface.AppDb.Comfy;
using Microsoft.Extensions.Logging;
using ServiceStack;
using AiServer.ServiceModel.Types;
using ServiceStack.Jobs;
using ServiceStack.Messaging;

namespace AiServer.ServiceInterface.AppDb;

[Tag(Tags.Database)]
public class AppDbPeriodicTasksCommand(ILogger<AppDbPeriodicTasksCommand> log, AppData appData, IMessageProducer mq, ICommandExecutor executor, BackgroundsJobFeature jobs) 
    : IAsyncCommand<PeriodicTasks>
{
    public async Task ExecuteAsync(PeriodicTasks request)
    {
        log.LogInformation("Executing {Type} {PeriodicFrequency} PeriodicTasks...", GetType().Name, request.PeriodicFrequency);

        if (request.PeriodicFrequency == PeriodicFrequency.Minute)
        {
            var allStatsTable = LogActiveApiProviderStats();
            LogDisabledOfflineWorkerStats(allStatsTable);
            LogDisabledOfflineComfyWorkerStats(allStatsTable);

            if (request.PeriodicFrequency == PeriodicFrequency.Minute)
                await DoFrequentTasksAsync();
        }
    }
    
    private void LogDisabledOfflineComfyWorkerStats(string allStatsTable)
    {
        var offlineWorkers = appData.ComfyApiProviders
            .Where(x => x is { Enabled: true, OfflineDate: not null }).Map(x => x.Name);

        log.LogInformation("""
                           Workers:
                           {Stats}

                           Offline:    {Offline}
                           """, 
            appData.StoppedAt == null ? allStatsTable : $"Stopped at {appData.StoppedAt}",
            offlineWorkers.IsEmpty() ? "None" : offlineWorkers.Join(", "));
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
        var allStats = jobs.Jobs.GetWorkerStats();
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
        
            // Check if any offline providers are back online
            await CheckOpenAiProviderOnlineStatus(frequency, token);
            await CheckComfyProviderOnlineStatus(frequency, token);
        }
        catch (TaskCanceledException) {}
    }
    
    private async Task CheckComfyProviderOnlineStatus(PeriodicFrequency frequency, CancellationToken token)
    {
        var offlineComfyProviders = appData.ComfyApiProviders.Where(x => x is { Enabled:true, OfflineDate: not null }).ToList();
        if (offlineComfyProviders.Count > 0)
        {
            log.LogInformation("[{Frequency}] Rechecking {OfflineCount} offline providers", frequency, offlineComfyProviders.Count);
            foreach (var comfyProvider in offlineComfyProviders)
            {
                var provider = appData.GetComfyProvider(comfyProvider);
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
