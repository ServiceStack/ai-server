using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceInterface;

public class OpenAiChatServices(
    ILogger<OpenAiChatServices> log,
    IDbConnectionFactory dbFactory, 
    IAutoQueryDb autoQuery,
    IAutoQueryData autoQueryData,
    AppData appData,
    IBackgroundJobs jobs) : Service
{
    [ExcludeMetadata]
    class QueryAiModelsData : QueryData<AiModel> {}
    public object Any(QueryAiModels request)
    {
        var query = request.ConvertTo<QueryAiModelsData>();
        var db = appData.AiModels.ToDataSource(query, Request!);
        return autoQueryData.Execute(query, autoQueryData.CreateQuery(query, Request, db), db);
    }
    
    [ExcludeMetadata]
    class QueryAiTypesData : QueryData<AiType> {}
    public object Any(QueryAiTypes request)
    {
        var query = request.ConvertTo<QueryAiTypesData>();
        var db = appData.AiTypes.ToDataSource(query, Request!);
        return autoQueryData.Execute(query, autoQueryData.CreateQuery(query, Request, db), db);
    }
    
    public object Any(ActiveAiModels request)
    {
        var activeModels = appData.AiProviders
            .SelectMany(x => x.Models.Select(m => appData.GetQualifiedModel(m.Model)))
            .Where(x => x != null)
            .Select(x => x!)  // Non-null assertion after filtering out null values
            .Distinct()
            .OrderBy(x => x);
        
        return new StringsResponse
        {
            Results = activeModels.ToList() 
        };
    }
    
    public object Any(QueryAiProviders query)
    {
        using var db = autoQuery.GetDb(query, base.Request);
        var q = autoQuery.CreateQuery(query, base.Request, db);
        var r = autoQuery.Execute(query, q, base.Request, db);
        var aiTypes = appData.AiTypes.GetAll().ToDictionary(x => x.Id);
        r.Results.ForEach(x => x.AiType = aiTypes.GetValueOrDefault(x.AiTypeId));
        return r;
    }

    public object Any(GetWorkerStats request)
    {
        return new GetWorkerStatsResponse
        {
            Results = jobs.GetWorkerStats(),
            QueueCounts = jobs.GetWorkerQueueCounts(),
        };
    }

    public object Any(CancelWorker request)
    {
        jobs.CancelWorker(request.Worker);
        return new EmptyResponse();
    }

    public object GetModelImage(string model)
    {
        var qualifiedModel = appData.GetQualifiedModel(model);
        if (qualifiedModel != null)
        {
            var modelGroup = qualifiedModel.LeftPart(':');
            var aiModel = appData.AiModels.GetAll().FirstOrDefault(x => x.Id == modelGroup);
            if (aiModel?.Icon != null)
            {
                var file = VirtualFileSources.GetFile(aiModel.Icon);
                if (file != null)
                {
                    return new HttpResult(file, MimeTypes.GetMimeType(file.Extension));
                }
            }
        }
        
        return new HttpResult(
            """
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="M18.38 27.94v-14.4l11.19-6.46c6.2-3.58 17.3 5.25 12.64 13.33"/><path fill="none" stroke="currentColor" stroke-linejoin="round" d="m18.38 20.94l12.47-7.2l11.19 6.46c6.2 3.58 4.1 17.61-5.23 17.61"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="m24.44 17.44l12.47 7.2v12.93c0 7.16-13.2 12.36-17.86 4.28"/><path fill="none" stroke="currentColor" stroke-linejoin="round" d="M30.5 21.2v14.14L19.31 41.8c-6.2 3.58-17.3-5.25-12.64-13.33"/>
                <path fill="none" stroke="currentColor" stroke-linejoin="round" d="m30.5 27.94l-12.47 7.2l-11.19-6.46c-6.21-3.59-4.11-17.61 5.22-17.61"/><path fill="none" stroke="currentColor" stroke-linejoin="round" d="m24.44 31.44l-12.47-7.2V11.31c0-7.16 13.2-12.36 17.86-4.28"/>
            </svg>
            """, 
            MimeTypes.ImageSvg);
    }

    public object Any(GetModelImage request)
    {
        return GetModelImage(request.Model);
    }

    public async Task<object> Post(OpenAiChatCompletion request)
    {
        var chatRequest = new QueueOpenAiChatCompletion
        {
            Request = request,
            RefId = request.RefId,
            Tag = request.Tag,
            Provider = request.Provider
        };
        
        return await chatRequest.ProcessSync(jobs, this);
    }
    
    public async Task<object> Any(QueueOpenAiChatCompletion request)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        if (request.Request.Messages.IsNullOrEmpty())
            throw new ArgumentNullException(nameof(request.Request.Messages));
    
        var qualifiedModel = appData.GetQualifiedModel(request.Request.Model);
        if (qualifiedModel == null)
            throw HttpError.NotFound($"Model {request.Request.Model} not found");

        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        AiProvider? useProvider = null;
        var candidates = appData.AiProviders
            .Where(x => x.Enabled && x.Models.Any(m => m.Model == qualifiedModel)).ToList();
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

        useProvider ??= candidates.FirstOrDefault(x => x.Name == qualifiedModel); // Allow selecting offline models
        if (useProvider == null)
            throw new NotSupportedException("No active AI Providers support this model");

        var jobRef = jobs.EnqueueCommand<CreateOpenAiChatCommand>(request, new()
        {
            RefId = request.RefId,
            ReplyTo = request.ReplyTo,
            Tag = request.Tag,
            Args = request.Provider == null ? null : new() {
                [nameof(request.Provider)] = request.Provider
            },
            Worker = useProvider.Name,
        });
        
        var jobStatusUrl = AppConfig.Instance.ApplicationBaseUrl
            .CombineWith($"/api/{nameof(GetOpenAiChatStatus)}?RefId=" + jobRef.RefId);
    
        var response = new QueueOpenAiChatResponse
        {
            Id = jobRef.Id,
            RefId = jobRef.RefId,
            StatusUrl = jobStatusUrl
        };

        return response;
    }

    private async Task<JobResult> WaitForJobCompletion(long jobId)
    {
        var timeout = DateTime.UtcNow.AddMinutes(1);
        JobResult? job;
        do
        {
            job = jobs.GetJob(jobId);
            if (job?.Job?.State is BackgroundJobState.Completed or BackgroundJobState.Cancelled or BackgroundJobState.Failed)
            {
                return job;
            }
            await Task.Delay(1000);
        } while (DateTime.UtcNow < timeout);

        throw new TimeoutException("Job did not complete within the specified timeout.");
    }
    
    public async Task<object?> Any(WaitForOpenAiChat request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        JobSummary? summary = null; 

        var startedAt = DateTime.UtcNow;
        while (DateTime.UtcNow - startedAt < TimeSpan.FromSeconds(120))
        {
            summary ??= GetJobSummary(request.Id, request.RefId);
            if (summary != null)
            {
                var response = GetOpenAiChat(summary);
                if (response?.Result?.Response != null)
                    return response;
            }
            await Task.Delay(500);
        }

        if (summary != null)
        {
            var response = GetOpenAiChat(summary);
            if (response?.ResponseStatus != null)
                return new GetOpenAiChatResponse { ResponseStatus = response.ResponseStatus };

            using var monthDb = jobs.OpenMonthDb(summary.CreatedDate);
            var failedTask = monthDb.SingleById<CompletedJob>(summary.Id);
            if (failedTask != null)
            {
                return new GetOpenAiChatResponse {
                    ResponseStatus = failedTask.Error
                };
            }
        }
        
        return HttpError.NotFound("Job not found");
    }
    
    public JobSummary? GetJobSummary(int? id, string? refId)
    {
        using var db = jobs.OpenDb();
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
    
    public GetOpenAiChatResponse? GetOpenAiChat(JobSummary summary)
    {
        using var db = jobs.OpenDb();

        var activeTask = db.SingleById<BackgroundJob>(summary.Id);
        if (activeTask != null)
            return new GetOpenAiChatResponse { Result = activeTask };

        using var monthDb = jobs.OpenMonthDb(summary.CreatedDate);
        var completedTask = monthDb.SingleById<CompletedJob>(summary.Id);
        if (completedTask != null)
            return new GetOpenAiChatResponse { Result = completedTask };

        var failedTask = monthDb.SingleById<FailedJob>(summary.Id);
        if (failedTask != null)
        {
            return new GetOpenAiChatResponse
            {
                Result = failedTask,
                ResponseStatus = failedTask.Error
            };
        }
        return null;
    }
    
    public object? Any(GetOpenAiChat request)
    {
        var summary = GetJobSummary(request.Id, request.RefId);
        if (summary == null)
            return HttpError.NotFound("JobSummary not found");

        var response = GetOpenAiChat(summary);
        if (response != null)
            return response;
        return HttpError.NotFound("Job not found");
    }

    public async Task<object> Get(GetOpenAiChatStatus request)
    {
        var summary = GetJobSummary((int)request.JobId, request.RefId);
        if (summary == null)
            return HttpError.NotFound("JobSummary not found");

        var response = GetOpenAiChat(summary);
        if (response == null)
            return HttpError.NotFound("Job not found");

        var job = response.Result;

        var chatResponse = response.Result?.ResponseBody.FromJson<OpenAiChatResponse>();
        if (chatResponse == null)
            return new GetOpenAiChatStatusResponse
            {
                JobId = request.JobId,
                RefId = request.RefId,
                JobState = job.State,
                Status = job.State.ToString(),
            };
        
        return new GetOpenAiChatStatusResponse
        {
            JobId = request.JobId,
            RefId = request.RefId,
            JobState = job.State,
            Status = job.State.ToString(),
            ChatResponse = chatResponse,
        };
    }
    
    public object Any(GetActiveProviders request) => new GetActiveProvidersResponse
    {
        Results = appData.AiProviders
    };

    public async Task<object> Any(ChatAiProvider request)
    {
        var provider = appData.AssertAiProvider(request.Provider);

        var openAiRequest = request.Request ?? CreateOpenAiChatRequest(request);
        
        var chatProvider = appData.GetOpenAiProvider(provider);
        var response = await chatProvider.ChatAsync(provider, openAiRequest);
        return response.Response;
    }

    private OpenAiChat CreateOpenAiChatRequest(ChatAiProvider request)
    {
        if (string.IsNullOrEmpty(request.Prompt))
            throw new ArgumentNullException(nameof(request.Prompt));

        return new OpenAiChat
        {
            Model = request.Model,
            Messages = [
                new() { Role = "user", Content = request.Prompt },
            ],
            MaxTokens = 512,
            Stream = false,
        };
    }

    public object Any(CreateApiKey request)
    {
        var apiKeysFeature = AssertPlugin<ApiKeysFeature>();
        var apiKey = request.ConvertTo<ApiKeysFeature.ApiKey>();
        apiKeysFeature.InsertAll(Db, [apiKey]);
        return apiKey.ConvertTo<CreateApiKeyResponse>();
    }
    
    public object Any(CreateAiProvider request)
    {
        if (request.SelectedModels.IsEmpty() && request.Models.IsEmpty())
            throw new ArgumentNullException(nameof(CreateAiProvider.SelectedModels), "No Models selected");
                
        if (request.SelectedModels != null)
        {
            request.Models ??= [];
            foreach (var selectedModel in request.SelectedModels)
            {
                var qualifiedModel = appData.GetQualifiedModel(selectedModel);
                if (qualifiedModel == null)
                    continue;
                request.Models.Add(new()
                {
                    Model = qualifiedModel
                });
            }
        }
        
        var response = autoQuery.Create(request, base.Request, Db);
        appData.ResetAiProviders(Db); 
        return response;
    }

    public object Any(UpdateAiProvider request)
    {
        var ignore = new[] { nameof(request.Id), nameof(request.SelectedModels) };
        // Only call AutoQuery Update if there's something to update
        IdResponse? response = null;
        if (request.SelectedModels is { Count: > 0 })
        {
            request.Models ??= [];
            foreach (var selectedModel in request.SelectedModels)
            {
                var qualifiedModel = appData.GetQualifiedModel(selectedModel);
                if (qualifiedModel == null)
                    continue;
                request.Models.Add(new()
                {
                    Model = qualifiedModel
                });
            }
        }
        if (request.ToObjectDictionary().HasNonDefaultValues(ignoreKeys:ignore) || Request!.QueryString[Keywords.Reset] != null)
        {
            response = (IdResponse) autoQuery.Patch(request, base.Request, Db);
            appData.ResetAiProviders(Db);
        }
        
        response ??= request.ConvertTo<IdResponse>();
        return response;
    }

    public object Any(DeleteAiProvider request)
    {
        var response = autoQuery.Delete(request, base.Request, Db);
        appData.ResetAiProviders(Db); 
        return response;
    }
}

