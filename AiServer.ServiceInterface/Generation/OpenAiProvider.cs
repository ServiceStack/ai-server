using System.Collections.Concurrent;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface.Generation;

using System.Net.Http;

public class OpenAiMediaProvider(
    IHttpClientFactory httpClientFactory,
    ILoggerFactory loggerFactory,
    AppConfig appConfig,
    ILogger<OpenAiMediaProvider> log)
    : IAiProvider
{
    private readonly ConcurrentDictionary<string, HttpResponseMessage> concurrentDictionary = new();
    private readonly Dictionary<string, DalleClient> dalleClients = new();
    private readonly object lockObj = new();

    public Task<bool> IsOnlineAsync(MediaProvider provider, CancellationToken token = default)
    {
        return Task.FromResult(true);
    }

    public async Task<(GenerationResult, TimeSpan)> RunAsync(MediaProvider provider, GenerationArgs request, CancellationToken token = default)
    {
        return request.TaskType switch
        {
            AiTaskType.TextToSpeech => await HandleTextToSpeechAsync(provider, request, token),
            AiTaskType.SpeechToText => await HandleSpeechToTextAsync(provider, request, token),
            AiTaskType.TextToImage => await HandleTextToImageAsync(provider, request, token),
            _ => throw new NotSupportedException($"Task type {request.TaskType} is not supported.")
        };
    }

    public async Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, AiProviderFileOutput output, CancellationToken token = default)
    {
        if (concurrentDictionary.TryGetValue(output.Url, out var response))
        {
            return response;
        }

        if (output.Url.StartsWith("http"))
        {
            var dalleClient = GetDalleClient(provider);
            return await dalleClient.DownloadOutputAsync(output, token);
        }

        throw new Exception("Output file not found");
    }

    public List<AiTaskType> SupportedAiTasks => [AiTaskType.TextToSpeech, AiTaskType.SpeechToText, AiTaskType.TextToImage];
    public AiServiceProvider ProviderType => AiServiceProvider.OpenAi;

    private async Task<(GenerationResult, TimeSpan)> HandleTextToSpeechAsync(MediaProvider provider, GenerationArgs request, CancellationToken token)
    {
        if (!string.IsNullOrEmpty(request.Model))
        {
            // Split on `:` to get the model and voice
            var parts = request.Model.Split(':');
            request.Model = parts[0];
            request.Voice = parts.Length > 1 ? parts[1] : null;
        }
        var req = new
        {
            model = request.Model ?? "tts-1",
            voice = request.Voice ?? "alloy",
            input = request.PositivePrompt
        };

        var client = httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + provider.ApiKey);

        var start = DateTime.UtcNow;
        var response = await client.PostAsJsonAsync(new Uri("https://api.openai.com/v1/audio/speech"), req, token);
        response.EnsureSuccessStatusCode();
        var duration = DateTime.UtcNow - start;

        var audioId = $"/openai/speech/{Guid.NewGuid()}";
        concurrentDictionary.TryAdd(audioId, response);

        return (new GenerationResult
        {
            Outputs = new List<AiProviderFileOutput>
            {
                new()
                {
                    FileName = audioId.Split('/').Last(),
                    Url = audioId
                }
            }
        }, duration);
    }

    private async Task<(GenerationResult, TimeSpan)> HandleSpeechToTextAsync(MediaProvider provider, GenerationArgs request, CancellationToken token)
    {
        var client = httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Add("Authorization", $"Bearer {provider.ApiKey}");

        var multipartContent = new MultipartFormDataContent();

        // Add the audio file
        var fileContent = new StreamContent(request.SpeechInput);
        fileContent.Headers.ContentType = new MediaTypeHeaderValue("audio/wav");
        multipartContent.Add(fileContent, "file", "audio.wav");

        // Add the model parameter
        multipartContent.Add(new StringContent(request.Model ?? "whisper-1"), "model");

        var start = DateTime.UtcNow;
        var response = await client.PostAsync("https://api.openai.com/v1/audio/transcriptions", multipartContent, token);
        response.EnsureSuccessStatusCode();
        var duration = DateTime.UtcNow - start;

        var content = (await response.Content.ReadAsStringAsync()).FromJson<AiProviderTextOutput>();
        return (new GenerationResult
        {
            TextOutputs = [content]
        }, duration);
    }

    private async Task<(GenerationResult, TimeSpan)> HandleTextToImageAsync(MediaProvider provider, GenerationArgs request, CancellationToken token)
    {
        var dalleClient = GetDalleClient(provider);

        var dalleRequest = new DalleImageGeneration
        {
            PositivePrompt = request.PositivePrompt,
            BatchSize = request.BatchSize ?? 1,
            Width = request.Width ?? 1024,
            Height = request.Height ?? 1024,
            Model = request.Model
        };

        var start = DateTime.UtcNow;
        var result = await dalleClient.GenerateImage(dalleRequest);
        var duration = DateTime.UtcNow - start;

        return (new GenerationResult
        {
            Outputs = result.Outputs
        }, duration);
    }

    private DalleClient GetDalleClient(MediaProvider provider)
    {
        lock (lockObj)
        {
            if (!dalleClients.ContainsKey(provider.Name))
            {
                var httpClient = httpClientFactory.CreateClient($"DalleClient");
                var dalleClient = new DalleClient(
                    httpClient,
                    provider.ApiKey,
                    loggerFactory.CreateLogger<DalleClient>()
                );
                dalleClients.Add(provider.Name, dalleClient);
            }
            return dalleClients[provider.Name];
        }
    }
}