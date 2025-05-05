using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit("Integration tests")]
public class ComfyWorkflowParseTests
{
    private IServiceProvider serviceProvider;
    string ComfyEndpoint = "http://localhost:7860";
    private string ApiKey = Environment.GetEnvironmentVariable("AI_SERVER_API_KEY");

    public ComfyWorkflowParseTests()
    {
        var services = new ServiceCollection();
        services.AddHttpClient(nameof(ComfyGateway));
        serviceProvider = services.BuildServiceProvider();
    }

    ComfyGateway CreateGateway() => new(serviceProvider.GetRequiredService<IHttpClientFactory>());
    
    [Test]
    public async Task Can_get_Workflows()
    {
        var comfy = CreateGateway();
        var ret = await comfy.GetWorkflowsAsync(ComfyEndpoint, ApiKey);
        ret.PrintDump();
    }
    
    [Test]
    public async Task Can_get_basic_Workflow()
    {
        var comfy = CreateGateway();
        var ret = await comfy.GetWorkflowJsonAsync(ComfyEndpoint, ApiKey, "basic.json");
        Assert.That(ret.Length, Is.GreaterThan(1000));
    }

    [Test]
    public void Can_parse_basic_Workflow()
    {
        var workflowPath = "./workflows/text-to-image/basic.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse("basic.json", workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.TextToImage));
        Assert.That(inputNames,Is.EquivalentTo("positivePrompt,negativePrompt,width,height,batch_size,seed,steps,cfg,sampler_name,scheduler,denoise".Split(',')));
    }

    [Test]
    public void Can_parse_dreamShaperXL_Workflow()
    {
        var workflowPath = "./workflows/text-to-image/dreamshaperXL.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.TextToImage));
        Assert.That(inputNames,Is.EquivalentTo("positivePrompt,negativePrompt,width,height,batch_size,seed,steps,cfg,sampler_name,scheduler,denoise".Split(',')));
    }

    [Test]
    public void Can_parse_fluxSchnell_Workflow()
    {
        var workflowPath = "./workflows/text-to-image/flux1-schnell.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.TextToImage));
        Assert.That(inputNames,Is.EquivalentTo("positivePrompt,width,height,batch_size,noise_seed,sampler_name,scheduler,steps,denoise".Split(',')));
    }

    [Test]
    public void Can_parse_Hidream_dev_Workflow()
    {
        var workflowPath = "./workflows/text-to-image/hidream_i1_dev_fp8.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        workflow.PrintDump();
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.TextToImage));
        Assert.That(inputNames,Is.EquivalentTo("positivePrompt,negativePrompt,width,height,batch_size,seed,steps,cfg,sampler_name,scheduler,denoise".Split(',')));
    }

    [Test]
    public void Can_parse_all_SDXL_Workflows()
    {
        string[] workflows = [
            "dreamshaperXL",
            "hidream_i1_dev_fp8",
            "hidream_i1_fast_fp8",
            "jibMixRealisticXL",
            "juggernautXL",
            "realvisxl",
            "sd3.5_large",
            "sd3.5_large_fp8_scaled",
            "sd3.5_large_turbo",
            "sdxl_lightning_4step",
        ];

        foreach (var fileName in workflows)
        {
            var workflowPath = $"./workflows/text-to-image/{fileName}.json";
            Console.WriteLine("Parsing {0}...", workflowPath);
            var workflowJson = File.ReadAllText(workflowPath);
            var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
            var inputNames = workflow.Inputs.Map(x => x.Name);
            // workflow.PrintDump();
            Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.TextToImage));
            Assert.That(inputNames,Is.EquivalentTo("positivePrompt,negativePrompt,width,height,batch_size,seed,steps,cfg,sampler_name,scheduler,denoise".Split(',')));
        }
    }

    [Test]
    public void Can_parse_stable_audio_Workflow()
    {
        var workflowPath = "./workflows/text-to-audio/stable_audio.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        workflow.PrintDump();
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.TextToAudio));
        Assert.That(inputNames,Is.EquivalentTo("positivePrompt,negativePrompt,seconds,batch_size,seed,steps,cfg,sampler_name,scheduler,denoise".Split(',')));
    }

    [Test]
    public void Can_parse_florence2_Workflow()
    {
        var workflowPath = "./workflows/image-to-text/florence2.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        workflow.PrintDump();
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.ImageToText));
        Assert.That(inputNames,Is.EquivalentTo("image,text_input,task,fill_mask".Split(',')));
    }

    [Test]
    public void Can_parse_image2image_Workflow()
    {
        var workflowPath = "./workflows/image-to-image/sd1.5_pruned_emaonly.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        workflow.PrintDump();
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.ImageToImage));
        Assert.That(inputNames,Is.EquivalentTo("image,positivePrompt,negativePrompt,seed,steps,cfg,sampler_name,scheduler,denoise".Split(',')));
    }

    [Test]
    public void Can_parse_audio2text_Workflow()
    {
        var workflowPath = "./workflows/audio-to-text/transcribe-audio-whisper.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        workflow.PrintDump();
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.AudioToText));
        Assert.That(inputNames,Is.EquivalentTo("audio".Split(',')));
    }

    [Test]
    public void Can_parse_video2text_Workflow()
    {
        var workflowPath = "./workflows/video-to-text/transcribe-video-whisper.json";
        var workflowJson = File.ReadAllText(workflowPath);
        var workflow = ComfyWorkflowParser.Parse(workflowPath.LastRightPart('/'), workflowJson) ?? throw new Exception($"Could not parse {workflowPath}");
        var inputNames = workflow.Inputs.Map(x => x.Name);
        workflow.PrintDump();
        Assert.That(workflow.Type, Is.EqualTo(ComfyWorkflowType.VideoToText));
        Assert.That(inputNames,Is.EquivalentTo("video".Split(',')));
    }
    
}
