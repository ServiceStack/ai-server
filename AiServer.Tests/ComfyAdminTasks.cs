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
            MediaTypeId = "ConfyUI"
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
            MediaTypeId = "ComfyUI"
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