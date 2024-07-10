using ServiceStack;

namespace AiServer.ServiceModel.Types;


public class ComfyWorkflowStatus
{
    public string StatusMessage { get; set; }
    public bool Completed { get; set; }
    public List<ComfyOutput> Outputs { get; set; } = new();
}

public class ComfyAgentDownloadStatus
{
    public string? Name { get; set; }
    public int? Progress { get; set; }
}

public class ComfyAgentDeleteModelResponse
{
    public string? Message { get; set; }
}

public class ComfyOutput
{
    public List<ComfyFileOutput> Files { get; set; } = new();
    public List<ComfyTextOutput> Texts { get; set; } = new();
}

public class ComfyFileOutput
{
    public string Filename { get; set; }
    public string Type { get; set; }
    public string Subfolder { get; set; }
}

public class ComfyTextOutput
{
    public string? Text { get; set; }
}

public class ComfyFileInput
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Subfolder { get; set; }
}

public class ComfySpeechToText : IReturn<ComfySpeechToTextResponse>
{
    public string Model { get; set; } = "base";
    public Stream? SpeechInput { get; set; }
}

public class ComfySpeechToTextResponse
{
    public string? Text { get; set; }
}


public class ComfyTextToSpeech : IReturn<ComfyTextToSpeechResponse>
{
    public string PositivePrompt { get; set; }
    public string Model { get; set; } = "high:en_US-lessac";
}

public class ComfyTextToSpeechResponse
{
    public string? FilePath { get; set; }
}

public class ComfyTextToImage : IReturn<ComfyTextToImageResponse>
{
    public long Seed { get; set; }
    public double CfgScale { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
    public ComfySampler Sampler { get; set; }
    public int BatchSize { get; set; }
    public int Steps { get; set; }
    public string Model { get; set; }
    public string PositivePrompt { get; set; }
    public string NegativePrompt { get; set; }

    public string? Scheduler { get; set; } = "normal";
}

public class ComfyTextToImageResponse
{
    public string? FilePath { get; set; }
}

public class ComfyImageToImage : IReturn<ComfyImageToImageResponse>
{
    public long Seed { get; set; }
    public double CfgScale { get; set; }
    public ComfySampler Sampler { get; set; }
    public int Steps { get; set; }
    
    public int BatchSize { get; set; }

    public double Denoise { get; set; } = 0.5d;
    public string? Scheduler { get; set; } = "normal";
    public string Model { get; set; }
    public string PositivePrompt { get; set; }
    public string NegativePrompt { get; set; }
    
    public Stream? ImageInput { get; set; }
}

public class ComfyImageToImageResponse
{
    public string? FilePath { get; set; }
}

public class ComfyImageToImageUpscale : IReturn<ComfyImageToImageUpscaleResponse>
{
    public string UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    public ComfyFileInput? Image { get; set; }
    
    public Stream? ImageInput { get; set; }
}

public class ComfyImageToImageUpscaleResponse
{
    public string? FilePath { get; set; }

}

public class ComfyImageToImageWithMask : IReturn<ComfyImageToImageWithMaskResponse>
{
    public long Seed { get; set; }
    public double CfgScale { get; set; }
    public ComfySampler Sampler { get; set; }
    public int Steps { get; set; }
    public int BatchSize { get; set; }
    public double Denoise { get; set; } = 0.5d;
    public string? Scheduler { get; set; } = "normal";
    public string Model { get; set; }
    public string PositivePrompt { get; set; }
    public string NegativePrompt { get; set; }
    
