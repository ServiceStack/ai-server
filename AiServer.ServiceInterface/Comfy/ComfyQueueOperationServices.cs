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
                DelegateComfyTasks = new()
            });
        }
        
        return result;
    }
    
    public async Task<object> Any(AddComfyProviderModel request)
    {
        if (!string.IsNullOrEmpty(request.ComfyApiModelName))
        {
            // Find the ComfyApiModelId by Name
            var comfyApiModel = await Db.SingleAsync<ComfyApiModel>(x => x.Name == request.ComfyApiModelName);
            if (comfyApiModel == null)
                throw HttpError.NotFound("ComfyApiModel not found");
            
            request.ComfyApiModelId = comfyApiModel.Id;
        }
        
        if (!string.IsNullOrEmpty(request.ComfyApiProviderName))
        {
            // Find the ComfyApiProviderId by Name
            var comfyApiProvider = await Db.SingleAsync<ComfyApiProvider>(x => x.Name == request.ComfyApiProviderName);
            if (comfyApiProvider == null)
                throw HttpError.NotFound("ComfyApiProvider not found");
            
            request.ComfyApiProviderId = comfyApiProvider.Id;
        }

        var comfyApiProviderModel = new ComfyApiProviderModel
        {
            ComfyApiModelId = request.ComfyApiModelId,
            ComfyApiProviderId = request.ComfyApiProviderId
        };
        
        // Existing ComfyApiProviderModel
        var existing = await Db.LoadSelectAsync<ComfyApiProviderModel>(x =>
            x.ComfyApiModelId == request.ComfyApiModelId &&
            x.ComfyApiProviderId == request.ComfyApiProviderId);
        if (existing.FirstOrDefault() != null)
            return new IdResponse
            {
                Id = existing[0].Id.ToString()
            };

        var res = await Db.InsertAsync(comfyApiProviderModel,selectIdentity:true);
        var providerModel = await Db.LoadSingleByIdAsync<ComfyApiProviderModel>(res);
        return providerModel;
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