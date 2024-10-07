using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[ValidateApiKey]
[Tag("Media")]
[Api("Scale video")]
[Description("Scale a video to specified dimensions")]
public class ScaleVideo : IMediaTransform, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The video file to be scaled", ParameterType = "body")]
    [Description("The video file to be scaled")]
    [Required]
    [Input(Type = "file")]
    public Stream? Video { get; set; }

    [ApiMember(Description = "Desired width of the scaled video", ParameterType = "query")]
    [Description("Desired width of the scaled video")]
    [Range(1, 7680)]  // Assuming 8K as max resolution
    public int? Width { get; set; }

    [ApiMember(Description = "Desired height of the scaled video", ParameterType = "query")]
    [Description("Desired height of the scaled video")]
    [Range(1, 4320)]  // Assuming 8K as max resolution
    public int? Height { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request", ParameterType = "query")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to", ParameterType = "query")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request", ParameterType = "query")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag("Media")]
[Api("Watermark video")]
[Description("Add a watermark to a video")]
public class WatermarkVideo : IMediaTransform, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The video file to be watermarked", ParameterType = "body")]
    [Description("The video file to be watermarked")]
    [Required]
    [Input(Type = "file")]
    public Stream? Video { get; set; }
 
    [ApiMember(Description = "The image file to use as a watermark", ParameterType = "body")]
    [Description("The image file to use as a watermark")]
    [Required]
    [Input(Type = "file")]
    public Stream? Watermark { get; set; }
    
    [ApiMember(Description = "Position of the watermark", ParameterType = "query")]
    [Description("Position of the watermark")]
    public WatermarkPosition? Position { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request", ParameterType = "query")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to", ParameterType = "query")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request", ParameterType = "query")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

public enum WatermarkPosition
{
    TopLeft,
    TopRight,
    BottomLeft,
    BottomRight,
    Center,
}


[Description("Convert an image to a different format")]
[Tag("Media")]
[ValidateApiKey]
public class ConvertImage : IPost, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The image file to be converted", ParameterType = "body")]
    [Description("The image file to be converted")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }

    [ApiMember(Description = "The desired output format for the converted image", ParameterType = "query")]
    [Description("The desired output format for the converted image")]
    [Required]
    public ImageOutputFormat? OutputFormat { get; set; }
}

[Description("Crop an image to a specified area")]
[Tag("Media")]
[ValidateApiKey]
public class CropImage : IPost, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The X-coordinate of the top-left corner of the crop area", ParameterType = "query")]
    [Description("The X-coordinate of the top-left corner of the crop area")]
    public int X { get; set; }

    [ApiMember(Description = "The Y-coordinate of the top-left corner of the crop area", ParameterType = "query")]
    [Description("The Y-coordinate of the top-left corner of the crop area")]
    public int Y { get; set; }

    [ApiMember(Description = "The width of the crop area", ParameterType = "query")]
    [Description("The width of the crop area")]
    public int Width { get; set; }

    [ApiMember(Description = "The height of the crop area", ParameterType = "query")]
    [Description("The height of the crop area")]
    public int Height { get; set; }
    
    [ApiMember(Description = "The image file to be cropped", ParameterType = "body")]
    [Description("The image file to be cropped")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }
}

[Description("Scale an image to a specified size")]
[Tag("Media")]
[ValidateApiKey]
public class ScaleImage : IPost, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The image file to be scaled", ParameterType = "body")]
    [Description("The image file to be scaled")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }
    
    [ApiMember(Description = "Desired width of the scaled image", ParameterType = "query")]
    [Description("Desired width of the scaled image")]
    public int? Width { get; set; }
    
    [ApiMember(Description = "Desired height of the scaled image", ParameterType = "query")]
    [Description("Desired height of the scaled image")]
    public int? Height { get; set; }
}

