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
    public ComfyWorkflowRequest? Request { get; set; }
    public ComfyTextOutput? TextOutput { get; set; }
}


public class ComfyTextToSpeech : IReturn<ComfyTextToSpeechResponse>
{
    public string PositivePrompt { get; set; }
    public string Model { get; set; } = "high:en_US-lessac";
}

public class ComfyTextToSpeechResponse
{
    public ComfyWorkflowRequest? Request { get; set; }
    public List<ComfyHostedFileOutput>? Speech { get; set; } = new();
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
    public string? PromptId { get; set; }
    public ComfyWorkflowRequest? Request { get; set; }
    public List<ComfyHostedFileOutput>? Images { get; set; } = new();
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
    public string? PromptId { get; set; }
    public ComfyWorkflowRequest? Request { get; set; }
    
    public List<ComfyHostedFileOutput>? Images { get; set; } = new();
}

public class ComfyImageToImageUpscale : IReturn<ComfyImageToImageUpscaleResponse>
{
    public string UpscaleModel { get; set; } = "RealESRGAN_x2.pth";
    public ComfyFileInput? Image { get; set; }
    
    public Stream? ImageInput { get; set; }
}

public class ComfyImageToImageUpscaleResponse
{
    public string? PromptId { get; set; }
    public ComfyWorkflowRequest? Request { get; set; }
    public List<ComfyHostedFileOutput>? Images { get; set; } = new();

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
    public string? PromptId { get; set; }
    public ComfyWorkflowRequest? Request { get; set; }
    public List<ComfyHostedFileOutput>? Images { get; set; } = new();
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
    public string? PromptId { get; set; }
    public ComfyWorkflowRequest? Request { get; set; }
    public ComfyTextOutput? TextOutput { get; set; }
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
    public string? PromptId { get; set; }
    public ComfyWorkflowRequest? Request { get; set; }
    public List<ComfyHostedFileOutput>? Sounds { get; set; } = new();
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