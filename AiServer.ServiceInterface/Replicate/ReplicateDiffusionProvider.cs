using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface.Replicate;

public class ReplicateDiffusionProvider(ReplicateClient client): IDiffusionProvider
{
    public Task<bool> IsOnlineAsync(DiffusionApiProvider provider, CancellationToken token = default)
    {
        return Task.FromResult(true);
    }

    public async Task<(DiffusionGenerationResponse, TimeSpan)> QueueAsync(DiffusionApiProvider provider, DiffusionImageGeneration request, CancellationToken token = default)
    {
        var start = DateTime.UtcNow;
        var result = await client.GenerateImage(request);
        return (result, DateTime.UtcNow - start);
    }
}