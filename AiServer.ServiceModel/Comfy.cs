using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[Tag(Tag.Comfy)]
[ValidateApiKey]
public class FailComfyGeneration : IPost, IReturn<EmptyResponse>
{
    public long Id { get; set; }
    public string Provider { get; set; }
    public int DurationMs { get; set; }
    public ResponseStatus Error { get; set; }
}

[Tag(Tag.Comfy)]
[ValidateApiKey]
public class CompleteComfyGeneration : IPost, IReturn<EmptyResponse>
{
    public long Id { get; set; }
    public string Provider { get; set; }
    public int DurationMs { get; set; }
    public ComfyWorkflowResponse Response { get; set; }
    
    public ComfyWorkflowStatus Status { get; set; }
}

[Tag(ServiceModel.Tag.Comfy)]
[ValidateApiKey]
public class QueueComfyWorkflow : IReturn<QueueComfyWorkflowResponse>
{
    public string? Model { get; set; }
    public int? Steps { get; set; }
    public int? BatchSize { get; set; } = 1;
    public int? Seed { get; set; }
    public string? PositivePrompt { get; set; }
    public string? NegativePrompt { get; set; }
    [Input(Type = "file")]
    public Stream? ImageInput { get; set; }
    [Input(Type = "file")]
    public Stream? SpeechInput { get; set; }
    [Input(Type = "file")]
    public Stream? MaskInput { get; set; }
    
    public ComfySampler? Sampler { get; set; }
    public ArtStyle? ArtStyle { get; set; }
    public string? Scheduler { get; set; } = "normal";
    public int? CfgScale { get; set; }
    public double? Denoise { get; set; }
    
    public string? UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    
    public int? Width { get; set; }
    public int? Height { get; set; }
    
    public string? Clip { get; set; }
    public double? SampleLength { get; set; }
    
    public ComfyTaskType TaskType { get; set; }
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
}
public class QueueComfyWorkflowResponse
{
    public ComfyWorkflowRequest? Request { get; set; }
    public ComfyWorkflowStatus Status { get; set; }
    public ComfyWorkflowResponse WorkflowResponse { get; set; }
    public string PromptId { get; set; }
    public List<ComfyHostedFileOutput> FileOutputs { get; set; }
    public List<ComfyTextOutput> TextOutputs { get; set; }
}


[Tag(Tag.Comfy)]
[ValidateApiKey]
public class FetchComfyGenerationRequests
{
    public string[] Models { get; set; }
    public string? Provider { get; set; }
    
    public int? Take { get; set; }
}

public class FetchComfyGenerationRequestsResponse
{
    public required ComfyGenerationRequest[] Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tag.Comfy)]
[ValidateApiKey]
public class QueryCompletedComfyTasks : QueryDb<ComfyGenerationCompleted>
{
    public string? Db { get; set; }
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

[Tag(Tag.Comfy)]
[ValidateApiKey]
public class QueryFailedComfyTasks : QueryDb<ComfyGenerationFailed>
{
    public string? Db { get; set; }
}

[Tag(ServiceModel.Tag.Comfy)]
[ValidateApiKey]
public class CreateComfyGeneration : ICreateDb<ComfyGenerationTask>, IReturn<CreateComfyGenerationResponse>
{
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
    public ComfyWorkflowRequest Request { get; set; }
}

public class CreateComfyGenerationResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tag.Comfy)]
[ValidateApiKey]
public class GetComfyGeneration : IReturn<GetComfyGenerationResponse>
{
    public long? Id { get; set; }
    public string? RefId { get; set; }
}

public class GetComfyGenerationResponse
{
    public List<AiServerHostedComfyFile>? Outputs { get; set; }
    public ComfyGenerationTask? Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tag.Comfy)]
[ValidateApiKey]
public class ImportCivitAiModel : IReturn<ImportCivitAiModelResponse>
{
    public string Provider { get; set; }
    public string ModelUrl { get; set; }
}

public class ImportCivitAiModelResponse
{
    public ComfyApiModel Model { get; set; }
    public ComfyApiProvider Provider { get; set; }
}
