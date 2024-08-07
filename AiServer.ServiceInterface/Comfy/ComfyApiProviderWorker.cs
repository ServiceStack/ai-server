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


public interface IComfyProvider
{
    Task<bool> IsOnlineAsync(ComfyApiProvider provider, CancellationToken token = default);

    Task<(ComfyWorkflowResponse,TimeSpan)> QueueWorkflow(ComfyApiProvider provider, ComfyWorkflowRequest request, CancellationToken token = default);
    
    IComfyClient GetComfyClient(ComfyApiProvider provider);
}

public class ComfyProvider : IComfyProvider
{
    private Dictionary<string,IComfyClient> ComfyClients { get; } = new();
    private object lockObj = new();
    public async Task<bool> IsOnlineAsync(ComfyApiProvider provider, CancellationToken token = default)
    {
        // Check if the client is healthy
        try
        {
            Action<HttpRequestMessage>? requestFilter = provider.ApiKey != null
                ? req => req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", provider.ApiKey)
                : null;

            var client = GetComfyClient(provider);
            var heartbeatResult = await client.GetClientHealthAsync();
            
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
    
    public IComfyClient GetComfyClient(ComfyApiProvider provider)
    {
        lock (lockObj)
        {
            if (!ComfyClients.ContainsKey(provider.Name))
            {
                var comfyClient = new ComfyClient(provider.ApiBaseUrl, provider.ApiKey);
                ComfyClients.Add(provider.Name, comfyClient);
            }
        }

        return ComfyClients[provider.Name];
    }

    public async Task<(ComfyWorkflowResponse,TimeSpan)> QueueWorkflow(ComfyApiProvider provider, ComfyWorkflowRequest request, CancellationToken token = default)
    {
        var comfyClient = GetComfyClient(provider);
        var start = DateTime.UtcNow;
        // Last check for null seed
        request.Seed ??= Random.Shared.Next();
        var response = await comfyClient.PromptGeneration(request,waitResult:true);
        var duration = DateTime.UtcNow - start;
        return (response,duration);
    }
}

public class ComfyProviderFactory(ComfyProvider comfyProvider)
{
    public IComfyProvider GetComfyProvider(string? type = null)
    {
        return comfyProvider;
    }
}
