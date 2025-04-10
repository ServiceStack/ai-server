using AiServer.ServiceModel;
using FFMpegCore;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class QueueAudioIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_convert_audio_to_mp3()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            var inputAudioPath = "files/test_audio.wav";
            await using var audioStream = File.OpenRead(inputAudioPath);
            response = client.PostFilesWithRequest(new QueueConvertAudio {
                OutputFormat = AudioFormat.MP3
            }, [
                new UploadFile("audio.wav", audioStream) { FieldName = "audio" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        Assert.That(response.JobState, Is.EqualTo(BackgroundJobState.Queued).Or.EqualTo(BackgroundJobState.Started));

        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
        // Assert.That(response.Outputs[0].FileName, Does.EndWith(".mp3"));
        //
        // // Test download
        // var downloadResponse = await client.GetHttpClient().GetStreamAsync(response.Outputs[0].Url);
        // Assert.That(downloadResponse, Is.Not.Null);
        // // Save to disk
        // var audioPath = "files/test_audio.mp3";
        // await using var fs = File.Create(audioPath);
        // await downloadResponse.CopyToAsync(fs);
        //
        // // Test audio length
        // var audioFileInfo = await FFProbe.AnalyseAsync(audioPath);
        // Assert.That(audioFileInfo.Duration, Is.GreaterThan(TimeSpan.Zero));
        // var inputAudioFileInfo = await FFProbe.AnalyseAsync("files/test_audio.wav");
        // // Allow for some variance in duration due to conversion and possible low quality input
        // Assert.That(audioFileInfo.Duration, Is.EqualTo(inputAudioFileInfo.Duration).Within(TimeSpan.FromSeconds(0.2)));
    }

    [Test]
    public async Task Can_convert_audio_to_wav()
    {
        var client = CreateClient();

        QueueMediaTransformResponse? response = null;
        try
        {
            await using var audioStream = File.OpenRead("files/test_audio.mp3");
            response = client.PostFilesWithRequest(new QueueConvertAudio
            {
                OutputFormat = AudioFormat.WAV
            }, [
                new UploadFile("audio.mp3", audioStream) { FieldName = "audio" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        Assert.That(response.JobState, Is.EqualTo(BackgroundJobState.Queued).Or.EqualTo(BackgroundJobState.Started));
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
        // Assert.That(response.Outputs[0].FileName, Does.EndWith(".wav"));
        //
        // // Test download
        // var downloadResponse = await client.GetHttpClient().GetStreamAsync(response.Outputs[0].Url);
        // Assert.That(downloadResponse, Is.Not.Null);
        // // Save to disk
        // var audioPath = "files/test_audio.wav";
        // await using var fs = File.Create(audioPath);
        // await downloadResponse.CopyToAsync(fs);
        //
        // // Test audio length
        // var audioFileInfo = await FFProbe.AnalyseAsync(audioPath);
        // Assert.That(audioFileInfo.Duration, Is.GreaterThan(TimeSpan.Zero));
        // var inputAudioFileInfo = await FFProbe.AnalyseAsync("files/test_audio.mp3");
        // // Allow for some variance in duration due to conversion and possible low quality input
        // Assert.That(audioFileInfo.Duration, Is.EqualTo(inputAudioFileInfo.Duration).Within(TimeSpan.FromSeconds(0.2)));
    }

    [Test]
    public async Task Can_convert_audio()
    {
        var client = CreateClient();

        QueueMediaTransformResponse response = null;
        try
        {
            await using var audioStream = File.OpenRead("files/test_audio.mp3");
            response = client.PostFilesWithRequest(new QueueConvertAudio
            {
                OutputFormat = AudioFormat.FLAC
            }, [
                new UploadFile("audio.mp3", audioStream) { FieldName = "audio" }
            ]);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.JobId, Is.Not.Zero);
        // Async tasks can be queued, started or completed
        Assert.True(response.JobState is BackgroundJobState.Queued or BackgroundJobState.Started or BackgroundJobState.Completed);
        // Assert.That(response.Outputs, Is.Not.Null);
        // Assert.That(response.Outputs, Is.Not.Empty);
        // Assert.That(response.Outputs[0].FileName, Does.EndWith(".flac"));
        
        // Test download
        // var downloadResponse = await client.GetHttpClient().GetStreamAsync(response.Outputs[0].Url);
        // Assert.That(downloadResponse, Is.Not.Null);
        // // Save to disk
        // var audioPath = "files/test_audio.flac";
        // await using var fs = File.Create(audioPath);
        // await downloadResponse.CopyToAsync(fs);
        //
        // // Test audio length
        // var audioFileInfo = await FFProbe.AnalyseAsync(audioPath);
        // Assert.That(audioFileInfo.Duration, Is.GreaterThan(TimeSpan.Zero));
        // var inputAudioFileInfo = await FFProbe.AnalyseAsync("files/test_audio.mp3");
        // // Allow for some variance in duration due to conversion and possible low quality input
        // Assert.That(audioFileInfo.Duration, Is.EqualTo(inputAudioFileInfo.Duration).Within(TimeSpan.FromSeconds(0.2)));
    }
}