using AiServer.ServiceInterface;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel.Types;
using Funq;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Messaging;

namespace AiServer.Tests;

public class ComfyFriendlyApiTests
{
    const string BaseUri = "http://localhost:2000/";
    private readonly ServiceStackHost appHost;

    class AppHost : AppSelfHostBase
    {
        public AppHost() : base(nameof(IntegrationTest), typeof(ComfyFriendlyServices).Assembly)
        {
        }

        public override void Configure(Container container)
        {
            container.AddSingleton<IComfyClient>(c =>
                new ComfyClient("https://comfy-dell.pvq.app",
                    "testtest1234"));
            container.AddSingleton<IMessageService>(c => new BackgroundMqService
            {
                DisablePublishingToOutq = true,
                DisablePublishingResponses = true,
            });
            container.AddSingleton<IMessageProducer>(new InMemoryMessageQueueClient(new MessageQueueClientFactory()));

            container.AddSingleton(new AppConfig
            {
                ArtStyleModelMappings = new Dictionary<string, ArtStyleEntry>
                {
                    {
                        "Photographic", @"{
        ""name"": ""OpenXL Version 3.0 Cinematic"",
        ""downloadUrl"": ""https://civitai.com/api/download/models/506622"",
        ""filename"": ""openxlVersion30_v30.safetensors""
      }".FromJson<ArtStyleEntry>()
                    }
                }
            });
        }
    }

    public ComfyFriendlyApiTests()
    {
        appHost = new AppHost()
            .Init()
            .Start(BaseUri);
    }

    [OneTimeTearDown]
    public void OneTimeTearDown() => appHost.Dispose();

    public IServiceClient CreateClient() => new JsonServiceClient(BaseUri);

    [Test]
    public async Task Can_convert_text_to_speech()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfyTextToSpeechResponse? response = null;
        try
        {
            response = await client.PostAsync(new ComfyTextToSpeech { PositivePrompt = "Hello World!" });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Empty);
    }
}