using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class ImageIntegrationTests : IntegrationTestBase
{
    [SetUp]
    public void Setup()
    {
        HttpUtils.HttpClientHandlerFactory = () => new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
        };
    }
    
    [Test]
    public async Task Can_convert_image_to_png()
    {
        var client = CreateClient();

        ArtifactGenerationResponse response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/test_image.jpg");
            response = client.PostFilesWithRequest<ArtifactGenerationResponse>(new ConvertImage
            {
                OutputFormat = ImageOutputFormat.Png
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
        Assert.That(response.Results.Count, Is.GreaterThan(0));
        
        // Download the image
        var outputUrl = response.Results[0].Url;
        Assert.That(outputUrl, Is.Not.Null);
        var outputImage = await client.GetAsync<Stream>(outputUrl!);
        
        using var image = await Image.LoadAsync(outputImage);
        
        Assert.That(image.Width, Is.GreaterThan(0));
        Assert.That(image.Height, Is.GreaterThan(0));
        Assert.That(image.Metadata.DecodedImageFormat, Is.EqualTo(PngFormat.Instance));
    }

    [Test]
    public async Task Can_convert_image_to_jpeg()
    {
        var client = CreateClient();

        ArtifactGenerationResponse response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest<ArtifactGenerationResponse>(new ConvertImage
            {
                OutputFormat = ImageOutputFormat.Jpg
            }, [
                new UploadFile("image.jpg", imageStream) { FieldName = "image"}
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results.Count, Is.GreaterThan(0));
        
        // Download the image
        var outputUrl = response.Results[0].Url;
        Assert.That(outputUrl, Is.Not.Null);
        var outputImage = await client.GetAsync<Stream>(outputUrl!);
        
        using var image = await Image.LoadAsync(outputImage);
        
        Assert.That(image.Width, Is.GreaterThan(0));
        Assert.That(image.Height, Is.GreaterThan(0));
        Assert.That(image.Metadata.DecodedImageFormat, Is.EqualTo(JpegFormat.Instance));
    }

    [Test]
    public async Task Cannot_convert_image_with_invalid_format()
    {
        var client = CreateClient();

        WebServiceException exception = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            var response = client.PostFilesWithRequest<ArtifactGenerationResponse>(new ConvertImage
            {
                OutputFormat = null
            }, [
                new UploadFile("image.jpg", imageStream) { FieldName = "image"}
            ]);
        }
        catch (WebServiceException e)
        {
            exception = e;
        }

        Assert.That(exception, Is.Not.Null);
        Assert.That(exception.StatusCode, Is.EqualTo(400));
        Assert.That(exception.ErrorMessage, Does.Contain("No output format provided"));
    }
    
    [Test]
    public async Task Cannot_crop_image_with_invalid_dimensions()
    {
        var client = CreateClient();

        WebServiceException exception = null;
        try
        {
            await using var imageStream = File.OpenRead("files/test_image.jpg");
            var response = client.PostFilesWithRequest<ArtifactGenerationResponse>(new CropImage
            {
                X = -10,
                Y = -10,
                Width = 10000,
                Height = 10000
            }, [
                new UploadFile("image.jpg", imageStream) { FieldName = "image" }
            ]);
        }
        catch (WebServiceException e)
        {
            exception = e;
        }

        Assert.That(exception, Is.Not.Null);
        Assert.That(exception.StatusCode, Is.EqualTo((int)HttpStatusCode.BadRequest));
        Assert.That(exception.ErrorMessage, Does.Contain("Invalid crop dimensions"));
    }

    [Test]
    public async Task Can_crop_image()
    {
        var client = CreateClient();
        
        await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
        var response = client.PostFilesWithRequest<ArtifactGenerationResponse>(new CropImage
        {
            X = 10,
            Y = 10,
            Width = 100,
            Height = 100
        }, [
            new UploadFile("image.png", imageStream) { FieldName = "image" }
        ]);
        
        Assert.That(response, Is.Not.Null);
        var stream = response;
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results.Count, Is.GreaterThan(0));
        
        // Download the image
        var outputUrl = response.Results[0].Url;
        Assert.That(outputUrl, Is.Not.Null);
        var outputImage = await client.GetAsync<Stream>(outputUrl!);
        
        using var image = await Image.LoadAsync(outputImage);
        
        Assert.That(image.Width, Is.EqualTo(100));
        Assert.That(image.Height, Is.EqualTo(100));
    }
    
    [Test]
    public async Task Can_apply_image_watermark()
    {
        var client = CreateClient();

        ArtifactGenerationResponse response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/test_image.jpg");
            await using var watermarkStream = File.OpenRead("files/watermark_image.png");
            response = client.PostFilesWithRequest<ArtifactGenerationResponse>(new WatermarkImage
            {
                Position = WatermarkPosition.BottomRight,
                Opacity = 0.7f
            }, [
                new UploadFile("image.jpg", imageStream) { FieldName = "image" },
                new UploadFile("watermark.png", watermarkStream) { FieldName = "watermark" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results.Count, Is.GreaterThan(0));
        
        // Download the image
        var outputUrl = response.Results[0].Url;
        Assert.That(outputUrl, Is.Not.Null);
        var outputImage = await client.GetAsync<Stream>(outputUrl!);
        
        using var image = await Image.LoadAsync(outputImage);
        
        Assert.That(image.Width, Is.GreaterThan(0));
        Assert.That(image.Height, Is.GreaterThan(0));
        
        image.Save("files/output_image.jpg");
    }

    [Test]
    public async Task Cannot_apply_image_watermark_without_watermark_file()
    {
        var client = CreateClient();

        WebServiceException exception = null;
        try
        {
            await using var imageStream = File.OpenRead("files/test_image.jpg");
            var response = client.PostFilesWithRequest<Stream>(new WatermarkImage
            {
                Position = WatermarkPosition.Center,
                Opacity = 0.5f
            }, [
                new UploadFile("image.jpg", imageStream) { FieldName = "image" }
            ]);
        }
        catch (WebServiceException e)
        {
            exception = e;
        }

        Assert.That(exception, Is.Not.Null);
        Assert.That(exception.StatusCode, Is.EqualTo((int)HttpStatusCode.BadRequest));
        Assert.That(exception.ErrorMessage, Does.Contain("No watermark image file provided"));
    }
}