public static class OpenAiChatServiceExtensions
{
    public static async Task<object> ProcessSync(this QueueOpenAiChatCompletion chatRequest,
        IBackgroundJobs jobs,
        OpenAiChatServices chatService)
    {
        QueueOpenAiChatResponse? chatResponse = null;
        try
        {
            var response = await chatService.Any(chatRequest);
            chatResponse = response as QueueOpenAiChatResponse;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
        if(chatResponse == null)
            throw new Exception("Failed to start chat request");
        
        var job = jobs.GetJob(chatResponse.Id);
        // For all requests, wait for the job to be created
        while (job == null)
        {
            await Task.Delay(1000);
            job = jobs.GetJob(chatResponse.Id);
        }
        
        // We know at this point, we definitely have a job
        JobResult queuedJob = job;
        
        var completedResponse = new OpenAiChatResponse()
        {
        };

        // Handle failed jobs
        if (job.Failed != null)
        {
            throw new Exception(job.Failed.Error.Message);
        }
        
        // Wait for the job to complete max 1 minute
        var timeout = DateTime.UtcNow.AddMinutes(1);
        while (queuedJob?.Job?.State is not (BackgroundJobState.Completed or BackgroundJobState.Cancelled
               or BackgroundJobState.Failed) && DateTime.UtcNow < timeout)
        {
            await Task.Delay(1000);
            queuedJob = jobs.GetJob(chatResponse.Id);
        }
        
        // Check if the job is still not completed
        if (queuedJob?.Job?.State is not (BackgroundJobState.Completed or BackgroundJobState.Cancelled
               or BackgroundJobState.Failed))
        {
            throw new Exception("Job did not complete within the specified timeout.");
        }
        
        // Process successful job results
        var jobResponseBody = queuedJob.Completed?.ResponseBody;
        var jobRes = jobResponseBody.FromJson<OpenAiChatResponse>();
        if (jobRes != null)
        {
            completedResponse.Choices = jobRes.Choices;
            completedResponse.Created = jobRes.Created;
            completedResponse.Model = jobRes.Model;
            completedResponse.SystemFingerprint = jobRes.SystemFingerprint;
            completedResponse.Object = jobRes.Object;
            completedResponse.Usage = jobRes.Usage;
            completedResponse.Id = jobRes.Id;
        }

        return completedResponse;
    }
}
