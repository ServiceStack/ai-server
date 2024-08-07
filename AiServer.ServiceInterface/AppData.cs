using System.Data;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceInterface.Replicate;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface;

public class AppData(ILogger<AppData> log, 
    ILoggerFactory loggerFactory,
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
    public ComfyApiProvider[] ComfyApiProviders { get; set; } = [];
    
    public DiffusionApiProvider[] DiffusionApiProviders { get; set; } = [];

    // Shared properties
    private CancellationTokenSource? cts;
    public CancellationToken Token => cts?.Token ?? CancellationToken.None;
    public DateTime? StoppedAt { get; private set; }
    public bool IsStopped => StoppedAt != null;

    public ApiProvider AssertApiProvider(string name) => ApiProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"API Provider {name} not found");
    
    public ComfyApiProvider AssertComfyProvider(string name) => ComfyApiProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"Comfy Provider {name} not found");
    
    public DiffusionApiProvider AssertDiffusionProvider(string name) => DiffusionApiProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"Diffusion Provider {name} not found");

    // Comfy-specific methods
    public void SetInitialComfyTaskId(long initialValue) => Interlocked.Exchange(ref nextComfyTaskId, initialValue);
    public long LastComfyTaskId => Interlocked.Read(ref nextComfyTaskId);
    

    public long GetNextComfyTaskId() => Interlocked.Increment(ref nextComfyTaskId);
    
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
            comfyClients = comfyProviders
                .ToDictionary(x => x.Name, GetComfyClient);
        }
        LogWorkerInfo(comfyProviders, "Comfy");
    }
    
    private Dictionary<string, IComfyClient?> comfyClients = new();

    public IComfyClient? GetComfyClient(ComfyApiProvider provider)
    {
        comfyClients.TryGetValue(provider.Name, out var client);
        return client;
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
    
    private void LogWorkerInfo(ComfyApiProvider[] providers, string workerType)
    {
        foreach (var provider in providers)
        {
            log.LogInformation(
                """

                [{Type}] [{Name}] is {Enabled}, currently {Online} at concurrency {Concurrency}, accepting models:
                
                    {Models}
                    
                """,
                workerType,
                provider.Name,
                provider.Enabled ? "Enabled" : "Disabled",
                provider.OfflineDate != null ? "Offline" : "Online",
                provider.Concurrency, 
                string.Join("\n    ", provider.Models?.Select(x => x.ComfyApiModel?.Name) ?? ["No Models"]));
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
            log.LogInformation("Stopping {Count} Comfy Workers...", ComfyApiProviders.Length);
            StoppedAt = DateTime.UtcNow;
            DisposeWorkers(comfyClients.Values.ToArray());
            ComfyApiProviders = [];
        }
    }

    private void DisposeWorkers<T>(T?[] workers) where T : IDisposable
    {
        foreach (var worker in workers)
        {
            worker?.Dispose();
        }
    }
    
    public string CreateRequestId() => Guid.NewGuid().ToString("N");
    
    public IOpenAiProvider GetOpenAiProvider(ApiProvider apiProvider) => 
        aiFactory.GetOpenAiProvider(apiProvider.ApiType?.OpenAiProvider);
    
    public IComfyProvider GetComfyProvider(ComfyApiProvider apiProvider) =>
        comfyFactory.GetComfyProvider();
}
