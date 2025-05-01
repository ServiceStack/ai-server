using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Model;

namespace AiServer.ServiceModel.Types;

[Tag(Tags.MediaInfo)]
public class QueryMediaTypes : QueryDb<MediaType> { }


[Icon(Svg = Icons.MediaProvider)]
public class MediaProvider
{
    [AutoIncrement] public int Id { get; set; }

    /// <summary>
    /// The unique name for this Provider
    /// </summary>
    [Index(Unique = true)]
    public string Name { get; set; }

    /// <summary>
    /// The Environment Variable for the API Key to use for this Provider
    /// </summary>
    public string? ApiKeyVar { get; set; }

    /// <summary>
    /// The Environment Variable for the ApiBaseUrl to use for this Provider
    /// </summary>
    public string? ApiUrlVar { get; set; }

    /// <summary>
    /// The API Key to use for this Provider
    /// </summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Send the API Key in the Header instead of Authorization Bearer
    /// </summary>
    public string? ApiKeyHeader { get; set; }

    /// <summary>
    /// Override Base URL for the Provider
    /// </summary>
    public string? ApiBaseUrl { get; set; }

    /// <summary>
    /// Url to check if the API is online
    /// </summary>
    public string? HeartbeatUrl { get; set; }

    /// <summary>
    /// How many requests should be made concurrently
    /// </summary>
    public int Concurrency { get; set; }

    /// <summary>
    /// What priority to give this Provider to use for processing models 
    /// </summary>
    public int Priority { get; set; }

    /// <summary>
    /// Whether the Provider is enabled
    /// </summary>
    public bool Enabled { get; set; }

    /// <summary>
    /// When the Provider went offline
    /// </summary>
    public DateTime? OfflineDate { get; set; }

    /// <summary>
    /// When the Provider was created
    /// </summary>
    public DateTime CreatedDate { get; set; }

    /// <summary>
    /// The behavior for this Provider
    /// </summary>
    public string MediaTypeId { get; set; }
    
    [Ignore]
    [Input(Type = "hidden")]
    public MediaType? MediaType { get; set; }

    public List<string> Models { get; set; } = [];
}

[Icon(Svg = Icons.Type)]
public class MediaType : IHasId<string>
{
    /// <summary>
    /// Name for this API Provider Type
    /// </summary>
    public string Id { get; set; }
        
    /// <summary>
    /// Default API Base URL
    /// </summary>
    public string? ApiBaseUrl { get; set; }
        
    /// <summary>
    /// Default API Key Header to use
    /// </summary>
    public string? ApiKeyHeader { get; set; }

    /// <summary>
    /// The website for this provider
    /// </summary>
    public string Website { get; set; }
        
    /// <summary>
    /// Icon Path or URL
    /// </summary>
    public string? Icon { get; set; }

    /// <summary>
    /// Mapping of common models to API Models
    /// </summary>
    public Dictionary<string, string> ApiModels { get; set; } = new();
    
    public AiServiceProvider Provider { get; set; }
}

public enum AiServiceProvider
{
    Replicate,
    Comfy,
    OpenAi
}

public class MediaModel : IHasId<string>
{
    public string Id { get; set; }
    public string? Name { get; set; }
    public ModelType? Type { get; set; }
    public Dictionary<string, string> ApiModels { get; set; } = new();
    public Dictionary<string,List<string>>? SupportedTasks { get; set; }
    public List<string>? Dependencies { get; set; }
    public string? Installer { get; set; }
    public string? Path { get; set; }
    public string? Workflow { get; set; }
    public Dictionary<string, object> WorkflowVars { get; set; } = new();
    public string? DownloadToken { get; set; }
    public string? DownloadUrl { get; set; }
    public string? Url { get; set; }
}

public enum ModelType
{
    TextToImage,
    TextEncoder,
    ImageUpscale,
    TextToSpeech,
    TextToAudio,
    SpeechToText,
    ImageToText,
    ImageToImage,
    ImageWithMask,
    Lora,
    VAE,
}

public class TextToSpeechVoice : IHasId<string>
{
    public string Id { get; set; }
    public string Model { get; set; }
}
