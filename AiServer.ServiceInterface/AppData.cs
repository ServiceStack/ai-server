using System.Data;
using AiServer.ServiceInterface.Comfy;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class AppData(ILogger<AppData> log, AiProviderFactory aiFactory, IMessageService mqServer)
{
    public static object SyncRoot = new();
    public static AppData Instance { get; set; }

    private long nextChatTaskId = -1;
    public void SetInitialChatTaskId(long initialValue) => this.nextChatTaskId = initialValue;
    public long LastChatTaskId => Interlocked.Read(ref nextChatTaskId);
    public long GetNextChatTaskId() => Interlocked.Increment(ref nextChatTaskId);

    public ComfyProviderWorker[] ComfyProviderWorkers { get; set; } = [];
    
    public ComfyApiProvider[] ComfyApiProviders { get; set; } = [];
    public ApiProviderWorker[] ApiProviderWorkers { get; set; } = [];
    public ApiProvider[] ApiProviders { get; set; } = [];
    public IEnumerable<ApiProviderWorker> GetActiveWorkers() => ApiProviderWorkers.Where(x => x is { Enabled: true, Concurrency: > 0 });
    public HashSet<string> GetActiveWorkerModels() => GetActiveWorkers().SelectMany(x => x.Models).ToSet();
    private CancellationTokenSource? cts;
    public CancellationToken Token => cts?.Token ?? CancellationToken.None;
    public DateTime? StoppedAt { get; private set; }
    public bool IsStopped => StoppedAt != null;
    
    public void ResetInitialChatTaskId(IDbConnection db)
    {
        var maxId = db.Scalar<long>($"SELECT MAX(Id) FROM {nameof(TaskSummary)}");
        SetInitialChatTaskId(maxId);
    }

    public void RestartWorkers(IDbConnection db)
    {
        StopWorkers();
        StartWorkers(db);
    }
    
    public void StartWorkers(IDbConnection db)
    {
        ResetInitialChatTaskId(db);
        StartWorkers(db.LoadSelect<ApiProvider>().OrderByDescending(x => x.Priority).ThenBy(x => x.Id).ToArray());
    }

    public void StartWorkers(ApiProvider[] apiProviders)
    {
        cts = new();
        lock (SyncRoot)
        {
            log.LogInformation("Starting {Count} Workers...", apiProviders.Length);
            StoppedAt = null;
            ApiProviders = apiProviders;
            ApiProviderWorkers = apiProviders.Select(x => new ApiProviderWorker(x, aiFactory, HasAnyChatTasksQueued, cts.Token)).ToArray();
        }

        foreach (var worker in ApiProviderWorkers)
        {
            log.LogInformation(
                """

                [{Name}] is {Enabled}, currently {Online} at concurrency {Concurrency}, accepting models:
                
                    {Models}
                    
                """,
                worker.Name,
                worker.Enabled ? "Enabled" : "Disabled",
                worker.IsOffline ? "Offline" : "Online",
                worker.Concurrency, 
                string.Join("\n    ", worker.Models));
        }
        
        using var mq = mqServer.CreateMessageProducer();
        mq.Publish(new QueueTasks {
            DelegateOpenAiChatTasks = new()
        });
    }

    public void StopWorkers()
    {
        cts?.Cancel();
        cts?.Dispose();
        cts = null;

        lock (SyncRoot)
        {
            log.LogInformation("Stopping {Count} Workers...", ApiProviderWorkers.Length);
            StoppedAt = DateTime.UtcNow;
            foreach (var worker in ApiProviderWorkers)
            {
                worker.Dispose();
            }
            ApiProviders = [];
            ApiProviderWorkers = [];
        }
    }
    
    public bool HasAnyChatTasksQueued() => GetActiveWorkers().Any(x => x.ChatQueueCount > 0);
    public int ChatTasksQueuedCount() => GetActiveWorkers().Sum(x => x.ChatQueueCount);
    
    public string CreateRequestId() => Guid.NewGuid().ToString("N");
}
