using System.Text.Json;
using System.Text.Json.Nodes;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;
using JsonObject = System.Text.Json.Nodes.JsonObject;
using System.Drawing;
using SixLabors.ImageSharp;

namespace AiServer.Tests;

public class ComfyUITests
{
    const string BaseUrl = "http://localhost:7860/api";
    private ComfyClient client;
    
    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        var apiKey = Environment.GetEnvironmentVariable("COMFY_API_KEY") ?? "testtest1234";
        if (string.IsNullOrEmpty(apiKey))
        {
            Assert.Ignore("COMFY_API_KEY is not set");
        }
        client = new ComfyClient(BaseUrl, apiKey);
    }
    
    [Test]
    public async Task Can_convert_original_workflow_json()
    {
        // Take the original workflow JSON from "files/workflow_simple_generation.json"
        var rawWorkflow = System.IO.File.ReadAllText("workflows/workflow_simple_generation.json");
        
        // Convert the workflow JSON to API JSON
        var apiJson = await client.ConvertWorkflowToApiAsync(rawWorkflow);
        
        File.WriteAllText("files/api_simple_generation.json", apiJson);
        
        // Assert that the API JSON is not null
        Assert.That(apiJson, Is.Not.Null);
        
        // Assert that the API JSON is not empty
        Assert.That(apiJson, Is.Not.Empty);
        
        // Convert to JObject
        var apiData = JsonNode.Parse(apiJson);
        Assert.That(apiData, Is.Not.Null);
        Assert.That(apiData["prompt"], Is.Not.Null);
        Assert.That(apiData["prompt"].AsObject().Count, Is.GreaterThan(0));
        Assert.That(apiData["prompt"].AsObject().Count, Is.EqualTo(7));
        var prompt = apiData["prompt"].AsObject();
        Assert.That(prompt, Is.Not.Null);
        Assert.That(prompt.ContainsKey("10"), Is.True);
        Assert.That(prompt["10"], Is.Not.Null);
        var imageNode = prompt["10"].AsObject();
        Assert.That(imageNode, Is.Not.Null);
        Assert.That(imageNode.ContainsKey("class_type"), Is.True);
        Assert.That(imageNode["class_type"].GetValue<string>(), Is.EqualTo("PreviewImage"));
        Assert.That(imageNode.ContainsKey("inputs"), Is.True);
        var inputs = imageNode["inputs"].AsObject();
        Assert.That(inputs, Is.Not.Null);
        Assert.That(inputs.ContainsKey("images"), Is.True);
        var images = inputs["images"].AsArray();
        Assert.That(images, Is.Not.Null);
        Assert.That(images.Count, Is.EqualTo(2));
        Assert.That(images[0].GetValue<string>(), Is.EqualTo("8"));
        Assert.That(images[1].GetValue<int>(), Is.EqualTo(0));
    }

    [Test]
    public async Task Can_fetch_all_models_from_ComfyUI()
    {
        var models = await client.GetModelsListAsync();
        
        Assert.That(models, Is.Not.Null);
        Assert.That(models.Count, Is.GreaterThan(0));
    }
    
    [Test]
    public async Task Can_delete_model_from_ComfyUI()
    {
        var modelName = "easynegative.safetensors"; // friendly named model
        var deleteRes = await client.DeleteModelAsync(modelName);
        Assert.That(deleteRes, Is.Not.Null);
        Assert.That(deleteRes, Is.Not.Empty);

        var models = await client.GetModelsListAsync();
        Assert.That(models, Is.Not.Null);
        Assert.That(models.Any(x => x.Name.Contains(modelName)), Is.False);
    }

    [Test]
    public async Task Can_get_agent_pull_to_download_model()
    {
        var testUrl = "https://civitai.com/api/download/models/9208";
        var testName = "easynegative.safetensors";
        var models = await client.GetModelsListAsync();
        // Assert.That(models, Is.Not.Null);
        // Assert.That(models.Any(x => x.Name.Contains(modelName)), Is.False);

        var downloadRes = await client.DownloadModelAsync(testUrl, testName);
        Assert.That(downloadRes, Is.Not.Null);
        Assert.That(downloadRes, Is.Not.Empty);
        
        // Poll for the model to be available
        var status = await client.GetDownloadStatusAsync(testName);
        int jobTimeout = 120 * 1000; // 120 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Progress < 100 && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetDownloadStatusAsync(testName);
            Console.WriteLine($"Downloading model: {status.Progress}%");
        }
        
        models = await client.GetModelsListAsync();
        Assert.That(models, Is.Not.Null);
        Assert.That(models.Any(x => x.Name.Contains(testName)), Is.True);
    }

    [Test]
    public async Task Can_use_ComfyClient_SpeechToText()
    {
        var testDto = new OpenAiWhisperSpeechToText()
        {
            Model = "base",
            File = File.OpenRead("files/speech_to_text_test.wav")
        };
        
        var response = await client.GenerateSpeechToTextAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 30 * 1000; // 30 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Texts.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Texts[0].Text, Is.Not.Null);
        Assert.That(status.Outputs[0].Texts[0].Text, Is.Not.Empty);
        Assert.That(status.Outputs[0].Texts[0].Text.Contains("Greetings, how are you?", StringComparison.OrdinalIgnoreCase), Is.True);
    }
    
    [Test]
    public async Task Can_use_ComfyClient_TextToAudio()
    {
        var testDto = new StableAudioTextToAudio
        {
            Sampler = StableDiffusionSampler.K_DPMPP_2S_ANCESTRAL,
            TextPrompts = new List<TextPrompt>
            {
                new()
                {
                    Text = "electronic, ambient,orchestral,sad,memories,cyberpunk,rain,afterlife",
                    Weight = 1.0d
                },
                new()
                {
                    Text = "loud,metal,rock,fast,aggressive,angry,violent,chaotic",
                    Weight = -1.0d
                }
            }
        };
        
        var response = await client.GenerateTextToAudioAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 30 * 1000; // 30 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
    }

    [Test]
    public async Task Can_use_ComfyClient_ImageToText()
    {
        var testDto = new StableDiffusionImageToText()
        {
            InitImage = File.OpenRead("files/comfyui_upload_test.png"),
        };
        
        var response = await client.GenerateImageToTextAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 90 * 1000; // 30 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        // Not image output
        Assert.That(status.Outputs[0].Files.Count, Is.EqualTo(0));
        // Has text output
        Assert.That(status.Outputs[0].Texts.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Texts[0].Text, Is.Not.Null);
        Assert.That(status.Outputs[0].Texts[0].Text, Is.Not.Empty);
        Assert.That(status.Outputs[0].Texts[0].Text.Contains("sunset", StringComparison.OrdinalIgnoreCase), Is.True);
    }

    [Test]
    public async Task Can_use_ComfyClient_ImageToImageWithMask()
    {
        var testDto = new StableDiffusionImageToImageWithMask()
        {
            InitImage = File.OpenRead("files/comfyui_upload_test.png"),
            MaskImage = File.OpenRead("files/comfyui_upload_test_mask.png"),
            EngineId = "zavychromaxl_v80.safetensors",
            TextPrompts = new List<TextPrompt>
            {
                new()
                {
                    Text = "photorealistic,realistic,stormy,scary,gloomy",
                    Weight = 1.0d,
                },
                new()
                {
                    Text = "cartoon,painting,3d, lowres, text, watermark,low quality, blurry, noisy image",
                    Weight = -1.0d,
                }
            }
        };
        
        var response = await client.GenerateImageToImageWithMaskAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 30 * 1000; // 30 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        
        Assert.That(status.Outputs[0].Files.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Files[0].Type, Is.EqualTo("temp"));
        Assert.That(status.Outputs[0].Files[0].Filename, Is.Not.Null);
        Assert.That(status.Outputs[0].Files[0].Filename.Contains("ComfyUI_temp"), Is.True);
    }

    [Test]
    public async Task Can_use_ComfyClient_ImageToImageUpscale()
    {
        var testDto = new StableDiffusionImageToImageUpscale()
        {
            Image = File.OpenRead("files/comfyui_upload_test.png"),
        };
        
        var response = await client.GenerateImageToImageUpscaleAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 30 * 1000; // 30 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        
        Assert.That(status.Outputs[0].Files.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Files[0].Type, Is.EqualTo("temp"));
        Assert.That(status.Outputs[0].Files[0].Filename, Is.Not.Null);
        Assert.That(status.Outputs[0].Files[0].Filename.Contains("ComfyUI_temp"), Is.True);
        
        // Check that the output image is scaled up
        var outputImage = await client.DownloadComfyOutputAsync(status.Outputs.Select(x => x.Files.FirstOrDefault()).FirstOrDefault() ?? throw new InvalidOperationException());
        Assert.That(outputImage, Is.Not.Null);
        // Save the output image to disk with random name
        var outputFilePath = $"files/comfyui_output_{Guid.NewGuid().ToString().Substring(0, 5)}.png";
        await File.WriteAllBytesAsync(outputFilePath, await outputImage.ReadFullyAsync());
        Assert.That(File.Exists(outputFilePath), Is.True);
        // Check that the output image is larger than the input image
        using Image image = await Image.LoadAsync(outputFilePath);
        int width = image.Width;
        int height = image.Height;

        using Image inputImage = await Image.LoadAsync("files/comfyui_upload_test.png");
        int inputWidth = inputImage.Width;
        int inputHeight = inputImage.Height;
        
        Assert.That(width, Is.GreaterThan(inputWidth));
        Assert.That(height, Is.GreaterThan(inputHeight));
    }

    [Test]
    public async Task Can_use_ComfyClient_ImageToImage()
    {
        var testDto = new StableDiffusionImageToImage()
        {
            CfgScale = 7,
            EngineId = "zavychromaxl_v80.safetensors",
            Sampler = StableDiffusionSampler.K_EULER_ANCESTRAL,
            Steps = 20,
            ImageStrength = 0.25d,
            InitImage = File.OpenRead("files/comfyui_upload_test.png"),
            Samples = 2,
            TextPrompts = new List<TextPrompt>
            {
                new()
                {
                    Text = "photorealistic,realistic,stormy,scary,gloomy",
                    Weight = 1.0d,
                },
                new()
                {
                    Text = "cartoon,painting,3d, lowres, text, watermark,low quality, blurry, noisy image",
                    Weight = -1.0d,
                }
            }
        };
        
        var response = await client.GenerateImageToImageAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 30 * 1000; // 30 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        
        Assert.That(status.Outputs[0].Files.Count, Is.EqualTo(2));
        Assert.That(status.Outputs[0].Files[0].Type, Is.EqualTo("temp"));
        Assert.That(status.Outputs[0].Files[0].Filename, Is.Not.Null);
        Assert.That(status.Outputs[0].Files[0].Filename.Contains("ComfyUI_temp"), Is.True);
    }

    [Test]
    public async Task Can_use_ComfyClient_TextToImage()
    {
        // Init test DTO
        var testDto = new StableDiffusionTextToImage()
        {
            CfgScale = 7,
            Seed = Random.Shared.Next(),
            Height = 1024,
            Width = 1024,
            EngineId = "zavychromaxl_v80.safetensors",
            Sampler = StableDiffusionSampler.K_EULER_ANCESTRAL,
            Samples = 1,
            Steps = 20,
            TextPrompts = new List<TextPrompt>
            {
                new()
                {
                    Text = "A beautiful sunset over the ocean",
                    Weight = 1.0d,
                },
                new()
                {
                    Text = "low quality, blurry, noisy image",
                    Weight = -1.0d,
                }
            }
        };
        
        var response = await client.GenerateTextToImageAsync(testDto);
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        var status = await client.GetWorkflowStatusAsync(response.PromptId);
        int jobTimeout = 20 * 1000; // 20 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Completed == false && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetWorkflowStatusAsync(response.PromptId);
        }
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Files.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Files[0].Type, Is.EqualTo("temp"));
        Assert.That(status.Outputs[0].Files[0].Filename, Is.Not.Null);
        Assert.That(status.Outputs[0].Files[0].Filename.Contains("ComfyUI_temp"), Is.True);
    }

    [Test]
    public async Task Can_upload_image_asset()
    {
        var filePath = "files/comfyui_upload_test.png";
        // Read stream
        var fileStream = File.OpenRead(filePath);
        // Alter name to be unique
        var fileName = $"ComfyUI_{Guid.NewGuid().ToString().Substring(0, 5)}_00001_.png";
        var response = await client.UploadImageAssetAsync(fileStream, fileName);
        Assert.That(response, Is.Not.Null);
        Assert.That(response.Name, Is.Not.Null);
        Assert.That(response.Name, Is.EqualTo(fileName));
        Assert.That(response.Type, Is.EqualTo("input"));
        Assert.That(response.Subfolder, Is.EqualTo(""));
    }

    [Test]
    public async Task Can_use_ImageToImageUpscale_from_template_workflow()
    {
        var comfyInput = await client.UploadImageAssetAsync(
            File.OpenRead("files/comfyui_upload_test.png"),
            $"ComfyUI_test_{Guid.NewGuid().ToString().Substring(0, 5)}_00001_.png");
        
        // Init test DTO
        var testDto = new ComfyImageToImageUpscale()
        {
            Image = comfyInput
        };
        
        // Convert template to JSON
        var jsonTemplate = await client.PopulateImageToImageUpscaleWorkflowAsync(testDto);
        
        // Assert that the JSON template is not null
        Assert.That(jsonTemplate, Is.Not.Null);
        // Assert that values are present in the JSON after templating
        Assert.That(jsonTemplate.Contains("RealESRGAN_x2.pth"), Is.True);
        // Parse and check nodes
        var populatedWorkflow = JsonNode.Parse(jsonTemplate);
        Assert.That(populatedWorkflow, Is.Not.Null);
        Assert.That(populatedWorkflow["nodes"], Is.Not.Null);
        Assert.That(populatedWorkflow["nodes"].AsArray().Count, Is.GreaterThan(0));
        Assert.That(populatedWorkflow["nodes"].AsArray().Count, Is.EqualTo(4));
        var nodes = populatedWorkflow["nodes"].AsArray();
        Assert.That(nodes, Is.Not.Null);
        Assert.That(nodes[0].GetValueKind(), Is.EqualTo(JsonValueKind.Object));
    }

    [Test]
    public async Task Can_use_ImageToImage_from_template_workflow()
    {
        var comfyInput = await client.UploadImageAssetAsync(
            File.OpenRead("files/comfyui_upload_test.png"),
            $"ComfyUI_test_{Guid.NewGuid().ToString().Substring(0, 5)}_00001_.png");
        
        // Init test DTO
        var testDto = new ComfyImageToImage()
        {
            CfgScale = 7,
            Seed = Random.Shared.Next(),
            Model = "zavychromaxl_v80.safetensors",
            Sampler = ComfySampler.euler_ancestral,
            Steps = 20,
            Denoise = 0.75d,
            PositivePrompt = "photorealistic,realistic,stormy,scary,gloomy",
            NegativePrompt = "cartoon,painting,3d, lowres, text, watermark,low quality, blurry, noisy image",
            Image = comfyInput
        };
        
        // Convert template to JSON
        var jsonTemplate = await client.PopulateImageToImageWorkflowAsync(testDto);
        
        // Assert that the JSON template is not null
        Assert.That(jsonTemplate, Is.Not.Null);
        // Assert that values are present in the JSON after templating
        Assert.That(jsonTemplate.Contains("photorealistic,realistic,stormy,scary,gloomy"), Is.True);
        // Parse and check nodes
        var populatedWorkflow = JsonNode.Parse(jsonTemplate);
        Assert.That(populatedWorkflow, Is.Not.Null);
        Assert.That(populatedWorkflow["nodes"], Is.Not.Null);
        Assert.That(populatedWorkflow["nodes"].AsArray().Count, Is.GreaterThan(0));
        Assert.That(populatedWorkflow["nodes"].AsArray().Count, Is.EqualTo(9));
        var nodes = populatedWorkflow["nodes"].AsArray();
        Assert.That(nodes, Is.Not.Null);
        Assert.That(nodes[0].GetValueKind(), Is.EqualTo(JsonValueKind.Object));
    }

    [Test]
    public async Task Can_use_TextToImage_from_template_workflow()
    {
        // Init test DTO
        var testDto = new ComfyTextToImage()
        {
            CfgScale = 7,
            Seed = Random.Shared.NextInt64(),
            Height = 1024,
            Width = 1024,
            Model = "zavychromaxl_v80.safetensors",
            Sampler = ComfySampler.euler_ancestral,
            BatchSize = 1,
            Steps = 20,
            PositivePrompt = "A beautiful sunset over the ocean",
            NegativePrompt = "low quality, blurry, noisy image",
        };
        
        // Convert template to JSON
        var jsonTemplate = await client.PopulateTextToImageWorkflowAsync(testDto);
        
        // Assert that the JSON template is not null
        Assert.That(jsonTemplate, Is.Not.Null);
        // Assert that values are present in the JSON after templating
        Assert.That(jsonTemplate.Contains("A beautiful sunset over the ocean"), Is.True);
        // Parse and check nodes
        var populatedWorkflow = JsonNode.Parse(jsonTemplate);
        Assert.That(populatedWorkflow, Is.Not.Null);
        Assert.That(populatedWorkflow["nodes"], Is.Not.Null);
        Assert.That(populatedWorkflow["nodes"].AsArray().Count, Is.GreaterThan(0));
        Assert.That(populatedWorkflow["nodes"].AsArray().Count, Is.EqualTo(7));
        var nodes = populatedWorkflow["nodes"].AsArray();
        Assert.That(nodes, Is.Not.Null);
        Assert.That(nodes[0].GetValueKind(), Is.EqualTo(JsonValueKind.Object));
    }
}
