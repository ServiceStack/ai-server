using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using AiServer.ServiceModel.Types;

namespace AiServer.Tests;

[Explicit]
public class ComfyApiProviderTests
{
    private static List<CreateComfyApiProvider> ComfyApiProviders = new()
    {
        new CreateComfyApiProvider
        {
            Name = "comfy-dell.pvq.app",
            ApiBaseUrl = "https://comfy-dell.pvq.app/api",
            Concurrency = 1,
            HeartbeatUrl = "/",
            TaskPaths = new Dictionary<ComfyTaskType, string>
            {
                { ComfyTaskType.TextToImage, "/prompt" },
                { ComfyTaskType.ImageToImage, "/prompt" },
                { ComfyTaskType.ImageToImageUpscale, "/prompt" },
                { ComfyTaskType.ImageToImageWithMask, "/prompt" },
                { ComfyTaskType.TextToAudio, "/prompt" },
                { ComfyTaskType.TextToSpeech, "/prompt" },
                { ComfyTaskType.SpeechToText, "/prompt" }
            },
            Enabled = true,
            Priority = 1,
            ApiKey = "testtest1234"
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

    [Test]
    public async Task Create_Local_ComfyApiProviders_and_Models()
    {
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        await CreateComfyApiModels(client);
        // Update provider to use model
        
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
    public async Task Update_ComfyApiProvider()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
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
        var client = TestUtils.CreatePublicAuthSecretClient();
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