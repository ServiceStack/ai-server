using ServiceStack;

namespace AiServer.ServiceInterface.Replicate;

using System.Net.Http.Json;
using System.Text.Json;

public interface IReplicateClient
{
    Task<string> GenerateFluxImageAsync(string prompt, int outputQuality);
}

public class ReplicateClient : IReplicateClient
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

    public async Task<string> GenerateFluxImageAsync(string prompt, int outputQuality)
    {
        var request = new
        {
            input = new
            {
                prompt = prompt,
                output_quality = outputQuality
            }
        };

        var response = await _httpClient.PostAsJsonAsync(BaseUrl.CombineWith("v1/models/black-forest-labs/flux-schnell/predictions"), request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var prediction = JsonSerializer.Deserialize<PredictionResponse>(content);

        if (prediction?.Urls?.Get == null)
        {
            throw new InvalidOperationException("Failed to start prediction");
        }

        return await PollForResultAsync(prediction.Urls.Get);
    }

    private async Task<string> PollForResultAsync(string predictionUrl)
    {
        while (true)
        {
            var response = await _httpClient.GetAsync(predictionUrl);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var prediction = JsonSerializer.Deserialize<PredictionResponse>(content);

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