using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.Comfy;

public class ComfyQueueOperationServices(AppData appData, IDbConnectionFactory dbFactory, IAutoQueryDb autoQuery) : Service
{
    public object Any(StopComfyWorkers request)
    {
        appData.StopWorkers();
        return new EmptyResponse();
    }
    
    public async Task<object> Any(StartComfyWorkers request)
    {
        using var db = await dbFactory.OpenDbConnectionAsync();
        appData.StartWorkers(db);
        return new EmptyResponse();
    }
    
    public async Task<object> Any(RestartComfyWorkers request)
    {
        using var db = await dbFactory.OpenDbConnectionAsync();
        appData.RestartWorkers(db);
        return new EmptyResponse();
    }
    
    public object Any(ResetActiveComfyProviders request)
    {
        appData.RestartWorkers(Db);
        MessageProducer.Publish(new AppDbWrites {
            ResetTaskQueue = new()
        });
        return new GetActiveComfyProvidersResponse {
            Results = appData.ComfyApiProviders
        };
    }

    public object Any(ChangeComfyApiProviderStatus request)
    {
        var apiProvider = appData.ComfyApiProviders.FirstOrDefault(x => x.Name == request.Provider)
                          ?? throw HttpError.NotFound("ApiProvider not found");
        
        DateTime? offlineDate = request.Online ? null : DateTime.UtcNow;
        apiProvider.OfflineDate = offlineDate;
        
        MessageProducer.Publish(new AppDbWrites
        {
            RecordOfflineProvider = new()
            {
                Name = apiProvider.Name,
                OfflineDate = offlineDate,
            }
        });
        return new StringResponse
        {
            Result = offlineDate == null 
                ? $"{apiProvider.Name} is back online" 
                : $"{apiProvider.Name} was taken offline"
        };
    }

    public async Task<object> Any(UpdateComfyApiProvider request)
    {
        var result = await autoQuery.PartialUpdateAsync<ComfyApiProvider>(request, base.Request);
        var worker = appData.ComfyProviderWorkers.FirstOrDefault(x => x.Id == request.Id);
        worker?.Update(request);

        if (request.Enabled == true || request.Concurrency > 0)
        {
            MessageProducer.Publish(new QueueTasks {
                DelegateOpenAiChatTasks = new()
            });
        }
        
        return result;
    }

    public object Any(FireComfyPeriodicTask request)
    {
        MessageProducer.Publish(new AppDbWrites
        {
            PeriodicTasks = new()
            {
                PeriodicFrequency = request.Frequency
            }
        });
        return new EmptyResponse();
    }
}

public class GetActiveComfyProvidersResponse
{
    public ComfyApiProvider[] Results { get; set; }
}

public class FireComfyPeriodicTask
{
    public PeriodicFrequency Frequency { get; set; }
}

public class ResetActiveComfyProviders
{
}

public class RestartComfyWorkers
{
}

public class StartComfyWorkers
{
}

public class StopComfyWorkers
{
}