using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface.Generation;

public class ReplicateAiProvider(IHttpClientFactory httpClientFactory, ILoggerFactory loggerFactory) 
    : IAiProvider
{
    private readonly Dictionary<string, ReplicateClient> _clients = new();
    private readonly object _lockObj = new();
    
    public Task<bool> IsOnlineAsync(MediaProvider provider, CancellationToken token = default)
    {
        return Task.FromResult(true);
    }

    public async Task<(GenerationResult, TimeSpan)> RunAsync(MediaProvider provider, GenerationArgs request, CancellationToken token = default)
    {
        var client = GetClient(provider);
        var start = DateTime.UtcNow;
        // Check model is valid
        if (string.IsNullOrEmpty(request.Model))
            throw new Exception("Model is required");
        if(provider.Models == null)
            throw new Exception("Provider Models not found");
        if (provider.Models.All(x => x != request.Model))
            throw new Exception("Model not found");
        var result = await client.GenerateImage(request);
        return (result, DateTime.UtcNow - start);
    }

    public async Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, AiProviderFileOutput output,
        CancellationToken token = default)
    {
        var client = GetClient(provider);
        return await client.DownloadOutputAsync(provider, output, token);
    }

    public List<AiTaskType> SupportedAiTasks => [AiTaskType.TextToImage];
    public AiServiceProvider ProviderType => AiServiceProvider.Replicate;

    private ReplicateClient GetClient(MediaProvider provider)
    {
        lock (_lockObj)
        {
            if (!_clients.ContainsKey(provider.Name))
            {
                var httpClient = httpClientFactory.CreateClient($"ReplicateClient");
                var replicateClient = new ReplicateClient(
                    httpClient, (string.IsNullOrEmpty(provider.ApiKey) ? AppConfig.Instance.ReplicateApiKey : provider.ApiKey),
                    loggerFactory.CreateLogger<ReplicateClient>());
                _clients.Add(provider.Name, replicateClient);
            }
            return _clients[provider.Name];
        }
    }
}
