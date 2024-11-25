using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class QueueImageWithMaskIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_queue_generate_image_with_mask()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        try
        {
            using var imageStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test.png"));
            using var maskStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test_mask.png"));

            response = client.PostFilesWithRequest(new QueueImageWithMask
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
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Empty);
        Assert.That(response.JobId, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        Assert.That(response.JobState, Is.EqualTo(BackgroundJobState.Completed));
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
    }

    [Test]
    public async Task Can_generate_image_with_mask_with_reply_to()
    {
        var client = CreateClient();
        
        QueueGenerationResponse? response = null;
        try
        {
            using var imageStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test.png"));
            using var maskStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test_mask.png"));

            response = client.PostFilesWithRequest(new QueueImageWithMask
            {
                PositivePrompt = "A scary storm is brewing",
                NegativePrompt = "No insects or weeds",
                Denoise = 0.7f,
                ReplyTo = "https://localhost:5005/dummyreplyto"
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
        var hasRepyTo = await client.ApiAsync(new HasDummyReplyTo
        {
            RefId = job.Response.RefId
        });
        var maxTimeout = DateTime.UtcNow.AddSeconds(60);
        while(hasRepyTo.Failed && DateTime.UtcNow < maxTimeout)
        {
            await Task.Delay(3000);
            hasRepyTo = await client.ApiAsync(new HasDummyReplyTo         
            {
                RefId = job.Response.RefId
            });
        }

        Assert.That(hasRepyTo, Is.Not.Null);
        Assert.That(hasRepyTo.Succeeded, Is.True);
    }

    [Test]
    public async Task Can_generate_image_with_mask_without_sync_or_reply_to()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        try
        {
            using var imageStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test.png"));
            using var maskStream = new MemoryStream(File.ReadAllBytes("files/comfyui_upload_test_mask.png"));

            response = client.PostFilesWithRequest(new QueueImageWithMask
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