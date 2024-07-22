using System.Collections.Concurrent;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface.Comfy;


public interface IComfyProvider
{
    Task<bool> IsOnlineAsync(IApiProviderWorker worker, CancellationToken token = default);

    Task<ComfyWorkflowResponse> QueueWorkflow(IApiProviderWorker worker, ComfyWorkflowRequest request, CancellationToken token = default);
}

public class ComfyProvider : IComfyProvider
{
    public Task<bool> IsOnlineAsync(IApiProviderWorker worker, CancellationToken token = default)
    {
        throw new NotImplementedException();
    }

    public Task<ComfyWorkflowResponse> QueueWorkflow(IApiProviderWorker worker, ComfyWorkflowRequest request, CancellationToken token = default)
    {
        throw new NotImplementedException();
    }
}

public class ComfyProviderWorker : IApiProviderWorker
{
    public void Dispose()
    {
        isDisposed = true;
        AppQueue.Dispose();
    }

    public string Name { get; }
    public string? ApiKey { get; }
    public string? HeartbeatUrl { get; }
    
    public int Concurrency => apiProvider.Concurrency;
    
    private BlockingCollection<string> AppQueue { get; } = new();
    
    private bool isDisposed;
    private long received = 0;
    private long completed = 0;
    private long retries = 0;
    private long failed = 0;
    private long running = 0;
    private readonly ComfyApiProvider apiProvider;
    private readonly ComfyProviderFactory aiFactory;
    private readonly CancellationToken token;
    private DateTime lastExecuted = DateTime.UtcNow;
    
    public readonly string[] Models;
    
    public bool IsOffline
    {
        get => apiProvider.OfflineDate != null;
        set => apiProvider.OfflineDate = value ? DateTime.UtcNow : null;
    }

    public ComfyProviderWorker(ComfyApiProvider apiProvider, ComfyProviderFactory aiFactory, CancellationToken token = default)
    {
        this.apiProvider = apiProvider;
        this.aiFactory = aiFactory;
        this.token = token;
        Models = apiProvider.Models.Select(x => x.ComfyApiModel.Filename).ToArray();
    }
    
    public string GetApiEndpointUrlFor(TaskType taskType)
    {
        throw new NotImplementedException();
    }

    public string GetPreferredApiModel()
    {
        throw new NotImplementedException();
    }

    public string GetApiModel(string model)
    {
        throw new NotImplementedException();
    }
    
    public void AddToChatQueue(string requestId)
    {
        AppQueue.Add(requestId, token);
        Interlocked.Increment(ref received);
    }
}

public class ComfyProviderFactory(ComfyProvider comfyProvider)
{
    public IComfyProvider GetOpenAiProvider(string? type = null)
    {
        return comfyProvider;
    }
}
