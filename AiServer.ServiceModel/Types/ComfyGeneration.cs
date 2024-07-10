using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel.Types;

public class ComfyGenerationTask : TaskBase
{
    [AutoIncrement]
    public long Id { get; set; }
    public ComfyWorkflowRequest Request { get; set; }
    
    public ComfyWorkflowResponse? Response { get; set; }
    
    public ComfyTaskType TaskType { get; set; }
    public string WorkflowTemplate { get; set; }

}

public class ComfyGenerationCompleted : ComfyGenerationTask
{
    public ComfyWorkflowStatus? Status { get; set; }
}

public class ComfyGenerationFailed : ComfyGenerationTask
{
    public DateTime FailedDate { get; set; }
}

[ValidateApiKey]
public class FailComfyGeneration : IPost, IReturn<EmptyResponse>
{
    public long Id { get; set; }
    public string Provider { get; set; }
    public int DurationMs { get; set; }
    public ResponseStatus Error { get; set; }
}

[ValidateApiKey]
public class CompleteComfyGeneration : IPost, IReturn<EmptyResponse>
{
    public long Id { get; set; }
    public string Provider { get; set; }
    public int DurationMs { get; set; }
    public ComfyWorkflowResponse Response { get; set; }
}

[DataContract]
public enum ArtStyle
{
    [EnumMember(Value = "3d_model")]
    ThreeDModel,
    [EnumMember(Value = "analog_film")]
    AnalogFilm,
    [EnumMember(Value = "anime")]
    Anime,
    [EnumMember(Value = "cinematic")]
    Cinematic,
    [EnumMember(Value = "comic")]
    ComicBook,
    [EnumMember(Value = "digital_art")]
    DigitalArt,
    [EnumMember(Value = "enhance")]
    Enhance,
    [EnumMember(Value = "fantasy_art")]
    FantasyArt,
    [EnumMember(Value = "isometric")]
    Isometric,
    [EnumMember(Value = "line_art")]
    LineArt,
    [EnumMember(Value = "low_poly")]
    LowPoly,
    [EnumMember(Value = "modeling_compound")]
    ModelingCompound,
    [EnumMember(Value = "neon_punk")]
    NeonPunk,
    [EnumMember(Value = "oil_painting")]
    Origami,
    [EnumMember(Value = "photographic")]
    Photographic,
    [EnumMember(Value = "pixel_art")]
    PixelArt,
    [EnumMember(Value = "game_asset")]
    TileTexture
}



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
    public ComfyWorkflowStatus Status { get; set; }
    public ComfyWorkflowResponse WorkflowResponse { get; set; }
    public string PromptId { get; set; }
    public List<ComfyHostedFileOutput> FileOutputs { get; set; }
    public List<ComfyTextOutput> TextOutputs { get; set; }
}

public class ComfyHostedFileOutput
{
    public string Url { get; set; }
    public string FileName { get; set; }
}



public class ComfyWorkflowRequest
{
    public long Id { get; set; }
    
    public string? Model { get; set; }
    
    public int? Steps { get; set; }
    
    public int BatchSize { get; set; }

    public int? Seed { get; set; }
    public string? PositivePrompt { get; set; }
    public string? NegativePrompt { get; set; }
    
    public ComfyFileInput? Image { get; set; }
    public ComfyFileInput? Speech { get; set; }
    public ComfyFileInput? Mask { get; set; }
    
    public Stream? ImageInput { get; set; }
    public Stream? SpeechInput { get; set; }
    public Stream? MaskInput { get; set; }
    
    public ComfySampler? Sampler { get; set; }
    public ArtStyle? ArtStyle { get; set; }
    public string? Scheduler { get; set; } = "normal";
    public double? CfgScale { get; set; }
    public double? Denoise { get; set; }
    
    public string? UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    
    public int? Width { get; set; }
    public int? Height { get; set; }
    
    public ComfyTaskType TaskType { get; set; }
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
    public string? Clip { get; set; }
    public double? SampleLength { get; set; }
    public ComfyMaskSource MaskChannel { get; set; }
}

public class ComfyTaskSummary
{

    [AutoIncrement]
    public long Id { get; set; }

    /// <summary>
    /// The type of Task
    /// </summary>
    public ComfyTaskType Type { get; set; }
    
    /// <summary>
    /// The model to use for the Task
    /// </summary>
    public string Model { get; set; }

    /// <summary>
    /// The specific provider used to complete the Task
    /// </summary>
    public string? Provider { get; set; }

    /// <summary>
    /// Unique External Reference for the Task
    /// </summary>
    [Index(Unique = true)]
    public string? RefId { get; set; }
    
    /// <summary>
    /// Optional Tag to group related Tasks
    /// </summary>
    public string? Tag { get; set; }
    
    /// <summary>
    /// The duration reported by the worker to complete the task
    /// </summary>
    public int DurationMs { get; set; }

    /// <summary>
    /// The Month DB the Task was created in
    /// </summary>
    public DateTime CreatedDate { get; set; }
}

[EnumAsInt]
public enum ComfyTaskType
{
    TextToImage = 1,
    ImageToImage = 2,
    ImageToImageUpscale = 3,
    ImageToImageWithMask = 4,
    ImageToText = 5,
    TextToAudio = 6,
    TextToSpeech = 7,
    SpeechToText = 8,
} 

