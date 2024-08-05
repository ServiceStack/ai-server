using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyGenerationServices(
    ILogger<ComfyGenerationServices> log,
    IDbConnectionFactory dbFactory, 
    IBackgroundJobs jobs,
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
        if (!await Db.ExistsAsync<ComfyApiModel>(x => x.Name == model || x.Filename == model))
            throw HttpError.NotFound($"Model {model} not found");
        
        // Find model
        var comfyApiModel = await Db.SingleAsync<ComfyApiModel>(x => x.Name == model || 
                                                                     x.Filename == model);
        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        ComfyApiProvider? useProvider = null;
        var candidates = appData.ComfyApiProviders
            .Where(x => x is { Enabled: true, Models: not null } && 
                        x.Models.Any(m => 
                            m.ComfyApiModel.Filename == comfyApiModel.Filename))
            .ToList();
        foreach (var candidate in candidates)
        {
            if (candidate.OfflineDate != null)
                continue;
            var pendingJobs = queueCounts.GetValueOrDefault(candidate.Name, 0);
            if (useProvider == null)
            {
                useProvider = candidate;
                providerQueueCount = pendingJobs;
                continue;
            }
            if (pendingJobs < providerQueueCount || (pendingJobs == providerQueueCount && candidate.Priority > useProvider.Priority))
            {
                useProvider = candidate;
                providerQueueCount = pendingJobs;
            }
        }

        useProvider ??= candidates.FirstOrDefault(x => x.Name == model); // Allow selecting offline models
        if (useProvider == null)
            throw new NotSupportedException("No active ComfyAPI Providers support this model");

        var jobRef = jobs.EnqueueCommand<CreateComfyGenerationCommand>(request, new()
        {
            RefId = request.RefId,
            ReplyTo = request.ReplyTo,
            Tag = request.Tag,
            Args = request.Provider == null ? null : new() {
                [nameof(request.Provider)] = request.Provider
            },
            Worker = useProvider.Name,
        });
        
        return new CreateComfyGenerationResponse()
        {
            Id = jobRef.Id,
            RefId = jobRef.RefId,
        };
    }
}