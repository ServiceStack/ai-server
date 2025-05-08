using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using ServiceStack;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging.Abstractions;

namespace AiServer.ServiceInterface;

// Custom converter to handle both string and numeric IDs
public class NodeIdConverter : JsonConverter<string>
{
    public override string? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Number)
            return reader.GetInt32().ToString();
        if (reader.TokenType == JsonTokenType.String)
            return reader.GetString();

        throw new JsonException($"Unexpected token type: {reader.TokenType}");
    }

    public override void Write(Utf8JsonWriter writer, string value, JsonSerializerOptions options)
    {
        // Try to parse as integer first
        if (int.TryParse(value, out int intValue))
        {
            writer.WriteNumberValue(intValue);
        }
        else
        {
            writer.WriteStringValue(value);
        }
    }
}

// --- C# Classes reflecting the JSON structures ---

// Classes for parsing the ComfyUI Workflow JSON
public class WorkflowNodeInputDefinition
{
    [JsonPropertyName("link")] public int? Link { get; set; } // Link ID if connected
    // Other properties like "name", "type" might exist but are not strictly needed for API prompt conversion
}

public class WorkflowNodeInput
{
    [JsonPropertyName("name")] public string? Name { get; set; }

    [JsonPropertyName("type")] public string? Type { get; set; }

    [JsonPropertyName("link")] public int? Link { get; set; }
}

public class WorkflowNode
{
    private string? _id;

    [JsonPropertyName("id")]
    [JsonConverter(typeof(NodeIdConverter))]
    public string? Id { get; set; }

    [JsonPropertyName("type")] // Sometimes display name, but class_type is reliable
    public string Type { get; set; } = ""; // Can ignore if class_type is present

    [JsonPropertyName("inputs")]
    public List<WorkflowNodeInput>? InputsArray { get; set; } // For parsing workflows with inputs as array

    [JsonPropertyName("processed_inputs")]
    public Dictionary<string, WorkflowNodeInputDefinition>? Inputs { get; set; } // For internal use

    [JsonPropertyName("widgets_values")]
    public List<JsonElement>? WidgetsValues { get; set; } // Use JsonElement to capture various types

    // Other workflow node properties (pos, size, mode, etc.) are not needed for the API prompt

    // Process InputsArray into Inputs dictionary
    public void ProcessInputs()
    {
        if (InputsArray is { Count: > 0 })
        {
            Inputs = new Dictionary<string, WorkflowNodeInputDefinition>();
            foreach (var input in InputsArray)
            {
                if (input.Name != null)
                {
                    Inputs[input.Name] = new WorkflowNodeInputDefinition { Link = input.Link };
                }
            }
        }
    }
}

public class WorkflowLink
{
    // Link structure: [link_id, source_node_id, source_output_index, target_node_id, target_input_name, target_input_index_maybe?]
    // We'll read this into a simple class for clarity.
    [JsonPropertyName("0")] public int Id { get; set; }
    [JsonPropertyName("1")] public string SourceNodeId { get; set; } = "";
    [JsonPropertyName("2")] public int SourceOutputIndex { get; set; }
    [JsonPropertyName("3")] public string TargetNodeId { get; set; } = "";
    [JsonPropertyName("4")] public string TargetInputName { get; set; } = "";
    // [JsonPropertyName("5")] public int? TargetInputIndexMaybe { get; set; } // Sometimes present, not always needed

    // Helper to deserialize the array format
    public static WorkflowLink? FromJsonArray(JsonElement element)
    {
        if (element.ValueKind != JsonValueKind.Array || element.GetArrayLength() < 5)
        {
            return null; // Not a valid link array
        }

        var link = new WorkflowLink
        {
            Id = element[0].GetInt32()
        };

        // Handle source node ID (could be number or string)
        if (element[1].ValueKind == JsonValueKind.Number)
        {
            link.SourceNodeId = element[1].GetInt32().ToString();
        }
        else
        {
            link.SourceNodeId = element[1].GetRawText().Trim('"');
        }

        link.SourceOutputIndex = element[2].GetInt32();

        // Handle target node ID (could be number or string)
        if (element[3].ValueKind == JsonValueKind.Number)
        {
            link.TargetNodeId = element[3].GetInt32().ToString();
        }
        else
        {
            link.TargetNodeId = element[3].GetRawText().Trim('"');
        }

        // Handle target input name
        if (element[4].ValueKind == JsonValueKind.String)
        {
            link.TargetInputName = element[4].GetString() ?? "";
        }
        else if (element[4].ValueKind == JsonValueKind.Number)
        {
            link.TargetInputName = element[4].GetInt32().ToString();
        }

        return link;
    }
}

