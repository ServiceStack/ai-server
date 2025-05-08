using System.Collections.Concurrent;
using System.Text.Json;
using System.Text.Json.Serialization;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class ComfyMetadata
{
    public const string DefaultUrl = "https://localhost:5005";
    public static readonly ComfyMetadata Instance = new();
    public static JsonSerializerOptions JsonOptions => new() { PropertyNameCaseInsensitive = true };

    public readonly ConcurrentDictionary<string, Dictionary<string, NodeInfo>> NodeDefinitions = new();

    public async Task<Dictionary<string, NodeInfo>> LoadNodeDefinitionsAsync(HttpClient client)
    {
        var url = client.BaseAddress!.AbsoluteUri;
        if (NodeDefinitions.TryGetValue(url, out var nodeDefinitions))
            return nodeDefinitions;

        var json = await client.GetStringAsync("/api/object_info");
        return LoadObjectInfo(json, url);
    }

    public Dictionary<string, NodeInfo> LoadObjectInfo(string json, string url=DefaultUrl)
    {
        var nodeDefinitions = ParseNodeDefinitions(json);
        NodeDefinitions[url] = nodeDefinitions;
        return nodeDefinitions;
    }

    public Dictionary<string, NodeInfo>? NodeDefinitionsFor(string comfyBaseUrl) => 
        NodeDefinitions.GetValueOrDefault(comfyBaseUrl);

    public Dictionary<string, NodeInfo> DefaultNodeDefinitions =>
        NodeDefinitions.GetValueOrDefault(DefaultUrl) ?? throw new ArgumentNullException(nameof(NodeDefinitions));

    /// <summary>
    /// Loads and parses the object_info.json file.
    /// </summary>
    /// <param name="objectInfoJson">The JSON content of object_info.json</param>
    public static Dictionary<string, NodeInfo> ParseNodeDefinitions(string objectInfoJson)
    {
        // Parse the JSON document directly
        using var jsonDoc = JsonDocument.Parse(objectInfoJson, new JsonDocumentOptions
        {
            AllowTrailingCommas = true,
            CommentHandling = JsonCommentHandling.Skip
        });

        // Create a dictionary to hold the node info
        var objectInfo = new Dictionary<string, NodeInfo>();

        // Process each node in the JSON document
        foreach (var nodeProp in jsonDoc.RootElement.EnumerateObject())
        {
            var nodeName = nodeProp.Name;
            var nodeInfo = new NodeInfo
            {
                Name = nodeName,
                Input = new Dictionary<string, Dictionary<string, NodeInputDefinition>>()
            };

            // Process the node properties
            if (nodeProp.Value.TryGetProperty("input", out var inputProp))
            {
                // Process required inputs
                if (inputProp.TryGetProperty("required", out var requiredProp))
                {
                    var requiredInputs = new Dictionary<string, NodeInputDefinition>();
                    foreach (var reqInput in requiredProp.EnumerateObject())
                    {
                        requiredInputs[reqInput.Name] = NodeInputDefinition.Parse(reqInput.Value);
                    }
                    nodeInfo.Input["required"] = requiredInputs;
                }

                // Process optional inputs
                if (inputProp.TryGetProperty("optional", out var optionalProp))
                {
                    var optionalInputs = new Dictionary<string, NodeInputDefinition>();
                    foreach (var optInput in optionalProp.EnumerateObject())
                    {
                        optionalInputs[optInput.Name] = NodeInputDefinition.Parse(optInput.Value);
                    }
                    nodeInfo.Input["optional"] = optionalInputs;
                }
            }
            
            if (nodeProp.Value.TryGetProperty("input_order", out var inputOrderProp))
            {
                nodeInfo.InputOrder = JsonSerializer.Deserialize<NodeInputOrder>(inputOrderProp.GetRawText(), JsonOptions);
            }

            objectInfo[nodeName] = nodeInfo;
        }

        return objectInfo;
    }
}

public class NodeInputOrder
{
    [JsonPropertyName("required")] public List<string>? Required { get; set; }

    [JsonPropertyName("optional")] public List<string>? Optional { get; set; }

    [JsonPropertyName("hidden")] public List<string>? Hidden { get; set; }

    // Combine all input names in order
    public List<string> GetAllInputNamesInOrder()
    {
        var names = new List<string>();
        if (Required != null) names.AddRange(Required);
        if (Optional != null) names.AddRange(Optional);
        if (Hidden != null) names.AddRange(Hidden);
        return names;
    }
}

public class NodeInfo
{
    // required/optional/hidden -> inputName -> definition
    [JsonPropertyName("input")] public Dictionary<string, Dictionary<string, NodeInputDefinition>>? Input { get; set; }

    [JsonPropertyName("input_order")] public NodeInputOrder? InputOrder { get; set; }

    [JsonPropertyName("name")] public string Name { get; set; } = ""; // Class type
    // Other properties like output, display_name, category are not strictly needed for prompt conversion
}

