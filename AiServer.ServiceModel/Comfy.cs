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

[Tag(Tags.Comfy)]
[Route("/comfy/workflows")]
public class GetComfyWorkflows : IGet, IReturn<string[]> {}

[Tag(Tags.Comfy)]
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

[Tag(Tags.Comfy)]
[Route("/comfy/workflows/prompt")]
public class GetComfyApiPrompt : IGet, IReturn<string>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
}

[Tag(Tags.Comfy)]
[Route("/comfy/workflows/queue")]
public class QueueComfyWorkflow : IPost, IReturn<QueueComfyWorkflowResponse>
{
    [ValidateNotEmpty]
    public string Workflow { get; set; }
    public Dictionary<string, object>? Args { get; set; }
}
public class QueueComfyWorkflowResponse
{
    public long MediaProviderId { get; set; }
    public string RefId { get; set; }
    public string PromptId { get; set; }
    public long JobId { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}
