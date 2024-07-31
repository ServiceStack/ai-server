using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using NUnit.Framework;
using ServiceStack;

namespace AiServer.Tests;

[Explicit]
public class ComfyAdminTasks
{
    private static bool useLocal = false;
    
    private static List<CreateComfyApiProvider> ComfyApiProviders = new()
    {
        new CreateComfyApiProvider
        {
            Name = "comfy-dell.pvq.app",
            ApiBaseUrl = useLocal ? "http://localhost:7860/api" : "https://comfy-dell.pvq.app/api",
            Concurrency = 1,
            HeartbeatUrl = "/",
            TaskWorkflows = new Dictionary<ComfyTaskType, string>
            {
                { ComfyTaskType.TextToImage, "text_to_image.json" },
                { ComfyTaskType.ImageToImage, "image_to_image.json" },
                { ComfyTaskType.ImageToImageUpscale, "image_to_image_upscale.json" },
                { ComfyTaskType.ImageToImageWithMask, "image_to_image_with_mask.json" },
                { ComfyTaskType.TextToAudio, "text_to_audio.json" },
                { ComfyTaskType.TextToSpeech, "text_to_speech.json" },
                { ComfyTaskType.SpeechToText, "speech_to_text.json" }
            },
            Enabled = true,
            Priority = 1,
            ApiKey = "testtest1234"
        },
        // new CreateComfyApiProvider
        // {
        //     Name = "comfy-supermicro.pvq.app",
        //     ApiBaseUrl = "https://comfy-supermicro.pvq.app/api",
        //     Concurrency = 1,
        //     HeartbeatUrl = "/",
        //     TaskWorkflows = new Dictionary<ComfyTaskType, string>
        //     {
        //         { ComfyTaskType.TextToImage, "text_to_image.json" },
        //         { ComfyTaskType.ImageToImage, "image_to_image.json" },
        //         { ComfyTaskType.ImageToImageUpscale, "image_to_image_upscale.json" },
        //         { ComfyTaskType.ImageToImageWithMask, "image_to_image_with_mask.json" },
        //         { ComfyTaskType.TextToAudio, "text_to_audio.json" },
        //         { ComfyTaskType.TextToSpeech, "text_to_speech.json" },
        //         { ComfyTaskType.SpeechToText, "speech_to_text.json" }
        //     },
        //     Enabled = true,
        //     Priority = 1
        // }
    };
    
    private static List<string> ImportCivitAiModelUrls = new()
    {
        "https://civitai.com/models/194768/jib-mix-realistic-xl?modelVersionId=610292",
        "https://civitai.com/models/553410/crazycaricaturesxl?modelVersionId=615871",
        "https://civitai.com/models/129403?modelVersionId=259194",
        "https://civitai.com/models/283312/psyfi-xl-lcm"
    };

    public static Dictionary<string, ComfyApiModelSettings> ImportCivitAiModelSettings = new()
    {
        {
            "https://civitai.com/models/194768/jib-mix-realistic-xl?modelVersionId=610292",
            new ComfyApiModelSettings
            {
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.dpmpp_2m_sde,
                Scheduler = "karras",
                CfgScale = 6.0,
                Steps = 30
            }
        },
        {
            "https://civitai.com/models/553410/crazycaricaturesxl?modelVersionId=615871",
            new ComfyApiModelSettings
            {
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.euler_ancestral,
                Scheduler = "normal",
                CfgScale = 8.0,
                Steps = 30
            }
        },
        {
            "https://civitai.com/models/129403?modelVersionId=259194",
            new ComfyApiModelSettings
            {
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.euler_ancestral,
                Scheduler = "normal",
                CfgScale = 3.0,
                Steps = 12
            }
        },
        {
            "https://civitai.com/models/283312/psyfi-xl-lcm",
            new ComfyApiModelSettings
            {
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.lcm,
                Scheduler = "normal",
                CfgScale = 1.0,
                Steps = 7
            }
        }
    };
    
    private JsonApiClient IgnoreSslValidation(JsonApiClient client)
    {
        // Ignore local SSL Errors
        var handler = HttpUtils.HttpClientHandlerFactory();
        handler.ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) => true;
        var httpClient = new HttpClient(handler, disposeHandler:client.HttpMessageHandler == null) {
            BaseAddress = new Uri(client.BaseUri),
        };
        client = new JsonApiClient(httpClient);
        return client;
    }
    
    [Test]
    public async Task ConfigureComfyProviders()
    {
        var client = TestUtils.CreateAdminClient();
        client = IgnoreSslValidation(client);
        //var client = TestUtils.CreatePublicAdminClient();
        // Create providers
        foreach (var provider in ComfyApiProviders)
        {
            var query = new QueryComfyApiProviders
            {
                Name = provider.Name
            };
            var existing = await client.ApiAsync(query);
            if (existing.Response.Results.Count > 0)
            {
                Console.WriteLine($"Provider {provider.Name} already exists");
                continue;
            }
            var response = await client.ApiAsync(provider);
            response.ThrowIfError();
        }
        
        var providerNames = ComfyApiProviders.Select(x => x.Name).ToList();
        
        // Import CivitAi models
        foreach (var modelImport in ImportCivitAiModelSettings)
        {
            foreach (var providerName in providerNames)
            {
                var response = await client.ApiAsync(
                    new ImportCivitAiModel
                    {
                        ModelUrl = modelImport.Key, 
                        Provider = providerName,
                        Settings = modelImport.Value
                    });
                response.ThrowIfError();
            }
        }
        
    }
}