using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceInterface.Generation;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Web;
using MediaType = AiServer.ServiceModel.Types.MediaType;

namespace AiServer.ServiceInterface;

public class MediaProviderServices(ILogger<MediaProviderServices> log,
    MediaProviderFactory providerFactory,
    IBackgroundJobs jobs,
    IAutoQueryDb autoQuery,
    IAutoQueryData autoQueryData,
    AppConfig appConfig,
    AppData appData) : Service
{
    [ExcludeMetadata]
    class QueryMediaTypesData : QueryData<MediaType> {}
    public object Any(QueryMediaTypes request)
    {
        var query = request.ConvertTo<QueryMediaTypesData>();
        var db = appData.MediaTypes.ToDataSource(query, Request!);
        return autoQueryData.Execute(query, autoQueryData.CreateQuery(query, Request, db), db);
    }
    
    public object Any(QueryMediaProviders request)
    {
        using var db = autoQuery.GetDb(request, base.Request);
        var q = autoQuery.CreateQuery(request, base.Request, db);
        var r = autoQuery.Execute(request, q, base.Request, db);
        var providers = appData.MediaProviders.ToDictionary(x => x.Id);
        r.Results.ForEach(x =>
        {
            x.OfflineDate = providers.GetValueOrDefault(x.Id)?.OfflineDate;
            x.MediaType = appData.MediaTypes.GetAll().FirstOrDefault(t => t.Id == x.MediaTypeId);
        });
        return r;
    }
    
    [ExcludeMetadata]
    class QueryTextToSpeechVoicesData : QueryData<TextToSpeechVoice> {}
    public object Any(QueryTextToSpeechVoices request)
    {
        var query = request.ConvertTo<QueryTextToSpeechVoicesData>();
        var db = appData.TextToSpeechVoices.ToDataSource(query, Request!);
        var response = (QueryResponse<TextToSpeechVoice>) 
            autoQueryData.Execute(query, autoQueryData.CreateQuery(query, Request, db), db);
        
        var activeModels = appData.MediaProviders
            .SelectMany(x => 
                x.Models.Select(m => appData.GetQualifiedMediaModel(ModelType.TextToSpeech, m)))
            .Where(x => x != null)
            .Select(x => x!)
            .Distinct();
        response.Results.RemoveAll(x => !activeModels.Contains(x.Model));
        return response;
    }
    
    public object Any(CreateGeneration request)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));

        request.Request.TaskType ??= AiTaskType.TextToImage;
        
        var useProviderDefaultModel = string.IsNullOrEmpty(request.Request.Model);
        if (request.Request.TaskType == AiTaskType.TextToImage && string.IsNullOrEmpty(request.Request.Model))
            throw new ArgumentNullException(nameof(request.Request.Model));
        var modelId = request.Request.Model;
        
        log.LogInformation("New {TaskType} request. Model: {Model}", request.Request.TaskType, request.Request.Model);
        
        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        MediaProvider? useProvider = null;
        var taskType = request.Request.TaskType!.Value;
        var providerTypesThatSupportTask = providerFactory.GetProviders().Where(x => x.SupportedAiTasks.Contains((AiTaskType)request.Request.TaskType )).ToList();
        var apiProvidersThatSupportTask = appData.MediaProviders.Where(x => providerTypesThatSupportTask.Any(y => y.ProviderType == x.MediaType?.Provider)).ToList();
        if (apiProvidersThatSupportTask.Count == 0)
        {
            log.LogError("No active Generation Providers support this task: {TaskType}", taskType);
            throw new NotSupportedException("No active Generation Providers support this task");
        }
        
        // Make sure if no model is specified, store the first model that supports the task
        var providersWithSupportDefaultModels = apiProvidersThatSupportTask
            .Where(x => x.Models is { Count: > 0 } && appData.ProviderHasModelForTask(x,taskType))
            .ToList();
        
        // First filter candidates by task type
        // Then filter by enabled and have any models available
        // If the request doesn't specify a model, we need to take the first model that supports the task
        var candidates = providersWithSupportDefaultModels
            .Where(x => x is { Enabled: true, Models: not null } && 
                (useProviderDefaultModel || 
                    x.Models.Any(m => 
                        m == appData.GetMediaApiModel(x,modelId!))))
            .ToList();
        // So far we have providers that support the task and have the model requested or using the default model
        // Now we need to ensure that the provider has a model or default model that supports the task.
        candidates = candidates.Where(x => appData.ProviderHasModelForTask(x, taskType)).ToList();
        log.LogInformation("Found {Count} candidate providers", candidates.Count);
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
        
        var model = request.Request.Model;

        if (useProviderDefaultModel && useProvider is { Models.Count: > 0 })
        {
            var apiModel = appData.GetDefaultMediaApiModel(useProvider, request.Request.TaskType!.Value);
            model = appData.GetMediaModelByApiModel(useProvider, apiModel).Id;
            log.LogInformation("Using first model {Model} for provider {Provider}", model, useProvider.Name);
        }

        // Try fall back to a direct match even if provider is offline
        // Candidates are already filtered by enabled and supported models before being filtered for online only
        useProvider ??= candidates.FirstOrDefault(); // Allow selecting offline models
        if (useProvider == null)
        {
            log.LogError("No active Generation Providers support this model: {Model}", model);
            throw new NotSupportedException("No active Generation Providers support this model");
        }
        
        if (model == null)
            throw HttpError.NotFound($"Model could not inferred from request. Provider: {useProvider.Name}");
        
        // model is already a provider specific model if using a provider default
        request.Request.Model = appData.GetMediaApiModel(useProvider, model);
        log.LogInformation("Model {Model} request, using {ApiMode}", model,request.Request.Model);
        
        var KeyId = (Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0;
        log.LogInformation("User key {KeyId} using provider {Provider}", KeyId, useProvider.Name);
        var args = new Dictionary<string, string> {
            [nameof(KeyId)] = $"{KeyId}",
        };
        if (request.Provider != null)
        {
            args[nameof(request.Provider)] = request.Provider;
        }

        if (Request != null && Request.Files.Length > 0)
        {
            log.LogInformation("Saving {Count} uploaded files", Request.Files.Length);
            var fileMap = Request.HandleFileUploads(appConfig);
            args["Files"] = fileMap.ToJson();
        }
        
        var jobRef = jobs.EnqueueCommand<CreateGenerationCommand>(request, new()
        {
            ReplyTo = request.ReplyTo ?? Request.GetHeader("ReplyTo"),
            Tag = Request.GetHeader("Tag"),
            Args = args,
            Worker = useProvider.Name
        });

        return new CreateGenerationResponse
        {
            Id = jobRef.Id,
            RefId = jobRef.RefId,
        };
    }
    
    public object Any(QueryMediaModels request)
    {
        // Ensure all model settings have Id as related model name
        // Use the Id from the provider, and the key from each model settings in the providers dictionary
        var hasId = !string.IsNullOrEmpty(request.Id);
        var hasProviderId = !string.IsNullOrEmpty(request.ProviderId);
        List<MediaModel> allModelSettings;
        if (hasId)
        {
            if(!appData.MediaModelsMap.ContainsKey(request.Id))
                return new QueryResponse<MediaModel>
                {
                    Results = [],
                    Total = 0
                };
            allModelSettings = [appData.MediaModelsMap[request.Id]];
            return new QueryResponse<MediaModel>
            {
                Results = allModelSettings
            };
        } 
        if (hasProviderId)
        {
            allModelSettings = appData.MediaModelsMap.Values
                .Where(x => request.ProviderId != null && x.ApiModels.ContainsKey(request.ProviderId))
                .ToList();
            return new QueryResponse<MediaModel>
            {
                Results = allModelSettings,
                Total = allModelSettings.Count
            };
        }
        allModelSettings = appData.MediaModelsMap.Values
            .ToList();
        return new QueryResponse<MediaModel>
        {
            Results = allModelSettings,
            Total = allModelSettings.Count
        };
    }
    
    public async Task<object> Any(GetGeneration request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        var summary = jobs.GetJobSummary(request.Id, request.RefId);
        // Add small wait
        if (summary == null)
            await Task.Delay(1000);
        if (summary == null)
            throw HttpError.NotFound("Job not found");

        var jobResult = jobs.GetJob(summary.Id);
        var backgroundJob = jobResult?.Job;
        if (backgroundJob == null)
            throw HttpError.NotFound("Job not found");
        var worker = backgroundJob.Worker!;
        // Worker might not be present in appData, check database.
        var apiProvider = Db.Single<MediaProvider>(x => x.Name == worker);
        if (backgroundJob?.CompletedDate != null)
        {
            var (req, res) = backgroundJob.ExtractRequestResponse<CreateGeneration, GenerationResult>();
            if (req != null && res != null)
            {
                var outputs = res.Outputs;

                return new GetGenerationResponse
                {
                    Request = req.Request,
                    Result = res,
                    Outputs = outputs,
                };
            }
        }

        return HttpError.NotFound("Job not found");
    }
    
    public object Any(UpdateMediaProvider request)
    {
        var response = (IdResponse)autoQuery.Patch(request, base.Request, Db);
        appData.ResetMediaProviders(Db);
        response ??= request.ConvertTo<IdResponse>();
        return response;
    }
    
    public object Post(CreateMediaProvider request)
    {
        if(request.MediaTypeId == null)
            throw new ArgumentNullException(nameof(request.MediaTypeId));
        var response = autoQuery.Create(request, base.Request, Db);
        appData.ResetMediaProviders(Db);
        return response;
    }
}

