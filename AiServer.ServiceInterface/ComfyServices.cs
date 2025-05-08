using System.Reflection;
using AiServer.ServiceModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class ComfyServices(ILogger<ComfyServices> log,
    IWebHostEnvironment env, 
    ComfyMetadata metadata, 
    ComfyGateway comfyGateway) 
    : Service
{
    public List<string> Get(GetComfyWorkflows request)
    {
        var workflowsPath = env.WebRootPath.CombineWith("lib", "data", "workflows");
        var files = Directory.GetFiles(workflowsPath, "*.json", SearchOption.AllDirectories);

        var allWorkflows = files.Map(x => x[workflowsPath.Length..].TrimStart('/'));

        var overrideWorkflowPath = env.ContentRootPath.CombineWith("App_Data", "overrides", "workflows");
        var overrideFiles = Directory.GetFiles(overrideWorkflowPath, "*.json", SearchOption.AllDirectories);

        allWorkflows.AddRange(overrideFiles.Map(x => x[overrideWorkflowPath.Length..].TrimStart('/')));
        allWorkflows.Sort();

        return allWorkflows;
    }

    public async Task<object> Get(GetComfyWorkflowInfo request)
    {
        var workflowInfo = await GetWorkflowInfoAsync(request.Workflow);
        return new GetComfyWorkflowInfoResponse
        {
            Result = workflowInfo
        };
    }

    public async Task<ComfyWorkflowInfo> GetWorkflowInfoAsync(string path)
    {
        path = path.Replace('\\', '/');
        var workflowJson = await GetWorkflowJsonAsync(path);

        if (workflowJson == null)
            throw HttpError.NotFound("Workflow not found");

        var workflowInfo = ComfyWorkflowParser.Parse(workflowJson, path, metadata.DefaultNodeDefinitions);
        return workflowInfo;
    }

    private async Task<string?> GetWorkflowJsonAsync(string path)
    {
        path = path.Replace('\\', '/');
        var workflowsPath = env.WebRootPath.CombineWith("lib", "data", "workflows");
        if (!path.IsPathSafe(workflowsPath))
            throw new ArgumentNullException(nameof(GetComfyWorkflowInfo.Workflow), "Invalid Workflow Path");

        var overridePath = env.ContentRootPath.CombineWith("App_Data", "overrides", "workflows").Replace('\\', '/');
        string? workflowJson = null;

        if (File.Exists(overridePath.CombineWith(path)))
        {
            workflowJson = await File.ReadAllTextAsync(overridePath.CombineWith(path));
        }
        else if (File.Exists(workflowsPath.CombineWith(path)))
        {
            workflowJson = await File.ReadAllTextAsync(workflowsPath.CombineWith(path));
        }
        else
        {
            if (File.Exists(overridePath.CombineWith(path)))
            {
                workflowJson = await File.ReadAllTextAsync(overridePath.CombineWith(path));
            }
            else
            {
                var allPaths = Get(new GetComfyWorkflows());
                var matches = allPaths.Where(x => x.EndsWith(path)).ToList();
                if (matches.Count == 1)
                {
                    if (File.Exists(overridePath.CombineWith(matches[0])))
                    {
                        workflowJson = await File.ReadAllTextAsync(overridePath.CombineWith(matches[0]));
                    }
                    else if (File.Exists(workflowsPath.CombineWith(matches[0])))
                    {
                        workflowJson = await File.ReadAllTextAsync(workflowsPath.CombineWith(matches[0]));
                    }
                }
                else if (matches.Count > 1)
                {
                    throw HttpError.Conflict("Multiple matches found");
                }
            }
        }

        return workflowJson;
    }

    public const string ComfyBaseUrl = "http://localhost:7860/api";
    public const string ComfyApiKey = "";

    public async Task<string> Get(GetComfyApiPrompt request)
    {
        var client = comfyGateway.CreateHttpClient(ComfyBaseUrl, ComfyApiKey);
        var nodeDefs = await metadata.LoadNodeDefinitionsAsync(client);
        var workflowInfo = await GetWorkflowInfoAsync(request.Workflow);
        var workflowJson = await GetWorkflowJsonAsync(workflowInfo.Path)
                           ?? throw HttpError.NotFound("Workflow not found");
        var apiPromptJson = ComfyConverters.ConvertWorkflowToApiPrompt(workflowJson, nodeDefs, log);
        return apiPromptJson;
    }

    public async Task<object> Post(ExecuteComfyWorkflow request)
    {
        var client = comfyGateway.CreateHttpClient(ComfyBaseUrl, ComfyApiKey);
        var nodeDefs = await metadata.LoadNodeDefinitionsAsync(client);
        var workflowInfo = await GetWorkflowInfoAsync(request.Workflow);
        var workflowJson = await GetWorkflowJsonAsync(workflowInfo.Path)
            ?? throw HttpError.NotFound("Workflow not found");

        if (request.Args?.Count > 0)
        {
            var result = ComfyWorkflowParser.MergeWorkflow(workflowJson, request.Args, nodeDefs);
            workflowJson = result.Result;
        }
        
        var apiPromptJson = ComfyConverters.ConvertWorkflowToApiPrompt(workflowJson, nodeDefs, log);
        var resultJson = await comfyGateway.ExecuteApiPromptAsync(ComfyBaseUrl, ComfyApiKey, apiPromptJson);
        return resultJson;
    }
}
