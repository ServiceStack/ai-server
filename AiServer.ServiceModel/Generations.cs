using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[Tag(Tags.AiInfo)]
[Api("Active Media Worker Models available in AI Server")]
public class ActiveMediaModels : IGet, IReturn<StringsResponse> {}


[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Convert speech to text")]
[SystemJson(UseSystemJson.Response)]
public class SpeechToText : IGeneration, IReturn<TextGenerationResponse>
{
    [ApiMember(Description = "The audio stream containing the speech to be transcribed")]
    [Required]
    [Input(Type = "file")]
    public string? Audio { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Convert text to speech")]
[SystemJson(UseSystemJson.Response)]
public class TextToSpeech : IGeneration, IReturn<ArtifactGenerationResponse>
{
    [ApiMember(Description = "The text to be converted to speech")]
    [ValidateNotEmpty]
    public string Input { get; set; }

    [ApiMember(Description = "Optional specific model and voice to use for speech generation")]
    public string? Model { get; set; }
    
    [ApiMember(Description = "Optional seed for reproducible results in speech generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Generate image from text description")]
[SystemJson(UseSystemJson.Response)]
public class TextToImage : IGeneration, IReturn<ArtifactGenerationResponse>
{
    [ApiMember(Description = "The main prompt describing the desired image")]
    [ValidateNotEmpty]
    [Input(Type = "textarea")]
    public string PositivePrompt { get; set; }

    [ApiMember(Description = "Optional prompt specifying what should not be in the image")]
    [Input(Type = "textarea")]
    public string? NegativePrompt { get; set; }

    [ApiMember(Description = "Desired width of the generated image")]
    [Range(64, 2048)]
    public int? Width { get; set; }

    [ApiMember(Description = "Desired height of the generated image")]
    [Range(64, 2048)]
    public int? Height { get; set; }

    [ApiMember(Description = "Number of images to generate in a single batch")]
    [Range(1, 10)]
    public int? BatchSize { get; set; }

    [ApiMember(Description = "The AI model to use for image generation")]
    public string? Model { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Generate image from another image")]
[Notes("Create a new image based on an existing image and a text prompt")]
[SystemJson(UseSystemJson.Response)]
public class ImageToImage : IGeneration, IReturn<ArtifactGenerationResponse>
{
    [ApiMember(Description = "The image to use as input")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }

    [ApiMember(Description = "Prompt describing the desired output")]
    [ValidateNotEmpty]
    [Input(Type = "textarea")]
    public string PositivePrompt { get; set; }

    [ApiMember(Description = "Negative prompt describing what should not be in the image")]
    [Input(Type = "textarea")]
    public string? NegativePrompt { get; set; }
    
    [ApiMember(Description = "The AI model to use for image generation")]
    public string? Model { get; set; }

    [ApiMember(Description = "Optional specific amount of denoise to apply")]
    [Range(0, 1)]
    public float? Denoise { get; set; }

    [ApiMember(Description = "Number of images to generate in a single batch")]
    [Range(1, 10)]
    public int? BatchSize { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in image generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Upscale an image")]
[Notes("Increase the resolution and quality of an input image")]
[SystemJson(UseSystemJson.Response)]
public class ImageUpscale : IGeneration, IReturn<ArtifactGenerationResponse>
{
    [ApiMember(Description = "The image to upscale")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in image generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Generate image with masked area")]
[Notes("Create a new image by applying a mask to an existing image and generating content for the masked area")]
[SystemJson(UseSystemJson.Response)]
public class ImageWithMask : IGeneration, IReturn<ArtifactGenerationResponse>
{
    [ApiMember(Description = "Prompt describing the desired output in the masked area")]
    [ValidateNotEmpty]
    [Input(Type = "textarea")]
    public string PositivePrompt { get; set; }

    [ApiMember(Description = "Negative prompt describing what should not be in the masked area")]
    [Input(Type = "textarea")]
    public string? NegativePrompt { get; set; }

    [ApiMember(Description = "The image to use as input")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }

    [ApiMember(Description = "The mask to use as input")]
    [Required]
    [Input(Type = "file")]
    public string? Mask { get; set; }

    [ApiMember(Description = "Optional specific amount of denoise to apply")]
    [Range(0, 1)]
    public float? Denoise { get; set; }

    [ApiMember(Description = "Optional seed for reproducible results in image generation")]
    [Range(0, int.MaxValue)]
    public int? Seed { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[ValidateApiKey]
[Tag(Tags.AI)]
[Api("Convert image to text")]
[Notes("Extract text content from an image")]
[SystemJson(UseSystemJson.Response)]
public class ImageToText : IGeneration, IReturn<TextGenerationResponse>
{
    [ApiMember(Description = "The image to convert to text")]
    [Required]
    [Input(Type = "file")]
    public string? Image { get; set; }
    
    [ApiMember(Description = "Whether to use a Vision Model for the request")]
    public string? Model { get; set; }
    
    [ApiMember(Description = "Prompt for the vision model")]
    public string? Prompt { get; set; }
    
    [ApiMember(Description = "Optional client-provided identifier for the request")]
    public string? RefId { get; set; }

    [ApiMember(Description = "Tag to identify the request")]
    public string? Tag { get; set; }
}

[Api("Response object for artifact generation requests")]
public class ArtifactGenerationResponse
{
    [ApiMember(Description = "List of generated outputs")]
    public List<ArtifactOutput>? Results { get; set; }

    [ApiMember(Description = "Detailed response status information")]
    public ResponseStatus? ResponseStatus { get; set; }
}

[Api("Response object for text generation requests")]
public class TextGenerationResponse
{
    [ApiMember(Description = "List of generated text outputs")]
    public List<TextOutput>? Results { get; set; }

    [ApiMember(Description = "Detailed response status information")]
    public ResponseStatus? ResponseStatus { get; set; }
}

[Api("Response object for generation requests")]
public class GenerationResponse
{
    [ApiMember(Description = "List of generated outputs")]
    public List<ArtifactOutput>? Outputs { get; set; }

    [ApiMember(Description = "List of generated text outputs")]
    public List<TextOutput>? TextOutputs { get; set; }

    [ApiMember(Description = "Detailed response status information")]
    public ResponseStatus? ResponseStatus { get; set; }
}

public interface IGeneration
{
    string? RefId { get; set; }
    string? Tag { get; set; }
}