public class NodeInputDefinition
{
    // In object_info.json, input definitions are arrays with two elements:
    // ["MODEL", {"tooltip": "..."}] or [["option1", "option2"], {"default": "option1"}]
    public ComfyInputType Type { get; set; }
    public Dictionary<string, object>? Options { get; set; }
    public string[]? EnumValues { get; set; }
    public Dictionary<string, object>? ComboValues { get; set; }
    // Special case for seed where it captures 2 widget_values, but is not included in the API prompt
    public bool? ControlAfterGenerate { get; set; }
    
    public static NodeInputDefinition Parse(JsonElement rawValue)
    {
        if (rawValue.ValueKind == JsonValueKind.Array && rawValue.GetArrayLength() > 0)
        {
            var firstElement = rawValue[0];
            var ret = new NodeInputDefinition
            {
                Type = GetDataType(firstElement), 
            };
            if (firstElement.ValueKind == JsonValueKind.Array)
            {
                ret.EnumValues = firstElement.EnumerateArray().Select(e => e.GetString() ?? "").ToArray();
            }
            else if (firstElement.ValueKind == JsonValueKind.Object)
            {
                ret.ComboValues = new();
                foreach (var entry in firstElement.EnumerateObject())
                {
                    var value = entry.Value.AsObject();
                    if (value == null) continue;
                    ret.ComboValues[entry.Name] = value;
                }
            }
            if (rawValue.GetArrayLength() > 1)
            {
                var secondElement = rawValue[1];
                if (secondElement.ValueKind == JsonValueKind.Object)
                {
                    ret.Options = new();
                    foreach (var entry in secondElement.EnumerateObject())
                    {
                        var value = entry.Value.AsObject();
                        if (value == null) continue;
                        ret.Options[entry.Name] = value;
                        if (entry.Name == "control_after_generate")
                        {
                            ret.ControlAfterGenerate = entry.Value.GetBoolean();
                        }
                    }
                }
            }
            return ret;
        }
        throw new Exception($"Could not parse node input definition from {rawValue}");
    }

    public static ComfyInputType GetDataType(JsonElement firstElement)
    {
        if (firstElement.ValueKind == JsonValueKind.String)
        {
            return firstElement.GetString() switch
            {
                "AUDIO" => ComfyInputType.Audio,
                "BOOLEAN" => ComfyInputType.Boolean,
                "CLIP" => ComfyInputType.Clip,
                "CLIP_VISION" => ComfyInputType.ClipVision,
                "CLIP_VISION_OUTPUT" => ComfyInputType.ClipVisionOutput,
                "COMBO" => ComfyInputType.Combo,
                "CONDITIONING" => ComfyInputType.Conditioning,
                "CONTROL_NET" => ComfyInputType.ControlNet,
                "ENUM" => ComfyInputType.Enum,
                "FASTERWHISPERMODEL" => ComfyInputType.FasterWhisperModel,
                "FILEPATH" => ComfyInputType.Filepath,
                "FL2MODEL" => ComfyInputType.Fl2Model,
                "FLOAT" => ComfyInputType.Float,
                "FLOATS" => ComfyInputType.Floats,
                "GLIGEN" => ComfyInputType.Gligen,
                "GUIDER" => ComfyInputType.Guider,
                "HOOKS" => ComfyInputType.Hooks,
                "IMAGE" => ComfyInputType.Image,
                "INT" => ComfyInputType.Int,
                "LATENT" => ComfyInputType.Latent,
                "LATENT_OPERATION" => ComfyInputType.LatentOperation,
                "LOAD_3D" => ComfyInputType.Load3D,
                "LOAD_3D_ANIMATION" => ComfyInputType.Load3DAnimation,
                "MASK" => ComfyInputType.Mask,
                "MESH" => ComfyInputType.Mesh,
                "MODEL" => ComfyInputType.Model,
                "NOISE" => ComfyInputType.Noise,
                "PHOTOMAKER" => ComfyInputType.Photomaker,
                "SAMPLER" => ComfyInputType.Sampler,
                "SIGMAS" => ComfyInputType.Sigmas,
                "STRING" => ComfyInputType.String,
                "STYLE_MODEL" => ComfyInputType.StyleModel,
                "SUBTITLE" => ComfyInputType.Subtitle,
                "TRANSCRIPTION_PIPELINE" => ComfyInputType.TranscriptionPipeline,
                "TRANSCRIPTIONS" => ComfyInputType.Transcriptions,
                "UPSCALE_MODEL" => ComfyInputType.UpscaleModel,
                "VAE" => ComfyInputType.VAE,
                "VHS_AUDIO" => ComfyInputType.VHSAudio,
                "VOXEL" => ComfyInputType.Voxel,
                "WAV_BYTES" => ComfyInputType.WavBytes,
                "WAV_BYTES_BATCH" => ComfyInputType.WavBytesBatch,
                "WEBCAM" => ComfyInputType. Webcam,
                _ => ComfyInputType.Unknown
            };
        }
        if (firstElement.ValueKind == JsonValueKind.Array)
        {
            // For combo boxes, the type is usually STRING, but let's just indicate it's an enum
            return ComfyInputType.Enum;
        }
        if (firstElement.ValueKind == JsonValueKind.Object)
        {
            return ComfyInputType.Combo;
        }
        return ComfyInputType.Unknown; // Fallback
    }
}