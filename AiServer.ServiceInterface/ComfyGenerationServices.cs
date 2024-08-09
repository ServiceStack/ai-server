using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyGenerationServices(
    ILogger<ComfyGenerationServices> log,
    IDbConnectionFactory dbFactory, 
    IBackgroundJobs jobs,
    IAutoQueryDb autoQuery,
    AppConfig appConfig,
    AppData appData) : Service
{
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

        var needsModel = request.Request.TaskType is ComfyTaskType.TextToImage or ComfyTaskType.ImageToImage or ComfyTaskType.ImageToImageWithMask;

        var model = request.Request.Model ?? appConfig.DefaultModel?.Filename;
        if (needsModel && !await Db.ExistsAsync<ComfyApiModel>(x => x.Name == model || x.Filename == model))
            throw HttpError.NotFound($"Model {model} not found");
        
        // Find model
        var comfyApiModel = await Db.SingleAsync<ComfyApiModel>(x => x.Name == model || 
                                                                     x.Filename == model);
        
        log.LogInformation($"Using model : {comfyApiModel.ToJson()}");
        if (needsModel && comfyApiModel == null)
            throw HttpError.NotFound($"Model {model} not found");
        
        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        ComfyApiProvider? useProvider = null;
        // Predicate to filter out providers depends on TaskType
        Func<ComfyApiProvider, bool> providerPredicate = null;
        switch (request.Request.TaskType)
        {
            case ComfyTaskType.TextToImage:
            case ComfyTaskType.ImageToImage:
            case ComfyTaskType.ImageToImageWithMask:
                providerPredicate = x => x is { Enabled: true, Models: not null} && 
                    x.Models.All(m => m.ComfyApiModel.Filename != comfyApiModel.Filename);
                break;
            case ComfyTaskType.ImageToImageUpscale:
            case ComfyTaskType.ImageToText:
            case ComfyTaskType.TextToAudio:
            case ComfyTaskType.TextToSpeech:
            case ComfyTaskType.SpeechToText:
                providerPredicate = x => x is { Enabled: true, Models: not null};
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
        var candidates = appData.ComfyApiProviders
            .Where(providerPredicate)
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

        if (needsModel)
        {
            var modelSettings = await Db.SingleAsync<ComfyApiModelSettings>(x => x.Id == comfyApiModel.Id);
            request.Request = request.Request.ApplyModelDefaults(appConfig, modelSettings);
            log.LogInformation($"Model settings: {request.Request.ToJson()}");
        }
        else
        {
            request.Request = request.Request.ApplyModelDefaults(appConfig, null);
        }
        
        var jobRef = jobs.EnqueueCommand<CreateComfyGenerationCommand>(request, new()
        {
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
    
    public async Task<object> Any(GetComfyGeneration request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        var summary = await jobs.GetJobSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");
        
        var backgroundJob = await jobs.GetBackgroundJob(summary);
        if (backgroundJob?.CompletedDate != null)
        {
            var (req, res) = backgroundJob.ExtractRequestResponse<CreateComfyGeneration, ComfyWorkflowStatus>();
            if (req != null && res != null)
            {
                var outputs = res.Outputs.ToHostedComfyFiles(
                    appConfig, backgroundJob.RefId, 
                    summary.CreatedDate.Year.ToString(), 
                    summary.CreatedDate.Month.ToString("00"), 
                    summary.CreatedDate.Day.ToString("00"));
                return new GetComfyGenerationResponse
                {
                    Request = req,
                    Result = res,
                    Outputs = outputs,
                };
            }
        };
        
        return HttpError.NotFound("Job not found");
    }
}


public static class BackgroundJobsFeatureExtensions
{
    public static Tuple<TReq?,TRes?> ExtractRequestResponse<TReq, TRes>(this BackgroundJob job)
    where TReq : class
    where TRes : class
    {
        var reqTypeName = job.Request;
        var resTypeName = job.Response;
        if (reqTypeName == typeof(TReq).Name && resTypeName == typeof(TRes).Name)
        {
            return new Tuple<TReq?, TRes?>(
                job.RequestBody.FromJson<TReq>(),
                job.ResponseBody.FromJson<TRes>()
            );
        }
        if(reqTypeName != typeof(TReq).Name && resTypeName != typeof(TRes).Name)
        {
            return new Tuple<TReq?, TRes?>(null, null);
        }
        if(reqTypeName != typeof(TReq).Name)
        {
            return new Tuple<TReq?, TRes?>(
                null,
                job.ResponseBody.FromJson<TRes>()
            );
        }
        return new Tuple<TReq?, TRes?>(
            job.RequestBody.FromJson<TReq>(),
            null
        );
    }
    public static async Task<BackgroundJob?> GetBackgroundJob(
        this IBackgroundJobs feature, 
        JobSummary summary)
    {
        using var db = feature.OpenJobsDb();
        
        var activeTask = await db.SingleByIdAsync<BackgroundJob>(summary.Id);
        if (activeTask != null)
        {
            // Task still active, so we don't have a result yet
            return activeTask;
        }

        using var monthDb = feature.OpenJobsMonthDb(summary.CreatedDate);
        var completedTask = await monthDb.SingleByIdAsync<CompletedJob>(summary.Id);
        if (completedTask != null)
        {
            return completedTask;
        }

        var failedTask = await monthDb.SingleByIdAsync<FailedJob>(summary.Id);
        return failedTask;
    }
    
    public static async Task<JobSummary?> GetJobSummaryAsync(
        this IBackgroundJobs feature,int? id, string? refId)
    {
        using var db = feature.OpenJobsDb();
        var q = db.From<JobSummary>();
        if (refId != null)
            q.Where(x => x.RefId == refId);
        else if (id != null)
            q.Where(x => x.Id == id);
        else
            throw new ArgumentNullException(nameof(JobSummary.Id));
        
        var summary = await db.SingleAsync(q);
        return summary;
    }
}