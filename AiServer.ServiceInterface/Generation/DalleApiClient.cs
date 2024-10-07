using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Serialization;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface.Generation;

using System.Net.Http.Json;

public class DalleClient
{
    private readonly HttpClient httpClient;
    private readonly string apiKey;
    private readonly ILogger<DalleClient>? logger;
    private readonly HttpClient publicHttpClient = new();
    private const string BaseUrl = "https://api.openai.com/v1/";

    public DalleClient(HttpClient httpClient, string apiKey, ILogger<DalleClient>? logger = null)
    {
        this.httpClient = httpClient;
        this.apiKey = apiKey;
        this.logger = logger;
        this.httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {this.apiKey}");
    }

    public async Task<DalleGenerationResponse> GenerateImage(DalleImageGeneration request)
    {
        var req = new
        {
            model = request.Model ?? "dall-e-3",
            prompt = request.PositivePrompt,
            n = 1,
            size = $"{request.Width}x{request.Height}"
        };
        
        var allTasks = new List<Task<HttpResponseMessage>>();
        for (var i = 0; i < request.BatchSize; i++)
        {
            allTasks.Add(httpClient.PostAsJsonAsync(BaseUrl.CombineWith("images/generations"), req));
        }
        
        await Task.WhenAll(allTasks);
        
        // Extract and validate each task response
        var allOkResponses = new List<HttpResponseMessage>();
        var allErrorResponses = new List<HttpResponseMessage>();
        foreach (var task in allTasks)
        {
            var response = task.Result;
            if(response.IsSuccessStatusCode)
                allOkResponses.Add(response);
            else
            {
                logger?.LogWarning("Failed to start prediction: " + response.StatusCode);
                allErrorResponses.Add(response);
            }
        }
        
        var allOkContents = await Task.WhenAll(allOkResponses.Select(x => x.Content.ReadAsStringAsync()));
        var allErrorContents = await Task.WhenAll(allErrorResponses.Select(x => x.Content.ReadAsStringAsync()));
        var allPredictions = allOkContents.Select(x => x.FromJson<DalleApiResponse>()).ToList();

        if (allPredictions.Count == 0)
        {
            logger?.LogWarning("Failed to generate any images");
            foreach (var errorContent in allErrorContents)
            {
                // Log for each
                logger?.LogWarning("Failed to generate image details: " + errorContent);
            }
            throw new Exception("Failed to generate any images");
        }
        
        return new DalleGenerationResponse
        {
            Outputs = allPredictions.SelectMany(x => x.Data).Select(x => new AiProviderFileOutput
            {
                Url = x.Url,
                FileName = $"dalle-3-{Guid.NewGuid()}.png"
            }).ToList()
        };
    }

    public async Task<HttpResponseMessage> DownloadOutputAsync(AiProviderFileOutput output, CancellationToken token = default)
    {
        // Downloading an image from the reponse URL from Dalle can't accept auth headers but image is public...
        // use alternate httpclient
        var response = await publicHttpClient.GetAsync(output.Url, token);
        return response;
    }
}

public class DalleImageGeneration
{
    public string PositivePrompt { get; set; }
    public int BatchSize { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    
    public string? Model { get; set; }
}

public class DalleGenerationResponse
{
    public List<AiProviderFileOutput> Outputs { get; set; }
}

[DataContract]
public class DalleApiResponse
{
    [DataMember(Name = "data")]
    public List<DalleImage> Data { get; set; }
}

[DataContract]
public class DalleImage
{
    [DataMember(Name = "url")]
    public string Url { get; set; }
}