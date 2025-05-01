using System.Collections.Concurrent;
using System.Text.Json;
using System.Text.Json.Nodes;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel.Types;
using NUnit.Framework;
using ServiceStack;
using SixLabors.ImageSharp;

namespace AiServer.Tests;

[Explicit("https://comfy-dell.pvq.app/api is not available")]
public class ComfyUITests
{
    const string BaseUrl = "https://comfy-dell.pvq.app/api";
    private ComfyClient client;
    private CancellationTokenSource cts = new();
    
    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        var apiKey = Environment.GetEnvironmentVariable("COMFY_API_KEY") ?? "testtest1234";
        if (string.IsNullOrEmpty(apiKey))
        {
            Assert.Ignore("COMFY_API_KEY is not set");
        }
        client = new ComfyClient(BaseUrl,apiKey);
    }
    
    [Test]
    public async Task Can_convert_original_workflow_json()
    {
        // Take the original workflow JSON from "files/workflow_simple_generation.json"
        var rawWorkflow = await File.ReadAllTextAsync("workflows/workflow_simple_generation.json");
        
        // Convert the workflow JSON to API JSON
        var apiJson = await client.ConvertWorkflowToApiAsync(rawWorkflow, cts.Token);
        
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
        var models = await client.GetModelsListAsync(cts.Token);
        
        Assert.That(models, Is.Not.Null);
        Assert.That(models.Count, Is.GreaterThan(0));
    }
    
    [Test]
    public async Task Can_delete_model_from_ComfyUI()
    {
        var modelName = "easynegative.safetensors"; // friendly named model
        var deleteRes = await client.DeleteModelAsync(modelName, cts.Token);
        Assert.That(deleteRes, Is.Not.Null);
        Assert.That(deleteRes.Message, Is.Not.Null);
        Assert.That(deleteRes.Message, Is.Not.Empty);
        Assert.That(deleteRes.Message, Is.EqualTo("Model deleted"));

        var models = await client.GetModelsListAsync(cts.Token);
        Assert.That(models, Is.Not.Null);
        Assert.That(models.Any(x => x.Name.Contains(modelName)), Is.False);
    }

    [Test]
    public async Task Can_get_agent_pull_to_download_model()
    {
        var testUrl = "https://civitai.com/api/download/models/9208";
        var testName = "easynegative.safetensors";
        var models = await client.GetModelsListAsync(cts.Token);
        // Assert.That(models, Is.Not.Null);
        // Assert.That(models.Any(x => x.Name.Contains(modelName)), Is.False);

        var downloadRes = await client.DownloadModelAsync(testUrl, testName, cts.Token);
        Assert.That(downloadRes, Is.Not.Null);
        Assert.That(downloadRes.Name, Is.Not.Null);
        Assert.That(downloadRes.Name, Is.Not.Empty);
        Assert.That(downloadRes.Name, Is.EqualTo(testName));
        Assert.That(downloadRes.Progress, Is.Not.Null);
        
        // Poll for the model to be available
        var status = await client.GetDownloadStatusAsync(testName, cts.Token);
        int jobTimeout = 120 * 1000; // 120 seconds
        int pollInterval = 1000; // 1 second
        var now = DateTime.UtcNow;
        while (status.Progress < 100 && (DateTime.UtcNow - now).TotalMilliseconds < jobTimeout)
        {
            await Task.Delay(pollInterval);
            status = await client.GetDownloadStatusAsync(testName, cts.Token);
            Console.WriteLine($"Downloading model: {status.Progress}%");
        }
        
        models = await client.GetModelsListAsync(cts.Token);
        Assert.That(models, Is.Not.Null);
        Assert.That(models.Any(x => x.Name.Contains(testName)), Is.True);
    }

    [Test]
    public async Task Can_use_ComfyClient_TextToSpeech()
    {
        var testDto = new ComfyWorkflowRequest
        {
            PositivePrompt = "Hello there, how are you today?",
            Model = "high:en_US-lessac",
            TaskType = ComfyTaskType.TextToSpeech
        };
        
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;

        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");
        
        Assert.That(capturedStatus, Is.Not.Null);
        var status = capturedStatus;
        
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Files.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Files[0].Type, Is.EqualTo("output"));
        Assert.That(status.Outputs[0].Files[0].Filename, Is.Not.Null);
        // Piper TTS populates output via preview and uses its own subfolder
        Assert.That(status.Outputs[0].Files[0].Subfolder, Is.Not.Null);
        Assert.That(status.Outputs[0].Files[0].Subfolder, Is.Not.Empty);
        Assert.That(string.Equals(status.Outputs[0].Files[0].Subfolder, "piper_tts", StringComparison.InvariantCultureIgnoreCase), Is.True);
        
        // Download result
        var output = await client.DownloadComfyOutputAsync(status.Outputs[0].Files[0], cts.Token);
        Assert.That(output, Is.Not.Null);
        // Save the output to disk with random name
        var outputFilePath = $"files/comfyui_output_{Guid.NewGuid().ToString().Substring(0, 5)}.wav";
        await File.WriteAllBytesAsync(outputFilePath, await output.ReadFullyAsync());
        Assert.That(File.Exists(outputFilePath), Is.True);
        
        // Read file back and send it to SpeechToText
        var speechToTextDto = new ComfyWorkflowRequest
        {
            Model = "base",
            AudioInput = File.OpenRead(outputFilePath),
            TaskType = ComfyTaskType.SpeechToText
        };
        
        using var sttGenerationEventSlim = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? sstCapturedStatus = null;
        
        var speechToTextResponse = await client.PromptGenerationAsync(speechToTextDto, cts.Token, (sttPromptId, sttStatus) =>
        {
            Console.WriteLine($"Generation completed: {sttPromptId}");
            sstCapturedStatus = sttStatus;
            sttGenerationEventSlim.Set(); // Signal that the event has fired
        });
        
        Assert.That(speechToTextResponse, Is.Not.Null);
        Assert.That(speechToTextResponse.PromptId, Is.Not.Empty);

        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool sstEventFired = sttGenerationEventSlim.Wait(TimeSpan.FromSeconds(60));
        Assert.That(sstEventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");
        
        status = sstCapturedStatus;
        
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
        Assert.That(status.Outputs, Is.Not.Empty);
        Assert.That(status.Outputs.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Texts.Count, Is.EqualTo(1));
        Assert.That(status.Outputs[0].Texts[0].Text, Is.Not.Null);
        Assert.That(status.Outputs[0].Texts[0].Text, Is.Not.Empty);
        Assert.That(status.Outputs[0].Texts[0].Text.Contains("Hello there, how are you today?", StringComparison.OrdinalIgnoreCase), Is.True);
    }

    [Test]
    public async Task Can_use_ComfyClient_SpeechToText()
    {
        var testDto = new ComfyWorkflowRequest
        {
            Model = "base",
            AudioInput = File.OpenRead("files/speech_to_text_test.wav"),
            TaskType = ComfyTaskType.SpeechToText
        };
        
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;
        
        string? genId = null;
        
        var response = await client.PromptGenerationAsync(testDto, cts.Token,(promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);

        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");
        
        Assert.That(capturedStatus, Is.Not.Null);
        var status = capturedStatus;
        
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
        var testDto = new ComfyWorkflowRequest()
        {
            Model = "stable_audio_open_1.0.safetensors",
            Clip = "t5_base.safetensors",
            Steps = 50,
            SampleLength = 47.6,
            CfgScale = 4,
            Sampler = ComfySampler.dpmpp_2s_ancestral,
            PositivePrompt = "electronic, ambient,orchestral,sad,memories,cyberpunk,rain,afterlife",
            NegativePrompt = "loud,metal,rock,fast,aggressive,angry,violent,chaotic",
            Seed = 42,
            TaskType = ComfyTaskType.TextToAudio
        };
        
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;
        
        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");

        var status = capturedStatus;
        Assert.That(status, Is.Not.Null);
        Assert.That(status.StatusMessage, Is.EqualTo("success"));
        Assert.That(status.Completed, Is.EqualTo(true));
    }

    [Test]
    public async Task Can_use_ComfyClient_ImageToText()
    {
        var testDto = new ComfyWorkflowRequest
        {
            ImageInput = File.OpenRead("files/comfyui_upload_test.png"),
            TaskType = ComfyTaskType.ImageToText
        };
        
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;
        
        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");

        var status = capturedStatus;
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
        var testDto = new ComfyWorkflowRequest()
        {
            ImageInput = File.OpenRead("files/comfyui_upload_test.png"),
            MaskInput = File.OpenRead("files/comfyui_upload_test_mask.png"),
            Model = "zavychromaxl_v80.safetensors",
            CfgScale = 7,
            Width = 512,
            Height = 512,
            Sampler = ComfySampler.euler_ancestral,
            Scheduler = "normal",
            Steps = 25,
            Denoise = 0.75,
            BatchSize = 1,
            PositivePrompt = "photorealistic,realistic,stormy,scary,gloomy",
            NegativePrompt = "cartoon,painting,3d, lowres, text, watermark,low quality, blurry, noisy image",
            Seed = 42,
            TaskType = ComfyTaskType.ImageWithMask
        };
        
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;
        
        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");
        
        Assert.That(capturedStatus, Is.Not.Null);
        var status = capturedStatus;

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
        var testDto = new ComfyWorkflowRequest
        {
            ImageInput = File.OpenRead("files/comfyui_upload_test.png"),
            TaskType = ComfyTaskType.ImageUpscale
        };
        
                
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;
        
        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);

        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");
        
        Assert.That(capturedStatus, Is.Not.Null);
        var status = capturedStatus;
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
        var outputImage = await client.DownloadComfyOutputAsync(
            status.Outputs.Select(x => x.Files.FirstOrDefault()).FirstOrDefault() ?? throw new InvalidOperationException(), 
            cts.Token);
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
        var testDto = new ComfyWorkflowRequest
        {
            CfgScale = 7,
            Model = "zavychromaxl_v80.safetensors",
            Sampler = ComfySampler.euler_ancestral,
            Steps = 20,
            Denoise = 0.75d,
            ImageInput = File.OpenRead("files/comfyui_upload_test.png"),
            BatchSize = 2,
            PositivePrompt = "photorealistic,realistic,stormy,scary,gloomy",
            NegativePrompt = "cartoon,painting,3d, lowres, text, watermark,low quality, blurry, noisy image",
            Seed = 42,
            TaskType = ComfyTaskType.ImageToImage
        };
        
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;

        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });

        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);

        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));

        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");

        // Now perform assertions on the captured status
        Assert.That(capturedStatus, Is.Not.Null);
        
        // Call the GetWorkflowStatusAsync method to get the status of the job
        var status = await client.GetWorkflowStatusAsync(response.PromptId, cts.Token);
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
        var testDto = new ComfyWorkflowRequest
        {
            CfgScale = 7,
            Seed = Random.Shared.Next(),
            Height = 1024,
            Width = 1024,
            Model = "zavychromaxl_v80.safetensors",
            Sampler = ComfySampler.euler_ancestral,
            BatchSize = 1,
            Steps = 20,
            PositivePrompt = "A beautiful sunset over the ocean",
            NegativePrompt = "low quality, blurry, noisy image",
            TaskType = ComfyTaskType.TextToImage
        };
        
                
        using var generationCompleteEvent = new ManualResetEventSlim(false);
        ComfyWorkflowStatus? capturedStatus = null;

        string? genId = null;
        
        var response = await client.PromptGenerationAsync(testDto, cts.Token, (promptId, status) =>
        {
            Console.WriteLine($"Generation completed: {promptId}");
            capturedStatus = status;
            generationCompleteEvent.Set(); // Signal that the event has fired
        });
        
        Assert.That(response, Is.Not.Null);
        Assert.That(response.PromptId, Is.Not.Empty);
        
        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));

        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");


        var status = capturedStatus;

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
    public async Task Can_force_race_condition_test()
    {
        var comfyReq = new ComfyWorkflowRequest
        {
            Model = "zavychromaxl_v80.safetensors",
            Width = 512,
            Height = 512,
            Sampler = ComfySampler.euler_ancestral,
            BatchSize = 1,
            Seed = 22,
            PositivePrompt = "A beautiful sunset over the ocean",
            NegativePrompt = "low quality, blurry, noisy, compression artifacts",
            Scheduler = "normal",
            Steps = 25,
            CfgScale = 7,
            TaskType = ComfyTaskType.TextToImage
        };

        using var generationCompleteEvent = new ManualResetEventSlim(false);
        
        ConcurrentDictionary<string,int> completionStatus = new ConcurrentDictionary<string, int>();
        
        // Fire each request creating a new callback for each
        var count = 20;
        var completedIdList = new List<string>();
        for(var index = 0; index < count; index++)
        {
            if (index % 5 == 0)
                comfyReq.Seed++;
            var task = client.PromptGenerationAsync(comfyReq, cts.Token, (promptId, status) =>
            {
                completedIdList.Add(promptId);
                completionStatus[promptId] = 1;
                Console.WriteLine($"Generation completed: {promptId}");
                if (completionStatus.Values.All(x => x == 1) && completedIdList.Count == count)
                {
                    generationCompleteEvent.Set(); // Signal that the event has fired
                }
            });
            var response = await task;
            completionStatus.TryAdd(response.PromptId, 0);
        }
        
        // Wait for the GenerationComplete event to fire or timeout after 60 seconds
        bool eventFired = generationCompleteEvent.Wait(TimeSpan.FromSeconds(60));
        Assert.That(eventFired, Is.True, "GenerationComplete event did not fire within the expected timeframe");
        Assert.That(completionStatus.Values.All(x => x == 1), Is.True);
        Assert.That(completionStatus.Count, Is.EqualTo(count));
    }

    [Test]
    public async Task Can_upload_image_asset()
    {
        var filePath = "files/comfyui_upload_test.png";
        // Read stream
        var fileStream = File.OpenRead(filePath);
        // Alter name to be unique
        var fileName = $"ComfyUI_{Guid.NewGuid().ToString().Substring(0, 5)}_00001_.png";
        var response = await client.UploadImageAssetAsync(fileStream, fileName, cts.Token);
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
            $"ComfyUI_test_{Guid.NewGuid().ToString().Substring(0, 5)}_00001_.png",
            cts.Token);
        
        // Init test DTO
        var testDto = new ComfyWorkflowRequest
        {
            Image = comfyInput,
            TaskType = ComfyTaskType.ImageUpscale
        };
        
        // Convert template to JSON
        var jsonTemplate = await client.PopulateWorkflowAsync(testDto.ToObjectDictionary(),client.DefaultImageToImageUpscaleTemplate,cts.Token);
        
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
            $"ComfyUI_test_{Guid.NewGuid().ToString().Substring(0, 5)}_00001_.png", cts.Token);
        
        // Init test DTO
        var testDto = new ComfyWorkflowRequest
        {
            CfgScale = 7,
            Seed = Random.Shared.Next(),
            Model = "zavychromaxl_v80.safetensors",
            Sampler = ComfySampler.euler_ancestral,
            Steps = 20,
            Denoise = 0.75d,
            PositivePrompt = "photorealistic,realistic,stormy,scary,gloomy",
            NegativePrompt = "cartoon,painting,3d, lowres, text, watermark,low quality, blurry, noisy image",
            Image = comfyInput,
            TaskType = ComfyTaskType.ImageToImage
        };
        
        // Convert template to JSON
        var jsonTemplate = await client.PopulateWorkflowAsync(testDto.ToObjectDictionary(),client.DefaultImageToImageTemplate, cts.Token);
        
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
        var testDto = new ComfyWorkflowRequest
        {
            CfgScale = 7,
            Seed = Random.Shared.Next(),
            Height = 1024,
            Width = 1024,
            Model = "zavychromaxl_v80.safetensors",
            Sampler = ComfySampler.euler_ancestral,
            BatchSize = 1,
            Steps = 20,
            PositivePrompt = "A beautiful sunset over the ocean",
            NegativePrompt = "low quality, blurry, noisy image",
            TaskType = ComfyTaskType.TextToImage
        };
        
        // Convert template to JSON
        var jsonTemplate = await client.PopulateWorkflowAsync(testDto.ToObjectDictionary(),client.DefaultTextToImageTemplate, cts.Token);
        
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
