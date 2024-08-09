using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface.Diffusion;

using System.Net.Http.Json;
using System.Text.Json;


public class ReplicateClient
{
    private readonly HttpClient httpClient;
    private readonly string apiKey;
    private readonly ILogger<ReplicateClient>? logger;
    private const string BaseUrl = "https://api.replicate.com/";

    public ReplicateClient(HttpClient httpClient, string? apiKey, ILogger<ReplicateClient>? logger = null)
    {
        this.httpClient = httpClient;
        this.apiKey = apiKey;
        this.logger = logger;
        this.httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {this.apiKey}");
    }

    public async Task<DiffusionGenerationResponse> GenerateImage(DiffusionImageGeneration request)
    {
        var req = new
        {
            input = new
            {
                prompt = request.PositivePrompt,
                output_quality = 80
            }
        };

        // TODO: Map request.Model to prediction endpoints for Schnell and Dev.
        
        // Replicate doesn't have a batch mode, so create N tasks
        var allTasks = new List<Task<HttpResponseMessage>>();
        for (var i = 0; i < request.Images; i++)
        {
            allTasks.Add(httpClient.PostAsJsonAsync(BaseUrl.CombineWith("v1/models/black-forest-labs/flux-schnell/predictions"), req));
        }
        
        await Task.WhenAll(allTasks);
        
        // Extract and validate each task response
        var allResponses = new List<HttpResponseMessage>();
        foreach (var task in allTasks)
        {
            var response = task.Result;
            response.EnsureSuccessStatusCode();
            allResponses.Add(response);
        }
        
        var allContents = await Task.WhenAll(allResponses.Select(x => x.Content.ReadAsStringAsync()));
        var allPredictions = allContents.Select(x => x.FromJson<PredictionResponse>()).ToList();
        
        if (allPredictions.Any(x => x?.Urls?.Get == null))
        {
            throw new InvalidOperationException("Failed to start prediction");
        }
        
        var allResults = await Task.WhenAll(allPredictions.Select(x => PollForResultAsync(x.Urls.Get)));
        // Failures for single requests ignored, at least some can be returned.
        var allOutputs = allResults.Select(x => x).Where(x => x.Status == "succeeded").ToList();
        
        return new DiffusionGenerationResponse
        {
            Outputs = allOutputs.Select(x => x).Select(x => new DiffusionApiProviderOutput
            {
                FileName = $"{x.Id}-{x.Output[0].SplitOnLast("/").Last()}",
                Url = x.Output[0]
            }).ToList()
        };
    }
    
    public async Task<Stream> DownloadOutputAsync(DiffusionApiProvider provider, DiffusionApiProviderOutput output,
        CancellationToken token = default)
    {
        var response = await httpClient.GetAsync(output.Url, token);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStreamAsync(token);
    }

    private async Task<PredictionResponse> PollForResultAsync(string predictionUrl)
    {
        var timeout = DateTime.UtcNow.AddSeconds(30);
        while (DateTime.UtcNow < timeout)
        {
            var response = await httpClient.GetAsync(predictionUrl);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var prediction = content.FromJson<PredictionResponse>();

            if (prediction?.Status == "succeeded")
            {
                return prediction;
            }

            if (prediction?.Status == "failed")
            {
                logger?.LogError($"Prediction failed: {prediction.ToJson()}");
                return prediction;
            }

            await Task.Delay(2000);
        }

        throw new TimeoutException($"Replicate Prediction timed out - {predictionUrl}");
    }
}

public class PredictionResponse
{
    public string Id { get; set; }
    public string Status { get; set; }
    public Urls Urls { get; set; }
    public string[] Output { get; set; }
}

public class Urls
{
    public string Get { get; set; }
}