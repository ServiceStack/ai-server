using System.Data;
using AiServer.ServiceInterface.Comfy;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface;

public class AppData(ILogger<AppData> log, AiProviderFactory aiFactory, ComfyProviderFactory comfyFactory, IMessageService mqServer)
{
    public static object SyncRoot = new();
    public static AppData Instance { get; set; }

    // OpenAI/standard-specific properties
    private long nextChatTaskId = -1;
    private static readonly object chatLock = new();
    public ApiProviderWorker[] ApiProviderWorkers { get; set; } = [];
    public ApiProvider[] ApiProviders { get; set; } = [];

    // Comfy-specific properties
    private long nextComfyTaskId = -1;
    private static readonly object comfyLock = new();
    public ComfyProviderWorker[] ComfyProviderWorkers { get; set; } = [];
    public ComfyApiProvider[] ComfyApiProviders { get; set; } = [];

    // Shared properties
    private CancellationTokenSource? cts;
    public CancellationToken Token => cts?.Token ?? CancellationToken.None;
    public DateTime? StoppedAt { get; private set; }
    public bool IsStopped => StoppedAt != null;

    // OpenAI/standard-specific methods
    public void SetInitialChatTaskId(long initialValue) => Interlocked.Exchange(ref nextChatTaskId, initialValue);
    public long LastChatTaskId => Interlocked.Read(ref nextChatTaskId);
    public long GetNextChatTaskId() => Interlocked.Increment(ref nextChatTaskId);
    public IEnumerable<ApiProviderWorker> GetActiveWorkers() => ApiProviderWorkers.Where(x => x is { Enabled: true, Concurrency: > 0 });
    public HashSet<string> GetActiveWorkerModels() => GetActiveWorkers().SelectMany(x => x.Models).ToSet();
    public bool HasAnyChatTasksQueued() => GetActiveWorkers().Any(x => x.ChatQueueCount > 0);
    public int ChatTasksQueuedCount() => GetActiveWorkers().Sum(x => x.ChatQueueCount);

    // Comfy-specific methods
    public void SetInitialComfyTaskId(long initialValue) => Interlocked.Exchange(ref nextComfyTaskId, initialValue);
    public long LastComfyTaskId => Interlocked.Read(ref nextComfyTaskId);
    public long GetNextComfyTaskId() => Interlocked.Increment(ref nextComfyTaskId);
    public IEnumerable<ComfyProviderWorker> GetActiveComfyWorkers() => ComfyProviderWorkers.Where(x => x is { Enabled: true, Concurrency: > 0 });
    public HashSet<string> GetActiveComfyWorkerModels() => GetActiveComfyWorkers().SelectMany(x => x.Models).ToSet();
    public bool HasAnyComfyTasksQueued() => GetActiveComfyWorkers().Any(x => x.WorkflowQueueCount > 0);
    public int ComfyTasksQueuedCount() => GetActiveComfyWorkers().Sum(x => x.WorkflowQueueCount);

    public void ResetInitialTaskIds(IDbConnection db)
    {
        var maxChatId = db.Scalar<long>($"SELECT MAX(Id) FROM {nameof(TaskSummary)}");
        SetInitialChatTaskId(maxChatId);

        var maxComfyId = db.Scalar<long>($"SELECT MAX(Id) FROM {nameof(ComfySummary)}");
        SetInitialComfyTaskId(maxComfyId);
    }

    public void RestartWorkers(IDbConnection db)
    {
        StopWorkers();
        StartWorkers(db);
    }
    
    public void StartWorkers(IDbConnection db)
    {
        ResetInitialTaskIds(db);
        var apiProviders = db.LoadSelect<ApiProvider>().OrderByDescending(x => x.Priority).ThenBy(x => x.Id).ToArray();
        var comfyProviders = db.LoadSelect<ComfyApiProvider>().OrderByDescending(x => x.Priority).ThenBy(x => x.Id).ToArray();
        // Could be slow for lots of providers, but usually only called on Init
        foreach (var provider in comfyProviders)
        {
            PopulateWorkerModels(provider, db);
        }
        StartWorkers(apiProviders, comfyProviders);
    }

