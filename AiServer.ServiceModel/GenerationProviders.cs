using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

public class AiProviderFileOutput
{
    public string FileName { get; set; }
    public string Url { get; set; }
}

public class AiProviderTextOutput
{
    public string? Text { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
[Route("/generate", "POST")]
public class CreateGeneration : IReturn<CreateGenerationResponse>
{
    [ValidateNotNull]
    public GenerationArgs Request { get; set; }
    public string? Provider { get; set; }
    public string? State { get; set; }
    public string? ReplyTo { get; set; }
    public string? RefId { get; set; }
}

public class CreateGenerationResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
}

[Tag(Tags.MediaInfo)]
[Route("/generation/{Id}", "GET")]
[Route("/generation/ref/{RefId}", "GET")]
public class GetGeneration : IReturn<GetGenerationResponse>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

public class GetGenerationResponse
{
    public GenerationArgs Request { get; set; }
    public GenerationResult Result { get; set; }
    public List<AiProviderFileOutput>? Outputs { get; set; }
    
    public List<AiProviderTextOutput>? TextOutputs { get; set; }
}

public class GenerationArgs
{
    public string? Model { get; set; }

    public int? Steps { get; set; }

    public int? BatchSize { get; set; }

    public int? Seed { get; set; }
    public string? PositivePrompt { get; set; }
    public string? NegativePrompt { get; set; }
    
    public Stream? ImageInput { get; set; }
    public Stream? MaskInput { get; set; }
    public Stream? AudioInput { get; set; }

    public ComfySampler? Sampler { get; set; }
    public string? Scheduler { get; set; }
    public double? CfgScale { get; set; }
    public double? Denoise { get; set; }

    public string? UpscaleModel { get; set; }

    public int? Width { get; set; }
    public int? Height { get; set; }

    public AiTaskType? TaskType { get; set; }
    public string? Clip { get; set; }
    public double? SampleLength { get; set; }
    public ComfyMaskSource MaskChannel { get; set; }
    
    public string? AspectRatio { get; set; }
    public double? Quality { get; set; }
    public string? Voice { get; set; }
    public string? Language { get; set; }
}

[EnumAsInt]
public enum AiTaskType
{
    TextToImage = 1,
    ImageToImage = 2,
    ImageUpscale = 3,
    ImageWithMask = 4,
    ImageToText = 5,
    TextToAudio = 6,
    TextToSpeech = 7,
    SpeechToText = 8,
}

public class GenerationResult
{
    public List<AiProviderTextOutput>? TextOutputs { get; set; }
    public List<AiProviderFileOutput>? Outputs { get; set; }
    
    public string? Error { get; set; }
}

[Tag(Tags.Files)]
[Route("/artifacts/{**Path}")]
public class GetArtifact : IGet, IReturn<byte[]>
{
    [ValidateNotEmpty]
    public string Path { get; set; } = null!;
    public bool? Download { get; set; }
}

[Tag(Tags.Files)]
[Route("/variants/{Variant}/{**Path}")]
public class GetVariant : IGet, IReturn<byte[]>
{
    [ValidateNotEmpty]
    public string Variant { get; set; } = null!;
    [ValidateNotEmpty]
    public string Path { get; set; } = null!;
}

[Tag(Tags.Files)]
[ValidateApiKey]
[Route("/files/{**Path}")]
public class DeleteFile : IDelete, IReturn<EmptyResponse>
{
    [ValidateNotEmpty]
    public string Path { get; set; } = null!;
}

[Tag(Tags.Files)]
[ValidateApiKey]
public class DeleteFiles : IPost, IReturn<DeleteFilesResponse>
{
    public List<string> Paths { get; set; } = null!;
}
public class DeleteFilesResponse
{
    public List<string> Deleted { get; set; } = [];
    public List<string> Missing { get; set; } = [];
    public List<string> Failed { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}

[ExcludeMetadata]
[ValidateApiKey]
public class MigrateArtifact : IPost, IReturn<MigrateArtifactResponse>
{
    public string Path { get; set; }
    public DateTime? Date { get; set; }
}
public class MigrateArtifactResponse
{
    public string FilePath { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}