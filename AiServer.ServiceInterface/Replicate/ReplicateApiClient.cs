using AiServer.ServiceModel;
using ServiceStack;

namespace AiServer.ServiceInterface.Replicate;

using System.Net.Http.Json;
using System.Text.Json;

public interface IDiffusionClient
{
    Task<DiffusionGenerationResponse> GenerateImage(DiffusionImageGeneration request);
}

public class ReplicateClient : IDiffusionClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private const string BaseUrl = "https://api.replicate.com/";

    public ReplicateClient(HttpClient httpClient, string apiKey)
    {
        _httpClient = httpClient;
        _apiKey = apiKey;
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
    }

    public async Task<DiffusionGenerationResponse> GenerateImage(DiffusionImageGeneration request)
    {
        var req = new
        {
            input = new
            {
                prompt = request.Prompt,
                output_quality = 80
            }
        };

        // TODO: Map request.Model to prediction endpoints for Schnell and Dev.
        var response = await _httpClient.PostAsJsonAsync(BaseUrl.CombineWith("v1/models/black-forest-labs/flux-schnell/predictions"), req);
        
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var prediction = content.FromJson<PredictionResponse>();

        if (prediction?.Urls?.Get == null)
        {
            throw new InvalidOperationException("Failed to start prediction");
        }

        var res = await PollForResultAsync(prediction.Urls.Get);
        var outputs = res.FromJson<List<string>>();
        return new DiffusionGenerationResponse
        {
            Outputs = outputs.Select(x => new DiffusionApiProviderOutput
            {
                FileName = x,
                Url = x
            }).ToList()
        };
    }

    private async Task<string> PollForResultAsync(string predictionUrl)
    {
        var timeout = DateTime.UtcNow.AddSeconds(30);
        while (DateTime.UtcNow < timeout)
        {
            var response = await _httpClient.GetAsync(predictionUrl);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var prediction = content.FromJson<PredictionResponse>();

            if (prediction?.Status == "succeeded")
            {
                return string.Join("", prediction.Output ?? Array.Empty<string>());
            }

            if (prediction?.Status == "failed")
            {
                throw new Exception("Prediction failed");
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