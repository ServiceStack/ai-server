using System.Data;
using AiServer.ServiceInterface.Comfy;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface;

public class AppData(ILogger<AppData> log, 
    AiProviderFactory aiFactory, 
    ComfyProviderFactory comfyFactory, 
    IMessageService mqServer)
{
    public static AppData Instance { get; set; }

    // OpenAI/standard-specific properties
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

    public ApiProvider AssertApiProvider(string name) => ApiProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"API Provider {name} not found");

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
            DelegateComfyTasks = new()
        });
    }

    private void StartApiWorkers(ApiProvider[] apiProviders)
    {
        log.LogInformation("Starting {Count} API Workers...", apiProviders.Length);
        StoppedAt = null;
        ApiProviders = apiProviders;
        LogWorkerInfo(apiProviders, "API");
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

    private void LogWorkerInfo(ApiProvider[] apiProviders, string workerType)
    {
        foreach (var worker in apiProviders.Where(x => x.Enabled))
        {
            log.LogInformation(
                """

                [{Type}] [{Name}] is {Enabled}, currently {Online} at concurrency {Concurrency}, accepting models:
                
                    {Models}
                    
                """,
                workerType,
                worker.Name,
                worker.Enabled ? "Enabled" : "Disabled",
                worker.OfflineDate != null ? "Offline" : "Online",
                worker.Concurrency, 
                string.Join("\n    ", worker.Models.Select(x => x.Model)));
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
        log.LogInformation("Stopping {Count} API Workers...", ApiProviders.Length);
        StoppedAt = DateTime.UtcNow;
        ApiProviders = [];
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
    
    public IOpenAiProvider GetOpenAiProvider(ApiProvider apiProvider) => 
        aiFactory.GetOpenAiProvider(apiProvider.ApiType?.OpenAiProvider);
}
