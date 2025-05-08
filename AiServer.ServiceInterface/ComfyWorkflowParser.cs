using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using ServiceStack;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class ComfyWorkflowParser
{
    public static ComfyWorkflowInfo Parse(string json, string workflowPath, Dictionary<string, NodeInfo> nodeDefs, ILogger? log=null)
    {
        log ??= NullLogger.Instance;
        var workflow = (Dictionary<string,object>) JSON.parse(json);

        if (workflow["nodes"] is not List<object> nodesObj || workflow["links"] is not List<object> links)
            throw new ArgumentException("Invalid workflow JSON");

        var nodes = nodesObj.Map(x => (Dictionary<string, object?>)x);
        ComfyWorkflowType? workflowType = null;
        ComfyPrimarySource? inputSource = null;
        ComfyPrimarySource? outputSource = null;

        foreach (var node in nodes)
        {
            if (node.GetValueOrDefault("type") is not string nodeType) continue;

            // If has LoadImage then inputSource is Image
            if (nodeType == "LoadImage")
            {
                inputSource = ComfyPrimarySource.Image;
            }
            else if (nodeType.Contains("LoadAudio"))
            {
                inputSource = ComfyPrimarySource.Audio;
            }
            else if (nodeType.Contains("LoadVideo"))
            {
                inputSource = ComfyPrimarySource.Video;
            }

            if (nodeType == "VAEDecode")
            {
                //If has VAEDecode then outputSource is Image
                outputSource = ComfyPrimarySource.Image;
            }
            else if (nodeType == "VAEDecodeAudio")
            {
                //If has VAEDecodeAudio then outputSource is Image
                outputSource = ComfyPrimarySource.Audio;
            }
            else if (nodeType == "ShowText|pysssss")
            {
                //If has ShowText|pysssss then outputSource could be Text
                outputSource = ComfyPrimarySource.Text;
            }
        }

        // Fallback to check for CLIPTextEncode for text prompts
        if (inputSource == null)
        {
            foreach (var node in nodes)
            {
                if (node.GetValueOrDefault("type") is not string nodeType) continue;

                // If has CLIPTextEncode then inputSource is Text
                if (nodeType == "CLIPTextEncode")
                {
                    inputSource = ComfyPrimarySource.Text;
                    break;
                }
            }
        }

        if (inputSource == ComfyPrimarySource.Text)
        {
            if (outputSource == ComfyPrimarySource.Image)
            {
                workflowType = ComfyWorkflowType.TextToImage;
            }
            else if (outputSource == ComfyPrimarySource.Audio)
            {
                workflowType = ComfyWorkflowType.TextToAudio;
            }
        }
        else if (inputSource == ComfyPrimarySource.Image)
        {
            if (outputSource == ComfyPrimarySource.Text)
            {
                workflowType = ComfyWorkflowType.ImageToText;
            }
            else if (outputSource == ComfyPrimarySource.Image)
            {
                workflowType = ComfyWorkflowType.ImageToImage;
            }
        }
        else if (inputSource == ComfyPrimarySource.Audio)
        {
            if (outputSource == ComfyPrimarySource.Text)
            {
                workflowType = ComfyWorkflowType.AudioToText;
            }
        }
        else if (inputSource == ComfyPrimarySource.Video)
        {
            if (outputSource == ComfyPrimarySource.Text)
            {
                workflowType = ComfyWorkflowType.VideoToText;
            }
        }

        if (workflowType == null || inputSource == null || outputSource == null)
            return null;

        var workflowInfo = new ComfyWorkflowInfo
        {
            Name = workflowPath.LastRightPart('/').WithoutExtension().ToPascalCase().SplitCamelCase(),
            Path = workflowPath,
            Type = workflowType.Value,
            Input = inputSource.Value,
            Output = outputSource.Value,
        };

        // Find positive and negative prompt nodes by tracing KSampler links
        int positiveNodeId = -1;
        int negativeNodeId = -1;

        var kSamplerNode = nodes.FirstOrDefault(n => n["type"]?.ToString() == "KSampler");
        if (kSamplerNode != null)
        {
            if (kSamplerNode["inputs"] is List<object> kSamplerInputs)
            {
                foreach (var input in kSamplerInputs.Select(i => (Dictionary<string,object?>)i))
                {
                    if (input["name"]?.ToString() == "positive" && input["link"] != null)
                    {
                        int linkId = Convert.ToInt32(input["link"]);
                        positiveNodeId = GetSourceNodeFromLink(linkId, links);
                    }
                    else if (input["name"]?.ToString() == "negative" && input["link"] != null)
                    {
                        int linkId = Convert.ToInt32(input["link"]);
                        negativeNodeId = GetSourceNodeFromLink(linkId, links);
                    }
                }
            }
        }
        var basicGuiderNode = nodes.FirstOrDefault(n => n["type"]?.ToString() == "BasicGuider");
        if (basicGuiderNode != null)
        {
            if (basicGuiderNode["inputs"] is List<object> basicGuiderInputs)
            {
                foreach (var input in basicGuiderInputs.Select(i => (Dictionary<string, object?>)i))
                {
                    if (input["name"]?.ToString() == "conditioning" && input["link"] != null)
                    {
                        int linkId = Convert.ToInt32(input["link"]);
                        positiveNodeId = GetSourceNodeFromLink(linkId, links);
                    }
                }
            }
        }

        // Extract workflow inputs
        var inputs = new List<ComfyInput>();
        if (positiveNodeId != -1)
        {
            // Add positive prompt input
            inputs.Add(new ComfyInput
            {
                NodeId = positiveNodeId,
                ValueIndex = 0,
                Name = "positivePrompt",
                Label = "Positive Prompt",
                Type = ComfyInputType.String,
                Tooltip = "The text to be encoded for positive conditioning",
                Multiline = true,
                Default = GetNodeWidgetValue(nodes, positiveNodeId, 0)
            });
        }
        if (negativeNodeId != -1)
        {
            // Add negative prompt input
            inputs.Add(new ComfyInput
            {
                NodeId = negativeNodeId,
                ValueIndex = 0,
                Name = "negativePrompt",
                Label = "Negative Prompt",
                Type = ComfyInputType.String,
                Tooltip = "The text to be encoded for negative conditioning",
                Multiline = true,
                Default = GetNodeWidgetValue(nodes, negativeNodeId, 0)
            });
        }

        var loadCheckpointNode = nodes.FirstOrDefault(n => n["type"]?.ToString() is
            "CheckpointLoaderSimple" or "unCLIPCheckpointLoader" or "CheckpointLoader" or "ImageOnlyCheckpointLoader" or
            "CreateHookModelAsLora" or "CreateHookModelAsLoraModelOnly" or "CheckpointLoader|pysssss");
        if (loadCheckpointNode != null)
        {
            if (loadCheckpointNode["widgets_values"] is List<object> { Count: >= 7 } widgetValues)
            {
                var nodeType = loadCheckpointNode["type"]!.ToString();
                var nodeId = Convert.ToInt32(loadCheckpointNode["id"]);
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = nodeType == "CheckpointLoader" // [config_name,ckpt_name]
                        ? 1
                        : 0,
                    Name = "ckpt_name",
                    Label = "Model",
                    Type = ComfyInputType.String,
                    Default = widgetValues[0],
                    Tooltip = "The name of the checkpoint (model) to load.",
                });
            }
        }

        // Extract sampling parameters from KSampler node
        if (kSamplerNode != null)
        {
            if (kSamplerNode["widgets_values"] is List<object> { Count: >= 7 } widgetValues)
            {
                nodeDefs.TryGetValue("KSampler", out var nodeDef);
                var nodeId = Convert.ToInt32(kSamplerNode["id"]);

                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 0,
                    Name = "seed",
                    Label = "Seed",
                    Type = ComfyInputType.Int,
                    Default = widgetValues[0],
                    Min = 0,
                    Max = 18446744073709551615m,
                    ControlAfterGenerate = true,
                    Tooltip = "The random seed used for creating the noise.",
                });
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 2,
                    Name = "steps",
                    Label = "Steps",
                    Type = ComfyInputType.Int,
                    Default = Convert.ToInt32(widgetValues[2]),
                    Min = 1,
                    Max = 10000,
                    Tooltip = "The number of steps used in the denoising process.",
                });
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 3,
                    Name = "cfg",
                    Label = "CFG Scale",
                    Type = ComfyInputType.Float,
                    Default = Convert.ToDecimal(widgetValues[3]),
                    Min = 0,
                    Max = 100,
                    Step = 0.1m,
                    Round = 0.01m,
                    Tooltip = "The Classifier-Free Guidance scale balances creativity and adherence to the prompt. Higher values result in images more closely matching the prompt however too high values will negatively impact quality.",
                });

                var samplerNames = nodeDef?.Input.GetValueOrDefault("required").GetValueOrDefault("sampler_name")?.EnumValues ?? [];
                if (samplerNames.Length == 0)
                    log.LogWarning("No sampler names found in '{Node}' node definition", "KSampler");
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 4,
                    Name = "sampler_name",
                    Label = "Sampler",
                    Type = ComfyInputType.Enum,
                    Default = widgetValues[4],
                    EnumValues = samplerNames,
                    Tooltip = "The algorithm used when sampling, this can affect the quality, speed, and style of the generated output.",
                });

                var schedulerNames = nodeDef?.Input.GetValueOrDefault("required").GetValueOrDefault("scheduler")?.EnumValues ?? [];
                if (schedulerNames.Length == 0)
                    log.LogWarning("No scheduler names found in '{Node}' node definition", "KSampler");
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 5,
                    Name = "scheduler",
                    Label = "Scheduler",
                    Type = ComfyInputType.Enum,
                    Default = widgetValues[5],
                    EnumValues = schedulerNames,
                    Tooltip = "The scheduler controls how noise is gradually removed to form the image.",
                });
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 6,
                    Name = "denoise",
                    Label = "Denoise",
                    Type = ComfyInputType.Float,
                    Default = Convert.ToDecimal(widgetValues[6]),
                    Min = 0,
                    Max = 1,
                    Step = 0.01m,
                    Tooltip = "The amount of denoising applied, lower values will maintain the structure of the initial image allowing for image to image sampling.",
                });
            }
        }

        var loadImageNode = nodes.FirstOrDefault(n => n["type"]?.ToString() == "LoadImage");
        if (loadImageNode != null)
        {
            if (loadImageNode["widgets_values"] is List<object> { Count: >= 1 } widgetValues)
            {
                var nodeId = Convert.ToInt32(loadImageNode["id"]);
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 0,
                    Name = "image",
                    Label = "Image",
                    Type = ComfyInputType.Image,
                    Tooltip = "Select Image",
                });
            }
        }

        var loadTTAudioNode = nodes.FirstOrDefault(n => n["type"]?.ToString() == "TT-LoadAudio");
        if (loadTTAudioNode != null)
        {
            if (loadTTAudioNode["widgets_values"] is List<object> { Count: >= 1 } widgetValues)
            {
                var nodeId = Convert.ToInt32(loadTTAudioNode["id"]);
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 0,
                    Name = "audio",
                    Label = "Audio",
                    Type = ComfyInputType.Audio,
                    Tooltip = "Select Audio",
                });
            }
        }

        var loadTTVideoNode = nodes.FirstOrDefault(n => n["type"]?.ToString() == "TT-LoadVideoAudio");
        if (loadTTVideoNode != null)
        {
            if (loadTTVideoNode["widgets_values"] is List<object> { Count: >= 1 } widgetValues)
            {
                var nodeId = Convert.ToInt32(loadTTVideoNode["id"]);
                inputs.Add(new ComfyInput
                {
                    NodeId = nodeId,
                    ValueIndex = 0,
                    Name = "video",
                    Label = "Video",
                    Type = ComfyInputType.Enum,
                    Tooltip = "Select Video",
                });
            }
        }

        foreach (var node in nodes)
        {
            var nodeType = node.GetValueOrDefault("type") as string;
            if (nodeType == null) continue;

            var nodeId = Convert.ToInt32(node["id"]);
            nodeDefs.TryGetValue(nodeType, out var nodeDef);

            if (nodeType is "EmptyLatentImage" or "EmptySD3LatentImage")
            {
                // Extract dimensions from EmptyLatentImage node
                if (node["widgets_values"] is List<object> { Count: >= 3 } widgetValues)
                {
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 0,
                        Name = "width",
                        Label = "Width",
                        Type = ComfyInputType.Int,
                        Default = Convert.ToInt32(widgetValues[0]),
                        Min = 16,
                        Max = 16384,
                        Step = 8,
                        Tooltip = "The width of the latent images in pixels.",
                    });
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 1,
                        Name = "height",
                        Label = "Height",
                        Type = ComfyInputType.Int,
                        Default = Convert.ToInt32(widgetValues[1]),
                        Min = 16,
                        Max = 16384,
                        Step = 8,
                        Tooltip = "The height of the latent images in pixels.",
                    });
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 2,
                        Name = "batch_size",
                        Label = "Image Count",
                        Type = ComfyInputType.Int,
                        Default = Convert.ToInt32(widgetValues[2]),
                        Min = 1,
                        Max = 4096,
                        Tooltip = "The number of latent images in the batch.",
                    });
                }
            }
            else if (nodeType == "EmptyLatentAudio")
            {
                if (node["widgets_values"] is List<object> { Count: >= 2 } widgetValues)
                {
                    // Add seconds
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 0,
                        Name = "seconds",
                        Label = "Duration",
                        Type = ComfyInputType.Float,
                        Default = Convert.ToInt32(widgetValues[0]),
                        Min = 1,
                        Max = 1000,
                        Step = 0.1m,
                    });

                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 1,
                        Name = "batch_size",
                        Label = "Audio Count",
                        Type = ComfyInputType.Int,
                        Default = Convert.ToInt32(widgetValues[1]),
                        Min = 1,
                        Max = 4096,
                        Tooltip = "The number of latent audio in the batch.",
                    });
                }
            }
            else if (nodeType == "RandomNoise")
            {
                if (node["widgets_values"] is List<object> { Count: >= 2 } widgetValues)
                {
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 0,
                        Name = "noise_seed",
                        Label = "Seed",
                        Type = ComfyInputType.Int,
                        Default = widgetValues[0],
                        Min = 0,
                        Max = 18446744073709551615m,
                        ControlAfterGenerate = true,
                        Tooltip = "The random seed used for creating the noise.",
                    });
                }
            }
            else if (nodeType == "KSamplerSelect")
            {
                if (node["widgets_values"] is List<object> { Count: >= 1 } widgetValues)
                {
                    var samplerNames = nodeDef?.Input.GetValueOrDefault("required").GetValueOrDefault("sampler_name")?.EnumValues ?? [];
                    if (samplerNames.Length == 0)
                        log.LogWarning("No '{InputName}' found in '{Node}' node definition", "sampler_name", nodeType);

                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 0,
                        Name = "sampler_name",
                        Label = "Sampler",
                        Type = ComfyInputType.Enum,
                        Default = widgetValues[0],
                        EnumValues = samplerNames,
                        Tooltip = "The algorithm used when sampling, this can affect the quality, speed, and style of the generated output.",
                    });
                }
            }
            else if (nodeType == "BasicScheduler")
            {
                if (node["widgets_values"] is List<object> { Count: >= 3 } widgetValues)
                {
                    var schedulerNames = nodeDef?.Input.GetValueOrDefault("required").GetValueOrDefault("scheduler")?.EnumValues ?? [];
                    if (schedulerNames.Length == 0)
                        log.LogWarning("No '{InputName}' found in '{Node}' node definition", "scheduler", nodeType);

                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 0,
                        Name = "scheduler",
                        Label = "Scheduler",
                        Type = ComfyInputType.Enum,
                        Default = widgetValues[0],
                        EnumValues = schedulerNames,
                        Tooltip = "The scheduler controls how noise is gradually removed to form the image.",
                    });
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 1,
                        Name = "steps",
                        Label = "Steps",
                        Type = ComfyInputType.Int,
                        Default = Convert.ToInt32(widgetValues[1]),
                        Min = 1,
                        Max = 10000,
                        Tooltip = "The number of steps used in the denoising process.",
                    });
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 2,
                        Name = "denoise",
                        Label = "Denoise",
                        Type = ComfyInputType.Float,
                        Default = Convert.ToDecimal(widgetValues[2]),
                        Min = 0,
                        Max = 1,
                        Step = 0.01m,
                        Tooltip = "The amount of denoising applied, lower values will maintain the structure of the initial image allowing for image to image sampling.",
                    });
                }
            }
            else if (nodeType == "Florence2Run")
            {
                if (node["widgets_values"] is List<object> { Count: >= 3 } widgetValues)
                {
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 0,
                        Name = "text_input",
                        Label = "Text Input",
                        Type = ComfyInputType.String,
                        Default = widgetValues[0],
                    });

                    var tasks = nodeDef?.Input.GetValueOrDefault("required").GetValueOrDefault("task")?.EnumValues ?? [];
                    if (tasks.Length == 0)
                        log.LogWarning("No '{InputName}' found in '{Node}' node definition", "task", nodeType);

                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 1,
                        Name = "task",
                        Label = "Task",
                        Type = ComfyInputType.Enum,
                        Default = widgetValues[1],
                        EnumValues = tasks,
                    });
                    inputs.Add(new ComfyInput
                    {
                        NodeId = nodeId,
                        ValueIndex = 2,
                        Name = "fill_mask",
                        Label = "Fill Mask",
                        Type = ComfyInputType.Boolean,
                        Default = widgetValues[2],
                    });
                }
            }
        }

        workflowInfo.Inputs = inputs;
        return workflowInfo;
    }

    private static int GetSourceNodeFromLink(int linkId, List<object> links)
    {
        foreach (var link in links.Select(l => l as List<object>))
        {
            if (link is { Count: >= 6 } && Convert.ToInt32(link[0]) == linkId)
            {
                return Convert.ToInt32(link[1]); // Source node ID
            }
        }
        return -1;
    }

    private static object GetNodeWidgetValue(List<Dictionary<string,object?>> nodes, int nodeId, int widgetIndex)
    {
        var node = nodes.Select(n => n.ToObjectDictionary())
            .FirstOrDefault(n => Convert.ToInt32(n["id"]) == nodeId);
        if (node != null)
        {
            if (node["widgets_values"] is List<object> widgetValues && widgetValues.Count > widgetIndex)
            {
                return widgetValues[widgetIndex];
            }
        }
        return "";
    }

    public static MergeWorkflowResult MergeWorkflow(string workflowJson, Dictionary<string, object> args, Dictionary<string, NodeInfo> nodeDefs, ILogger? log=null)
    {
        log ??= NullLogger.Instance;

        var ret = new MergeWorkflowResult
        {
            OriginalWorkflow = workflowJson,
            Args = new Dictionary<string, object>(args),
        };

        var workflow = Parse(workflowJson, "file.json", nodeDefs, log);

        // Parse the workflow JSON into a JsonNode that we can modify
        var workflowNode = JsonNode.Parse(workflowJson);
        if (workflowNode == null)
        {
            log.LogError("Failed to parse workflow JSON");
            return ret;
        }

        var nodesArray = workflowNode["nodes"]?.AsArray();
        if (nodesArray == null)
        {
            log.LogError("No nodes found in workflow JSON");
            return ret;
        }

        foreach (var input in workflow.Inputs)
        {
            var argValue = args.GetValueOrDefault(input.Name);
            if (argValue == null)
            {
                ret.MissingInputs.Add(input.Name);
                continue;
            }
            ret.Args.Remove(input.Name);

            // Find the node in the JSON array
            JsonNode targetNode = null;
            int nodeIndex = -1;

            for (int i = 0; i < nodesArray.Count; i++)
            {
                var node = nodesArray[i];
                if (node == null) continue;

                if (node["id"]?.GetValue<int>() == input.NodeId)
                {
                    targetNode = node;
                    nodeIndex = i;
                    break;
                }
            }

            if (targetNode == null)
            {
                log.LogWarning("Node {NodeId} not found for input '{InputName}'", input.NodeId, input.Name);
                continue;
            }

            // Get the widgets_values array
            var widgetsValues = targetNode["widgets_values"]?.AsArray();
            if (widgetsValues == null)
            {
                log.LogWarning("No widgets_values found for node {NodeId} for input '{InputName}'", input.NodeId, input.Name);
                continue;
            }

            // Check if the value index is valid
            if (input.ValueIndex >= widgetsValues.Count)
            {
                log.LogWarning("Value index {ValueIndex} is out of range for node {NodeId} widgets_values (count: {Count})",
                    input.ValueIndex, input.NodeId, widgetsValues.Count);
                continue;
            }

            // Replace the widget value with the argument value
            try
            {
                // Convert the argument value to the appropriate type based on the input type
                JsonNode newValue;

                switch (input.Type)
                {
                    case ComfyInputType.Int:
                        newValue = JsonValue.Create(Convert.ToInt64(argValue));
                        break;
                    case ComfyInputType.Float:
                        newValue = JsonValue.Create(Convert.ToDouble(argValue));
                        break;
                    case ComfyInputType.Boolean:
                        newValue = JsonValue.Create(Convert.ToBoolean(argValue));
                        break;
                    case ComfyInputType.String:
                    case ComfyInputType.Enum:
                    default:
                        newValue = JsonValue.Create(argValue.ToString());
                        break;
                }

                // Replace the value in the widgets_values array
                widgetsValues[input.ValueIndex] = newValue;
                log.LogDebug("Replaced value at index {ValueIndex} for node {NodeId} with {Value}",
                    input.ValueIndex, input.NodeId, argValue);
            }
            catch (Exception ex)
            {
                log.LogError(ex, "Failed to replace widget value for node {NodeId} at index {ValueIndex} with value {Value}",
                    input.NodeId, input.ValueIndex, argValue);
            }
        }

        // Any remaining args are extra inputs that weren't used
        ret.ExtraInputs.AddRange(ret.Args.Keys);

        // Serialize the modified workflow back to JSON
        ret.Result = workflowNode.ToJsonString();

        return ret;
    }
}

public class MergeWorkflowResult
{
    public string OriginalWorkflow { get; set; }
    public Dictionary<string,object> Args { get; set; }
    public List<string> MissingInputs { get; set; } = [];
    public List<string> ExtraInputs { get; set; } = [];
    public string Result { get; set; }
}