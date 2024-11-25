using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using FFMpegCore;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class VideoIntegrationTests : IntegrationTestBase
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
    public async Task Can_convert_video_to_mp4()
    {
        var client = CreateClient();

        ArtifactGenerationResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.webm");
            response = client.PostFilesWithRequest(new ConvertVideo
            {
                OutputFormat = ConvertVideoOutputFormat.MP4,
            }, [
                new UploadFile("video.webm", videoStream) { FieldName = "video" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
        Assert.That(response.Results[0].FileName, Does.EndWith(".mp4"));
        Assert.That(response.Results[0].Url, Does.StartWith("http"));
        
        // Download the output file
        var output = await response.Results[0].Url.GetStreamFromUrlAsync();
        Assert.That(output, Is.Not.Null);
        // Download the output file
        await using var fs = File.Create("files/test_video.mp4");
        await output.CopyToAsync(fs);
    }
    
    [Test]
    public async Task Can_crop_video()
    {
        var client = CreateClient();

        ArtifactGenerationResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            response = client.PostFilesWithRequest(new CropVideo
            {
                X = 100,
                Y = 100,
                Width = 500,
                Height = 300
            }, [
                new UploadFile("video.mp4", videoStream) { FieldName = "video" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
        Assert.That(response.Results[0].FileName, Does.EndWith(".mp4"));
        
        // Download the output file
        Assert.That(response.Results[0].Url, Does.StartWith("http"));
        
        // Download the output file
        var output = await response.Results[0].Url.GetStreamFromUrlAsync();
        Assert.That(output, Is.Not.Null);
        
        // Save the cropped video
        var croppedVideoPath = "files/cropped_test_video.mp4";
        await using (var fs = File.Create(croppedVideoPath))
        {
            await output.CopyToAsync(fs);
        }
        
        // Validate the crop dimensions
        var videoInfo = await FFProbe.AnalyseAsync(croppedVideoPath);
        Assert.That(videoInfo.VideoStreams[0].Width, Is.EqualTo(500));
        Assert.That(videoInfo.VideoStreams[0].Height, Is.EqualTo(300));
    }
    
    [Test]
    public async Task Can_trim_video()
    {
        var client = CreateClient();

        ArtifactGenerationResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            response = client.PostFilesWithRequest(new TrimVideo
            {
                StartTime = "00:01",
                EndTime = "00:06"
            }, [
                new UploadFile("video.mp4", videoStream) { FieldName = "video" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
        Assert.That(response.Results[0].FileName, Does.EndWith(".mp4"));
        
        Assert.That(response.Results[0].Url, Does.StartWith("http"));
        
        // Download the output file
        var output = await response.Results[0].Url.GetStreamFromUrlAsync();
        Assert.That(output, Is.Not.Null);
        
        // Save the trimmed video
        var trimmedVideoPath = "files/trimmed_test_video.mp4";
        await using (var fs = File.Create(trimmedVideoPath))
        {
            await output.CopyToAsync(fs);
        }
        
        // Validate the trimmed video duration
        var videoInfo = await FFProbe.AnalyseAsync(trimmedVideoPath);
        Assert.That(videoInfo.Duration, Is.EqualTo(TimeSpan.FromSeconds(5)).Within(TimeSpan.FromMilliseconds(100)));
    }
    
    [Test]
    public async Task Cannot_trim_video_with_invalid_start_time()
    {
        var client = CreateClient();

        WebServiceException exception = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            var response = client.PostFilesWithRequest(new TrimVideo
            {
                StartTime = "invalid",
                EndTime = "00:05"
            }, [
                new UploadFile("video.mp4", videoStream) { FieldName = "video" }
            ]);
        }
        catch (WebServiceException e)
        {
            exception = e;
        }

        Assert.That(exception, Is.Not.Null);
        Assert.That(exception.StatusCode, Is.EqualTo(400));
        Assert.That(exception.ErrorMessage, Does.Contain("Invalid start time format"));
    }

    [Test]
    public async Task Cannot_trim_video_with_invalid_end_time()
    {
        var client = CreateClient();

        WebServiceException exception = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            var response = client.PostFilesWithRequest(new TrimVideo
            {
                StartTime = "00:01",
                EndTime = "invalid"
            }, [
                new UploadFile("video.mp4", videoStream) { FieldName = "video" }
            ]);
        }
        catch (WebServiceException e)
        {
            exception = e;
        }

        Assert.That(exception, Is.Not.Null);
        Assert.That(exception.StatusCode, Is.EqualTo(400));
        Assert.That(exception.ErrorMessage, Does.Contain("Invalid end time format"));
    }
}