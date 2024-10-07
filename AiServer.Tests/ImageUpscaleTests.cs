using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;
using SixLabors.ImageSharp;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class ImageUpscaleIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_queue_upscale_image()
    {
        var client = CreateClient();

        GenerationResponse? response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest<GenerationResponse>(new ImageUpscale
            {

            }, [
                new UploadFile("image.png", imageStream){ FieldName = "image"}
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Outputs, Is.Not.Null);
        Assert.That(response.Outputs, Is.Not.Empty);
        
        // Download image
        // Validate that the output image is a valid image
        var outputImage = response.Outputs[0];
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
        
        // Confirm the image dimensions are double the input image
        await using var originalImageStream = File.OpenRead("files/comfyui_upload_test.png");
        var inputImageInfo = Image.Load(originalImageStream);
        Assert.That(outputImageInfo.Width, Is.EqualTo(inputImageInfo.Width * 2));
        Assert.That(outputImageInfo.Height, Is.EqualTo(inputImageInfo.Height * 2));
    }
}