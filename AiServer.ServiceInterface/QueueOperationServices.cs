using AiServer.ServiceInterface.AppDb;
using ServiceStack;
using ServiceStack.Data;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class QueueOperationServices(
    ILogger<QueueOperationServices> log, 
    AppData appData, 
    IDbConnectionFactory dbFactory, 
    IBackgroundJobs jobs)
    : Service
{
    public async Task<object> Any(Reload request)
    {
        using var db = await dbFactory.OpenDbConnectionAsync();
        appData.Reload(db);
        return new EmptyResponse();
    }
    
    public object Any(ChangeAiProviderStatus request)
    {
        var apiProvider = appData.AiProviders.FirstOrDefault(x => x.Name == request.Provider)
                          ?? throw HttpError.NotFound("AiProvider not found");
        
        DateTime? offlineDate = request.Online ? null : DateTime.UtcNow;
        apiProvider.OfflineDate = offlineDate;

        jobs.RunCommand<ChangeProviderStatusCommand>(new ChangeProviderStatus {
            Name = apiProvider.Name,
            OfflineDate = offlineDate,
        });
    
        return new StringResponse
        {
            Result = offlineDate == null 
                ? $"{apiProvider.Name} is back online" 
                : $"{apiProvider.Name} was taken offline"
        };
    }

    public async Task<object> Any(CheckAiProviderStatus request)
    {
        var apiProvider = appData.AiProviders.FirstOrDefault(x => x.Name == request.Provider)
            ?? throw HttpError.NotFound("AiProvider not found");

        var offlineDate = apiProvider.OfflineDate;
        
        var newOfflineDate = offlineDate;
        var chatProvider = appData.GetOpenAiProvider(apiProvider);
        if (await chatProvider.IsOnlineAsync(apiProvider))
        {
            newOfflineDate = null;
        }
        else if (offlineDate == null)
        {
            newOfflineDate = DateTime.UtcNow;
        }

        if (newOfflineDate != offlineDate)
        {
            jobs.RunCommand<ChangeProviderStatusCommand>(new ChangeProviderStatus {
                Name = apiProvider.Name,
                OfflineDate = newOfflineDate,
            });
        }
    
        return new BoolResponse
        {
            Result = newOfflineDate == null,
        };
    }

    public async Task<object> Any(CheckMediaProviderStatus request)
    {
        var mediaProvider = appData.MediaProviders.FirstOrDefault(x => x.Name == request.Provider)
                          ?? throw HttpError.NotFound("MediaProvider not found");

        var offlineDate = mediaProvider.OfflineDate;
        
        var newOfflineDate = offlineDate;
        var genProvider = appData.GetGenerationProvider(mediaProvider);
        if (await genProvider.IsOnlineAsync(mediaProvider))
        {
            newOfflineDate = null;
        }
        else if (offlineDate == null)
        {
            newOfflineDate = DateTime.UtcNow;
        }

        if (newOfflineDate != offlineDate)
        {
            jobs.RunCommand<ChangeMediaProviderStatusCommand>(new ChangeMediaProviderStatus {
                Name = mediaProvider.Name,
                OfflineDate = newOfflineDate,
            });
        }
        return new BoolResponse
        {
            Result = newOfflineDate == null,
        };
    }
}
