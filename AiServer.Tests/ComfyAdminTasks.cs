using System.Reflection;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using NUnit.Framework;
using NUnit.Framework.Internal;
using ServiceStack;

namespace AiServer.Tests;

[Explicit]
public class ComfyAdminTasks
{
    private static bool useLocal = true;
    private ConfigureSecrets ConfigureSecrets = new();

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
        },
        {
            "https://civitai.com/models/350352?modelVersionId=391971",
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
    
    private static List<CreateMediaProvider> MediaProviders = new List<CreateMediaProvider>
    {
        new()
        {
            Name = "Replicate",
            Concurrency = 3,
            Enabled = true,
            Priority = 1,
            HeartbeatUrl = "https://api.replicate.com/",
            ApiBaseUrl = "https://api.replicate.com/",
            Models = new List<string> { "flux1-dev","flux1-schnell" },
            MediaTypeId = 1
        },
        new()
        {
            Name = "diffusion-dell.pvq.app",
            ApiBaseUrl = "https://comfy-dell.pvq.app/api",
            ApiKey = "testtest1234",
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
            MediaTypeId = 2
        }
    };

    [Test]
    public async Task CanConfigureMediaProviders()
    {
        ConfigureSecrets.ApplySecrets(useLocal);
        var client = TestUtils.CreateAuthSecretClient();
        // var client = TestUtils.CreatePublicAuthSecretClient();
        
        foreach (var provider in MediaProviders)
        {
            var query = new QueryMediaProviders
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
    public async Task CanGenerateFluxImageUsingGenerationProvider()
    {
        ConfigureSecrets.ApplySecrets();
        var client = TestUtils.CreateAuthSecretClient();

        var diffGen = new CreateGeneration
        {
            Provider = "Replicate",
            Request = new GenerationArgs
            {
                Height = 1024,
                Width = 1024,
                Steps = 4,
                Model = "flux1-schnell",
                BatchSize = 4,
                PositivePrompt = "Ocean sunset",
                Seed = 1234
            }
        };
        
        var response = await client.ApiAsync(diffGen);
        response.ThrowIfError();
    }
}

public partial class ConfigureSecrets
{
    public void ApplySecrets(bool? useLocal = null)
    {
        // use reflection to invoke `SetSecrets` if exists
        var method = GetType().GetMethod("SetSecrets", BindingFlags.Instance | BindingFlags.Public);
        if (method != null)
        {
            method.Invoke(this, [useLocal]);
        }
    }
}