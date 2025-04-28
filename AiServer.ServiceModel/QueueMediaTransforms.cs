using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Jobs;

namespace AiServer.ServiceModel;

[ValidateApiKey]
[Tag(Tags.Media)]
[Api("Scale video")]
public class QueueScaleVideo : IQueueMediaTransform, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The video file to be scaled")]
    [Required]
    [Input(Type = "file")]
    public string? Video { get; set; }

    [ApiMember(Description = "Desired width of the scaled video")]
    [Range(1, 7680)]  // Assuming 8K as max resolution
    public int? Width { get; set; }

    [ApiMember(Description = "Desired height of the scaled video")]
    [Range(1, 4320)]  // Assuming 8K as max resolution
    public int? Height { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.Media)]
[Api("Watermark video")]
public class QueueWatermarkVideo : IQueueMediaTransform, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The video file to be watermarked")]
    [Required]
    [Input(Type = "file")]
    public string? Video { get; set; }
 
    [ApiMember(Description = "The image file to use as a watermark")]
    [Required]
    [Input(Type = "file")]
    public string? Watermark { get; set; }
    
    [ApiMember(Description = "Position of the watermark")]
    public WatermarkPosition? Position { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

public interface IQueueMediaTransform
{
    public string? RefId { get; set; }
    public string? Tag { get; set; }
    public string? ReplyTo { get; set; }
}

public class QueueMediaTransformResponse
{
    [ApiMember(Description = "Unique identifier of the background job")]
    public long JobId { get; set; }

    [ApiMember(Description = "Client-provided identifier for the request")]
    public string RefId { get; set; }

    [ApiMember(Description = "Current state of the background job")]
    public BackgroundJobState JobState { get; set; }

    [ApiMember(Description = "Current status of the transformation request")]
    public string? Status { get; set; }
    
    [ApiMember(Description = "Detailed response status information")]
    public ResponseStatus? ResponseStatus { get; set; }
    
    [ApiMember(Description = "URL to check the status of the request")]
    public string StatusUrl { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueConvertImage : IQueueMediaTransform, IPost, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The image file to be converted")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }

    [ApiMember(Description = "The desired output format for the converted image")]
    [Required]
    public ImageOutputFormat? OutputFormat { get; set; }
    
        
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueCropImage : IQueueMediaTransform, IPost, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The X-coordinate of the top-left corner of the crop area")]
    public int X { get; set; }

    [ApiMember(Description = "The Y-coordinate of the top-left corner of the crop area")]
    public int Y { get; set; }

    [ApiMember(Description = "The width of the crop area")]
    public int Width { get; set; }

    [ApiMember(Description = "The height of the crop area")]
    public int Height { get; set; }
    
    [ApiMember(Description = "The image file to be cropped")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueWatermarkImage : IQueueMediaTransform, IPost, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The image file to be watermarked")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }

    [ApiMember(Description = "The position of the watermark on the image")]
    public WatermarkPosition Position { get; set; }

    [ApiMember(Description = "The opacity of the watermark (0.0 to 1.0)")]
    public float Opacity { get; set; } = 0.5f;
    
    [ApiMember(Description = "Scale of the watermark relative")]
    public float WatermarkScale { get; set; } = 1.0f;
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueScaleImage : IQueueMediaTransform,IPost, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The image file to be scaled")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }
    
    [ApiMember(Description = "Desired width of the scaled image")]
    public int? Width { get; set; }
    
    [ApiMember(Description = "Desired height of the scaled image")]
    public int? Height { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueConvertVideo : IQueueMediaTransform, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The desired output format for the converted video")]
    [Required]
    public ConvertVideoOutputFormat OutputFormat { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public string? Video { get; set; }

    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueCropVideo : IQueueMediaTransform, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The X-coordinate of the top-left corner of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int X { get; set; }

    [ApiMember(Description = "The Y-coordinate of the top-left corner of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int Y { get; set; }

    [ApiMember(Description = "The width of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int Width { get; set; }

    [ApiMember(Description = "The height of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int Height { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public string? Video { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueTrimVideo : IQueueMediaTransform, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The start time of the trimmed video (format: HH:MM:SS)")]
    [Required]
    public string StartTime { get; set; }

    [ApiMember(Description = "The end time of the trimmed video (format: HH:MM:SS)")]
    public string? EndTime { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public string? Video { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Tag(Tags.Media)]
[ValidateApiKey]
public class QueueConvertAudio : IQueueMediaTransform, IReturn<QueueMediaTransformResponse>
{
    [ApiMember(Description = "The desired output format for the converted audio")]
    [Required]
    public AudioFormat OutputFormat { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public string? Audio { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[DataContract]
public enum ConvertVideoOutputFormat
{
    [EnumMember(Value = "mp4")]
    MP4,
    [EnumMember(Value = "mov")]
    MOV,
    [EnumMember(Value = "webm")]
    WebM,
    [EnumMember(Value = "mkv")]
    MVK,
    [EnumMember(Value = "avi")]
    AVI,
    [EnumMember(Value = "wmv")]
    WMV,
    [EnumMember(Value = "mpeg")]
    MPEG,
    [EnumMember(Value = "ogg")]
    Ogg,
}

[DataContract]
public enum AudioFormat
{
    [EnumMember(Value = "mp3")]
    MP3,
    [EnumMember(Value = "wav")]
    WAV,
    [EnumMember(Value = "aac")]
    AAC,
    [EnumMember(Value = "flac")]
    FLAC,
    [EnumMember(Value = "ogg")]
    OGG,
    [EnumMember(Value = "m4a")]
    M4A,
    [EnumMember(Value = "wma")]
    WMA,
}