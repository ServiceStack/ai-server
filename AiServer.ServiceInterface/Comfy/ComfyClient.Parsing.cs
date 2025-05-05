using System.Text.Json.Nodes;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface.Comfy;

public partial class ComfyClient
{
    public async Task<string> ConvertWorkflowToApiAsync(string rawWorkflow, CancellationToken token)
    {
        JsonObject workflow;
        try
        {
            workflow = JsonNode.Parse(rawWorkflow).AsObject();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Invalid workflow JSON. This is usually due to missing values or templating syntax issues.\n" +
                                $"JSON: {rawWorkflow}", e);
        }
        var apiNodes = new JsonObject();
        var nodeOutputs = new JsonObject();
        
        // `links` contains an array of links between nodes.
        // Each link is an array with the following elements:
        // 0: link id - Usually just incrementing integers
        // 1: source node id
        // 2: source slot id
        // 3: destination node id
        // 4: destination slot id
        // 5: link type - eg 'MODEL', 'CLIP', etc. The UI uses this to match valid input/output pairs.
        if (!workflow.TryGetPropertyValue("links", out var allLinks))
            throw new Exception("Invalid workflow JSON");

        // Map node outputs
        foreach (var jToken in allLinks.AsArray())
        {
            var link = jToken.AsArray();
            var srcNodeId = link[1].ToString();
            var srcSlot = (int)link[2];
            var destNodeId = link[3].ToString();
            var destSlot = (int)link[4];
            if (!nodeOutputs.ContainsKey(srcNodeId))
                nodeOutputs[srcNodeId] = new JsonObject();
            nodeOutputs[srcNodeId]![srcSlot.ToString()] = new JsonArray { destNodeId, destSlot };
        }
        
        // `nodes` contains an array of nodes. These represent steps along the workflow where processing is done.
        // Each node is an object with the following properties:
        // id: node id - Unique identifier for the node
        // type: node type - The type of node. This is used to determine what processing is done at this step.
        // inputs: array of inputs which can be either links from other node outputs or widget values set on the node
        // widgets_values: array of values set on the node. These are used when the node is not connected to any other nodes.
        // - wigets_values are index sensitive. The order of the values in the array is important.
        // - A node type is defined in the `object_info` endpoint. This endpoint returns metadata about the node type.
        // - A node type metadata contains a `required` object which lists required inputs for the node type.
        // - The order of the keys in the `required` object is the order in which the inputs should be set in the `widgets_values` array.
        // - The inputs that come from other nodes can be populated first since they are not index sensitive.
        // - The `seed` input is a special case. This is due to a few nodes have a seed value where behaviour is on the client side.
        // - The `control_after_generate` input value is in the `widgets_values` array but is not used in the API.
        // - This value always comes after the `seed` value, so we need to skip it when assigning values from the workflow to API format.
        if (!workflow.TryGetPropertyValue("nodes", out var workflowNodes))
            throw new Exception("Invalid workflow JSON");

        // Sort workflow nodes by ID
        var orderedNodes = workflowNodes.AsArray().OrderBy(x => int.Parse(x["id"].ToString())).ToList();
        
        // Some nodes are not supported by the API, so we need to create an id mapping of their value
        // straight out of the workflow JSON before we start constructing the API JSON.
        var localNodeValueMapping = new Dictionary<string, Tuple<string,string>>();
        var localNodes = orderedNodes.Where(x => excludedNodeTypes.Contains(x["type"].ToString())).ToList();
        foreach (var node in localNodes)
        {
            var outputNode = node["outputs"]!.AsArray().FirstOrDefault();
            var widgetValName = outputNode!["widget"].AsObject()["name"].ToString();
            var slotIndex = outputNode["slot_index"].GetValue<int>();
            var val = node["widgets_values"]!.AsArray()[slotIndex].ToString();
            localNodeValueMapping[node["id"].ToString()] = new Tuple<string, string>(widgetValName, val);
        }
        
        orderedNodes = orderedNodes.Where(x => !excludedNodeTypes.Contains(x["type"].ToString())).ToList();
        
        // Convert nodes
        foreach (var jToken in orderedNodes)
        {
            var node = jToken.AsObject();
            if (node == null)
                throw new Exception("Invalid workflow JSON");
            if (!node.TryGetPropertyValue("id", out var idToken))
                throw new Exception("Invalid workflow JSON");
            var nodeId = idToken.ToString();
            var classType = node["type"].ToString();
            await AddToMappingAsync(classType, token);

            var apiNode = new JsonObject {
                ["inputs"] = new JsonObject()
            };

            if (metadataMapping.TryGetValue(classType, out var currentClass))
            {
                var requiredMetadata = currentClass["input"]!["required"]!.AsObject();
                var widgetIndex = 0;
                foreach (var prop in requiredMetadata)
                {
                    var propName = prop.Key;
                    if (node.ContainsKey("inputs") && node["inputs"]!.AsArray().Any(x => x["name"]!.ToString() == propName))
                    {
                        var inputNode = node["inputs"]!.AsArray().FirstOrDefault(x => x["name"]!.ToString() == propName);
                        var srcNodeId = inputNode!["link"]!.ToString();
                        var linkVals = allLinks.AsArray().FirstOrDefault(x => (int)x[0] == int.Parse(srcNodeId));
                        if (localNodeValueMapping.ContainsKey(linkVals![1].GetValue<int>().ToString()))
                        {
                            var val = localNodeValueMapping[linkVals[1].GetValue<int>().ToString()];
                            // Only support ints for now
                            apiNode["inputs"][propName] = int.Parse(val.Item2);
                            widgetIndex++;
                        }
                        else
                        {
                            apiNode["inputs"][propName] = new JsonArray { linkVals![1].GetValue<int>().ToString(), linkVals[2].GetValue<int>() };    
                        }
                    }
                    else
                    {
                        if (!node.ContainsKey("widgets_values"))
                            continue;
                        var widgetVals = node["widgets_values"]!.AsArray();
                        if (widgetIndex < widgetVals.Count)
                        {
                            apiNode["inputs"][propName] = widgetVals[widgetIndex].DeepClone();
                            widgetIndex++;
                        }
                        if (propName == "seed")
                        {
                            widgetIndex++;
                        }
                    }
                }
            }
            apiNode["class_type"] = classType;
            apiNodes[nodeId] = apiNode;
        }
        