    private void PopulateWorkerModels(ComfyApiProvider provider, IDbConnection db)
    {
        provider.Models = db.LoadSelect<ComfyApiProviderModel>(x => x.ComfyApiProviderId == provider.Id);
    }

    public void StartWorkers(ApiProvider[] apiProviders, ComfyApiProvider[] comfyProviders)
    {
        cts = new();
        StartApiWorkers(apiProviders);
        if(comfyProviders.Length > 0)
            StartComfyWorkers(comfyProviders);

        using var mq = mqServer.CreateMessageProducer();
        mq.Publish(new QueueTasks {
            DelegateOpenAiChatTasks = new(),
            DelegateComfyTasks = new()
        });
    }

    private void StartApiWorkers(ApiProvider[] apiProviders)
    {
        lock (chatLock)
        {
            log.LogInformation("Starting {Count} API Workers...", apiProviders.Length);
            StoppedAt = null;
            ApiProviders = apiProviders;
            ApiProviderWorkers = apiProviders.Select(x => new ApiProviderWorker(x, aiFactory, HasAnyChatTasksQueued, cts.Token)).ToArray();
        }
        LogWorkerInfo(ApiProviderWorkers, "API");
    }

    private void StartComfyWorkers(ComfyApiProvider[] comfyProviders)
    {
        lock (comfyLock)
        {
            log.LogInformation("Starting {Count} Comfy Workers...", comfyProviders.Length);
            StoppedAt = null;
            ComfyApiProviders = comfyProviders;
            ComfyProviderWorkers = comfyProviders.Select(x => new ComfyProviderWorker(x, comfyFactory, HasAnyComfyTasksQueued, cts.Token)).ToArray();
        }
        LogWorkerInfo(ComfyProviderWorkers, "Comfy");
    }

    private void LogWorkerInfo(ApiProviderWorker[] workers, string workerType)
    {
        foreach (var worker in workers)
        {
            log.LogInformation(
                """

                [{Type}] [{Name}] is {Enabled}, currently {Online} at concurrency {Concurrency}, accepting models:
                
                    {Models}
                    
                """,
                workerType,
                worker.Name,
                worker.Enabled ? "Enabled" : "Disabled",
                worker.IsOffline ? "Offline" : "Online",
                worker.Concurrency, 
                string.Join("\n    ", worker.Models));
        }
    }
    
    private void LogWorkerInfo(ComfyProviderWorker[] workers, string workerType)
    {
        foreach (var worker in workers)
        {
            log.LogInformation(
                """

                [{Type}] [{Name}] is {Enabled}, currently {Online} at concurrency {Concurrency}, accepting models:
                
                    {Models}
                    
                """,
                workerType,
                worker.Name,
                worker.Enabled ? "Enabled" : "Disabled",
                worker.IsOffline ? "Offline" : "Online",
                worker.Concurrency, 
                string.Join("\n    ", worker.Models ?? ["No Models"]));
        }
    }

    public void StopWorkers()
    {
        cts?.Cancel();
        cts?.Dispose();
        cts = null;

        StopApiWorkers();
        StopComfyWorkers();
    }

    private void StopApiWorkers()
    {
        lock (chatLock)
        {
            log.LogInformation("Stopping {Count} API Workers...", ApiProviderWorkers.Length);
            StoppedAt = DateTime.UtcNow;
            DisposeWorkers(ApiProviderWorkers);
            ApiProviders = [];
            ApiProviderWorkers = [];
        }
    }

    private void StopComfyWorkers()
    {
        lock (comfyLock)
        {
            log.LogInformation("Stopping {Count} Comfy Workers...", ComfyProviderWorkers.Length);
            StoppedAt = DateTime.UtcNow;
            DisposeWorkers(ComfyProviderWorkers);
            ComfyApiProviders = [];
            ComfyProviderWorkers = [];
        }
    }

    private void DisposeWorkers<T>(T[] workers) where T : IDisposable
    {
        foreach (var worker in workers)
        {
            worker.Dispose();
        }
    }
    
    public string CreateRequestId() => Guid.NewGuid().ToString("N");
}