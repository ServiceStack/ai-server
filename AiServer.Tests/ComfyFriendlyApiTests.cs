using AiServer.ServiceInterface;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Funq;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Messaging;

namespace AiServer.Tests;

[Explicit("https://comfy-dell.pvq.app/api is not available")]
public class ComfyFriendlyApiTests
{
    public IServiceClient CreateClient()
    {
        ConfigureSecrets.ApplySecrets();
        return TestUtils.CreateAuthSecretClient();
    }
    private ConfigureSecrets ConfigureSecrets = new();

    [Test]
    public async Task Can_call_text_to_speech_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        try
        {
            response = await client.PostAsync(new CreateComfyGeneration
            {
                Request = new ComfyWorkflowRequest
                {
                    PositivePrompt = "Hello World!",
                    TaskType = ComfyTaskType.TextToSpeech
                },
            });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Empty);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Empty);
    }

    [Test]
    public async Task Can_call_text_to_image_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        try
        {
            response = await client.PostAsync(new CreateComfyGeneration()
            {
                Request = new ComfyWorkflowRequest
                {
                    PositivePrompt = "Beautiful sunset over the ocean",
                    TaskType = ComfyTaskType.TextToImage
                }
            });
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Null);
        Assert.That(response.RefId, Is.Not.Empty);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Outputs, Is.Not.Null);
        Assert.That(result.Outputs.Count, Is.GreaterThan(0));
        Assert.That(result.Outputs[0].Url, Is.Not.Null);
        Assert.That(result.Outputs[0].Url, Is.Not.Empty);
        Assert.That(result.Outputs[0].FileName, Is.Not.Null);
        Assert.That(result.Outputs[0].FileName, Is.Not.Empty);
    }

    [Test]
    public async Task Can_call_image_to_image_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new CreateComfyGeneration()
        {
            Request = new ComfyWorkflowRequest
            {
                PositivePrompt = "stormy, dark clouds over the ocean",
                ImageInput = File.OpenRead("files/comfyui_upload_test.png"),
                TaskType = ComfyTaskType.ImageToImage
            }
        };
        try
        {
            response = client.PostFilesWithRequest<CreateComfyGenerationResponse>(req.ToPostUrl(),
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
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_call_image_to_image_upscale_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new CreateComfyGeneration()
        {
            Request = new ComfyWorkflowRequest
            {
                TaskType = ComfyTaskType.ImageToImageUpscale
            }
        };
        try
        {
            response = client.PostFilesWithRequest<CreateComfyGenerationResponse>(req.ToPostUrl(),
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
            if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
            {
                // Ignore
            }
            else
            {
                Assert.Fail(e.Message);
            }
        }
        
        Assert.That(response, Is.Not.Null);
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                Assert.Fail(e.Message);
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Outputs, Is.Not.Null);
        Assert.That(result.Outputs, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_call_image_to_image_with_mask_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new CreateComfyGeneration()
        {
            Request = new ComfyWorkflowRequest
            {
                PositivePrompt = "stormy, dark clouds over the ocean",
                TaskType = ComfyTaskType.ImageToImageWithMask,
                MaskInput = File.OpenRead("files/comfyui_upload_test_mask.png"),
                ImageInput = File.OpenRead("files/comfyui_upload_test.png")
            }
        };
        try
        {
            response = client.PostFilesWithRequest<CreateComfyGenerationResponse>(req.ToPostUrl(),
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
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Empty);
    }
    
    [Test]
    public async Task Can_call_speech_to_text_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        var filePath = $"files/speech_to_text_test.wav";
        var speechFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(speechFile.Exists, Is.True);
        var req = new CreateComfyGeneration()
        {
            Request = new ComfyWorkflowRequest
            {
                TaskType = ComfyTaskType.SpeechToText,
                SpeechInput = File.OpenRead("files/speech_to_text_test.wav")
            }
        };
        try
        {
            response = client.PostFilesWithRequest<CreateComfyGenerationResponse>(req.ToPostUrl(),
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
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Result, Is.Not.Null);
        Assert.That(result?.Result?.Outputs, Is.Not.Null);
        Assert.That(result?.Result?.Outputs, Is.Not.Empty);
        Assert.That(result?.Result?.Outputs.Any(x => x.Texts.Count > 0), Is.True);
        Assert.That(result?.Result?.Outputs[0].Texts[0].Text.Contains("Greetings", StringComparison.OrdinalIgnoreCase), Is.True);
        Assert.That(result?.Result?.Outputs[0].Texts[0].Text.Contains("how are you", StringComparison.OrdinalIgnoreCase), Is.True);
    }

    [Test]
    public async Task Can_call_text_to_audio_api()
    {
        var client = CreateClient();
        
        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        var req = new CreateComfyGeneration()
        {
            Request = new ComfyWorkflowRequest
            {
                PositivePrompt = "ambient music, relaxing sounds, cyberpunk",
                NegativePrompt = "loud noises, heavy metal, rock music",
                TaskType = ComfyTaskType.TextToAudio
            }
        };
        
        try
        {
            response = await client.PostAsync(req);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Empty);
        Assert.That(result?.Outputs?[0].FileName, Does.Contain(".flac"));
    }
    
    [Test]
    public async Task Can_call_image_to_text_api()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        var filePath = $"files/comfyui_upload_test.png";
        var imageFile = new FileInfo(filePath);
        // Assert file exists
        Assert.That(imageFile.Exists, Is.True);
        var req = new CreateComfyGeneration()
        {
            Request = new ComfyWorkflowRequest
            {
                TaskType = ComfyTaskType.ImageToText,
                ImageInput = File.OpenRead("files/comfyui_upload_test.png"),
            }
        };
        try
        {
            response = client.PostFilesWithRequest<CreateComfyGenerationResponse>(req.ToPostUrl(),
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
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }
        }
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Result, Is.Not.Null);
        Assert.That(result?.Result?.Outputs, Is.Not.Null);
        Assert.That(result?.Result?.Outputs, Is.Not.Empty);
        Assert.That(result?.Result?.Outputs[0].Texts, Is.Not.Null);
        Assert.That(result?.Result?.Outputs[0].Texts, Is.Not.Empty);
        Assert.That(result?.Result?.Outputs[0].Texts[0].Text, Is.Not.Empty);
        Assert.That(result?.Result?.Outputs[0].Texts[0].Text,Contains.Substring("ocean"));
    }
    
    // Used by BlazorDiffusion so that consuming applications can repeat the same request
    // One issue is that the seed value is only related to the request and not each image generated.
    // Comfy does not return a seed per image.
    // One work around might be that all templates should use "increment" as the seed strategy, but 
    // what ComfyUI does with this option still needs to be tested.
    [Test]
    public async Task Can_return_original_seed_value_in_request()
    {
        var client = CreateClient();

        //Assert does not throw
        CreateComfyGenerationResponse? response = null;
        // Use TextToImage as example.
        var req = new CreateComfyGeneration()
        {
            Request = new ()
            {
                PositivePrompt = "Beautiful sunset over the ocean",
                Seed = 123456,
                TaskType = ComfyTaskType.TextToImage
            }
        };
        try
        {
            response = await client.PostAsync(req);
        }
        catch (Exception e)
        {
            Assert.Fail(e.Message);
        }
        
        // Poll for result
        var timeout = DateTime.UtcNow.AddSeconds(30);
        GetComfyGenerationResponse? result = null;
        while (timeout > DateTime.UtcNow && result?.Result?.Completed != true)
        {
            try
            {
                result = await client.PostAsync(new GetComfyGeneration
                {
                    RefId = response.RefId
                });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                {
                    // Ignore
                }
                else
                {
                    Assert.Fail(e.Message);
                }
            }

            Assert.That(result, Is.Not.Null);
        }
        
        Assert.That(result, Is.Not.Null);
        
        Assert.That(result, Is.Not.Null);
        Assert.That(result?.Outputs, Is.Not.Null);
        Assert.That(result?.Outputs?.Count, Is.GreaterThan(0));
        Assert.That(result?.Outputs?[0].Url, Is.Not.Null);
        Assert.That(result?.Outputs?[0].Url, Is.Not.Empty);
        Assert.That(result?.Outputs?[0].FileName, Is.Not.Null);
        Assert.That(result?.Outputs?[0].FileName, Is.Not.Empty);
        Assert.That(result?.Request?.Request, Is.Not.Null);
        Assert.That(result?.Request?.Request?.Seed, Is.EqualTo(123456));
    }
}