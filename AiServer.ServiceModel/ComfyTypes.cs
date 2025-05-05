using AiServer.ServiceModel.Types;

namespace AiServer.ServiceModel;

public class ComfyFileRef
{
    public string Path { get; set; }
    public int Size { get; set; }
    public double Modified { get; set; }
}

public enum ComfyWorkflowType
{
    TextToImage,
    ImageToImage,
    ImageToText,
    TextToAudio,
    TextToVideo,
    TextTo3D,
    AudioToText,
    VideoToText,
    ImageToVideo,
}

public enum ComfyPrimarySource
{
    Text,
    Image,
    Video,
    Audio,
}

//jq -r 'to_entries[] | .value.input.required // {} | to_entries[] | .value[0] | if type == "array" then "ENUM" else . end' files/object_info.json | sort | uniq
public enum ComfyInputType
{
    Unknown,
    Audio,
    Boolean,
    Clip,
    ClipVision,
    ClipVisionOutput,
    Combo,
    Conditioning,
    ControlNet,
    Enum,
    FasterWhisperModel,
    Filepath,
    Fl2Model,
    Float,
    Floats,
    Gligen,
    Guider,
    Hooks,
    Image,
    Int,
    Latent,
    LatentOperation,
    Load3D,
    Load3DAnimation,
    Mask,
    Mesh,
    Model,
    Noise,
    Photomaker,
    Sampler,
    Sigmas,
    String,
    StyleModel,
    Subtitle,
    TranscriptionPipeline,
    Transcriptions,
    UpscaleModel,
    VAE,
    VHSAudio,
    Voxel,
    WavBytes,
    WavBytesBatch,
    Webcam,
}

public class ComfyInput
{
    public string Name { get; set; }
    public string Label { get; set; }
    public ComfyInputType Type { get; set; }
    public string? Tooltip { get; set; }
    public object? Default { get; set; }
    public decimal? Min { get; set; }
    public decimal? Max { get; set; }
    public decimal? Step { get; set; }
    public decimal? Round { get; set; }
    public bool? Multiline { get; set; }
    public bool? DynamicPrompts { get; set; }
    public bool? ControlAfterGenerate { get; set; }
    public List<string>? EnumValues { get; set; }
    public Dictionary<string, object>? ComboValues { get; set; }
}

public class ComfyArg
{
    public ComfyInput Input { get; set; }
    public object? Value { get; set; }
}

public class ComfyWorkflowInfo
{
    public string Name { get; set; }
    public string FileName { get; set; }
    public ComfyWorkflowType Type { get; set; }
    public ComfyPrimarySource Input { get; set; }
    public ComfyPrimarySource Output { get; set; }
    public List<ComfyInput> Inputs { get; set; } = [];
}