public class ComfyUIWorkflow
{
    [JsonPropertyName("nodes")]
    public List<WorkflowNode>? NodesArray { get; set; } // For parsing workflows with nodes as array

    [JsonPropertyName("processed_nodes")]
    public Dictionary<string, WorkflowNode> Nodes { get; set; } = new(); // For internal use

    [JsonPropertyName("links")]
    // Links are represented as arrays in the workflow JSON, so we need a custom converter or process them manually
    // Let's process them manually after deserializing the root.
    public List<JsonElement>? LinksJson { get; set; } // Temporarily hold raw link data

    // Use a different property name for the processed links to avoid collision with LinksJson
    [JsonPropertyName("processed_links")]
    public List<WorkflowLink> Links { get; set; } = new List<WorkflowLink>(); // Processed links

    // Add a method to process the raw link data and nodes after deserialization
    public void ProcessData()
    {
        // Process links
        Links.Clear();
        if (LinksJson != null)
        {
            foreach (var linkElement in LinksJson)
            {
                var link = WorkflowLink.FromJsonArray(linkElement);
                if (link != null)
                {
                    Links.Add(link);
                }
            }
        }

        LinksJson = null; // Clear raw data to save memory if needed

        // Process nodes from array to dictionary if needed
        if (NodesArray is { Count: > 0 })
        {
            Nodes.Clear();
            foreach (var node in NodesArray)
            {
                // Process inputs for this node
                node.ProcessInputs();

                if (node.Id != null)
                {
                    Nodes[node.Id] = node;
                }
            }
        }
    }
}

public class ApiNode
{
    [JsonPropertyName("inputs")]
    public Dictionary<string, object> Inputs { get; set; } = new(); // InputName -> value or [source_node_id, output_index]
    [JsonPropertyName("class_type")] public string ClassType { get; set; } = "";
}

public class ApiPrompt
{
    // Key is the workflow node ID (string)
    [JsonPropertyName("prompt")]
    public Dictionary<string, ApiNode> Prompt { get; set; } = new();

    // Other optional properties like extra_data, client_id can be added here
    [JsonPropertyName("extra_data")]
    public JsonObject? ExtraData { get; set; }

    [JsonPropertyName("client_id")]
    public string? ClientId { get; set; }
}

public static class ComfyConverters
{
    public static JsonSerializerOptions JsonOptions => new() { PropertyNameCaseInsensitive = true };
    public static JsonSerializerOptions JsonPromptOptions => new()
    {
        WriteIndented = true, // Optional: for human-readable output
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull // Don't write null properties
    };

