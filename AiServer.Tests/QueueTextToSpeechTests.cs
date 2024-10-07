using AiServer.ServiceInterface;
using NUnit.Framework;
using ServiceStack;
using AiServer.ServiceModel;
using AiServer.Tests;
using ServiceStack.Jobs;

[Explicit("Integration tests require a running service")]
public class QueueTextToSpeechIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_queue_generate_speech()
    {
        var client = CreateClient();

        ApiResult<QueueGenerationResponse>? response = null;
        try
        {
            response = await client.ApiAsync(new QueueTextToSpeech
            {
                Text = "This is a test of synchronous text to speech generation."
            });
            response.ThrowIfError();
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.Response, Is.Not.Null);
        Assert.That(response.Response.RefId, Is.Not.Null);
        Assert.That(response.Response.RefId, Is.Not.Empty);
        Assert.That(response.Response.JobId, Is.Not.Null);
        Assert.That(response.Response.JobId, Is.Not.Zero);
        Assert.That(response.Response.JobState, Is.EqualTo(BackgroundJobState.Completed));
        // Assert.That(response.Response.Outputs, Is.Not.Null);
        // Assert.That(response.Response.Outputs, Is.Not.Empty);
        // Assert.That(response.Response.Outputs[0].FileName, Does.EndWith(".mp3").Or.EndWith(".wav"));
    }

    [Test]
    public async Task Can_generate_speech_with_reply_to()
    {
        var client = CreateClient();

        ApiResult<QueueGenerationResponse>? response = await client.ApiAsync(new QueueTextToSpeech
        {
            Text = "This is a test of asynchronous text to speech generation.",
            Model = "high:en_US-lessac",
            ReplyTo = "https://localhost:5005/dummyreplyto"
        });

        response.ThrowIfError();

        Assert.That(response, Is.Not.Null);
        Assert.That(response.Error, Is.Null);
        Assert.That(response?.Response?.RefId, Is.Not.Null);
        Assert.That(response?.Response?.RefId, Is.Not.Empty);
        Assert.That(response?.Response?.JobId, Is.Not.Null);
        Assert.That(response?.Response?.JobId, Is.Not.Zero);

        // Get Job
        var job = await client.ApiAsync(new GetJobStatus
        {
            JobId = response.Response.JobId
        });

        job.ThrowIfError();

        Assert.That(job, Is.Not.Null);
        Assert.That(job.Response, Is.Not.Null);
        Assert.That(job.Response.JobId, Is.EqualTo(response.Response.JobId));
        Assert.That(job.Response.RefId, Is.Not.Null);
        Assert.That(job.Response.RefId, Is.EqualTo(response.Response.RefId));

        // Wait while replyto is fired
        var hasRepyTo = await client.ApiAsync(new HasDummyReplyTo
        {
            RefId = job.Response.RefId
        });
        var maxTimeout = DateTime.UtcNow.AddSeconds(60);
        while (hasRepyTo.Failed && DateTime.UtcNow < maxTimeout)
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
    public async Task Can_generate_speech_without_sync_or_reply_to()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        try
        {
            response = await client.PostAsync(new QueueTextToSpeech
            {
                Text = "This is a test of asynchronous text to speech generation.",
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
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started or BackgroundJobState.Completed); 

        // Verify that we can get the job status
        var getStatusResponse = await client.PostAsync(new GetJobStatus
        {
            JobId = response.JobId
        });

        while (getStatusResponse.JobState == BackgroundJobState.Queued || getStatusResponse.JobState == BackgroundJobState.Started)
        {
            await Task.Delay(1000);
            getStatusResponse = await client.PostAsync(new GetJobStatus
            {
                JobId = response.JobId
            });
        }

        Assert.That(getStatusResponse, Is.Not.Null);
        Assert.That(getStatusResponse.JobId, Is.EqualTo(response.JobId));
        Assert.That(getStatusResponse.RefId, Is.EqualTo(response.RefId));
        Assert.That(getStatusResponse.JobState, Is.Not.Null);
        Assert.That(getStatusResponse.JobState, Is.EqualTo(BackgroundJobState.Completed));
        Assert.That(getStatusResponse.Outputs, Is.Not.Null);
        Assert.That(getStatusResponse.Outputs, Is.Not.Empty);
        Assert.That(getStatusResponse.Outputs[0].FileName, Does.EndWith(".mp3").Or.EndWith(".wav"));
    }
}