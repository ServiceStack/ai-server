using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Headers;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.Comfy;


public interface IComfyProviderWorker : IDisposable
{
    string Name { get; }
    string? ApiKey { get; }
    string? HeartbeatUrl { get; }
    
    string? GetPreferredApiModel();
    string GetApiModel(string model);

    IComfyClient GetComfyClient();
}

public interface IComfyProvider
{
    Task<bool> IsOnlineAsync(IComfyProviderWorker worker, CancellationToken token = default);

    Task<(ComfyWorkflowResponse,TimeSpan)> QueueWorkflow(IComfyProviderWorker worker, ComfyWorkflowRequest request, CancellationToken token = default);
}

public class ComfyProvider : IComfyProvider
{
    public async Task<bool> IsOnlineAsync(IComfyProviderWorker worker, CancellationToken token = default)
    {
        try
        {
            Action<HttpRequestMessage>? requestFilter = worker.ApiKey != null
                ? req => req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", worker.ApiKey)
                : null;

            var heartbeatResult = await worker.GetComfyClient().GetClientHealthAsync();
            
            var isHealthy = heartbeatResult.StatusCode == (HttpStatusCode)200;
            
            return isHealthy;
        }
        catch (Exception e)
        {
            if (e is TaskCanceledException)
                throw;
            return false;
        }
    }

    public async Task<(ComfyWorkflowResponse,TimeSpan)> QueueWorkflow(IComfyProviderWorker worker, ComfyWorkflowRequest request, CancellationToken token = default)
    {
        var comfyClient = worker.GetComfyClient();
        var start = DateTime.UtcNow;
        // Last check for null seed
        request.Seed ??= Random.Shared.Next();
        var response = await comfyClient.PromptGeneration(request,waitResult:true);
        var duration = DateTime.UtcNow - start;
        return (response,duration);
    }
}

public class ComfyProviderWorker : IComfyProviderWorker
{
    public void Dispose()
    {
        isDisposed = true;
        WorkflowQueue.Dispose();
    }

    public int Id => apiProvider.Id;
    public string Name => apiProvider.Name;
    public string? ApiKey { get; }
    public string? HeartbeatUrl => GetHeartbeatUrl(apiProvider);
    
    public int Concurrency => apiProvider.Concurrency;
    
    public bool Enabled => apiProvider.Enabled;
    
    
    private BlockingCollection<string> WorkflowQueue { get; } = new();
    
    private bool isDisposed;
    private long received = 0;
    private long completed = 0;
    private long retries = 0;
    private long failed = 0;
    private long running = 0;
    private readonly ComfyApiProvider apiProvider;
    private readonly ComfyProviderFactory aiFactory;
    private readonly IComfyClient comfyClient;
    private Func<bool> anyTasksRemaining;
    private readonly CancellationToken token;
    private DateTime lastExecuted = DateTime.UtcNow;
    
    public int WorkflowQueueCount => WorkflowQueue.Count;
    
    public string[]? Models { get; }
    
    public bool IsOffline
    {
        get => apiProvider.OfflineDate != null;
        set => apiProvider.OfflineDate = value ? DateTime.UtcNow : null;
    }

    public ComfyProviderWorker(ComfyApiProvider apiProvider, ComfyProviderFactory aiFactory,Func<bool>? anyTasksRemaining = null, CancellationToken token = default)
    {
        this.apiProvider = apiProvider;
        this.aiFactory = aiFactory;
        if(apiProvider.ApiBaseUrl.IsNullOrEmpty())
            throw new ArgumentNullException(nameof(apiProvider.ApiBaseUrl));
        var comfyBaseUrl = apiProvider.ApiBaseUrl!;
        comfyClient = new ComfyClient(comfyBaseUrl,apiProvider.ApiKey);
        this.token = token;
        this.anyTasksRemaining = anyTasksRemaining ?? (() => false);
        Models = apiProvider.Models?.Select(x => x.ComfyApiModel.Filename).ToArray();
    }
    
    public bool IsRunning => Interlocked.Read(ref running) > 0;
    
