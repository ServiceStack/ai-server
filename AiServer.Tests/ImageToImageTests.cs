using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;
using SixLabors.ImageSharp;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class ImageToImageIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_queue_generate_image()
    {
        var client = CreateClient();

        ArtifactGenerationResponse? response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest(new ImageToImage
            {
                PositivePrompt = "A futuristic version of the input image",
                BatchSize = 1
            }, [
                new UploadFile("image.png", imageStream) { FieldName = "image"}
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
        
        // Validate that the output image is a valid image
        var outputImage = response.Results[0];
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
        
        // Confirm the image dimensions are the same as the input image
        await using var originalImageStream = File.OpenRead("files/comfyui_upload_test.png");
        var inputImageInfo = Image.Load(originalImageStream);
        Assert.That(outputImageInfo.Width, Is.EqualTo(inputImageInfo.Width));
        Assert.That(outputImageInfo.Height, Is.EqualTo(inputImageInfo.Height));
        
        // Confirm the image is not the same as the input image
        Assert.That(outputImageBytes, Is.Not.EqualTo(originalImageStream.ReadFully()));
    }
    
    [Test]
    public async Task Can_queue_generate_image_with_mask()
    {
        var client = CreateClient();

        ArtifactGenerationResponse? response = null;
        try
        {
            using var imageStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test.png"));
            using var maskStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test_mask.png"));

            response = client.PostFilesWithRequest(new ImageWithMask
            {
                PositivePrompt = "A beautiful flower in the masked area",
                NegativePrompt = "No insects or weeds"
            }, new []
            {
                new UploadFile("image.png", imageStream){ FieldName = "image"},
                new UploadFile("mask.png", maskStream){ FieldName = "mask"}
            });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
        
        // Validate that the output image is a valid image
        var outputImage = response.Results[0];
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
        
        // Confirm the image dimensions are the same as the input image
        await using var originalImageStream = File.OpenRead("files/comfyui_upload_test.png");
        var inputImageInfo = Image.Load(originalImageStream);
        Assert.That(outputImageInfo.Width, Is.EqualTo(inputImageInfo.Width));
        Assert.That(outputImageInfo.Height, Is.EqualTo(inputImageInfo.Height));
        
        // Confirm the image is not the same as the input image
        Assert.That(outputImageBytes, Is.Not.EqualTo(originalImageStream.ReadFully()));
    }
}