using AiServer.ServiceModel;

namespace AiServer.Tests;

using NUnit.Framework;
using ServiceStack;
using System;
using System.IO;
using System.Threading.Tasks;
using AiServer.ServiceInterface;
using AiServer.Tests;
using ServiceStack.Jobs;

[Explicit("Integration tests require a running service")]
public class QueueSpeechToTextIntegrationTests : IntegrationTestBase
{
    private const string TestAudioPath = "files/speech_to_text_test.wav";

    [Test]
    public async Task Can_queue_transcribe_speech()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        await using var fileStream = new FileStream(TestAudioPath, FileMode.Open);

        try
        {
            response = client.PostFilesWithRequest(
                new QueueSpeechToText(), 
                [new UploadFile("speech.wav", fileStream) { FieldName = "audio"}]);
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
        // Async tasks can be queued, started or completed
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started or BackgroundJobState.Completed);
        // Assert.That(response.TextOutputs, Is.Not.Null);
        // Assert.That(response.TextOutputs, Is.Not.Empty);
    }

    [Test]
    public async Task Can_transcribe_speech_with_reply_to()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        await using var fileStream = new FileStream(TestAudioPath, FileMode.Open);

        try
        {
            response = client.PostFilesWithRequest(
                new QueueSpeechToText
                {
                    ReplyTo = "https://localhost:5005/dummyreplyto"
                },
            [new UploadFile("speech.wav", fileStream) { FieldName = "audio"}]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }


        Assert.That(response, Is.Not.Null);
        Assert.That(response.ResponseStatus, Is.Null);
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
        
        // Verify that we can get the job status
        var getStatusResponse = await client.SendAsync(new GetArtifactGenerationStatus
        {
            JobId = response.JobId
        });
        
        Assert.That(getStatusResponse.Results, Is.Not.Null);
        Assert.That(getStatusResponse.Results, Is.Not.Empty);
    }

    [Test]
    public async Task Can_transcribe_speech_without_sync_or_reply_to()
    {
        var client = CreateClient();

        QueueGenerationResponse? response = null;
        await using var fileStream = new FileStream(TestAudioPath, FileMode.Open);

        try
        {
            response = client.PostFilesWithRequest(
                new QueueSpeechToText(), 
            [new UploadFile("speech.wav", fileStream) { FieldName = "audio"}]);
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
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started);

        // Verify that we can get the job status
        var getStatusResponse = await client.SendAsync(new GetTextGenerationStatus
        {
            JobId = response.JobId
        });

        while (getStatusResponse.JobState == BackgroundJobState.Queued || getStatusResponse.JobState == BackgroundJobState.Started)
        {
            await Task.Delay(1000);
            getStatusResponse = await client.SendAsync(new GetTextGenerationStatus
            {
                JobId = response.JobId
            });
        }

        Assert.That(getStatusResponse, Is.Not.Null);
        Assert.That(getStatusResponse.JobId, Is.EqualTo(response.JobId));
        Assert.That(getStatusResponse.RefId, Is.EqualTo(response.RefId));
        Assert.That(getStatusResponse.JobState, Is.Not.Null);
        Assert.That(getStatusResponse.JobState, Is.EqualTo(BackgroundJobState.Completed));
        Assert.That(getStatusResponse.Results, Is.Not.Null);
        Assert.That(getStatusResponse.Results, Is.Not.Empty);
        Assert.That(getStatusResponse.Results?[0].Text, Is.Not.Null);
        Assert.That(getStatusResponse.Results?[0].Text, Is.Not.Empty);
    }
}