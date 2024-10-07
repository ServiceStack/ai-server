using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface.Generation;

using System.Net.Http.Json;

public class ReplicateClient
{
    private readonly HttpClient httpClient;
    private readonly string apiKey;
    private readonly ILogger<ReplicateClient>? logger;
    private const string BaseUrl = "https://api.replicate.com/";

    public ReplicateClient(HttpClient httpClient, string apiKey, ILogger<ReplicateClient>? logger = null)
    {
        this.httpClient = httpClient;
        this.apiKey = apiKey;
        this.logger = logger;
        this.httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {this.apiKey}");
    }
    
    static string[] possbleAspectRatios = new string[] {"1:1", "16:9", "21:9", "3:2", "2:3", "4:5", "5:4", "3:4", "4:3", "9:16", "9:21"};

    public async Task<GenerationResult> GenerateImage(GenerationArgs request)
    {
        double interpAspectRatio = (request.Width ?? 1024) / (double)(request.Height ?? 1024);
        
        // Match to closest aspect ratio
        var closestAspectRatio = possbleAspectRatios.OrderBy(s => Math.Abs(interpAspectRatio - s.Split(":").Select(float.Parse).Aggregate((x, y) => x / y))).First();
        
        var req = new
        {
            input = new
            {
                prompt = request.PositivePrompt,
                output_quality = request.Quality is 0 or null ? 80 : request.Quality,
                aspect_ratio = request.AspectRatio is "" or null ? closestAspectRatio is "" or null ? "3:2" : closestAspectRatio : request.AspectRatio,
            }
        };
        
        var model = request.Model;
        // Replicate doesn't have a batch mode, so create N tasks
        var allTasks = new List<Task<HttpResponseMessage>>();
        for (var i = 0; i < request.BatchSize; i++)
        {
            allTasks.Add(httpClient.PostAsJsonAsync(BaseUrl.CombineWith($"v1/models/{model}/predictions"), req));
        }
        
        await Task.WhenAll(allTasks);
        
        // Extract and validate each task response
        var allResponses = new List<HttpResponseMessage>();
        foreach (var task in allTasks)
        {
            var response = task.Result;
            if(response.IsSuccessStatusCode)
                allResponses.Add(response);
            else
                logger?.LogWarning("Failed to start prediction: " + response.StatusCode);
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
        
        return new GenerationResult
        {
            Outputs = allOutputs.Select(x => x).Select(x => new AiProviderFileOutput
            {
                FileName = $"{x.Id}-{x.Output[0].SplitOnLast("/").Last()}",
                Url = x.Output[0]
            }).ToList()
        };
    }
    
    public async Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, AiProviderFileOutput output,
        CancellationToken token = default)
    {
        var response = await httpClient.GetAsync(output.Url, token);
        return response;
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