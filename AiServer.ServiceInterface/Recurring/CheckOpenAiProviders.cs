using AiServer.ServiceInterface.AppDb;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.Recurring;

public class CheckOpenAiProviders(ILogger<CheckOpenAiProviders> log, AppData appData, IBackgroundJobs jobs) : AsyncCommand
{
    private static long count;
    protected override async Task RunAsync(CancellationToken token)
    {
        Interlocked.Increment(ref count);
        if (appData.IsStopped)
            return;

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

        var offlineWorkers = appData.AiProviders
            .Where(x => x is { Enabled: true, OfflineDate: not null }).Map(x => x.Name);

        var offlineProviders = offlineWorkers.IsEmpty() ? "None" : offlineWorkers.Join(", ");
        log.LogInformation("""
                           Workers:
                           {Stats}

                           Offline:    {Offline}
                           """, 
            appData.StoppedAt == null ? allStatsTable : $"Stopped at {appData.StoppedAt}", offlineProviders);
        
        var offlineAiProviders = appData.AiProviders.Where(x => x is { Enabled:true, OfflineDate:not null }).ToList();
        if (offlineAiProviders.Count > 0)
        {
            log.LogInformation("CHAT {Count} Rechecking {OfflineCount} offline providers", count, offlineAiProviders.Count);
            foreach (var apiProvider in offlineAiProviders)
            {
                var chatProvider = appData.GetOpenAiProvider(apiProvider);
                if (await chatProvider.IsOnlineAsync(apiProvider, token))
                {
                    log.LogInformation("CHAT Provider {Provider} is back online", apiProvider.Name);
                    jobs.RunCommand<ChangeProviderStatusCommand>(new ChangeProviderStatus {
                        Name = apiProvider.Name,
                        OfflineDate = null,
                    });
                }
            }
        }
        else
        {
            log.LogInformation("CHAT All providers are online");
        }
    }
}