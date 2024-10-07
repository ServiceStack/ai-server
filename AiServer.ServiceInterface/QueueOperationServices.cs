using AiServer.ServiceInterface.AppDb;
using ServiceStack;
using ServiceStack.Data;
using AiServer.ServiceModel;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class QueueOperationServices(AppData appData, IDbConnectionFactory dbFactory, IBackgroundJobs jobs)
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
}