    public WorkerStats GetStats() => new()
    {
        Name = Name,
        Queued = WorkflowQueueCount,
        Received = Interlocked.Read(ref received),
        Completed = Interlocked.Read(ref completed),
        Retries = Interlocked.Read(ref retries),
        Failed = Interlocked.Read(ref failed),
        // Offline = apiProvider.OfflineDate,
        // Running = Interlocked.Read(ref running) > 0,
    };

    public string GetHealthCheckEndpoint()
    {
        return apiProvider.ApiBaseUrl.CombineWith("/");
    }
    
    private static string? GetHeartbeatUrl(ComfyApiProvider apiProvider)
    {
        var heartbeatUrl = apiProvider.HeartbeatUrl;
        if (heartbeatUrl == null)
        {
            return apiProvider.ApiBaseUrl.CombineWith("/");
        }

        return heartbeatUrl;
    }

    public string? GetPreferredApiModel()
    {
        var model = Models?.FirstOrDefault();
        return model;
    }
    
    public string GetApiModel(string model)
    {
        if (Models == null || Models.Length == 0)
            return string.Empty;
        return Models.Contains(model) ? model : Models[0];
    }

    public IComfyClient GetComfyClient()
    {
        return comfyClient;
    }


    public void AddToQueue(string requestId)
    {
        WorkflowQueue.Add(requestId, token);
        Interlocked.Increment(ref received);
    }
    
    public void Update(UpdateComfyApiProvider request)
    {
        if (request.ApiKey != null)
            apiProvider.ApiKey = request.ApiKey;
        if (request.ApiBaseUrl != null)
            apiProvider.ApiBaseUrl = request.ApiBaseUrl;
        if (request.HeartbeatUrl != null)
            apiProvider.HeartbeatUrl = request.HeartbeatUrl;
        if (request.Concurrency != null)
            apiProvider.Concurrency = request.Concurrency.Value;
        if (request.Priority != null)
            apiProvider.Priority = request.Priority.Value;
        if (request.Enabled != null)
            apiProvider.Enabled = request.Enabled.Value;
    }
    
    bool ShouldStopRunning() => IsOffline || isDisposed || token.IsCancellationRequested;

    
    public async Task ExecuteTasksAsync(ILogger log, IDbConnectionFactory dbFactory, IMessageProducer mq)
    {
        if (ShouldStopRunning())
            return;

        if (Interlocked.CompareExchange(ref running, 1, 0) != 0)
        {
            log.LogInformation("[{Name}] already running...", Name);
            return;
        }

        try
        {
            using var db = await dbFactory.OpenDbConnectionAsync(token:token);
            while (this.WorkflowQueueCount > 0)
            {
                if (ShouldStopRunning())
                    return;

                var completedTaskIds = new List<long>();
                while (!IsOffline && WorkflowQueue.TryTake(out var requestId))
                {
                    var workflowTask = await db.SelectAsync(db.From<ComfyGenerationTask>().Where(x =>
                        x.RequestId == requestId && x.CompletedDate == null && x.ErrorCode == null), token:token);
                    var concurrentTasks = workflowTask.Select(x => ExecuteComfyWorkflowTaskAsync(log, mq, x));

                    completedTaskIds.AddRange((await Task.WhenAll(concurrentTasks)).Where(x => x.HasValue)
                        .Select(x => x!.Value));

                    if (ShouldStopRunning())
                        return;
                }

                if (ShouldStopRunning())
                    return;

                // See if there are any incomplete tasks for this provider
                var incompleteRequestIds = await db.ColumnDistinctAsync<string>(db.From<ComfyGenerationTask>()
                    .Where(x => x.RequestId != null && x.CompletedDate == null && x.ErrorCode == null &&
                                x.Worker == Name
                                && !completedTaskIds.Contains(x.Id))
                    .Select(x => x.RequestId), token:token);
                if (incompleteRequestIds.Count > 0)
                {
                    log.LogWarning("[{Name}] Missed completing {Count} Comfy Generation Tasks",
                        Name, incompleteRequestIds.Count);
                    foreach (var requestId in incompleteRequestIds)
                    {
                        if (ShouldStopRunning())
                            return;

                        WorkflowQueue.Add(requestId, token);
                    }
                }

                if (WorkflowQueueCount == 0)
                {
                    completedTaskIds.Clear();
                    log.LogInformation("[{Name}] processed all its tasks, requesting new tasks...", Name);
                    mq.Publish(new AppDbWrites
                    {
                        RequestComfyGenerationTasks = new()
                        {
                            Provider = Name,
                            Count = 3,
                        }
                    });

                    var polling = 0;
                    while (polling++ < 10 && WorkflowQueueCount == 0)
                    {
                        await Task.Delay(1000, token);
                    }
                    log.LogInformation("[{Name}] has {Count} new Tasks assigned after polling {Polled} times...", 
                        Name, WorkflowQueueCount, polling-1);

                    // Finish executing when all other workers have completed as well
                    if (!anyTasksRemaining())
                    {
                        log.LogInformation("[{Name}] no tasks remaining, exiting...", Name);
                    }
                }
            }
        }
        catch (Exception e)
        {
            log.LogError(e, "[{Name}] Error executing Comfy Generation Tasks: {Message}", Name, e.Message);
        }
        finally
        {
            Interlocked.Decrement(ref running);
        }
    }
    
