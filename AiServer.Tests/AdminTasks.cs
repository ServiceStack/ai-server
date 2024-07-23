using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using AiServer.ServiceModel.Types;

namespace AiServer.Tests;

[Explicit]
public class ComfyApiProviderTests
{
    private static bool useLocal = true;
    
    private static List<CreateComfyApiProvider> ComfyApiProviders = new()
    {
        new CreateComfyApiProvider
        {
            Name = "comfy-dell.pvq.app",
            ApiBaseUrl = useLocal ? "https://localhost:7860/api" : "https://comfy-dell.pvq.app/api",
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
            ApiKey = "testtest1234",
            Models = new List<ComfyApiProviderModel>()
        }
    };
    
    private static List<CreateComfyApiModel> ComfyApiModels = new()
    {
        new CreateComfyApiModel
        {
            Name = "SDXL Lightning 4-Step",
            Filename = "sdxl_lightning_4step.safetensors",
            DownloadUrl = "https://huggingface.co/ByteDance/SDXL-Lightning/resolve/main/sdxl_lightning_4step.safetensors?download=true",
            Url = "https://huggingface.co/ByteDance/SDXL-Lightning",
            ModelSettings = new ComfyApiModelSettings
            {
                Width = 1024,
                Height = 1024,
                Sampler = ComfySampler.euler,
                Scheduler = "sgm_uniform",
                Steps = 4,
                CfgScale = 1.0
            }
        }
    };
    
    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        // Delete all existing ComfyApiProviders and ComfyApiModels
        var client = TestUtils.CreateAuthSecretClient();
        try
        {
            DeleteComfyApiModels(client).Wait();
            DeleteComfyApiProviders(client).Wait();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    [Test]
    public async Task Create_Local_ComfyApiProviders_and_Models()
    {
        Environment.SetEnvironmentVariable("AUTH_SECRET","p@55wOrd");
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        await CreateComfyApiModels(client);
        // Update provider to use model
    }
    
    private async Task DeleteComfyApiModels(JsonApiClient client)
    {
        foreach (var createComfyApiModel in ComfyApiModels)
        {
            var apiQuery = await client.ApiAsync(new QueryComfyApiModels
            {
                Name = createComfyApiModel.Name,
            });
            apiQuery.ThrowIfError();
            var existingModel = apiQuery.Response!.Results.FirstOrDefault();
            if (existingModel != null)
            {
                var api = await client.ApiAsync(new DeleteComfyApiModel
                {
                    Id = existingModel.Id,
                });
                api.ThrowIfError();
            }
        }
    }

    private async Task DeleteComfyApiProviders(JsonApiClient client)
    {
        foreach (var createComfyApiProvider in ComfyApiProviders)
        {
            var apiQuery = await client.ApiAsync(new QueryComfyApiProviders
            {
                Name = createComfyApiProvider.Name,
            });
            apiQuery.ThrowIfError();
            var existingProvider = apiQuery.Response!.Results.FirstOrDefault();
            if (existingProvider != null)
            {
                var api = await client.ApiAsync(new DeleteComfyApiProvider
                {
                    Id = existingProvider.Id,
                });
                api.ThrowIfError();
            }
        }
    }

    // [Test]
    // public async Task Create_Remote_ComfyApiProviders_and_Models()
    // {
    //     var client = TestUtils.CreatePublicAuthSecretClient();
    //     await CreateComfyApiProviders(client);
    //     await CreateComfyApiModels(client);
    // }

    private static async Task CreateComfyApiProviders(JsonApiClient client)
    {
        foreach (var createComfyApiProvider in ComfyApiProviders)
        {
            var api = await client.ApiAsync(createComfyApiProvider);
            api.ThrowIfError();
        }
    }

    private static async Task CreateComfyApiModels(JsonApiClient client)
    {
        
        foreach (var createComfyApiModel in ComfyApiModels)
        {
            var api = await client.ApiAsync(createComfyApiModel);
            api.ThrowIfError();
        }
    }

    [Test]
    public async Task Assign_ComfyApiModelToProvider()
    {
        Environment.SetEnvironmentVariable("AUTH_SECRET","p@55wOrd");
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        var providerToUpdate = ComfyApiProviders[0]; // Assuming we want to update the first provider

        var apiQuery = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = providerToUpdate.Name,
        });
        apiQuery.ThrowIfError();
        var existingProvider = apiQuery.Response!.Results.FirstOrDefault();
        if (existingProvider == null)
            throw new Exception("ComfyApiProvider not found");

        await CreateComfyApiModels(client);
        var model = ComfyApiModels[0];
        var modelQuery = await client.ApiAsync(new QueryComfyApiModels
        {
            Name = model.Name,
        });
        modelQuery.ThrowIfError();
        
        var modelId = modelQuery.Response!.Results.FirstOrDefault()?.Id;
        if (modelId == null)
            throw new Exception("ComfyApiModel not found");

        var api = await client.ApiAsync(new AddComfyProviderModel
        {
            ComfyApiProviderId = existingProvider.Id,
            ComfyApiModelId = modelId.Value,
        });
        
        api.ThrowIfError();
        
        // Query provider
        var providerQuery = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = providerToUpdate.Name,
        });
        
        providerQuery.ThrowIfError();
        
        var provider = providerQuery.Response!.Results.FirstOrDefault();
        
        if (provider == null)
            throw new Exception("ComfyApiProvider not found");
        
        Assert.That(provider.Models.Count, Is.EqualTo(1));
    }

    [Test]
    public async Task Update_ComfyApiProvider()
    {
        Environment.SetEnvironmentVariable("AUTH_SECRET","p@55wOrd");
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        var providerToUpdate = ComfyApiProviders[0]; // Assuming we want to update the first provider

        var apiQuery = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = providerToUpdate.Name,
        });
        apiQuery.ThrowIfError();
        var existingProvider = apiQuery.Response!.Results.FirstOrDefault();
        if (existingProvider == null)
            throw new Exception("ComfyApiProvider not found");

        var api = await client.ApiAsync(new UpdateComfyApiProvider
        {
            Id = existingProvider.Id,
            Enabled = providerToUpdate.Enabled,
            Priority = providerToUpdate.Priority,
            Concurrency = providerToUpdate.Concurrency,
            ApiBaseUrl = providerToUpdate.ApiBaseUrl,
            HeartbeatUrl = providerToUpdate.HeartbeatUrl,
            ApiKey = providerToUpdate.ApiKey,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task ChangeComfyApiProviderStatus_Offline()
    {
        Environment.SetEnvironmentVariable("AUTH_SECRET","p@55wOrd");
        var client = TestUtils.CreateAuthSecretClient();
        // Create
        await CreateComfyApiProviders(client);
        var api = await client.ApiAsync(new ChangeComfyApiProviderStatus
        {
            Provider = ComfyApiProviders[0].Name,
            Online = false,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task ChangeComfyApiProviderStatus_Online()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        var api = await client.ApiAsync(new ChangeComfyApiProviderStatus
        {
            Provider = ComfyApiProviders[0].Name,
            Online = true,
        });
        api.ThrowIfError();
    }
}