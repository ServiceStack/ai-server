using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using AiServer.ServiceInterface;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;

namespace AiServer.Tests;

/*
 * All Nodes: http://localhost:7860/api/object_info
 * Single Node: http://localhost:7860/api/object_info/KSampler
 * All Workflows: http://localhost:7860/api/userdata?dir=workflows&recurse=true&split=false&full_info=true
 * Execution History: http://localhost:7860/api/history?max_items=1
 * Models: http://localhost:7860/api/experiment/models
 * Text Encoders: http://localhost:7860/api/experiment/models/text_encoders
 */
[Explicit("Integration tests")]
public class ComfyWorkflowExecuteTests
{
    private IServiceProvider serviceProvider;
    string ComfyEndpoint = "http://localhost:7860";
    private string ApiKey = Environment.GetEnvironmentVariable("AI_SERVER_API_KEY");
    Dictionary<string, NodeInfo> NodeDefs;

    public ComfyWorkflowExecuteTests()
    {
        var services = new ServiceCollection();
        services.AddHttpClient(nameof(ComfyGateway));
        serviceProvider = services.BuildServiceProvider();

        var objectInfoPath = Path.Combine(AppContext.BaseDirectory, "../../../files/object_info.json");
        NodeDefs = ComfyMetadata.Instance.LoadObjectInfo(File.ReadAllText(objectInfoPath), ComfyEndpoint);
    }

    ComfyGateway CreateGateway() => new(NullLogger<ComfyGateway>.Instance, serviceProvider.GetRequiredService<IHttpClientFactory>(), ComfyMetadata.Instance);

    private async Task<string> CreateApiPrompt(string workflowPath)
    {
        var workflowFullPath = Path.Combine(AppContext.BaseDirectory, $"../../../workflows/{workflowPath}");
        var workflowJson = await File.ReadAllTextAsync(workflowFullPath);

        var promptJson = ComfyConverters.ConvertWorkflowToApiPrompt(workflowJson, NodeDefs);
        return promptJson;
    }

    private async Task<string> ExecutePrompt(string promptJson)
    {
        // Test with a real ComfyUI server
        var gateway = CreateGateway();
        using var client = gateway.CreateHttpClient(ComfyEndpoint, ApiKey);

        // Set a reasonable timeout for the request
        client.Timeout = TimeSpan.FromMinutes(2);

        try
        {
            var response = await client.PostAsync("/api/prompt",
                new StringContent(promptJson, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                var errorJson = await response.Content.ReadAsStringAsync();
                Console.WriteLine("ComfyUI API Error:");
                Console.WriteLine(JsonSerializer.Serialize(JsonSerializer.Deserialize<JsonNode>(errorJson),
                    new JsonSerializerOptions { WriteIndented = true }));

                // Don't fail the test if the server returns an error that's not related to our JSON format
                Assert.Fail($"ComfyUI API returned an error: {response.StatusCode}");
            }

            var result = await response.Content.ReadAsStringAsync();

            // Verify the response contains a prompt_id
            var responseJson = JsonNode.Parse(result);
            Assert.That(responseJson?["prompt_id"], Is.Not.Null, "Response should contain a prompt_id");
            return JsonSerializer.Serialize(responseJson, new JsonSerializerOptions { WriteIndented = true });
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"HTTP Error: {ex.Message}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
            }

            throw;
        }
    }

    [Test]
    public void Can_load_ObjectInfo()
    {
        var objectInfoPath = Path.Combine(AppContext.BaseDirectory, "../../../files/object_info.json");
        var nodeDefinitions = ComfyMetadata.Instance.LoadObjectInfo(
            File.ReadAllText(objectInfoPath), ComfyEndpoint);
        Assert.That(nodeDefinitions.Count, Is.GreaterThan(300));
    }

    [Test]
    public async Task Can_execute_basic_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/basic.json");
        Console.WriteLine(promptJson);

        // Verify the converted JSON is valid and contains expected elements
        var jsonNode = JsonNode.Parse(promptJson);
        Assert.That(jsonNode, Is.Not.Null);
        Assert.That(jsonNode["prompt"], Is.Not.Null);

