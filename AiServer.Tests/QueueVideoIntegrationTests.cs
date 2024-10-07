using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class QueueVideoIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_convert_video_to_mp4()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.webm");
            response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueConvertVideo
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
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        // Async tasks can be queued, started or completed
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started or BackgroundJobState.Completed);
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
        // Assert.That(response.Outputs[0].FileName, Does.EndWith(".mp4"));
        
        // Download the output file
        // var output = await client.GetHttpClient().GetStreamAsync(response.Outputs[0].Url);
        // Assert.That(output, Is.Not.Null);
        // //Assert.That(output.Result.StatusCode, Is.EqualTo(HttpStatusCode.OK));
        // // Download the output file
        // await using var fs = File.Create("files/test_video.mp4");
        // await output.CopyToAsync(fs);
    }

    [Test]
    public async Task Can_convert_video_with_reply_to()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.webm");
            response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueConvertVideo
            {
                OutputFormat = ConvertVideoOutputFormat.MP4,
                ReplyTo = "https://localhost:5005/dummyreplyto"
            }, [
                new UploadFile("video.webm", videoStream) { FieldName = "video" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);

        // Wait for the job to complete and check if ReplyTo was called
        var hasReplyTo = await WaitForReplyTo(client, response.RefId);
        Assert.That(hasReplyTo, Is.True);
    }

    private async Task<bool> WaitForReplyTo(JsonApiClient client, string refId)
    {
        var maxTimeout = DateTime.UtcNow.AddSeconds(60);
        while (DateTime.UtcNow < maxTimeout)
        {
            var hasReplyTo = await client.ApiAsync(new HasDummyReplyTo { RefId = refId });
            if (hasReplyTo.Succeeded)
            {
                return true;
            }

            await Task.Delay(3000);
        }

        return false;
    }
    
    [Test]
    public async Task Can_crop_video()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueCropVideo
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
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        // Async tasks can be queued, started or completed
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started or BackgroundJobState.Completed);
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
        // Assert.That(response.Outputs[0].FileName, Does.EndWith(".mp4"));
        //
        // // Download the output file
        // var output = await client.GetHttpClient().GetStreamAsync(response.Outputs[0].Url);
        // Assert.That(output, Is.Not.Null);
        //
        // // Save the cropped video
        // var croppedVideoPath = "files/cropped_test_video.mp4";
        // await using (var fs = File.Create(croppedVideoPath))
        // {
        //     await output.CopyToAsync(fs);
        // }
        //
        // // Validate the crop dimensions
        // var videoInfo = await FFProbe.AnalyseAsync(croppedVideoPath);
        // Assert.That(videoInfo.VideoStreams[0].Width, Is.EqualTo(500));
        // Assert.That(videoInfo.VideoStreams[0].Height, Is.EqualTo(300));
    }

    [Test]
    public async Task Can_crop_video_with_reply_to()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueCropVideo
            {
                X = 50,
                Y = 50,
                Width = 400,
                Height = 200,
                ReplyTo = "https://localhost:5005/dummyreplyto"
            }, [
                new UploadFile("video.mp4", videoStream) { FieldName = "video" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);

        // Wait for the job to complete and check if ReplyTo was called
        var hasReplyTo = await WaitForReplyTo(client, response.RefId);
        Assert.That(hasReplyTo, Is.True);
    }
    
    [Test]
    public async Task Can_trim_video()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueTrimVideo
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
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        // Async tasks can be queued, started or completed
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started or BackgroundJobState.Completed);
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
        // Assert.That(response.Outputs[0].FileName, Does.EndWith(".mp4"));
        //
        // // Download the output file
        // var output = await client.GetHttpClient().GetStreamAsync(response.Outputs[0].Url);
        // Assert.That(output, Is.Not.Null);
        //
        // // Save the trimmed video
        // var trimmedVideoPath = "files/trimmed_test_video.mp4";
        // await using (var fs = File.Create(trimmedVideoPath))
        // {
        //     await output.CopyToAsync(fs);
        // }
        //
        // // Validate the trimmed video duration
        // var videoInfo = await FFProbe.AnalyseAsync(trimmedVideoPath);
        // Assert.That(videoInfo.Duration, Is.EqualTo(TimeSpan.FromSeconds(5)).Within(TimeSpan.FromMilliseconds(100)));
    }

    [Test]
    public async Task Can_trim_video_with_reply_to()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueTrimVideo
            {
                StartTime = "00:02",
                EndTime = "00:05",
                ReplyTo = "https://localhost:5005/dummyreplyto"
            }, [
                new UploadFile("video.mp4", videoStream) { FieldName = "video" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);

        // Wait for the job to complete and check if ReplyTo was called
        var hasReplyTo = await WaitForReplyTo(client, response.RefId);
        Assert.That(hasReplyTo, Is.True);
    }

    [Test]
    public async Task Cannot_trim_video_with_invalid_start_time()
    {
        var client = CreateClient();

        WebServiceException exception = null;
        try
        {
            await using var videoStream = File.OpenRead("files/test_video.mp4");
            var response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueTrimVideo
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
            var response = client.PostFilesWithRequest<QueueMediaTransformResponse>(new QueueTrimVideo
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