using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

// [Tag(Tag.Comfy)]
// public class ComfySpeechToText : IReturn<ComfySpeechToTextResponse>
// {
//     public string Model { get; set; } = "base";
//     public Stream? SpeechInput { get; set; }
// }
// public class ComfySpeechToTextResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public ComfyTextOutput? TextOutput { get; set; }
// }
//
// [Tag(Tag.Comfy)]
// public class ComfyTextToSpeech : IReturn<ComfyTextToSpeechResponse>
// {
//     public string PositivePrompt { get; set; }
//     public string Model { get; set; } = "high:en_US-lessac";
// }
// public class ComfyTextToSpeechResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public List<ComfyHostedFileOutput>? Speech { get; set; } = new();
// }
//
// [Tag(Tag.Comfy)]
// public class ComfyTextToImage : IReturn<ComfyTextToImageResponse>
// {
//     public long Seed { get; set; }
//     public double CfgScale { get; set; }
//     public int Height { get; set; }
//     public int Width { get; set; }
//     public ComfySampler Sampler { get; set; }
//     public int BatchSize { get; set; }
//     public int Steps { get; set; }
//     public string Model { get; set; }
//     public string PositivePrompt { get; set; }
//     public string NegativePrompt { get; set; }
//
//     public string? Scheduler { get; set; } = "normal";
// }
// public class ComfyTextToImageResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public List<ComfyHostedFileOutput>? Images { get; set; } = new();
// }
//
// [Tag(Tag.Comfy)]
// public class ComfyImageToImageUpscale : IReturn<ComfyImageToImageUpscaleResponse>
// {
//     public string UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
//     public ComfyFileInput? Image { get; set; }
//     
//     public Stream? ImageInput { get; set; }
// }
//
// public class ComfyImageToImageUpscaleResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public List<ComfyHostedFileOutput>? Images { get; set; } = new();
// }
//
// [Tag(Tag.Comfy)]
// public class ComfyImageToImage : IReturn<ComfyImageToImageResponse>
// {
//     public long Seed { get; set; }
//     public double CfgScale { get; set; }
//     public ComfySampler Sampler { get; set; }
//     public int Steps { get; set; }
//     
//     public int BatchSize { get; set; }
//
//     public double Denoise { get; set; } = 0.5d;
//     public string? Scheduler { get; set; } = "normal";
//     public string Model { get; set; }
//     public string PositivePrompt { get; set; }
//     public string NegativePrompt { get; set; }
//     
//     public Stream? ImageInput { get; set; }
// }
// public class ComfyImageToImageResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     
//     public List<ComfyHostedFileOutput>? Images { get; set; } = new();
// }
//
//
// [Tag(Tag.Comfy)]
// public class ComfyImageToImageWithMask : IReturn<ComfyImageToImageWithMaskResponse>
// {
//     public long Seed { get; set; }
//     public double CfgScale { get; set; }
//     public ComfySampler Sampler { get; set; }
//     public int Steps { get; set; }
//     public int BatchSize { get; set; }
//     public double Denoise { get; set; } = 0.5d;
//     public string? Scheduler { get; set; } = "normal";
//     public string Model { get; set; }
//     public string PositivePrompt { get; set; }
//     public string NegativePrompt { get; set; }
//     
//     public ComfyMaskSource MaskChannel { get; set; }
//     public Stream? ImageInput { get; set; }
//     public Stream? MaskInput { get; set; }
// }
// public class ComfyImageToImageWithMaskResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public List<ComfyHostedFileOutput>? Images { get; set; } = new();
// }
//
// [Tag(Tag.Comfy)]
// public class ComfyImageToText : IReturn<ComfyImageToTextResponse>
// {
//     public Stream? ImageInput { get; set; }
// }
// public class ComfyImageToTextResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public ComfyTextOutput? TextOutput { get; set; }
// }
//
// [Tag(Tag.Comfy)]
// public class ComfyTextToAudio : IReturn<ComfyTextToAudioResponse>
// {    
//     public string? Clip { get; set; }
//     public string? Model { get; set; }
//     public int? Steps { get; set; }
//     public double? CfgScale { get; set; }
//     public int? Seed { get; set; }
//     public ComfySampler? Sampler { get; set; }
//     public string? Scheduler { get; set; }
//     public string PositivePrompt { get; set; }
//     public string? NegativePrompt { get; set; }
//     
//     public double? SampleLength { get; set; } = 47.6d;
// }
// public class ComfyTextToAudioResponse
// {
//     public string? PromptId { get; set; }
//     public ComfyWorkflowRequest? Request { get; set; }
//     public List<ComfyHostedFileOutput>? Sounds { get; set; } = new();
// }

[Tag(Tag.Comfy)]
public class ConfigureAndDownloadModel : IReturn<ComfyAgentDownloadStatus>
{
    public string Name { get; set; }
    public string Filename { get; set; }
    public string DownloadUrl { get; set; }
        
    public double? CfgScale { get; set; }
        
    public string? Scheduler { get; set; }
        
    public ComfySampler? Sampler { get; set; }
        
    public int? Width { get; set; }
        
    public int? Height { get; set; }
        
    public int? Steps { get; set; }
        
    public string? NegativePrompt { get; set; }
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