        // Verify some key nodes from the workflow are present in the converted JSON
        var prompt = jsonNode["prompt"].AsObject();
        Assert.That(prompt.ContainsKey("4"), Is.True, "CheckpointLoaderSimple node should be present");
        Assert.That(prompt.ContainsKey("3"), Is.True, "KSampler node should be present");
        Assert.That(prompt.ContainsKey("5"), Is.True, "EmptyLatentImage node should be present");
        Assert.That(prompt.ContainsKey("8"), Is.True, "VAEDecode node should be present");
        Assert.That(prompt.ContainsKey("9"), Is.True, "SaveImage node should be present");

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public void Can_convert_all_TextToImage_models()
    {
        var workflowDir =
            new DirectoryInfo(Path.Combine(AppContext.BaseDirectory, "../../../workflows/text-to-image/"));
        foreach (var workflowFile in workflowDir.GetFiles())
        {
            Console.WriteLine($"Converting {workflowFile.Name}:");
            var workflowJson = File.ReadAllText(workflowFile.FullName);
            var promptJson =
                ComfyConverters.ConvertWorkflowToApiPrompt(workflowJson, NodeDefs, log:NullLogger.Instance);
            // Console.WriteLine(promptJson);
        }
    }

    [Test]
    public async Task Can_execute_DreamshaperXL_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/dreamshaperXL.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_FluxSchnell_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/flux1-schnell.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_Hidream_Dev_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/hidream_i1_dev_fp8.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_JibMixRealisticXL_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/jibMixRealisticXL.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_JuggernautXL_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/juggernautXL.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_RealvisXL_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/realvisxl.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_SD35_Large_FP8_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/sd3.5_large_fp8_scaled.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_SD35_Large_Turbo_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/sd3.5_large_turbo.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_SDXL_lightning_Workflow()
    {
        var promptJson = await CreateApiPrompt("text-to-image/sdxl_lightning_4step.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_Florence2_ImageToText_Workflow()
    {
        var promptJson = await CreateApiPrompt("image-to-text/florence2.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_SD15_pruned_emaonly_ImageToImage_Workflow()
    {
        var promptJson = await CreateApiPrompt("image-to-image/sd1.5_pruned_emaonly.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_SD15_pruned_emaonly_AudioToText_Workflow()
    {
        var promptJson = await CreateApiPrompt("audio-to-text/transcribe-audio-whisper.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public async Task Can_execute_Transcribe_Whisper_VideoToText_Workflow()
    {
        var promptJson = await CreateApiPrompt("video-to-text/transcribe-video-whisper.json");
        Console.WriteLine(promptJson);

        var responseJson = await ExecutePrompt(promptJson);
        Console.WriteLine(responseJson);
    }

    [Test]
    public void Can_parse_image_outputs()
    {
        var responseJson = File.ReadAllText("../../../workflows/results/sd3.5_fp8.output.json");
        var comfyResult = ComfyConverters.ParseComfyResult(responseJson, "http://localhost:7860/api");
        Assert.That(comfyResult.Assets, Is.Not.Null.Or.Empty);
        Assert.That(comfyResult.Assets![0].NodeId, Is.EqualTo("9"));
        Assert.That(comfyResult.Assets[0].Url, Is.EqualTo("http://localhost:7860/api/view?filename=ComfyUI%5f00422%5f.png&type=output&subfolder="));
        Assert.That(comfyResult.ClientId, Is.EqualTo("c865c47cd3e1443ab100d17a0e577154"));
        Assert.That(comfyResult.Duration, Is.EqualTo(TimeSpan.FromMilliseconds(1746602436899-1746602412297)));
    }

    [Test]
    public void Can_parse_text_outputs()
    {
        var responseJson = File.ReadAllText("../../../workflows/results/transcribe-audio-whisper.output.json");
        var comfyResult = ComfyConverters.ParseComfyResult(responseJson, "http://localhost:7860/api");
        Assert.That(comfyResult.Texts, Is.Not.Null.Or.Empty);
        Assert.That(comfyResult.Texts![0].NodeId, Is.EqualTo("7"));
        Assert.That(comfyResult.Texts[0].Text, Is.EqualTo(" A rainbow is a meteorological phenomenon that is caused by reflection, refraction, and dispersion of light in water droplets resulting in a spectrum of light appearing in the sky."));
        Assert.That(comfyResult.ClientId, Is.EqualTo("2eda9668a7794463bf00613df2ec0fe1"));
        Assert.That(comfyResult.Duration, Is.EqualTo(TimeSpan.FromMilliseconds(1746463824832-1746463824831)));
    }
}