    /// <summary>
    /// Converts a ComfyUI workflow JSON string to an /api/prompt JSON string.
    /// Requires object_info.json to have been loaded first via LoadObjectInfo.
    /// </summary>
    /// <param name="workflowJson">The JSON content of the ComfyUI workflow.</param>
    /// <returns>The JSON content for the /api/prompt endpoint.</returns>
    /// <exception cref="InvalidOperationException">Thrown if object_info.json was not loaded.</exception>
    /// <exception cref="JsonException">Thrown if the workflow JSON is invalid.</exception>
    public static string ConvertWorkflowToApiPrompt(string workflowJson, Dictionary<string, NodeInfo> nodeDefs, ILogger? log=null)
    {
        log ??= NullLogger.Instance;
        
        var workflowJsonNode = JsonNode.Parse(workflowJson);

        var workflow = workflowJsonNode.Deserialize<ComfyUIWorkflow>(JsonOptions);
        if (workflow == null)
            throw new JsonException("Invalid ComfyUI workflow JSON format.");

        // Process the array-based data into our structured format
        workflow.ProcessData();

        // Check if we have nodes to process
        if (workflow.Nodes.Count == 0)
            throw new JsonException("No nodes found in workflow JSON.");
        
        var apiPrompt = new ApiPrompt
        {
            ClientId = Guid.NewGuid().ToString("N"),
            ExtraData = new JsonObject {
                ["extra_pnginfo"] = new JsonObject {
                    ["workflow"] = workflowJsonNode
                }
            },
        };
        
        var linkLookup = new Dictionary<int, WorkflowLink>();
        foreach (var link in workflow.Links)
        {
            linkLookup[link.Id] = link;
        }

        foreach (var nodeEntry in workflow.Nodes)
        {
            var nodeId = nodeEntry.Key;
            var workflowNode = nodeEntry.Value;

            if (string.IsNullOrEmpty(workflowNode.Type))
            {
                log.LogWarning("Node {NodeId} has no class_type. Skipping.", nodeId);
                continue;
            }

            // Create the API node representation
            var apiNode = new ApiNode
            {
                ClassType = workflowNode.Type,
                Inputs = new Dictionary<string, object>()
            };

            // Look up the node definition from object_info for input ordering
            if (!nodeDefs.TryGetValue(workflowNode.Type, out var nodeInfo) ||
                nodeInfo?.InputOrder == null)
            {
                log.LogWarning("Node definition not found or incomplete for class_type '{WorkflowNodeType}'. Attempting partial conversion without input order.", workflowNode.Type);
                // If object_info is missing, we can only copy widget values and inputs dictionary directly
                // This might not map widgets correctly to names, but it's a fallback.
                // A more robust approach might fail conversion here.
                if (workflowNode.WidgetsValues != null)
                {
                    // Without names from object_info, we can't map widgets correctly by name.
                    // We could try to guess or just skip them, as connections are named.
                    // Let's skip widgets if info is missing, rely only on named connections.
                    log.LogWarning("Skipping widget values for node {NodeId} because object_info is missing.", nodeId);
                }

                if (workflowNode.Inputs != null)
                {
                    foreach (var inputDef in workflowNode.Inputs)
                    {
                        if (inputDef.Value.Link.HasValue &&
                            linkLookup.TryGetValue(inputDef.Value.Link.Value, out var link))
                        {
                            // Add connection: [source_node_id, source_output_index]
                            apiNode.Inputs[inputDef.Key] = new object[] { link.SourceNodeId, link.SourceOutputIndex };
                        }
                        // Note: If workflowNode.Inputs contained static values directly, this fallback would need to handle that.
                        // Standard workflow JSON usually puts static values in widgets_values.
                    }
                }
            }
            else
            {
                // Use input_order from object_info to map widgets_values and inputs
                var allInputNamesInOrder = nodeInfo.InputOrder.GetAllInputNamesInOrder();
                var widgetValueIndex = 0;

                var requiredInputs = nodeInfo.Input?.GetValueOrDefault("required");
                var optionalInputs = nodeInfo.Input?.GetValueOrDefault("optional");

                foreach (var inputName in allInputNamesInOrder)
                {
                    WorkflowNodeInputDefinition? inputDef = null;
                    bool isConnected = workflowNode.Inputs != null &&
                                       workflowNode.Inputs.TryGetValue(inputName, out inputDef) &&
                                       inputDef.Link.HasValue;

                    if (isConnected)
                    {
                        // This input is connected, get info from the link
                        var linkId = inputDef!.Link!.Value;
                        if (linkLookup.TryGetValue(linkId, out var link))
                        {
                            // Add connection: [source_node_id, source_output_index]
                            apiNode.Inputs[inputName] = new object[] { link.SourceNodeId, link.SourceOutputIndex };
                        }
                        else
                        {
                            log.LogWarning("Link {LinkId} not found for input '{InputName}' on node {NodeId}. Skipping connection.",
                                linkId, inputName, nodeId);
                        }
                    }
                    else
                    {
                        // This input should get its value from widgets_values
                        if (workflowNode.WidgetsValues != null && widgetValueIndex < workflowNode.WidgetsValues.Count)
                        {
                            var nodeInputDef = requiredInputs?.GetValueOrDefault(inputName)
                                    ?? optionalInputs?.GetValueOrDefault(inputName);
                            var value = workflowNode.WidgetsValues[widgetValueIndex];
                            
                            var inWidgetValues = (nodeInputDef == null && inputName.EndsWith("seed")) ||
                                nodeInputDef?.Type is ComfyInputType.Int or ComfyInputType.Float
                                or ComfyInputType.String or ComfyInputType.Boolean or ComfyInputType.Enum 
                                or ComfyInputType.Combo or ComfyInputType.Filepath;
                            if (inWidgetValues)
                            {
                                apiNode.Inputs[inputName] = value; // Deserialize element to object
                                widgetValueIndex++;
                                if (nodeInputDef?.ControlAfterGenerate == true)
                                {
                                    widgetValueIndex++;
                                }
                            }
                        }
                        else
                        {
                            // This indicates a mismatch between object_info and workflow JSON
                            log.LogWarning("Input '{InputName}' on node {NodeId} (class_type: {WorkflowNodeType}) is not connected and no corresponding value found in widgets_values at index {WidgetValueIndex}. This may result in missing input in API call.",
                                inputName, nodeId, workflowNode.Type, widgetValueIndex);
                            // Optional: Add a default value if available in object_info, though API usually handles missing inputs with defaults.
                        }
                    }
                }

                // Optional: Check if there are leftover widgets_values (indicates mismatch)
                if (workflowNode.WidgetsValues != null && widgetValueIndex < workflowNode.WidgetsValues.Count)
                {
                    log.LogWarning("Node {NodeId} (class_type: {WorkflowNodeType}) has {UnexpectedValues} unexpected values in widgets_values.",
                        nodeId, workflowNode.Type, workflowNode.WidgetsValues.Count - widgetValueIndex);
                }
            }

            // Add the API node to the prompt structure
            apiPrompt.Prompt[nodeId] = apiNode;
        }

        // Serialize the API prompt structure to JSON
        return JsonSerializer.Serialize(apiPrompt, JsonPromptOptions);
    }
    
