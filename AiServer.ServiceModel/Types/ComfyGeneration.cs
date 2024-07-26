using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel.Types;

public class ComfyGenerationTask : TaskBase
{
    public ComfyWorkflowRequest Request { get; set; }

    public ComfyWorkflowResponse? Response { get; set; }
    
    public ComfyWorkflowStatus? Status { get; set; }

    public ComfyTaskType TaskType { get; set; }
    public string WorkflowTemplate { get; set; }
}

public class ComfyGenerationCompleted : ComfyGenerationTask
{
    
}

public class ComfyGenerationFailed : ComfyGenerationTask
{
    public DateTime FailedDate { get; set; }
}

public class ComfyGenerationRequest
{
    public long Id { get; set; }
    public string Model { get; set; }
    public string Provider { get; set; }
    public ComfyWorkflowRequest Request { get; set; }
}

public enum ArtStyle
{
    ThreeDModel,
    AnalogFilm,
    Anime,
    Cinematic,
    ComicBook,
    DigitalArt,
    Enhance,
    FantasyArt,
    Isometric,
    LineArt,
    LowPoly,
    ModelingCompound,
    NeonPunk,
    Origami,
    Photographic,
    PixelArt,
    TileTexture
}

public class ComfyHostedFileOutput
{
    public string Url { get; set; }
    public string FileName { get; set; }
}

public class ComfyWorkflowRequest
{
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
    public string? Clip { get; set; }
    public double? SampleLength { get; set; }
    public ComfyMaskSource MaskChannel { get; set; }
}

public class ComfySummary
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

public class ComfyApiProvider
{
    [AutoIncrement] public int Id { get; set; }

    /// <summary>
    /// The unique name for this API Provider
    /// </summary>
    [Index(Unique = true)]
    public string Name { get; set; }

    /// <summary>
    /// The API Key to use for this Provider
    /// </summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Send the API Key in the Header instead of Authorization Bearer
    /// </summary>
    public string? ApiKeyHeader { get; set; }

    /// <summary>
    /// Override Base URL for the API Provider
    /// </summary>
    public string? ApiBaseUrl { get; set; }

    /// <summary>
    /// Url to check if the API is online
    /// </summary>
    public string? HeartbeatUrl { get; set; }

        
    public Dictionary<ComfyTaskType, string>? TaskWorkflows { get; set; }

    /// <summary>
    /// How many requests should be made concurrently
    /// </summary>
    public int Concurrency { get; set; }

    /// <summary>
    /// What priority to give this Provider to use for processing models 
    /// </summary>
    public int Priority { get; set; }

    /// <summary>
    /// Whether the Provider is enabled
    /// </summary>
    public bool Enabled { get; set; }

    /// <summary>
    /// When the Provider went offline
    /// </summary>
    public DateTime? OfflineDate { get; set; }

    /// <summary>
    /// When the Provider was created
    /// </summary>
    public DateTime CreatedDate { get; set; }

    [Reference] public List<ComfyApiProviderModel>? Models { get; set; }
}

public class ComfyApiProviderModel
{
    [AutoIncrement] public int Id { get; set; }

    [References(typeof(ComfyApiProvider))] public int ComfyApiProviderId { get; set; }

    [References(typeof(ComfyApiModel))] public int ComfyApiModelId { get; set; }

    [Reference] public ComfyApiProvider ComfyApiProvider { get; set; }
    [Reference] public ComfyApiModel ComfyApiModel { get; set; }
}

public class ComfyApiType
{
    [AutoIncrement] public int Id { get; set; }

    /// <summary>
    /// Name for this API Provider Type
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// The website for this provider
    /// </summary>
    public string Website { get; set; }

    /// <summary>
    /// The API Base Url
    /// </summary>
    public string ApiBaseUrl { get; set; }

    /// <summary>
    /// The URL to check if the API is online
    /// </summary>
    public string? HeartbeatUrl { get; set; }

    /// <summary>
    /// API Paths for different AI Tasks
    /// </summary>
    public Dictionary<ComfyTaskType, string> TaskPaths { get; set; }
}

public class ComfyApiModel
{
    [AutoIncrement] public int Id { get; set; }
    
    public string Name { get; set; }

    public string? Description { get; set; }

    public string? Tags { get; set; }
    public string Filename { get; set; }
    public string DownloadUrl { get; set; }

    public string IconUrl { get; set; }
    public string Url { get; set; }

    public DateTime CreatedDate { get; set; }

    [Reference] public ComfyApiModelSettings? ModelSettings { get; set; }
}

public class ComfyApiModelSettings
{
    [AutoIncrement] public int Id { get; set; }

    [References(typeof(ComfyApiModel))]
    [ForeignKey(typeof(ComfyApiModel), OnDelete = "CASCADE")]
    public int ComfyApiModelId { get; set; }

    public double? CfgScale { get; set; }

    public string? Scheduler { get; set; }

    public ComfySampler? Sampler { get; set; }

    public int? Width { get; set; }

    public int? Height { get; set; }

    public int? Steps { get; set; }

    public string? NegativePrompt { get; set; }
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