public static class BackgroundJobsFeatureExtensions
{
    public static Tuple<TReq?,TRes?> ExtractRequestResponse<TReq, TRes>(this BackgroundJobBase job)
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
    public static BackgroundJobBase? GetBackgroundJob(
        this IBackgroundJobs feature, 
        JobSummary summary)
    {
        using var db = feature.OpenDb();
        
        var activeTask = db.SingleById<BackgroundJob>(summary.Id);
        if (activeTask != null)
        {
            // Task still active, so we don't have a result yet
            return activeTask;
        }

        using var monthDb = feature.OpenMonthDb(summary.CreatedDate);
        var completedTask = monthDb.SingleById<CompletedJob>(summary.Id);
        if (completedTask != null)
        {
            return completedTask;
        }

        var failedTask = monthDb.SingleById<FailedJob>(summary.Id);
        return failedTask;
    }
    
    public static JobSummary? GetJobSummary(this IBackgroundJobs feature,long? id, string? refId)
    {
        using var db = feature.OpenDb();
        var q = db.From<JobSummary>();
        if (refId != null)
            q.Where(x => x.RefId == refId);
        else if (id != null)
            q.Where(x => x.Id == id);
        else
            throw new ArgumentNullException(nameof(JobSummary.Id));
        
        var summary = db.Single(q);
        return summary;
    }
}

