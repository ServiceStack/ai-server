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
        ""filename"": ""openxlVersion30_v30.safetensors"",
        ""width"": 1024,
        ""height"": 1024,
        ""steps"": 25,
        ""cfgScale"": 7,
        ""sampler"": ""dpmpp_2m_sde_gpu"",
        ""scheduler"": ""normal""
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
    public async Task Can_call_text_to_speech_api()
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

    [Test]
    public async Task Can_call_text_to_image_api()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfyTextToImageResponse? response = null;
        try
        {
            response = await client.PostAsync(new ComfyTextToImage()
            {
                PositivePrompt = "Beautil sunset over the ocean"
            });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }

        Assert.That(response, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Empty);
    }

    [Test]
    public async Task Can_call_image_to_image_api()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfyImageToImageResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new ComfyImageToImage()
        {
            PositivePrompt = "stormy, dark clouds over the ocean"
        };
        try
        {
            response = client.PostFilesWithRequest<ComfyImageToImageResponse>(req.ToPostUrl(),
                req, 
                new[]
                {
                    new UploadFile("imageInput", 
                        File.OpenRead("files/comfyui_upload_test.png"),
                        "imageInput", "application/json")
                });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_call_image_to_image_upscale_api()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfyImageToImageResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new ComfyImageToImageUpscale()
        {
            
        };
        try
        {
            response = client.PostFilesWithRequest<ComfyImageToImageResponse>(req.ToPostUrl(),
                req, 
                new[]
                {
                    new UploadFile("imageInput", 
                        File.OpenRead("files/comfyui_upload_test.png"),
                        "imageInput", "application/json")
                });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
    }
    
    [Test]
    public async Task Can_call_image_to_image_with_mask_api()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfyImageToImageWithMaskResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new ComfyImageToImageWithMask()
        {
            PositivePrompt = "stormy, dark clouds over the ocean"
        };
        try
        {
            response = client.PostFilesWithRequest<ComfyImageToImageWithMaskResponse>(req.ToPostUrl(),
                req, 
                new[]
                {
                    new UploadFile("imageInput", 
                        File.OpenRead("files/comfyui_upload_test.png"),
                        "imageInput", "image/png"),
                    new UploadFile("maskInput",
                        File.OpenRead("files/comfyui_upload_test_mask.png"),
                        "maskInput", "image/png")
                });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_call_speech_to_text_api()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfySpeechToTextResponse? response = null;
        var filePath = $"files/speech_to_text_test.wav";
        var speechFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(speechFile.Exists, Is.True);
        var req = new ComfySpeechToText();
        try
        {
            response = client.PostFilesWithRequest<ComfySpeechToTextResponse>(req.ToPostUrl(),
                req, 
                new[]
                {
                    new UploadFile("speechInput", 
                        File.OpenRead("files/speech_to_text_test.wav"),
                        "speechInput", "audio/wav")
                });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.Text, Is.Not.Null);
        Assert.That(response.Text, Is.Not.Empty);
        Assert.That(response.Text?.Contains("Greetings", StringComparison.OrdinalIgnoreCase), Is.True);
        Assert.That(response.Text?.Contains("how are you", StringComparison.OrdinalIgnoreCase), Is.True);
    }

    [Test]
    public async Task Can_call_text_to_audio_api()
    {
        var client = CreateClient();
        
        //Assert does not throw
        ComfyTextToAudioResponse? response = null;
        var req = new ComfyTextToAudio()
        {
            PositivePrompt = "ambient music, relaxing sounds, cyberpunk",
            NegativePrompt = "loud noises, heavy metal, rock music"
        };
        
        try
        {
            response = await client.PostAsync(req);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Null);
        Assert.That(response.FilePath, Is.Not.Empty);
        Assert.That(response.FilePath, Does.Contain(".flac"));
    }
    
    [Test]
    public async Task Can_call_image_to_text_api()
    {
        var client = CreateClient();

        //Assert does not throw
        ComfyImageToTextResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new ComfyImageToText();
        try
        {
            response = client.PostFilesWithRequest<ComfyImageToTextResponse>(req.ToPostUrl(),
                req, 
                new[]
                {
                    new UploadFile("imageInput", 
                        File.OpenRead("files/comfyui_upload_test.png"),
                        "imageInput", "image/png")
                });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.Text, Is.Not.Null);
        Assert.That(response.Text, Is.Not.Empty);
        Assert.That(response.Text,Contains.Substring("ocean"));
    }
}