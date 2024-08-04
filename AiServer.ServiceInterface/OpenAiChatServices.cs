using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class OpenAiChatServices(
    ILogger<OpenAiChatServices> log,
    IDbConnectionFactory dbFactory, 
    IMessageProducer mq,
    IAutoQueryDb autoQuery,
    AppData appData,
    BackgroundsJobFeature feature,
    IBackgroundJobs jobs) : Service
{
    public async Task<object> Any(ActiveApiModels request)
    {
        var activeModels = await Db.ColumnDistinctAsync<string>(
            Db.From<ApiProvider>()
                .Join<ApiProviderModel>()
                .Where(x => x.Enabled)
                .SelectDistinct<ApiProviderModel>(x => x.Model));
        
        return new StringsResponse
        {
            Results = activeModels.ToList() 
        };
    }

    public object Any(GetWorkerStats request)
    {
        return new GetWorkerStatsResponse
        {
            Results = jobs.GetWorkerStats() 
        };
    }

    public object GetModelImage(string model)
    {
        var modelFile = model.Replace(':', '-');
        string[] exts = ["svg", "png", "jpg"];

        foreach (var ext in exts)
        {
            var localPath = $"/icons/models/{modelFile}.{ext}";
            var file = VirtualFiles.GetFile(localPath);
            if (file != null)
            {
                return new HttpResult(file, MimeTypes.GetMimeType(file.Extension));
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
    
    public async Task<object> Any(QueryCompletedChatTasks query)
    {
        using var dbMonth = feature.OpenJobsMonthDb(query.Db ?? DateTime.UtcNow);
        var q = autoQuery.CreateQuery(query, base.Request, dbMonth);
        return await autoQuery.ExecuteAsync(query, q, base.Request, dbMonth);    
    }
    
    public async Task<object> Any(QueryFailedChatTasks query)
    {
        using var dbMonth = feature.OpenJobsMonthDb(query.Db ?? DateTime.UtcNow);
        var q = autoQuery.CreateQuery(query, base.Request, dbMonth);
        return await autoQuery.ExecuteAsync(query, q, base.Request, dbMonth);    
    }
    
    public async Task<object> Any(CreateOpenAiChat request)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        var model = request.Request.Model;
        if (!await Db.ExistsAsync<ApiModel>(x => x.Name == model))
            throw HttpError.NotFound($"Model {model} not found");

        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        ApiProvider? useProvider = null;
        var candidates = appData.ApiProviders
            .Where(x => x.Enabled && x.Models.Any(m => m.Model == model)).ToList();
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
            throw new NotSupportedException("No active API Providers support this model");

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
        
        return new CreateOpenAiChatResponse
        {
            Id = jobRef.Id,
            RefId = jobRef.RefId,
        };
    }
    
    public async Task<object?> Any(WaitForOpenAiChat request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        JobSummary? summary = null; 

        var startedAt = DateTime.UtcNow;
        while (DateTime.UtcNow - startedAt < TimeSpan.FromSeconds(120))
        {
            summary ??= await GetJobSummaryAsync(request.Id, request.RefId);
            if (summary != null)
            {
                var response = await GetOpenAiChatAsync(summary);
                if (response?.Result?.Response != null)
                    return response;
            }
            await Task.Delay(500);
        }

        if (summary != null)
        {
            var response = await GetOpenAiChatAsync(summary);
            if (response?.ResponseStatus != null)
                return new GetOpenAiChatResponse { ResponseStatus = response.ResponseStatus };

            using var monthDb = feature.OpenJobsMonthDb(summary.CreatedDate);
            var failedTask = await monthDb.SingleByIdAsync<CompletedJob>(summary.Id);
            if (failedTask != null)
            {
                return new GetOpenAiChatResponse {
                    ResponseStatus = failedTask.Error
                };
            }
        }
        
        return HttpError.NotFound("Job not found");
    }
    
    public async Task<JobSummary?> GetJobSummaryAsync(int? id, string? refId)
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
    
    public async Task<GetOpenAiChatResponse?> GetOpenAiChatAsync(JobSummary summary)
    {
        using var db = feature.OpenJobsDb();

        var activeTask = await db.SingleByIdAsync<BackgroundJob>(summary.Id);
        if (activeTask != null)
            return new GetOpenAiChatResponse { Result = activeTask };

        using var monthDb = feature.OpenJobsMonthDb(summary.CreatedDate);
        var completedTask = await monthDb.SingleByIdAsync<CompletedJob>(summary.Id);
        if (completedTask != null)
            return new GetOpenAiChatResponse { Result = completedTask };

        var failedTask = await monthDb.SingleByIdAsync<FailedJob>(summary.Id);
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
    
    public async Task<object?> Any(GetOpenAiChat request)
    {
        var summary = await GetJobSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            return HttpError.NotFound("JobSummary not found");

        var response = await GetOpenAiChatAsync(summary);
        if (response != null)
            return response;
        return HttpError.NotFound("Job not found");
    }
    
    public object Any(GetActiveProviders request) => new GetActiveProvidersResponse
    {
        Results = appData.ApiProviders
    };

    public async Task<object> Any(ChatApiProvider request)
    {
        var provider = appData.AssertApiProvider(request.Provider);

        var openAiRequest = request.Request;
        if (openAiRequest == null)
        {
            if (string.IsNullOrEmpty(request.Prompt))
                throw new ArgumentNullException(nameof(request.Prompt));
            
            openAiRequest = new OpenAiChat
            {
                Model = request.Model,
                Messages = [
                    new() { Role = "user", Content = request.Prompt },
                ],
                MaxTokens = 512,
                Stream = false,
            };
        }
        
        var chatProvider = appData.GetOpenAiProvider(provider);
        var response = await chatProvider.ChatAsync(provider, openAiRequest);
        return response.Response;
    }

    public async Task<object> Any(CreateApiKey request)
    {
        var apiKeysFeature = AssertPlugin<ApiKeysFeature>();
        var apiKey = request.ConvertTo<ApiKeysFeature.ApiKey>();
        await apiKeysFeature.InsertAllAsync(Db, [apiKey]);
        return apiKey.ConvertTo<CreateApiKeyResponse>();
    }
    
    public async Task<object> Any(AdminAddModel request)
    {
        var apiModel = await Db.SingleAsync<ApiModel>(x => x.Name == request.Model.Name);
        if (apiModel == null)
        {
            await Db.InsertAsync(request.Model);
        }

        if (request.ApiTypes != null)
        {
            var typeNames = request.ApiTypes.Keys.ToList();
            var apiTypes = await Db.SelectAsync<ApiType>(x => typeNames.Contains(x.Name));
            foreach (var apiType in apiTypes)
            {
                var apiTypeModel = request.ApiTypes[apiType.Name];
                apiType.ApiModels[apiTypeModel.Name] = apiTypeModel.Value;
                await Db.UpdateOnlyFieldsAsync(apiType, x => x.ApiModels, 
                    x => x.Id == apiType.Id);
            }
        }

        if (request.ApiProviders != null)
        {
            var providerNames = request.ApiProviders.Keys.ToList();
            var apiProviders = await Db.SelectAsync<ApiProvider>(x => providerNames.Contains(x.Name));
            foreach (var apiProvider in apiProviders)
            {
                if (await Db.ExistsAsync<ApiProviderModel>(x => x.ApiProviderId == apiProvider.Id && x.Model == request.Model.Name))
                    continue;
                
                var apiProviderModel = request.ApiProviders[apiProvider.Name];
                apiProviderModel.ApiProviderId = apiProvider.Id;
                await Db.InsertAsync(apiProviderModel);
            }
        }

        return new EmptyResponse();
    }
}
