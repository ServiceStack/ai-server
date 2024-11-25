using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.Tests;

[Explicit("Integration tests require a running service")]
public class ImageToTextIntegrationTests : IntegrationTestBase
{
    [Test]
    public async Task Can_queue_convert_image_to_text()
    {
        var client = CreateClient();

        TextGenerationResponse? response = null;
        try
        {
            await using var imageStream = File.OpenRead("files/comfyui_upload_test.png");
            response = client.PostFilesWithRequest<TextGenerationResponse>(new ImageToText
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
        
        Assert.That(response.Results, Is.Not.Null);
        Assert.That(response.Results, Is.Not.Empty);
    }
    
}