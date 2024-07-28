using System.Data;
using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class OpenAiChatServices(
    ILogger<OpenAiChatServices> log,
    IDbConnectionFactory dbFactory, 
    IMessageProducer mq,
    IAutoQueryDb autoQuery,
    AppData appData) : Service
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

    public async Task<TaskSummary?> GetTaskSummaryAsync(int? id, string? refId)
    {
        var q = Db.From<TaskSummary>();
        if (refId != null)
            q.Where(x => x.RefId == refId);
        else if (id != null)
            q.Where(x => x.Id == id);
        else
            throw new ArgumentNullException(nameof(TaskSummary.Id));
        
        var summary = await Db.SingleAsync(q);
        return summary;
    }

    public async Task<GetOpenAiChatResponse?> GetOpenAiChatAsync(TaskSummary summary)
    {
        var activeTask = await Db.SingleByIdAsync<OpenAiChatTask>(summary.Id);
        if (activeTask != null)
            return new GetOpenAiChatResponse { Result = activeTask };

        using var monthDb = dbFactory.GetMonthDbConnection(summary.CreatedDate);
        var completedTask = await monthDb.SingleByIdAsync<OpenAiChatCompleted>(summary.Id);
        if (completedTask != null)
            return new GetOpenAiChatResponse { Result = completedTask.ConvertTo<OpenAiChatTask>() };

        var failedTask = await monthDb.SingleByIdAsync<OpenAiChatFailed>(summary.Id);
        if (failedTask != null)
        {
            return new GetOpenAiChatResponse
            {
                Result = failedTask.ConvertTo<OpenAiChatTask>(),
                ResponseStatus = failedTask.Error
            };
        }
        return null;
    }
    
    public async Task<object?> Any(GetOpenAiChat request)
    {
        var summary = await GetTaskSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            return HttpError.NotFound("TaskSummary not found");

        var response = await GetOpenAiChatAsync(summary);
        if (response != null)
            return response;
        return HttpError.NotFound("Task not found");
    }
    
    public async Task<object?> Any(WaitForOpenAiChat request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        TaskSummary? summary = null; 

        var startedAt = DateTime.UtcNow;
        while (DateTime.UtcNow - startedAt < TimeSpan.FromSeconds(120))
        {
            summary ??= await GetTaskSummaryAsync(request.Id, request.RefId);
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

            using var monthDb = dbFactory.GetMonthDbConnection(summary.CreatedDate);
            var failedTask = await monthDb.SingleByIdAsync<OpenAiChatCompleted>(summary.Id);
            if (failedTask != null)
            {
                return new GetOpenAiChatResponse {
                    ResponseStatus = failedTask.Error
                };
            }
        }
        
        return HttpError.NotFound("Task not found");
    }

    public async Task<HttpResult> GetModelImageAsync(string model)
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

    public async Task<object> Any(GetModelImage request)
    {
        return await GetModelImageAsync(request.Model);
    }
    
    public async Task<object> Any(QueryCompletedChatTasks query)
    {
        using var dbMonth = HostContext.AppHost.GetDbConnection(query.Db ?? dbFactory.GetNamedMonthDb(DateTime.UtcNow));
        var q = autoQuery.CreateQuery(query, base.Request, dbMonth);
        return await autoQuery.ExecuteAsync(query, q, base.Request, dbMonth);    
    }

    public async Task<object> Any(QueryFailedChatTasks query)
    {
        using var dbMonth = HostContext.AppHost.GetDbConnection(query.Db ?? dbFactory.GetNamedMonthDb(DateTime.UtcNow));
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
        
        request.RefId ??= Guid.NewGuid().ToString("N");
        var task = request.ConvertTo<OpenAiChatTask>();
        task.Id = appData.GetNextChatTaskId();
        task.Model = model;
        task.CreatedBy = Request.GetApiKeyUser() ?? "System";
        
        mq.Publish(new AppDbWrites {
            CreateOpenAiChatTask = task,
        });

        return new CreateOpenAiChatResponse
        {
            Id = task.Id,
            RefId = request.RefId,
        };
    }

    public async Task<object> Any(FetchOpenAiChatRequests request)
    {
        if (request.Models == null || request.Models.Length == 0)
            throw new ArgumentNullException(nameof(request.Models));
        
        var aspReq = (HttpRequest)Request!.OriginalRequest;
        var requestId = aspReq.HttpContext.TraceIdentifier;
        var provider = request.Provider;
        var take = request.Take ?? 1;
        var models = request.Models;

        using var db = dbFactory.OpenDbConnection();

        var q = db.From<OpenAiChatTask>()
            .Where(x => x.StartedDate == null && (x.Provider == null || x.Provider == request.Provider));
        if (request.Models.Length == 1)
            q.Where(x => x.Model == models[0]);
        else
            q.Where(x => models.Contains(x.Model));
        var startedAt = DateTime.UtcNow;

        var hasTasks = await db.ExistsAsync(q);
        if (!hasTasks)
            return new FetchOpenAiChatRequestsResponse { Results = Array.Empty<OpenAiChatRequest>() };

        var lastCounter = ReserveOpenAiChatTaskCommand.Counter;
        mq.Publish(new AppDbWrites {
            ReserveOpenAiChatTask = new ReserveOpenAiChatTask {
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
                if (ReserveOpenAiChatTaskCommand.Counter == lastCounter)
                    await Task.Delay(attempts);

                var currentCounter = ReserveOpenAiChatTaskCommand.Counter;
                if (currentCounter != lastCounter)
                {
                    lastCounter = currentCounter;
                    var results = db.Select(Db.From<OpenAiChatTask>().Where(x => x.RequestId == requestId));
                    if (results.Count > 0)
                    {
                        return new FetchOpenAiChatRequestsResponse {
                            Results = results.Select(x => new OpenAiChatRequest {
                                Id = x.Id,
                                Model = x.Model,
                                Provider = x.Provider,
                                Request = x.Request,
                            }).ToArray()
                        };
                    }
                }
            }
            
            hasTasks = await db.ExistsAsync(q);
            if (!hasTasks)
                return new FetchOpenAiChatRequestsResponse { Results = Array.Empty<OpenAiChatRequest>() };
        }
    }

    public object Any(ChatOperations request)
    {
        mq.Publish(new AppDbWrites {
            RequeueIncompleteTasks = request.RequeueIncompleteTasks == true
                ? new()
                : null,
            ResetTaskQueue = request.ResetTaskQueue == true
                ? new()
                : null,
        });
        
        return new EmptyResponse();
    }

    public object Any(ChatFailedTasks request)
    {
        mq.Publish(new AppDbWrites {
            ResetFailedTasks = request.ResetErrorState == true
                ? new()
                : null,
            RequeueFailedTasks = request.RequeueFailedTaskIds is { Count: > 0 }
                ? new() { Ids = request.RequeueFailedTaskIds }
                : null,
        });
        
        return new EmptyResponse();
    }
    
    public async Task<object>  Any(ChatNotifyCompletedTasks request)
    {
        var taskSummary = await Db.SelectByIdsAsync<TaskSummary>(request.Ids);
        var monthDbs = taskSummary.GroupBy(x => dbFactory.GetNamedMonthDb(x.CreatedDate.Date));
        var to = new ChatNotifyCompletedTasksResponse();

        foreach (var entry in monthDbs)
        {
            using var monthDb = await dbFactory.OpenDbConnectionAsync(entry.Key);
            var taskIds = entry.Map(x => x.Id);
            var tasks = await monthDb.SelectByIdsAsync<OpenAiChatCompleted>(taskIds);
            foreach (var task in tasks)
            {
                try
                {
                    if (task.Response == null)
                    {
                        to.Errors[task.Id] = "Response Missing";
                        continue;
                    }
                    var json = task.Response.ToJson();
                    mq.Publish(new NotificationTasks
                    {
                        NotificationRequest = new()
                        {
                            Url = task.ReplyTo!,
                            ContentType = MimeTypes.Json,
                            Body = json,
                        },
                    });
                    to.Results.Add(task.Id);
                }
                catch (Exception e)
                {
                    to.Errors[task.Id] = e.Message;
                    log.LogError(e, "Error sending notification for {TaskId}: {Message}", task.Id, e.Message);
                }
            }
        }
        return to;
    }

    public async Task<object> Any(CompleteOpenAiChat request)
    {
        mq.Publish(new AppDbWrites {
            CompleteOpenAiChat = request,
        });

        var task = await Db.SingleByIdAsync<OpenAiChatTask>(request.Id);
        if (task?.ReplyTo != null)
        {
            var json = request.Response.ToJson();
            mq.Publish(new NotificationTasks {
                NotificationRequest = new() {
                    Url = task.ReplyTo,
                    ContentType = MimeTypes.Json,
                    Body = json,
                    CompleteNotification = new() {
                        Type = TaskType.OpenAiChat,
                        Id = task.Id,
                    },
                },
            });
        }
        return new EmptyResponse();
    }
    
    public object Any(GetActiveProviders request) => new GetActiveProvidersResponse
    {
        Results = appData.ApiProviders
    };

    public async Task<object> Any(ChatApiProvider request)
    {
        var worker = appData.ApiProviderWorkers.FirstOrDefault(x => x.Name == request.Provider)
            ?? throw HttpError.NotFound("ApiProvider not found");

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
        
        var chatProvider = worker.GetOpenAiProvider();
        var response = await chatProvider.ChatAsync(worker, openAiRequest);
        return response.Response;
    }

    public async Task<object> Any(CreateApiKey request)
    {
        var feature = AssertPlugin<ApiKeysFeature>();
        var apiKey = request.ConvertTo<ApiKeysFeature.ApiKey>();
        await feature.InsertAllAsync(Db, [apiKey]);
        return apiKey.ConvertTo<CreateApiKeyResponse>();
    }

    public object Any(GetApiWorkerStats request) => new GetApiWorkerStatsResponse
    {
        Results = appData.ApiProviderWorkers.Select(x => x.GetStats()).ToList()
    };

    public async Task<object> Any(RerunCompletedTasks request)
    {
        var to = new RerunCompletedTasksResponse();
        var q = Db.From<TaskSummary>()
            .Where(x => request.Ids.Contains(x.Id))
            .OrderBy(x => x.Id);

        var connections = new Dictionary<string, IDbConnection>();
        
        var summaries = await Db.SelectAsync(q);
        foreach (var summary in summaries)
        {
            var monthDb = dbFactory.GetNamedMonthDb(summary.CreatedDate);
            var monthDbConn = connections.GetOrAdd(monthDb, db => HostContext.AppHost.GetDbConnection(db));
            
            var completedTask = await monthDbConn.SingleByIdAsync<OpenAiChatCompleted>(summary.Id);
            if (completedTask == null)
            {
                to.Errors[summary.Id] = "Summary not found";
            }
            else
            {
                try
                {
                    var task = completedTask.ConvertTo<OpenAiChatTask>();
                    task.CompletedDate = null;
                    task.Error = null;
                    task.Provider = null;
                    task.ErrorCode = null;
                    task.Response = null;
                    task.NotificationDate = null;
                    task.Retries = 0;
                    task.DurationMs = 0;
                    task.Worker = null;
                    await Db.InsertAsync(task);
                    await monthDbConn.DeleteByIdAsync<OpenAiChatCompleted>(summary.Id);
                    to.Results.Add(summary.Id);
                }
                catch (Exception e)
                {
                    to.Errors[summary.Id] = e.Message;
                }
            }
        }
        
        foreach (var entry in connections)
        {
            entry.Value.Dispose();
        }
        
        mq.Publish(new QueueTasks {
            DelegateOpenAiChatTasks = new()
        });
        
        return to;
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