    public ComfyMaskSource MaskChannel { get; set; }
    public Stream? ImageInput { get; set; }
    public Stream? MaskInput { get; set; }
}

public class ComfyImageToImageWithMaskResponse
{
    public string? FilePath { get; set; }
}

public enum ComfyMaskSource
{
    red,
    blue,
    green,
    alpha
}

public class ComfyImageToText : IReturn<ComfyImageToTextResponse>
{
    public Stream? ImageInput { get; set; }
}

public class ComfyImageToTextResponse
{
    public string? Text { get; set; }
}

public class StableDiffusionImageToText
{
    public Stream? InputImage { get; set; }
}

public class StableDiffusionImageToImageUpscale
{
    public string UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    public Stream? ImageInput { get; set; }
}

public class StableDiffusionImageToImageWithMask
{
    public StableDiffusionMaskSource MaskSource { get; set; } = StableDiffusionMaskSource.White;
    public Stream? ImageInput { get; set; }
    public Stream? MaskInput { get; set; }
    public List<TextPrompt> TextPrompts { get; set; }
    public double CfgScale { get; set; } = 7;
    public StableDiffusionSampler Sampler { get; set; } = StableDiffusionSampler.K_EULER_ANCESTRAL;
    public int Samples { get; set; } = 1;
    public int Steps { get; set; } = 20;
    public string EngineId { get; set; }
    public double ImageStrength { get; set; } = 0.40d;
}

public enum StableDiffusionMaskSource
{
    White,
    Black,
    Alpha
}

public enum ComfySampler
{
    euler,
    euler_ancestral,
    huen,
    huenpp2,
    dpm_2,
    dpm_2_ancestral,
    lms,
    dpm_fast,
    dpm_adaptive,
    dpmpp_2s_ancestral,
    dpmpp_sde,
    dpmpp_sde_gpu,
    dpmpp_2m,
    dpmpp_2m_sde,
    dpmpp_2m_sde_gpu,
    dpmpp_3m_sde,
    dpmpp_3m_sde_gpu,
    ddpm,
    lcm,
    ddim,
    uni_pc,
    uni_pc_bh2
}


/// <summary>
/// Text To Image Request to Match Stability AI API
/// </summary>
public class StableDiffusionTextToImage
{
    public int Seed { get; set; }
    public double CfgScale { get; set; }
    public int Height { get; set; }
    public int Width { get; set; }
    public StableDiffusionSampler Sampler { get; set; }
    public int Samples { get; set; }
    public int Steps { get; set; }
    public string EngineId { get; set; }
    public List<TextPrompt> TextPrompts { get; set; }
}

public class StableDiffusionImageToImage
{
    public double ImageStrength { get; set; }
    public string InitImageMode { get; set; } = "IMAGE_STRENGTH";
    public Stream? InitImage { get; set; }
    public List<TextPrompt> TextPrompts { get; set; }
    public double CfgScale { get; set; }
    public StableDiffusionSampler Sampler { get; set; }
    public int Samples { get; set; }
    public int Steps { get; set; }
    
    public string EngineId { get; set; }
}


public class ComfyTextToAudio : IReturn<ComfyTextToAudioResponse>
{    
    public string? Clip { get; set; }
    public string? Model { get; set; }
    public int? Steps { get; set; }
    public double? CfgScale { get; set; }
    public int? Seed { get; set; }
    public ComfySampler? Sampler { get; set; }
    public string? Scheduler { get; set; }
    public string PositivePrompt { get; set; }
    public string? NegativePrompt { get; set; }
    
    public double? SampleLength { get; set; } = 47.6d;
}

public class ComfyTextToAudioResponse
{
    public string? FilePath { get; set; }
}

public class StableAudioTextToAudio
{
    public int Seed { get; set; } = Random.Shared.Next();
    public List<TextPrompt> TextPrompts { get; set; }
    public double CfgScale { get; set; } = 4;
    public StableDiffusionSampler Sampler { get; set; } = StableDiffusionSampler.K_DPMPP_2S_ANCESTRAL;
    public int Steps { get; set; } = 50;
    public string EngineId { get; set; } = "stable_audio_open_1.0.safetensors";
    public string ClipEngineId { get; set; } = "t5_base.safetensors";

    public double? SampleLength { get; set; } = 47.6d;

}

/*
{
"prompt_id": "f33f3b7a-a72a-4e06-8184-823a6fe5071f",
"number": 2,
"node_errors": {}
}
*/
public class ComfyWorkflowResponse
{
    public string PromptId { get; set; }
    public int Number { get; set; }
    public List<NodeError> NodeErrors { get; set; }
}

public class NodeError
{
    
}

public enum StableDiffusionSampler
{
    DDIM,
    DDPM,
    K_DPMPP_2M,
    K_DPMPP_2S_ANCESTRAL,
    K_DPM_2,
    K_DPM_2_ANCESTRAL,
    K_EULER,
    K_EULER_ANCESTRAL,
    K_HEUN,
    K_LMS
}

public class TextPrompt
{
    public string Text { get; set; }
    public double Weight { get; set; }
}


public class ComfyModel
{
    public string Description { get; set; }
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
}