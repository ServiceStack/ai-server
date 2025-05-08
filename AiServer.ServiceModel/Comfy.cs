using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;


[Tag(Tags.MediaInfo)]
public class GetComfyModels : IReturn<GetComfyModelsResponse>
{
    public string? ApiBaseUrl { get; set; }
    public string? ApiKey { get; set; }
}

public class GetComfyModelsResponse
{
    public List<string> Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class GetComfyModelMappingsResponse
{
    public Dictionary<string, string> Models { get; set; }
}

[Tag(Tags.MediaInfo)]
public class GetComfyModelMappings : IReturn<GetComfyModelMappingsResponse>
{
}

public class ComfyAgentDownloadStatus
{
    public string? Name { get; set; }
    public int? Progress { get; set; }
}

[Route("/comfy/{Year}/{Month}/{Day}/{Filename}")]
public class DownloadComfyFile : IReturn<Stream>
{
    public int? Year { get; set; }
    public int? Month { get; set; }
    public int? Day { get; set; }
    public string? FileName { get; set; }
}

[Route("/comfy/workflows")]
public class GetComfyWorkflows : IGet, IReturn<string[]> {}

[Route("/comfy/workflows/info")]
public class GetComfyWorkflowInfo : IGet, IReturn<GetComfyWorkflowInfoResponse>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
}
public class GetComfyWorkflowInfoResponse
{
    public ComfyWorkflowInfo Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Route("/comfy/workflows/prompt")]
public class GetComfyApiPrompt : IGet, IReturn<string>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
}

[Route("/comfy/workflows/execute")]
public class ExecuteComfyWorkflow : IPost, IReturn<ExecuteComfyWorkflowResponse>
{
    public string Workflow { get; set; }
    public Dictionary<string, object> Args { get; set; }
}
public class ExecuteComfyWorkflowResponse
{
    public ComfyResult? Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}