    public static ComfyResult ParseComfyResult(string resultJson, string? comfyApiBaseUrl=null)
    {
        using var jsonDoc = JsonDocument.Parse(resultJson, new JsonDocumentOptions
        {
            AllowTrailingCommas = true,
            CommentHandling = JsonCommentHandling.Skip,
        });

        var root = jsonDoc.RootElement;

        var ret = new ComfyResult
        {
            PromptId = root.EnumerateObject().First().Name,
        };

        // Access the outputs section for this execution
        var elPrompt = root.GetProperty(ret.PromptId);
        var elOutputs = elPrompt.GetProperty("outputs");

        if (elPrompt.TryGetProperty("prompt", out var elPromptTuple))
        {
            var promptTuple = elPromptTuple.EnumerateArray().ToList();
            if (promptTuple.Count > 3)
            {
                var extraData = promptTuple[3];
                if (extraData.ValueKind == JsonValueKind.Object)
                {
                    if (extraData.TryGetProperty("client_id", out var elClientId))
                    {
                        ret.ClientId = elClientId.GetString();
                    }
                }
            }
        }

        // Iterate through all output nodes
        foreach (var nodeOutput in elOutputs.EnumerateObject())
        {
            var nodeId = nodeOutput.Name;

            // Extract Node Images
            if (nodeOutput.Value.TryGetProperty("images", out var imagesArray))
            {
                ret.ImageOutputs ??= [];
                foreach (var image in imagesArray.EnumerateArray())
                {
                    if (image.TryGetProperty("filename", out var elFilename) &&
                        image.TryGetProperty("type", out var type))
                    {
                        var filename = elFilename.GetString();
                        if (string.IsNullOrEmpty(filename)) continue;

                        image.TryGetProperty("subfolder", out var elSubFolder);

                        //view?filename=ComfyUI_00424_.png&type=output&subfolder=
                        var path = "/view"
                            .AddQueryParam("filename", filename)
                            .AddQueryParam("type", type.GetString() ?? "")
                            .AddQueryParam("subfolder", elSubFolder.GetString() ?? "");

                        ret.ImageOutputs.Add(new() {
                            NodeId = nodeId,
                            Url = comfyApiBaseUrl.CombineWith(path)
                        });
                    }
                }
            }
            if (nodeOutput.Value.TryGetProperty("text", out var textArray))
            {
                ret.TextOutputs ??= [];
                foreach (var text in textArray.EnumerateArray())
                {
                    ret.TextOutputs.Add(new() {
                        NodeId = nodeId,
                        Text = text.GetString()
                    });
                }
            }
        }

        if (elPrompt.TryGetProperty("status", out var elStatus) &&
            elStatus.TryGetProperty("messages", out var elMessages))
        {
            long startTimestamp = 0;
            long endTimestamp = 0;

            foreach (var message in elMessages.EnumerateArray())
            {
                var messageType = message[0].GetString();
                var elMessageData = message[1];

                if (messageType == "execution_start")
                {
                    startTimestamp = elMessageData.GetProperty("timestamp").GetInt64();
                }
                else if (messageType == "execution_success")
                {
                    endTimestamp = elMessageData.GetProperty("timestamp").GetInt64();
                }
            }
            if (startTimestamp > 0 && endTimestamp > 0)
            {
                ret.Duration = TimeSpan.FromMilliseconds(endTimestamp - startTimestamp);
            }
        }
        return ret;
    }
}
