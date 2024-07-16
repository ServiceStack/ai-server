using AiServer.ServiceModel.Types;
using ServiceStack;

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
