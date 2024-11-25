using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class QueueImageUpscaleIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_queue_upscale_image()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest(new QueueImageUpscale
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
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Empty);
        Assert.That(response.JobId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        Assert.That(response.JobState, Is.EqualTo(BackgroundJobState.Completed));
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
    }

    [Test]
    public async Task Can_upscale_image_with_reply_to()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest(new QueueImageUpscale
            {
                ReplyTo = "https://localhost:5005/dummyreplyto"
            }, [
                new UploadFile("image.png", imageStream){ FieldName = "image"}
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response?.RefId, Is.Not.Null);
        Assert.That(response?.RefId, Is.Not.Empty);
        Assert.That(response?.JobId, Is.Not.Null);
        Assert.That(response?.JobId, Is.Not.Zero);

        // Get Job
        var job = await client.ApiAsync(new GetArtifactGenerationStatus
        {
            JobId = response.JobId
        });

        job.ThrowIfError();

        Assert.That(job, Is.Not.Null);
        Assert.That(job.Response, Is.Not.Null);
        Assert.That(job.Response.JobId, Is.EqualTo(response.JobId));
        Assert.That(job.Response.RefId, Is.Not.Null);
        Assert.That(job.Response.RefId, Is.EqualTo(response.RefId));

        // Wait while replyto is fired
        var hasReplyTo = await client.ApiAsync(new HasDummyReplyTo
        {
            RefId = job.Response.RefId
        });
        var maxTimeout = DateTime.UtcNow.AddSeconds(60);
        while(hasReplyTo.Failed && DateTime.UtcNow < maxTimeout)
        {
            await Task.Delay(3000);
            hasReplyTo = await client.ApiAsync(new HasDummyReplyTo         
            {
                RefId = job.Response.RefId
            });
        }

        Assert.That(hasReplyTo, Is.Not.Null);
        Assert.That(hasReplyTo.Succeeded, Is.True);
    }

    [Test]
    public async Task Can_upscale_image_without_sync_or_reply_to()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest(new QueueImageUpscale
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
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Empty);
        Assert.That(response.JobId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        Assert.That(response.JobState is BackgroundJobState.Started or BackgroundJobState.Queued, Is.True);

        // Verify that we can get the job status
        var getStatusResponse = await client.SendAsync(new GetArtifactGenerationStatus
        {
            JobId = response.JobId
        });

        while (getStatusResponse.JobState == BackgroundJobState.Queued || getStatusResponse.JobState == BackgroundJobState.Started)
        {
            await Task.Delay(1000);
            getStatusResponse = await client.SendAsync(new GetArtifactGenerationStatus
            {
                JobId = response.JobId
            });
        }

        Assert.That(getStatusResponse, Is.Not.Null);
        Assert.That(getStatusResponse.JobId, Is.EqualTo(response.JobId));
        Assert.That(getStatusResponse.RefId, Is.EqualTo(response.RefId));
        Assert.That(getStatusResponse.JobState, Is.Not.Null);
    }
}