[Description("Add a watermark to an image")]
[Tag("Media")]
[ValidateApiKey]
public class WatermarkImage : IPost, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The image file to be watermarked", ParameterType = "body")]
    [Description("The image file to be watermarked")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }

    [ApiMember(Description = "The position of the watermark on the image", ParameterType = "query")]
    [Description("The position of the watermark on the image")]
    public WatermarkPosition Position { get; set; }
    
    [ApiMember(Description = "Scale of the watermark relative", ParameterType = "query")]
    [Description("Scale of the watermark relative")]
    public float WatermarkScale { get; set; } = 1.0f;

    [ApiMember(Description = "The opacity of the watermark (0.0 to 1.0)", ParameterType = "query")]
    [Description("The opacity of the watermark (0.0 to 1.0)")]
    public float Opacity { get; set; } = 0.5f;
}

[Description("Convert a video to a different format")]
[Tag("Media")]
[ValidateApiKey]
public class ConvertVideo : IMediaTransform, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The desired output format for the converted video", ParameterType = "query")]
    [Description("The desired output format for the converted video")]
    [Required]
    public ConvertVideoOutputFormat OutputFormat { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public Stream Video { get; set; }

    [ApiMember(Description = "Optional client-provided identifier for the request", ParameterType = "query")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to", ParameterType = "query")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request", ParameterType = "query")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

[Description("Crop a video to a specified area")]
[Tag("Media")]
[ValidateApiKey]
public class CropVideo : IMediaTransform, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The X-coordinate of the top-left corner of the crop area", ParameterType = "query")]
    [Description("The X-coordinate of the top-left corner of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int X { get; set; }

    [ApiMember(Description = "The Y-coordinate of the top-left corner of the crop area", ParameterType = "query")]
    [Description("The Y-coordinate of the top-left corner of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int Y { get; set; }

    [ApiMember(Description = "The width of the crop area", ParameterType = "query")]
    [Description("The width of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int Width { get; set; }

    [ApiMember(Description = "The height of the crop area", ParameterType = "query")]
    [Description("The height of the crop area")]
    [ValidateGreaterThan(0)]
    [Required]
    public int Height { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public Stream Video { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request", ParameterType = "query")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to", ParameterType = "query")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request", ParameterType = "query")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

[Description("Trim a video to a specified duration via start and end times")]
[Tag("Media")]
[ValidateApiKey]
public class TrimVideo : IMediaTransform, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The start time of the trimmed video (format: HH:MM:SS)", ParameterType = "query")]
    [Description("The start time of the trimmed video (format: HH:MM:SS)")]
    [Required]
    public string StartTime { get; set; }

    [ApiMember(Description = "The end time of the trimmed video (format: HH:MM:SS)", ParameterType = "query")]
    [Description("The end time of the trimmed video (format: HH:MM:SS)")]
    public string? EndTime { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public Stream Video { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request", ParameterType = "query")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to", ParameterType = "query")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request", ParameterType = "query")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

[Description("Convert an audio file to a different format")]
[Tag("Media")]
[ValidateApiKey]
public class ConvertAudio : IMediaTransform, IReturn<MediaTransformResponse>
{
    [ApiMember(Description = "The desired output format for the converted audio", ParameterType = "query")]
    [Description("The desired output format for the converted audio")]
    [Required]
    public AudioFormat OutputFormat { get; set; }
    
    [Required]
    [Input(Type = "file")]
    public Stream Audio { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request", ParameterType = "query")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to", ParameterType = "query")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }
    
    [ApiMember(Description = "Tag to identify the request", ParameterType = "query")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

public interface IMediaTransform
{
    public string? RefId { get; set; }
    public string? Tag { get; set; }
    public string? ReplyTo { get; set; }
}

[Description("Response object for transform requests")]
public class MediaTransformResponse
{
    
    [ApiMember(Description = "List of generated outputs")]
    [Description("List of generated outputs")]
    public List<ArtifactOutput>? Outputs { get; set; }

    [ApiMember(Description = "List of generated text outputs")]
    [Description("List of generated text outputs")]
    public List<TextOutput>? TextOutputs { get; set; }

    [ApiMember(Description = "Detailed response status information")]
    [Description("Detailed response status information")]
    public ResponseStatus? ResponseStatus { get; set; }
}