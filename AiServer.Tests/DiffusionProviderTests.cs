using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;

namespace AiServer.Tests;

[Explicit]
public class MediaProviderTests
{
    public IServiceClient CreateClient()
    {
        ConfigureSecrets.ApplySecrets();
        return TestUtils.CreateAuthSecretClient();
    }
    private ConfigureSecrets ConfigureSecrets = new();
    
    [Test]
    public async Task CanCreateGeneration()
    {
        var client = CreateClient();
        var request = new CreateGeneration
        {
            Request = new GenerationArgs
            {
                Model = "flux1-schnell",
                Seed = 1,
                PositivePrompt = "A beautiful sunset over the ocean."
            }
        };
        var response = await client.PostAsync(request);
        Assert.That(response, Is.Not.Null);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        ApiResult<GetGenerationResponse>? status = null;
        while (DateTime.UtcNow < timeout)
        {
            status = await client.ApiAsync(new GetGeneration()
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
    public async Task CanCreateGenerationSdxl()
    {
        var client = CreateClient();
        var request = new CreateGeneration
        {
            Request = new GenerationArgs
            {
                Model = "LahHongchenSDXLSD15_xlLightning.safetensors",
                Seed = 1,
                PositivePrompt = "A beautiful sunset over the ocean."
            }
        };
        var response = await client.PostAsync(request);
        Assert.That(response, Is.Not.Null);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        ApiResult<GetGenerationResponse>? status = null;
        while (DateTime.UtcNow < timeout)
        {
            status = await client.ApiAsync(new GetGeneration()
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