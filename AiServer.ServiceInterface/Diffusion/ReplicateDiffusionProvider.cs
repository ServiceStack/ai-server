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

    public async Task<Stream> DownloadOutputAsync(DiffusionApiProvider provider, DiffusionApiProviderOutput output,
        CancellationToken token = default)
    {
        var client = GetClient(provider);
        return await client.DownloadOutputAsync(provider, output, token);
    }

    private ReplicateClient GetClient(DiffusionApiProvider provider)
    {
        lock (_lockObj)
        {
            if (!_clients.ContainsKey(provider.Name))
            {
                var httpClient = httpClientFactory.CreateClient($"ReplicateClient");
                var replicateClient = new ReplicateClient(httpClient, (string.IsNullOrEmpty(provider.ApiKey) ? AppConfig.Instance.ReplicateApiKey : provider.ApiKey));
                _clients.Add(provider.Name, replicateClient);
            }
            return _clients[provider.Name];
        }
    }
}
