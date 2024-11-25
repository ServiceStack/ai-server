using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;
using SixLabors.ImageSharp;

namespace AiServer.Tests;

[Explicit]
public class TextToImageIntegrationTests : IntegrationTestBase
{
    // [Test]
    // public async Task Create_Local_ApiKeys()
    // {
    //     ConfigureSecrets.ApplySecrets();
    //     var client = TestUtils.CreateAuthSecretClient();
    //     await PvqApiTests.CreateApiKeys(client);
    // }

    [Test]
    public async Task Can_generate_image()
    {
        var client = CreateClient();

        ApiResult<ArtifactGenerationResponse>? response = null;
        try
        {
            response = await client.ApiAsync(new TextToImage
            {
                PositivePrompt = "A serene landscape with mountains and a lake",
                Model = "flux-schnell",
                Width = 1024,
                Height = 1024,
                BatchSize = 1
            });
            response.ThrowIfError();
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.Response, Is.Not.Null);
        
        Assert.That(response.Response.Results, Is.Not.Null);
        Assert.That(response.Response.Results, Is.Not.Empty);
        
        // Validate that the output image is a valid image
        var outputImage = response.Response.Results[0];
        Assert.That(outputImage.FileName, Does.EndWith(".webp"));
        // Download the image
        
        var downloadResponse = await client.GetHttpClient().GetStreamAsync(outputImage.Url);
        Assert.That(downloadResponse, Is.Not.Null);
        
        // Load the image
        var outputImageBytes = downloadResponse.ReadFully();
        using var outputImageStream = new MemoryStream(outputImageBytes);
        var outputImageInfo = Image.Load(outputImageStream);
        
        Assert.That(outputImageInfo, Is.Not.Null);
        Assert.That(outputImageInfo.Width, Is.GreaterThan(0));
        Assert.That(outputImageInfo.Height, Is.GreaterThan(0));
        Assert.That(outputImageInfo.Width, Is.EqualTo(1024));
        Assert.That(outputImageInfo.Height, Is.EqualTo(1024));

    }
}