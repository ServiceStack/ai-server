using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel.Types;

public class ComfyHostedFileOutput
{
    public string Url { get; set; }
    public string FileName { get; set; }
}

public class AiServerHostedComfyFile
{
    public string Url { get; set; }
    public string FileName { get; set; }
    public string ContentType { get; set; }
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
    public string? Scheduler { get; set; } = "normal";
    public double? CfgScale { get; set; }
    public double? Denoise { get; set; }

    public string? UpscaleModel { get; set; } = "RealESRGAN_x2.pth";

    public int? Width { get; set; }
    public int? Height { get; set; }

    public ComfyTaskType TaskType { get; set; }
    public string? Clip { get; set; }
    
    public string? Vae { get; set; }
    public double? SampleLength { get; set; }
    public ComfyMaskSource MaskChannel { get; set; }
}

public class ComfyApiModel
{
    public string? Description { get; set; }

    public string? Tags { get; set; }
    public string Filename { get; set; }
    public string DownloadUrl { get; set; }

    public string IconUrl { get; set; }
    public string Url { get; set; }
}

public class ComfyApiModelSettings
{
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
    ImageUpscale = 3,
    ImageWithMask = 4,
    ImageToText = 5,
    TextToAudio = 6,
    TextToSpeech = 7,
    SpeechToText = 8,
}