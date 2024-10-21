using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Jobs;

namespace AiServer.ServiceModel;

[ValidateApiKey]
[Tag("AI")]
[Api("Convert speech to text")]
[Description("Transcribe audio content to text")]
public class QueueSpeechToText : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "The audio stream containing the speech to be transcribed")]
    [Description("The audio stream containing the speech to be transcribed")]
    [Required]
    [Input(Type = "file")]
    public Stream Audio { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
}

[ValidateApiKey]
[Tag("AI")]
[Api("Convert text to speech")]
[Description("Generate speech audio from text input")]
public class QueueTextToSpeech : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "The text to be converted to speech")]
    [Description("The text to be converted to speech")]
    [Required]
    public string Text { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in speech generation")]
    [Description("Optional seed for reproducible results in speech generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "The AI model to use for speech generation")]
    [Description("The AI model to use for speech generation")]
    public string? Model { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
}

[ValidateApiKey]
[Tag("AI")]
[Api("Generate image from text description")]
[Description("Create an image based on a text prompt")]
public class QueueTextToImage : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "The main prompt describing the desired image")]
    [Description("The main prompt describing the desired image")]
    [ValidateNotEmpty]
    [Input(Type = "textarea")]
    public string PositivePrompt { get; set; }

    [ApiMember(Description = "Optional prompt specifying what should not be in the image")]
    [Description("Optional prompt specifying what should not be in the image")]
    [Input(Type = "textarea")]
    public string? NegativePrompt { get; set; }

    [ApiMember(Description = "Desired width of the generated image")]
    [Description("Desired width of the generated image")]
    [Range(64, 2048)]
    public int? Width { get; set; }

    [ApiMember(Description = "Desired height of the generated image")]
    [Description("Desired height of the generated image")]
    [Range(64, 2048)]
    public int? Height { get; set; }

    [ApiMember(Description = "Number of images to generate in a single batch")]
    [Description("Number of images to generate in a single batch")]
    [Range(1, 10)]
    public int? BatchSize { get; set; }

    [ApiMember(Description = "The AI model to use for image generation")]
    [Description("The AI model to use for image generation")]
    public string? Model { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results")]
    [Description("Optional seed for reproducible results")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
}

[ValidateApiKey]
[Tag("AI")]
[Api("Generate image from another image")]
[Description("Create a new image based on an existing image and a text prompt")]
public class QueueImageToImage : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "The image to use as input")]
    [Description("The image to use as input")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }

    [ApiMember(Description = "Prompt describing the desired output")]
    [Description("Prompt describing the desired output")]
    [ValidateNotEmpty]
    [Input(Type = "textarea")]
    public string PositivePrompt { get; set; }

    [ApiMember(Description = "Negative prompt describing what should not be in the image")]
    [Description("Negative prompt describing what should not be in the image")]
    [Input(Type = "textarea")]
    public string? NegativePrompt { get; set; }
    
    [ApiMember(Description = "The AI model to use for image generation")]
    [Description("The AI model to use for image generation")]
    public string? Model { get; set; }

    [ApiMember(Description = "Optional specific amount of denoise to apply")]
    [Description("Optional specific amount of denoise to apply")]
    [Range(0, 1)]
    public float? Denoise { get; set; }

    [ApiMember(Description = "Number of images to generate in a single batch")]
    [Description("Number of images to generate in a single batch")]
    [Range(1, 10)]
    public int? BatchSize { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in image generation")]
    [Description("Optional seed for reproducible results in image generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
    
    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag("AI")]
[Api("Upscale an image")]
[Description("Increase the resolution and quality of an input image")]
public class QueueImageUpscale : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "The image to upscale")]
    [Description("The image to upscale")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in image generation")]
    [Description("Optional seed for reproducible results in image generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
}

[ValidateApiKey]
[Tag("AI")]
[Api("Generate image with masked area")]
[Description("Create a new image by applying a mask to an existing image and generating content for the masked area")]
public class QueueImageWithMask : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "Prompt describing the desired output in the masked area")]
    [Description("Prompt describing the desired output in the masked area")]
    [ValidateNotEmpty]
    [Input(Type = "textarea")]
    public string PositivePrompt { get; set; }

    [ApiMember(Description = "Negative prompt describing what should not be in the masked area")]
    [Description("Negative prompt describing what should not be in the masked area")]
    [Input(Type = "textarea")]
    public string? NegativePrompt { get; set; }

    [ApiMember(Description = "The image to use as input")]
    [Description("The image to use as input")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }

    [ApiMember(Description = "The mask to use as input")]
    [Description("The mask to use as input")]
    [Required]
    [Input(Type = "file")]
    public Stream Mask { get; set; }

    [ApiMember(Description = "Optional specific amount of denoise to apply")]
    [Description("Optional specific amount of denoise to apply")]
    [Range(0, 1)]
    public float? Denoise { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in image generation")]
    [Description("Optional seed for reproducible results in image generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
}

[ValidateApiKey]
[Tag("AI")]
[Api("Convert image to text")]
[Description("Extract text content from an image")]
public class QueueImageToText : IQueueGeneration, IReturn<QueueGenerationResponse>
{
    [ApiMember(Description = "The image to convert to text")]
    [Description("The image to convert to text")]
    [Required]
    [Input(Type = "file")]
    public Stream Image { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    [Description("Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Optional queue or topic to reply to")]
    [Description("Optional queue or topic to reply to")]
    public string? ReplyTo { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    [Description("Tag to identify the request")]
    public string? Tag { get; set; }

    [ApiMember(Description = "Optional state to associate with the request")]
    [Description("Optional state to associate with the request")]
    [Input(Type = "hidden")]
    public string? State { get; set; }
}

[Description("Base class for queue generation requests")]
public interface IQueueGeneration
{
    public string? RefId { get; set; }
    
    public string? ReplyTo { get; set; }
    
    public string? Tag { get; set; }
    
    public string? State { get; set; }
}

[ValidateApiKey]
[Tag(Tag.Jobs)]
[Api("Get job status")]
[Description("Retrieve the status of a background job")]
public class GetJobStatus : IGet, IReturn<GetJobStatusResponse>
{
    [ApiMember(Description = "Unique identifier of the background job")]
    [Description("Unique identifier of the background job")]
    public long? JobId { get; set; }

    [ApiMember(Description = "Client-provided identifier for the request")]
    [Description("Client-provided identifier for the request")]
    public string? RefId { get; set; }
}

public class GetJobStatusResponse
{
    [ApiMember(Description = "Unique identifier of the background job")]
    [Description("Unique identifier of the background job")]
    public long JobId { get; set; }

    [ApiMember(Description = "Client-provided identifier for the request")]
    [Description("Client-provided identifier for the request")]
    public string RefId { get; set; }

    [ApiMember(Description = "Current state of the background job")]
    [Description("Current state of the background job")]
    public BackgroundJobState JobState { get; set; }

    [ApiMember(Description = "Current status of the generation request")]
    [Description("Current status of the generation request")]
    public string? Status { get; set; }
    
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

public class QueueGenerationResponse
{
    [ApiMember(Description = "Unique identifier of the background job")]
    [Description("Unique identifier of the background job")]
    public long JobId { get; set; }

    [ApiMember(Description = "Client-provided identifier for the request")]
    [Description("Client-provided identifier for the request")]
    public string RefId { get; set; }

    [ApiMember(Description = "Current state of the background job")]
    [Description("Current state of the background job")]
    public BackgroundJobState JobState { get; set; }

    [ApiMember(Description = "Current status of the generation request")]
    [Description("Current status of the generation request")]
    public string? Status { get; set; }
    
    [ApiMember(Description = "Detailed response status information")]
    [Description("Detailed response status information")]
    public ResponseStatus? ResponseStatus { get; set; }
    
    [ApiMember(Description = "URL to check the status of the generation request")]
    [Description("URL to check the status of the generation request")]
    public string StatusUrl { get; set; }
}

[Description("Output object for generated artifacts")]
public class ArtifactOutput
{
    [ApiMember(Description = "URL to access the generated image")]
    [Description("URL to access the generated image")]
    public string? Url { get; set; }

    [ApiMember(Description = "Filename of the generated image")]
    [Description("Filename of the generated image")]
    public string? FileName { get; set; }

    [ApiMember(Description = "Provider used for image generation")]
    [Description("Provider used for image generation")]
    public string? Provider { get; set; }
}

[Description("Output object for generated text")]
public class TextOutput
{
    [ApiMember(Description = "The generated text")]
    [Description("The generated text")]
    public string? Text { get; set; }
}