public static class MediaProviderExtensions
{
    public static Dictionary<string,string> HandleFileUploads(this IRequest request, AppConfig appConfig)
    {
        var apiKeyId = (request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0;
        var now = DateTime.UtcNow;
        var fileMap = new Dictionary<string, string>();
        foreach (var file in request.Files.Where(x => 
                     supportedUploadNames.Contains(x.Name.ToLower())))
        {
            var ext = file.FileName.Contains('.') 
                ? file.FileName.SplitOnLast(".").Last() 
                : GetFileExtension(file.ContentType);
            var memCpy = new MemoryStream();
            file.InputStream.CopyTo(memCpy);
            memCpy.Position = 0;
            var bytes = memCpy.ReadFully();
            var sha256 = bytes.ComputeSha256();
            var uploadDir = "/input/" + now.ToString("yyyy/MM/dd/") + apiKeyId + "/";
            Directory.CreateDirectory(appConfig.ArtifactsPath.CombineWith(uploadDir));
            var uploadFile = appConfig.ArtifactsPath.CombineWith(uploadDir, sha256 + "." + ext);
            using (var fs = File.OpenWrite(uploadFile))
            {
                fs.Write(bytes, 0, bytes.Length);
                fs.Close();
            }
            file.InputStream.Position = 0; // Reset the stream position if needed for further processing
            fileMap[file.Name] = uploadFile;
        }
        return fileMap;
    }
    
    private static string GetFileExtension(string contentType)
    {
        return contentType switch
        {
            "audio/mpeg" => "mp3",
            "audio/x-wav" => "wav",
            "audio/wav" => "wav",
            _ => "webp"
        };
    }
    
    private static string[] supportedUploadNames = ["audio", "image", "mask"];    
}