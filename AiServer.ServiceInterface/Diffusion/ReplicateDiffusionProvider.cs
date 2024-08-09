using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface.Diffusion;

public class ReplicateDiffusionProvider(IHttpClientFactory httpClientFactory) : IDiffusionProvider
{
    private readonly Dictionary<string, ReplicateClient> _clients = new();
    private readonly object _lockObj = new();
    
    public Task<bool> IsOnlineAsync(DiffusionApiProvider provider, CancellationToken token = default)
    {
        return Task.FromResult(true);
    }

    public async Task<(DiffusionGenerationResponse, TimeSpan)> QueueAsync(DiffusionApiProvider provider, DiffusionImageGeneration request, CancellationToken token = default)
    {
        var client = GetClient(provider);
        var start = DateTime.UtcNow;
        var result = await client.GenerateImage(request);
        return (result, DateTime.UtcNow - start);
    }
    
    private ReplicateClient GetClient(DiffusionApiProvider provider)
    {
        lock (_lockObj)
        {
            if (!_clients.ContainsKey(provider.Name))
            {
                var httpClient = httpClientFactory.CreateClient($"ReplicateClient");
                var replicateClient = new ReplicateClient(httpClient, provider.ApiKey);
                _clients.Add(provider.Name, replicateClient);
            }
            return _clients[provider.Name];
        }
    }
}
