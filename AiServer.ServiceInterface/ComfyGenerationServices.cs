using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyGenerationServices(
    ILogger<ComfyGenerationServices> log,
    IDbConnectionFactory dbFactory, 
    IMessageProducer mq,
    IAutoQueryDb autoQuery,
    AppData appData) : Service
{
    public async Task<object> Any(GetComfyGeneration request)
    {
        var q = Db.From<ComfySummary>();
        if (request.Id != null)
            q.Where(x => x.Id == request.Id);
        else if (request.RefId != null)
            q.Where(x => x.RefId == request.RefId);
        else
            throw new ArgumentNullException(nameof(request.Id));
        
        var summary = await Db.SingleAsync(q);
        if (summary != null)
        {
            var activeTask = await Db.SingleByIdAsync<ComfyGenerationTask>(summary.Id);
            if (activeTask != null)
                return new GetComfyGenerationResponse { Result = activeTask };

            using var monthDb = dbFactory.GetMonthDbConnection(summary.CreatedDate);
            var completedTask = await monthDb.SingleByIdAsync<ComfyGenerationCompleted>(summary.Id);
            if (completedTask != null)
                return new GetComfyGenerationResponse { Result = completedTask.ConvertTo<ComfyGenerationTask>() };

            var failedTask = await monthDb.SingleByIdAsync<ComfyGenerationFailed>(summary.Id);
            if (failedTask != null)
                return new GetComfyGenerationResponse { Result = failedTask.ConvertTo<ComfyGenerationTask>() };
        }
        throw HttpError.NotFound("Task not found");
    }
    
    public async Task<object> Any(QueryCompletedComfyTasks query)
    {
        using var dbMonth = HostContext.AppHost.GetDbConnection(query.Db ?? dbFactory.GetNamedMonthDb(DateTime.UtcNow));
        var q = autoQuery.CreateQuery(query, base.Request, dbMonth);
        return await autoQuery.ExecuteAsync(query, q, base.Request, dbMonth);    
    }

    public async Task<object> Any(QueryFailedComfyTasks query)
    {
        using var dbMonth = HostContext.AppHost.GetDbConnection(query.Db ?? dbFactory.GetNamedMonthDb(DateTime.UtcNow));
        var q = autoQuery.CreateQuery(query, base.Request, dbMonth);
        return await autoQuery.ExecuteAsync(query, q, base.Request, dbMonth);    
    }
    
    public async Task<object> Any(CreateComfyGeneration request)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        var model = request.Request.Model;
        if (!await Db.ExistsAsync<ComfyApiModel>(x => x.Name == model))
            throw HttpError.NotFound($"Model {model} not found");
        
        // Find model
        var comfyApiModel = await Db.SingleAsync<ComfyApiModel>(x => x.Name == model);
        var comfyApiModeId = comfyApiModel.Id;
        var modelWithSettings = await Db.LoadSingleByIdAsync<ComfyApiModel>(comfyApiModeId);
        
        request.RefId ??= Guid.NewGuid().ToString("N");
        var task = request.ConvertTo<ComfyGenerationTask>();
        task.Id = appData.GetNextComfyTaskId();
        // Apply model defaults where missing properties
        task.Request.PopulateWithNonDefaultValues(modelWithSettings.ModelSettings);
        // Filename is used as the internal unique id since that is what a comfy instance needs.
        task.Request.Model = task.Model = comfyApiModel.Filename;
        task.TaskType = request.Request.TaskType;
        
        task.CreatedBy = Request.GetApiKeyUser() ?? "System";
        
        mq.Publish(new AppDbWrites {
            CreateComfyGenerationTask = task,
        });

        return new CreateOpenAiChatResponse
        {
            Id = task.Id,
            RefId = request.RefId,
        };
    }
    
    public async Task<object> Any(FetchComfyGenerationRequests request)
    {
        var aspReq = (HttpRequest)Request!.OriginalRequest;
        var requestId = aspReq.HttpContext.TraceIdentifier;
        var provider = request.Provider;
        var take = request.Take ?? 1;
        var models = request.Models;

        using var db = dbFactory.OpenDbConnection();

        var q = db.From<ComfyGenerationTask>()
            .Where(x => x.StartedDate == null && (x.Provider == null || x.Provider == request.Provider));
        var startedAt = DateTime.UtcNow;

        var hasTasks = await db.ExistsAsync(q);
        if (!hasTasks)
            return new FetchComfyGenerationRequestsResponse() { Results = Array.Empty<ComfyGenerationRequest>() };

        var lastCounter = ReserveComfyGenerationTaskCommand.Counter;
        mq.Publish(new AppDbWrites {
            ReserveComfyGenerationTask = new ReserveComfyGenerationTask {
                RequestId = requestId,
                Models = models,
                Provider = provider,
                Take = take,
            },
        });

        while (true)
        {
            if (DateTime.UtcNow - startedAt > TimeSpan.FromSeconds(180))
                throw HttpError.Conflict("Unable to fetch next tasks");
            
            // Wait for writer thread to reserve requested tasks for our request
            var attempts = 0;
            while (attempts++ <= 20)
            {
                if (ReserveComfyGenerationTaskCommand.Counter == lastCounter)
                    await Task.Delay(attempts);

                var currentCounter = ReserveComfyGenerationTaskCommand.Counter;
                if (currentCounter != lastCounter)
                {
                    lastCounter = currentCounter;
                    var results = db.Select(Db.From<ComfyGenerationTask>().Where(x => x.RequestId == requestId));
                    if (results.Count > 0)
                    {
                        return new FetchComfyGenerationRequestsResponse() {
                            Results = results.Select(x => new ComfyGenerationRequest() {
                                Id = x.Id,
                                Model = x.Model,
                                Provider = x.Provider,
                                Request = x.Request
                            }).ToArray()
                        };
                    }
                }
            }
            
            hasTasks = await db.ExistsAsync(q);
            if (!hasTasks)
                return new FetchComfyGenerationRequestsResponse { Results = Array.Empty<ComfyGenerationRequest>() };
        }
    }
}

public class FetchComfyGenerationRequests
{
    public string[] Models { get; set; }
    public string? Provider { get; set; }
    
    public int? Take { get; set; }
}

public class FetchComfyGenerationRequestsResponse
{
    public required ComfyGenerationRequest[] Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class QueryCompletedComfyTasks : QueryDb<ComfyGenerationCompleted>
{
    public string? Db { get; set; }
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

public class QueryFailedComfyTasks : QueryDb<ComfyGenerationFailed>
{
    public string? Db { get; set; }
}

[Tag(ServiceModel.Tag.OpenAi)]
[ValidateApiKey]
public class CreateComfyGeneration : ICreateDb<ComfyGenerationTask>, IReturn<CreateComfyGenerationResponse>
{
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
    public ComfyWorkflowRequest Request { get; set; }
}

public class CreateComfyGenerationResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class GetComfyGeneration : IReturn<GetComfyGenerationResponse>
{
    public long? Id { get; set; }
    public string? RefId { get; set; }
}

public class GetComfyGenerationResponse
{
    public ComfyGenerationTask? Result { get; set; }
}