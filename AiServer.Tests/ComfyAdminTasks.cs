using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using NUnit.Framework;
using NUnit.Framework.Internal;
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

    public static Dictionary<string, ComfyApiModelSettings> ImportCivitAiModelSettings = new()
    {
        {
            "https://civitai.com/models/194768/jib-mix-realistic-xl?modelVersionId=610292",
            new ComfyApiModelSettings
            {
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.euler_ancestral,
                Scheduler = "karras",
                CfgScale = 6.0,
                Steps = 18
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
                Steps = 18
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
            "https://civitai.com/models/157665/lah-hongchen-or-sdxl-and-sd15",
            new ComfyApiModelSettings
            {
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.euler,
                Scheduler = "normal",
                CfgScale = 1.0,
                Steps = 8
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
    public async Task ClearBadDownloadsFromProviders()
    {
        var client = TestUtils.CreateAdminClient();
        client = IgnoreSslValidation(client);
        //ConfigureSecrets.SetSecrets();
        
        foreach (var provider in ComfyApiProviders)
        {
            var query = new QueryComfyApiProviders
            {
                Name = provider.Name
            };
            var existing = await client.ApiAsync(query);
            if (existing.Response.Results.Count == 0)
            {
                Console.WriteLine($"Provider {provider.Name} does not exist");
                continue;
            }

            var apiProvider = existing.Response.Results[0];
            var providerModels = await client.ApiAsync(new QueryComfyApiProviderModels()
            {
                ComfyApiProviderId = apiProvider.Id
            });
            
            foreach(var model in providerModels.Response.Results)
            {
                // Check model status
                var modelStatus = await client.ApiAsync(new DownloadComfyProviderModel
                {
                    ComfyApiProviderModelId = model.Id
                });
                
                modelStatus.ThrowIfError();
                var dlStatus = modelStatus.Response.DownloadStatus;
                if(dlStatus.Progress == -1 || (dlStatus.Progress > 0 && dlStatus.Progress < 100))
                {
                    Console.WriteLine($"Model {model.Id} is not fully downloaded, clearing");
                    var response = await client.ApiAsync(new DeleteComfyApiProviderModel()
                    {
                        Id = model.ComfyApiModelId
                    });
                    response.ThrowIfError();
                }
            }
        }
    }
    
    [Test]
    public async Task ConfigureComfyProviders()
    {
        var client = TestUtils.CreateAdminClient();
        client = IgnoreSslValidation(client);
        //ConfigureSecrets.SetSecrets();
        // var client = TestUtils.CreatePublicAdminClient();
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
        
        // Restart workers
        var stopWorkers = await client.ApiAsync(new StopWorkers());
        stopWorkers.ThrowIfError();
        var startWorkers = await client.ApiAsync(new StartWorkers());
        startWorkers.ThrowIfError();
        
    }

    private static List<CreateDiffusionApiProvider> DiffusionApiProviders = new List<CreateDiffusionApiProvider>
    {
        new()
        {
            Name = "Replicate",
            Concurrency = 3,
            Enabled = true,
            Priority = 1,
            HeartbeatUrl = "https://api.replicate.com/",
            ApiBaseUrl = "https://api.replicate.com/",
            ApiKey = "",
            Models = new List<string> { "flux1-dev","flux1-schnell" },
            Type = "replicate"
        },
        new()
        {
            Name = "diffusion-dell.pvq.app",
            Concurrency = 1,
            Enabled = true,
            Priority = 1,
            HeartbeatUrl = "/",
            Models = new List<string>
            {
                "jibMixRealisticXL_v130RisenFromAshes.safetensors",
                "animexlXuebimix_v60LCM.safetensors",
                "LahHongchenSDXLSD15_xlLightning.safetensors"
            },
            Type = "comfy"
        }
    };

    [Test]
    public async Task CanConfigureDiffusionProviders()
    {
        ConfigureSecrets.SetSecrets();
        var client = TestUtils.CreateAuthSecretClient();
        client = IgnoreSslValidation(client);
        
        foreach (var provider in DiffusionApiProviders)
        {
            var query = new QueryDiffusionApiProviders
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
    }

    [Test]
    public async Task CanGenerateFluxImageUsingDiffusionProvider()
    {
        ConfigureSecrets.SetSecrets();
        var client = TestUtils.CreateAuthSecretClient();
        client = IgnoreSslValidation(client);

        var diffGen = new CreateDiffusionGeneration
        {
            Provider = "Replicate",
            Request = new DiffusionImageGeneration
            {
                Height = 1024,
                Width = 1024,
                Steps = 4,
                Model = "flux1-schnell",
                Images = 4,
                Prompt = "Ocean sunset",
                Seed = 1234
            }
        };
        
        var response = await client.ApiAsync(diffGen);
        response.ThrowIfError();
    }
}