        var ret = new JsonObject
        {
            ["prompt"] = apiNodes, 
            ["client_id"] = clientId,
        }.ToJsonString();
        return ret;
    }
    
    private async Task AddToMappingAsync(string classType, CancellationToken token)
    {
        if (!excludedNodeTypes.Contains(classType) && !metadataMapping.ContainsKey(classType))
        {
            var response = await httpClient.GetStringAsync($"/object_info/{classType}", token);
            var respObject = JsonNode.Parse(response).AsObject();
            if (respObject.TryGetPropertyValue(classType, out var value))
            {
                metadataMapping[classType] = value.AsObject();
            }
        }
    }
    
    /// <summary>
    /// Parse the status JSON response from ComfyUI API
    /// This comes from the /history/{id} endpoint
    /// And has somewhat of a strange format
    /// The root object key is the job ID, and it has 3 properties:
    /// - prompt
    /// - outputs
    /// - status
    ///
    /// `prompt` is an array of 5 elements that seem to be in the order of:
    /// 0. The number of nodes in the workflow (int)
    /// 1. The Job ID (string)
    /// 2. The full API request object that created the job (object)
    /// 3. Not sure, empty object?
    /// 4. An array of strings that represent nodes with outputs. Eg, ["10"]
    ///
    /// `outputs` is an object with keys that match the node IDs that have outputs.
    /// Each of these is an object which contains the output data for that node.
    /// The structure of that output also seems to be node specific.
    ///
    /// `status` is an object with the following properties:
    /// - status_str: A string that represents the status of the job
    /// - completed: A boolean that represents if the job is completed
    /// - messages: An array of messages events that have occurred during the job
    /// Each message is an array with two elements, a name string and an object with the message data,
    /// the structure of which is dependent on the message type.
    /// </summary>
    /// <param name="statusJson"></param>
    /// <returns></returns>
    private ComfyWorkflowStatus ParseWorkflowStatus(JsonObject statusJson, string jobId)
    {
        var hasJob = statusJson.ContainsKey(jobId);
        if (!hasJob)
            throw new Exception("Job ID not found in status JSON");
        
        var job = statusJson[jobId].AsObject();
        var prompt = job["prompt"].AsArray();
        var outputs = job["outputs"].AsObject();
        var status = job["status"].AsObject();

        if (outputs.Count == 0 &&
            status["messages"].AsArray() != null && status["messages"].AsArray().Count > 2 &&
            status["messages"][2].AsArray() != null && status["messages"][2].AsArray().Count > 0 &&
            status["messages"][2][0].ToString() == "execution_error")
        {
            // Check for error messages
            var errorMessages = status["messages"][2][1].AsObject();

            return new ComfyWorkflowStatus
            {
                StatusMessage = "Failed",
                Completed = false,
                Error = errorMessages.ToJsonString()
            };
        }

        var outputNodeIds = prompt[4].AsArray().GetValues<string>();
        var result = new ComfyWorkflowStatus
        {
            StatusMessage = status["status_str"].ToString(),
            Completed = status["completed"].GetValue<bool>(),
            Outputs = outputNodeIds.Select(x =>
            {
                var output = outputs[x].AsObject();
                var result = new ComfyOutput();
                if (output.ContainsKey("images"))
                {
                    result.Files = output["images"].AsArray().Select(y => new ComfyFileOutput
                    {
                        Filename = y["filename"].ToString(),
                        Type = y["type"].ToString(),
                        Subfolder = y["subfolder"].ToString()
                    }).ToList();
                }
                if (output.ContainsKey("text"))
                {
                    result.Texts = output["text"].AsArray().Select(y => new ComfyTextOutput
                    {
                        Text = y.ToString()
                    }).ToList();
                }

                if (output.ContainsKey("previews"))
                {
                    result.Files = output["previews"].AsArray().Select(y => new ComfyFileOutput
                    {
                        Filename = y["filename"].ToString(),
                        Type = y["type"].ToString(),
                        Subfolder = y["subfolder"].ToString()
                    }).ToList();
                }
                
                if(output.ContainsKey("audio"))
                {
                    result.Files = output["audio"].AsArray().Select(y => new ComfyFileOutput
                    {
                        Filename = y["filename"].ToString(),
                        Type = y["type"].ToString(),
                        Subfolder = y["subfolder"].ToString()
                    }).ToList();
                }

                return result;
            }).ToList()
        };
        
        return result;
    }
}
