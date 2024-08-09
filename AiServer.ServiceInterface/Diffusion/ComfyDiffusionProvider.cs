using System.Data;
using System.Net;
using System.Net.Http.Headers;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.Diffusion;

public interface IDiffusionProvider
{
    Task<bool> IsOnlineAsync(DiffusionApiProvider provider, CancellationToken token = default);

    Task<(DiffusionGenerationResponse,TimeSpan)> QueueAsync(DiffusionApiProvider provider, DiffusionImageGeneration request, CancellationToken token = default);

    Task<Stream> DownloadOutputAsync(DiffusionApiProvider provider, DiffusionApiProviderOutput output,
        CancellationToken token = default);
}

public class ComfyDiffusionProvider(IDbConnection db) : IDiffusionProvider
{
    private Dictionary<string,ComfyClient> ComfyClients { get; } = new();
    private object lockObj = new();
    public async Task<bool> IsOnlineAsync(DiffusionApiProvider provider, CancellationToken token = default)
    {
        // Check if the client is healthy
        try
        {
            var client = GetClient(provider);
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

    private ComfyClient GetClient(DiffusionApiProvider provider)
    {
        lock (lockObj)
        {
            if (!ComfyClients.ContainsKey(provider.Name))
            {
                var comfyClient = new ComfyClient(provider.ApiBaseUrl, provider.ApiKey);
                ComfyClients.Add(provider.Name, comfyClient);
            }
            return ComfyClients[provider.Name];
        }
    }

    public async Task<(DiffusionGenerationResponse, TimeSpan)> QueueAsync(DiffusionApiProvider provider, DiffusionImageGeneration request, CancellationToken token = default)
    {
        var model = await db.SingleAsync<ComfyApiModel>(x => x.Filename == request.Model);
        if (model == null)
        {
            throw new Exception("Model not found.");
        }

        db.LoadReferences(model);
        var modelSettings = model.ModelSettings;
        if (modelSettings == null)
        {
            throw new Exception("Model settings not found.");
        }
        
        var comfyClient = GetClient(provider);
        var start = DateTime.UtcNow;
        // Last check for null seed
        request.Seed ??= Random.Shared.Next();
        var req = new ComfyWorkflowRequest
        {
            TaskType = ComfyTaskType.TextToImage,
            Seed = (int)request.Seed,
            Model = request.Model,
            Height = request.Height is 0 ? modelSettings.Height ?? 1024 : 1024,
            Width = request.Width is 0 ? modelSettings.Width ?? 1024 : 1024,
            PositivePrompt = request.PositivePrompt,
            NegativePrompt = request.NegativePrompt ?? (modelSettings.NegativePrompt ?? "(nsfw),(nude),(explicit),(gore),(violence),(blood)"),
            Denoise = 1,
            CfgScale = modelSettings.CfgScale ?? 1,
            Steps = request.Steps is 0 ? modelSettings.Steps ?? 12 : 12,
            Sampler = modelSettings.Sampler ?? ComfySampler.euler_ancestral,
            BatchSize = request.Images is 0 ? 1 : request.Images,
            Scheduler = modelSettings.Scheduler ?? "normal"
        };
        var response = await comfyClient.PromptGeneration(req,waitResult:true);
        var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId);
        var duration = DateTime.UtcNow - start;
        var diffResponse = new DiffusionGenerationResponse()
        {
            Outputs = status.Outputs.SelectMany(x => x.Files)
                .Select(x => 
                    new DiffusionApiProviderOutput
                    {
                        FileName = x.Filename,
                        Url = $"{provider.ApiBaseUrl}/view?filename={x.Filename}&type={x.Type}&subfolder={x.Subfolder}"
                    }
                ).ToList()
        };
        return (diffResponse,duration);
    }
    
    public async Task<Stream> DownloadOutputAsync(DiffusionApiProvider provider, DiffusionApiProviderOutput output, CancellationToken token = default)
    {
        var client = GetClient(provider);
        return await client.DownloadComfyOutputRawAsync(output.Url);
    }
}

public class DiffusionApiProviderFactory(ReplicateDiffusionProvider replicateDiffusionProvider, ComfyDiffusionProvider comfyDiffusionProvider)
{
    public IDiffusionProvider GetProvider(string? type = null)
    {
        switch (type)
        {
            case "replicate":
                return replicateDiffusionProvider;
            case "comfy":
                return comfyDiffusionProvider;
            default:
                return replicateDiffusionProvider;
        }
    }
}