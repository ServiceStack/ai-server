using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;

namespace AiServer.Tests;

[Explicit]
public class DiffusionProviderTests
{
    public IServiceClient CreateClient()
    {
        ConfigureSecrets.ApplySecrets();
        return TestUtils.CreateAuthSecretClient();
    }
    private ConfigureSecrets ConfigureSecrets = new();
    
    [Test]
    public async Task CanCreateDiffusionGeneration()
    {
        var client = CreateClient();
        var request = new CreateDiffusionGeneration
        {
            Request = new DiffusionImageGeneration
            {
                Model = "flux1-schnell",
                Seed = 1,
                Prompt = "A beautiful sunset over the ocean."
            }
        };
        var response = await client.PostAsync(request);
        Assert.That(response, Is.Not.Null);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        ApiResult<GetDiffusionGenerationResponse>? status = null;
        while (DateTime.UtcNow < timeout)
        {
            status = await client.ApiAsync(new GetDiffusionGeneration()
            {
                RefId = response.RefId
            });
            
            if(status.Failed && status.Error?.ErrorCode == "NotFound")
            {
                await Task.Delay(1000);
                continue;
            }
            
            if (status?.Response?.Outputs?.Count > 0)
            {
                break;
            }
            await Task.Delay(1000);
        }
        
        Assert.That(status?.Response, Is.Not.Null);
        Assert.That(status?.Response?.Outputs, Is.Not.Null);
        Assert.That(status?.Response?.Outputs?.Count, Is.GreaterThan(0));
        
    }
    
    [Test]
    public async Task CanCreateDiffusionGenerationSdxl()
    {
        var client = CreateClient();
        var request = new CreateDiffusionGeneration
        {
            Request = new DiffusionImageGeneration
            {
                Model = "LahHongchenSDXLSD15_xlLightning.safetensors",
                Seed = 1,
                Prompt = "A beautiful sunset over the ocean."
            }
        };
        var response = await client.PostAsync(request);
        Assert.That(response, Is.Not.Null);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        ApiResult<GetDiffusionGenerationResponse>? status = null;
        while (DateTime.UtcNow < timeout)
        {
            status = await client.ApiAsync(new GetDiffusionGeneration()
            {
                RefId = response.RefId
            });
            
            if(status.Failed && status.Error?.ErrorCode == "NotFound")
            {
                await Task.Delay(1000);
                continue;
            }
            
            if (status?.Response?.Outputs?.Count > 0)
            {
                break;
            }
            await Task.Delay(1000);
        }
        
        Assert.That(status?.Response, Is.Not.Null);
        Assert.That(status?.Response?.Outputs, Is.Not.Null);
        Assert.That(status?.Response?.Outputs?.Count, Is.GreaterThan(0));
        
    }
}