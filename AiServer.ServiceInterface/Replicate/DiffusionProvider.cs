using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceInterface.Replicate;

public interface IDiffusionProvider
{
    Task<bool> IsOnlineAsync(DiffusionApiProvider provider, CancellationToken token = default);

    Task<(DiffusionGenerationResponse,TimeSpan)> QueueAsync(DiffusionApiProvider provider, DiffusionImageGeneration request, CancellationToken token = default);
    
    IReplicateClient GetClient(DiffusionApiProvider provider);
}

public class DiffusionProvider : IDiffusionProvider
{
    public Task<bool> IsOnlineAsync(DiffusionApiProvider provider, CancellationToken token = default)
    {
        throw new NotImplementedException();
    }

    public Task<(DiffusionGenerationResponse, TimeSpan)> QueueAsync(DiffusionApiProvider provider, DiffusionImageGeneration request, CancellationToken token = default)
    {
        throw new NotImplementedException();
    }
    
    public IReplicateClient GetClient(DiffusionApiProvider provider)
    {
        throw new NotImplementedException();
    }
}

public class DiffusionApiProviderFactory(DiffusionProvider diffusionProvider)
{
    public IDiffusionProvider GetProvider(string? type = null)
    {
        return diffusionProvider;
    }
}