    public IComfyProvider GetProvider() => aiFactory.GetComfyProvider();

    
    async Task<long?> ExecuteComfyWorkflowTaskAsync(ILogger log, IMessageProducer mq, ComfyGenerationTask task)
    {
        var comfyProvider = GetProvider();

        try
        {
            if (ShouldStopRunning())
                return null;

            lastExecuted = DateTime.UtcNow;
            var (response,durationMs) = await comfyProvider.QueueWorkflow(this, task.Request, token);

            // Get status
            var comfyClient = GetComfyClient();
            var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId);
            
            Interlocked.Increment(ref completed);
            var taskType = Enum.GetName(task.TaskType);
            log.LogInformation("[{Name}] Completed Comfy {TaskType} Task {Id} from {Request} in {Duration}ms",
                Name, taskType, task.Id, task.RequestId, durationMs.TotalMilliseconds);

            mq.Publish(new AppDbWrites
            {
                CompleteComfyGeneration = new()
                {
                    Id = task.Id,
                    Provider = Name,
                    DurationMs = (int)durationMs.TotalMilliseconds,
                    Status = status,
                    Response = response,
                },
            });

            if (task.ReplyTo != null)
            {
                var json = response.ToJson();
                mq.Publish(new NotificationTasks
                {
                    NotificationRequest = new()
                    {
                        Url = task.ReplyTo,
                        ContentType = MimeTypes.Json,
                        Body = json,
                        CompleteNotification = new()
                        {
                            Type = TaskType.Comfy,
                            Id = task.Id,
                        },
                    },
                });
            }

            return task.Id;
        }
        catch (TaskCanceledException)
        {
            log.LogInformation("[{Name}] Comfy Task {Id} from {Request} was cancelled", Name, task.Id, task.RequestId);
            return null;
        }
        catch (Exception e)
        {
            if (ShouldStopRunning())
                return null;
            Interlocked.Increment(ref failed);

            log.LogError(e, "[{Name}] Error executing {TaskId} Comfy Generation Task: {Message}",
                Name, task.Id, e.Message);

            try
            {
                if (!await comfyProvider.IsOnlineAsync(this, token))
                {
                    var offlineDate = DateTime.UtcNow;
                    IsOffline = true;
                    log.LogError("[{Name}] has been taken offline", Name);
                    mq.Publish(new AppDbWrites
                    {
                        RecordOfflineComfyProvider = new()
                        {
                            Name = Name,
                            OfflineDate = offlineDate,
                        }
                    });
                }
                else
                {
                    mq.Publish(new AppDbWrites
                    {
                        FailComfyGeneration = new()
                        {
                            Id = task.Id,
                            Provider = Name,
                            Error = e.ToResponseStatus(),
                        },
                    });
                }
            }
            catch (TaskCanceledException) {}

            return null;
        }
    }
}

public class ComfyProviderFactory(ComfyProvider comfyProvider)
{
    public IComfyProvider GetComfyProvider(string? type = null)
    {
        return comfyProvider;
    }
}
