using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class ComfyWorkflowParser
{
    public static List<string> SamplerNames =
    [
        "euler",
        "euler_cfg_pp",
        "euler_ancestral",
        "euler_ancestral_cfg_pp",
        "heun",
        "heunpp2",
        "dpm_2",
        "dpm_2_ancestral",
        "lms",
        "dpm_fast",
        "dpm_adaptive",
        "dpmpp_2s_ancestral",
        "dpmpp_2s_ancestral_cfg_pp",
        "dpmpp_sde",
        "dpmpp_sde_gpu",
        "dpmpp_2m",
        "dpmpp_2m_cfg_pp",
        "dpmpp_2m_sde",
        "dpmpp_2m_sde_gpu",
        "dpmpp_3m_sde",
        "dpmpp_3m_sde_gpu",
        "ddpm",
        "lcm",
        "ipndm",
        "ipndm_v",
        "deis",
        "res_multistep",
        "res_multistep_cfg_pp",
        "res_multistep_ancestral",
        "res_multistep_ancestral_cfg_pp",
        "gradient_estimation",
        "er_sde",
        "seeds_2",
        "seeds_3",
        "ddim",
        "uni_pc",
        "uni_pc_bh2",
    ];

    public static List<string> SchedulerNames =
    [
        "normal",
        "karras",
        "exponential",
        "sgm_uniform",
        "simple",
        "ddim_uniform",
        "beta",
        "linear_quadratic",
        "kl_optimal"
    ];

    public static List<string> Florence2RunTasks =
    [
        "region_caption",
        "dense_region_caption",
        "region_proposal",
        "caption",
        "detailed_caption",
        "more_detailed_caption",
        "caption_to_phrase_grounding",
        "referring_expression_segmentation",
        "ocr",
        "ocr_with_region",
        "docvqa",
        "prompt_gen_tags",
        "prompt_gen_mixed_caption"
    ];
    
    public static ComfyWorkflowInfo? Parse(string fileName, string json)
    {
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
            Name = fileName.WithoutExtension().ToPascalCase().SplitCamelCase(),
            FileName = fileName,
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
                Name = "negativePrompt",
                Label = "Negative Prompt",
                Type = ComfyInputType.String,
                Tooltip = "The text to be encoded for negative conditioning",
                Multiline = true,
                Default = GetNodeWidgetValue(nodes, negativeNodeId, 0)
            });
        }

        // Extract sampling parameters from KSampler node
        if (kSamplerNode != null)
        {
            if (kSamplerNode["widgets_values"] is List<object> { Count: >= 7 } widgetValues)
            {
                inputs.Add(new ComfyInput
                {
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
                inputs.Add(new ComfyInput
                {
                    Name = "sampler_name",
                    Label = "Sampler",
                    Type = ComfyInputType.Enum,
                    Default = widgetValues[4],
                    EnumValues = SamplerNames,
                    Tooltip = "The algorithm used when sampling, this can affect the quality, speed, and style of the generated output.",
                });
                inputs.Add(new ComfyInput
                {
                    Name = "scheduler",
                    Label = "Scheduler",
                    Type = ComfyInputType.Enum,
                    Default = widgetValues[5],
                    EnumValues = SchedulerNames,
                    Tooltip = "The scheduler controls how noise is gradually removed to form the image.",
                });
                inputs.Add(new ComfyInput
                {
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
                inputs.Add(new ComfyInput
                {
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
                inputs.Add(new ComfyInput
                {
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
                inputs.Add(new ComfyInput
                {
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
            if (nodeType is "EmptyLatentImage" or "EmptySD3LatentImage")
            {
                // Extract dimensions from EmptyLatentImage node
                if (node["widgets_values"] is List<object> { Count: >= 3 } widgetValues)
                {
                    inputs.Add(new ComfyInput
                    {
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
                    inputs.Add(new ComfyInput
                    {
                        Name = "sampler_name",
                        Label = "Sampler",
                        Type = ComfyInputType.Enum,
                        Default = widgetValues[0],
                        EnumValues = SamplerNames,
                        Tooltip = "The algorithm used when sampling, this can affect the quality, speed, and style of the generated output.",
                    });
                }
            }
            else if (nodeType == "BasicScheduler")
            {
                if (node["widgets_values"] is List<object> { Count: >= 3 } widgetValues)
                {
                    inputs.Add(new ComfyInput
                    {
                        Name = "scheduler",
                        Label = "Scheduler",
                        Type = ComfyInputType.Enum,
                        Default = widgetValues[0],
                        EnumValues = SchedulerNames,
                        Tooltip = "The scheduler controls how noise is gradually removed to form the image.",
                    });
                    inputs.Add(new ComfyInput
                    {
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
                        Name = "text_input",
                        Label = "Text Input",
                        Type = ComfyInputType.String,
                        Default = widgetValues[0],
                    });
                    inputs.Add(new ComfyInput
                    {
                        Name = "task",
                        Label = "Task",
                        Type = ComfyInputType.Enum,
                        Default = widgetValues[1],
                        EnumValues = Florence2RunTasks,
                    });
                    inputs.Add(new ComfyInput
                    {
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
}