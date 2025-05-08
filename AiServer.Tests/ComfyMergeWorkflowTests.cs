using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

public class ComfyMergeWorkflowTests
{
    private IServiceProvider serviceProvider;
    string ComfyEndpoint = "http://localhost:7860";
    Dictionary<string, NodeInfo> NodeDefs;

    public ComfyMergeWorkflowTests()
    {
        var services = new ServiceCollection();
        services.AddHttpClient(nameof(ComfyGateway));
        serviceProvider = services.BuildServiceProvider();

        var objectInfoPath = Path.Combine(AppContext.BaseDirectory, "../../../files/object_info.json");
        NodeDefs = ComfyMetadata.Instance.LoadObjectInfo(File.ReadAllText(objectInfoPath), ComfyEndpoint);
    }

    [Test]
    public void Can_merge_SDXL_workflow()
    {
        var sdxlWorkflowJson = File.ReadAllText("../../../workflows/text-to-image/dreamshaperXL.json");
        var sdxlWorkflow = ComfyWorkflowParser.Parse(sdxlWorkflowJson, "dreamshaperXL.json", NodeDefs) ?? throw new Exception("Could not parse SDXL workflow");

        // Define test arguments
        var args = new
        {
            model = "sd3.5_large.safetensors",
            positivePrompt = "an abstract cat with a hat on a mat",
            negativePrompt = "low quality, blurry, noisy image",
            width = 512,
            height = 512,
            batch_size = 2,
            seed = 1,
            steps = 10,
            cfg = 1,
            sampler_name = "euler",
            scheduler = "normal",
            denoise = 0.5
        }.ToObjectDictionary();

        // Merge the workflow with the arguments
        var result = ComfyWorkflowParser.MergeWorkflow(sdxlWorkflowJson, args, NodeDefs);
        Console.WriteLine(result.Result.IndentJson());

        // Verify the result
        Assert.That(result.Result, Is.Not.Null.Or.Empty);
        Assert.That(result.MissingInputs, Is.Empty);

        // Parse the result to verify the values were updated
        var mergedWorkflow = ComfyWorkflowParser.Parse(result.Result, "merged.json", NodeDefs);
        Assert.That(mergedWorkflow, Is.Not.Null);

        // Verify specific inputs were updated correctly
        foreach (var input in mergedWorkflow.Inputs)
        {
            if (args.TryGetValue(input.Name, out var argValue))
            {
                // Convert the default value to the same type as the argument for comparison
                object defaultValue = input.Default;
                switch (input.Type)
                {
                    case ComfyInputType.Int:
                        defaultValue = Convert.ToInt64(defaultValue);
                        argValue = Convert.ToInt64(argValue);
                        break;
                    case ComfyInputType.Float:
                        defaultValue = Convert.ToDouble(defaultValue);
                        argValue = Convert.ToDouble(argValue);
                        break;
                    case ComfyInputType.Boolean:
                        defaultValue = Convert.ToBoolean(defaultValue);
                        argValue = Convert.ToBoolean(argValue);
                        break;
                    default:
                        defaultValue = defaultValue?.ToString();
                        argValue = argValue?.ToString();
                        break;
                }

                Assert.That(defaultValue, Is.EqualTo(argValue), $"Input {input.Name} was not updated correctly");
            }
        }
    }

    [Test]
    public void Can_merge_basic_workflow()
    {
        var workflowJson = File.ReadAllText("../../../workflows/text-to-image/basic.json");

        // Define test arguments with only some inputs
        var args = new
        {
            positivePrompt = "a beautiful landscape with mountains and a lake",
            seed = 42,
            steps = 20,
            nonExisting = 1,
        }.ToObjectDictionary();

        // Merge the workflow with the arguments
        var result = ComfyWorkflowParser.MergeWorkflow(workflowJson, args, NodeDefs);
        // Console.WriteLine(result.Result.IndentJson());

        // Verify the result
        Assert.That(result.Result, Is.Not.Null.Or.Empty);

        Assert.That(result.MissingInputs, Does.Not.Contain("positivePrompt"));
        Assert.That(result.MissingInputs, Does.Not.Contain("seed"));
        Assert.That(result.MissingInputs, Does.Not.Contain("steps"));
        
        Assert.That(result.ExtraInputs, Is.EquivalentTo(new[]{ "nonExisting" }));

        // Parse the result to verify the values were updated
        var mergedWorkflow = ComfyWorkflowParser.Parse(result.Result, "merged.json", NodeDefs);
        Assert.That(mergedWorkflow, Is.Not.Null);

        // Verify specific inputs were updated correctly
        var positivePromptInput = mergedWorkflow.Inputs.FirstOrDefault(i => i.Name == "positivePrompt")!;
        Assert.That(positivePromptInput, Is.Not.Null);
        Assert.That(positivePromptInput.Default, Is.EqualTo(args["positivePrompt"].ToString()));

        var seedInput = mergedWorkflow.Inputs.FirstOrDefault(i => i.Name == "seed")!;
        Assert.That(seedInput, Is.Not.Null);
        Assert.That(Convert.ToInt64(seedInput.Default), Is.EqualTo(Convert.ToInt64(args["seed"])));

        var stepsInput = mergedWorkflow.Inputs.FirstOrDefault(i => i.Name == "steps")!;
        Assert.That(stepsInput, Is.Not.Null);
        Assert.That(Convert.ToInt32(stepsInput.Default), Is.EqualTo(Convert.ToInt32(args["steps"])));
    }
}
