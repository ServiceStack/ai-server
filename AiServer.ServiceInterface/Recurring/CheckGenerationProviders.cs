using AiServer.ServiceInterface.AppDb;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.Recurring;

public class CheckGenerationProviders(ILogger<CheckGenerationProviders> logger, IBackgroundJobs jobs, AppData appData) : AsyncCommand
{
    private static long count;
    protected override async Task RunAsync(CancellationToken token)
    {
        Interlocked.Increment(ref count);

        if (appData.IsStopped)
            return;

        var log = Request.CreateJobLogger(jobs, logger);
        // Check if any offline providers are back online
        var offlineMediaProviders = appData.MediaProviders.Where(x => x is { Enabled:true, OfflineDate:not null }).ToList();
        if (offlineMediaProviders.Count > 0)
        {
            log.LogInformation("GENERATION {Count} Rechecking {OfflineCount} offline providers", count, offlineMediaProviders.Count);
            foreach (var apiProvider in offlineMediaProviders)
            {
                var chatProvider = appData.GetGenerationProvider(apiProvider);
                if (await chatProvider.IsOnlineAsync(apiProvider, token))
                {
                    if (appData.IsStopped)
                        return;

                    log.LogInformation("GENERATION Provider {Provider} is back online", apiProvider.Name);
                    jobs.RunCommand<ChangeMediaProviderStatusCommand>(new ChangeMediaProviderStatus {
                        Name = apiProvider.Name,
                        OfflineDate = null,
                    });
                }
            }
        }
        else
        {
            log.LogInformation("GENERATION All providers are online");
        }
    }
}