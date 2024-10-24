using System.Runtime.Serialization;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[Tag(Tags.Media)]
[ValidateApiKey]
public class CreateMediaTransform : IReturn<CreateTransformResponse>
{
    [ValidateNotNull]
    public MediaTransformArgs Request { get; set; }
    public string? Provider { get; set; }
    public string? State { get; set; }
    public string? ReplyTo { get; set; }
    public string? RefId { get; set; }
}

public class CreateTransformResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
}

public enum MediaTransformTaskType
{
    ImageScale,
    VideoScale,
    ImageConvert,
    AudioConvert,
    VideoConvert,
    ImageCrop,
    VideoCrop,
    VideoCut,
    AudioCut,
    WatermarkImage,
    WatermarkVideo,    
}

public class MediaTransformArgs
{
    public MediaTransformTaskType? TaskType { get; set; }
    public Stream? VideoInput { get; set; }
    public Stream? AudioInput { get; set; }
    public Stream? ImageInput { get; set; }
    public Stream? WatermarkInput { get; set; }
    
    public string? VideoFileName { get; set; }
    public string? AudioFileName { get; set; }
    public string? ImageFileName { get; set; }
    public string? WatermarkFileName { get; set; }
    public MediaOutputFormat? OutputFormat { get; set; }
    
    public ImageOutputFormat? ImageOutputFormat { get; set; }

    // For scaling operations
    public int? ScaleWidth { get; set; }
    public int? ScaleHeight { get; set; }

    // For cropping operations
    public int? CropX { get; set; }
    public int? CropY { get; set; }
    public int? CropWidth { get; set; }
    public int? CropHeight { get; set; }

    // For audio cutting
    public float? CutStart { get; set; }
    public float? CutEnd { get; set; }

    // For watermarking
    public Stream? WatermarkFile { get; set; }
    
    public string? WatermarkPosition { get; set; }
    public string? WatermarkScale { get; set; }

    // Codec information
    public string? AudioCodec { get; set; }
    public string? VideoCodec { get; set; }
    
    public string? AudioBitrate { get; set; }
    public int? AudioSampleRate { get; set; }
}

[DataContract]
public enum MediaOutputFormat
{
    [EnumMember(Value = "mp4")]
    MP4,
    [EnumMember(Value = "avi")]
    AVI,
    [EnumMember(Value = "mkv")]
    MKV,
    [EnumMember(Value = "mov")]
    MOV,
    [EnumMember(Value = "webm")]
    WebM,
    [EnumMember(Value = "gif")]
    GIF,
    [EnumMember(Value = "mp3")]
    MP3,
    [EnumMember(Value = "wav")]
    WAV,
    [EnumMember(Value = "flac")]
    FLAC
}

[DataContract]
public enum AudioCodec
{
    [EnumMember(Value = "aac")]
    AAC,
    [EnumMember(Value = "mp3")]
    MP3,
    [EnumMember(Value = "flac")]
    FLAC,
    [EnumMember(Value = "pcm")]
    PCM,
    [EnumMember(Value = "opus")]
    Opus,
    [EnumMember(Value = "vorbis")]
    Vorbis,
    [EnumMember(Value = "ac3")]
    AC3,
    [EnumMember(Value = "alac")]
    ALAC,
    [EnumMember(Value = "amr")]
    AMR,
    [EnumMember(Value = "wmav2")]
    WMAv2
}

[DataContract]
public enum ImageOutputFormat
{
    [EnumMember(Value = "jpg")]
    Jpg,
    [EnumMember(Value = "png")]
    Png,
    [EnumMember(Value = "gif")]
    Gif,
    [EnumMember(Value = "bmp")]
    Bmp,
    [EnumMember(Value = "tiff")]
    Tiff,
    [EnumMember(Value = "webp")]
    Webp
}

[DataContract]
public enum VideoCodec
{
    [EnumMember(Value = "h264")]
    H264,
    [EnumMember(Value = "h265")]
    H265,
    [EnumMember(Value = "vp9")]
    VP9,
    [EnumMember(Value = "av1")]
    AV1,
    [EnumMember(Value = "mpeg2")]
    MPEG2,
    [EnumMember(Value = "mpeg4")]
    MPEG4,
    [EnumMember(Value = "vp8")]
    VP8,
    [EnumMember(Value = "theora")]
    Theora,
    [EnumMember(Value = "prores")]
    ProRes,
    [EnumMember(Value = "dnxhd")]
    DNxHD
}


public class FfmpegTransformResponse
{
    public bool Success { get; set; }
    public string OutputPath { get; set; }
    public string? Error { get; set; }
}

public class TransformResult
{
    public List<TransformFileOutput>? Outputs { get; set; }
    public string? Error { get; set; }
}

public class TransformFileOutput
{
    public string FileName { get; set; }
    public string Url { get; set; }
    public MediaFormat OutputFormat { get; set; }
}

public enum MediaFormat
{
    Image,
    Video,
    Audio
}