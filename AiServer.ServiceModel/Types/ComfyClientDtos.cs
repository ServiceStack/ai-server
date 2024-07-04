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
    public string Text { get; set; }
}

public class ComfyImageInput
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Subfolder { get; set; }
}

public class ComfyFileInput
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Subfolder { get; set; }
}

public class ComfySpeechToText
{
    public string WhisperModel { get; set; } = "base";
    public Stream? AudioFile { get; set; }
    public ComfyFileInput? Audio { get; set; }
}


public class ComfyTextToSpeech
{
    public string Input { get; set; }
    public string Voice { get; set; } = "en_US-lessac";
    public string Quality { get; set; } = "high";
}


public class ComfyTextToImage
{
    public long Seed { get; set; }
    public int CfgScale { get; set; }
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

public class ComfyImageToImage
{
    public long Seed { get; set; }
    public int CfgScale { get; set; }
    public ComfySampler Sampler { get; set; }
    public int Steps { get; set; }
    
    public int BatchSize { get; set; }

    public double Denoise { get; set; } = 0.5d;
    public string? Scheduler { get; set; } = "normal";
    public string Model { get; set; }
    public string PositivePrompt { get; set; }
    public string NegativePrompt { get; set; }
    public ComfyImageInput? Image { get; set; }
    
    public Stream? InitImage { get; set; }
}

public class ComfyImageToImageUpscale
{
    public string UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    public ComfyImageInput? Image { get; set; }
    
    public Stream? InitImage { get; set; }
}

public class ComfyImageToImageWithMask
{
    public long Seed { get; set; }
    public int CfgScale { get; set; }
    public ComfySampler Sampler { get; set; }
    public int Steps { get; set; }
    public int BatchSize { get; set; }
    public double Denoise { get; set; } = 0.5d;
    public string? Scheduler { get; set; } = "normal";
    public string Model { get; set; }
    public string PositivePrompt { get; set; }
    public string NegativePrompt { get; set; }
    
    public ComfyMaskSource MaskChannel { get; set; }
    public Stream? InitImage { get; set; }
    public ComfyImageInput? Image { get; set; }
    public Stream? InitMask { get; set; }
    public ComfyImageInput? MaskImage { get; set; }
}

public enum ComfyMaskSource
{
    red,
    blue,
    green,
    alpha
}

public class ComfyImageToText
{
    public ComfyImageInput? Image { get; set; }
    
    public Stream? InitImage { get; set; }
}

public class StableDiffusionImageToText
{
    public Stream? InitImage { get; set; }
}

public class StableDiffusionImageToImageUpscale
{
    public string UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    public Stream? Image { get; set; }
}

public class StableDiffusionImageToImageWithMask
{
    public StableDiffusionMaskSource MaskSource { get; set; } = StableDiffusionMaskSource.White;
    public Stream? InitImage { get; set; }
    public Stream? MaskImage { get; set; }
    public List<TextPrompt> TextPrompts { get; set; }
    public int CfgScale { get; set; } = 7;
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
    public long Seed { get; set; }
    public int CfgScale { get; set; }
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
    public int CfgScale { get; set; }
    public StableDiffusionSampler Sampler { get; set; }
    public int Samples { get; set; }
    public int Steps { get; set; }
    
    public string EngineId { get; set; }
}


public class ComfyTextToAudio
{    
    public string Clip { get; set; }
    public string Model { get; set; }
    public int Steps { get; set; }
    public int CfgScale { get; set; }
    public int Seed { get; set; }
    public ComfySampler Sampler { get; set; }
    public string Scheduler { get; set; }
    public string PositivePrompt { get; set; }
    public string NegativePrompt { get; set; }
    
    public double? SampleLength { get; set; } = 47.6d;
}

public class StableAudioTextToAudio
{
    public int Seed { get; set; } = Random.Shared.Next();
    public List<TextPrompt> TextPrompts { get; set; }
    public int CfgScale { get; set; } = 4;
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