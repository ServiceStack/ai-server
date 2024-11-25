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

        TextGenerationResponse? response = null;
        await using var fileStream = new FileStream(TestAudioPath, FileMode.Open);

        try
        {
            response = client.PostFilesWithRequest(new SpeechToText
            {

            }, new []{ new UploadFile("speech.wav", fileStream) { FieldName = "audio"} });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response, Is.Not.Null);
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_generate_speech()
    {
        var client = CreateClient();

        ApiResult<ArtifactGenerationResponse>? response = null;
        try
        {
            response = await client.ApiAsync(new TextToSpeech
            {
                Input = "This is a test of synchronous text to speech generation."
            });
            response.ThrowIfError();
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.Response, Is.Not.Null);
        
        Assert.That(response.Response.Results, Is.Not.Null);
        Assert.That(response.Response.Results, Is.Not.Empty);
        Assert.That(response.Response.Results[0].FileName, Does.EndWith(".mp3").Or.EndWith(".wav"));
    }

}