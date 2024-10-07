using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class SpeechToTextIntegrationTests : IntegrationTestBase
{
    private const string TestAudioPath = "files/speech_to_text_test.wav";

    [Test]
    public async Task Can_transcribe_speech()
    {
        var client = CreateClient();

        GenerationResponse? response = null;
        await using var fileStream = new FileStream(TestAudioPath, FileMode.Open);

        try
        {
            response = client.PostFilesWithRequest<GenerationResponse>(new SpeechToText
            {

            }, new []{ new UploadFile("speech.wav", fileStream) { FieldName = "speech"} });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.TextOutputs, Is.Not.Null);
        Assert.That(response.TextOutputs, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_generate_speech()
    {
        var client = CreateClient();

        ApiResult<GenerationResponse>? response = null;
        try
        {
            response = await client.ApiAsync(new TextToSpeech
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
        
        Assert.That(response.Response.Outputs, Is.Not.Null);
        Assert.That(response.Response.Outputs, Is.Not.Empty);
        Assert.That(response.Response.Outputs[0].FileName, Does.EndWith(".mp3").Or.EndWith(".wav"));
    }

}