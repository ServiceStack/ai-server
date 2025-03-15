using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Model;

namespace AiServer.ServiceModel;

/// <summary>
///  An API Provider that can process tasks
/// </summary>
[Icon(Svg = Icons.Work)]
public class AiProvider
{
    [AutoIncrement]
    public int Id { get; set; }
        
    /// <summary>
    /// The unique name for this API Provider
    /// </summary>
    [Index(Unique = true)]
    public string Name { get; set; }
        
    /// <summary>
    /// Override Base URL for the API Provider
    /// </summary>
    public string? ApiBaseUrl { get; set; }
        
    /// <summary>
    /// The Environment Variable for the API Key to use for this Provider
    /// </summary>
    public string? ApiKeyVar { get; set; }

    /// <summary>
    /// The API Key to use for this Provider
    /// </summary>
    public string? ApiKey { get; set; }
    
    /// <summary>
    /// Send the API Key in the Header instead of Authorization Bearer
    /// </summary>
    public string? ApiKeyHeader { get; set; }
        
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
    /// The models this API Provider should process 
    /// </summary>
    public List<AiProviderModel> Models { get; set; } = [];

    /// <summary>
    /// The behavior for this API Provider
    /// </summary>
    public string AiTypeId { get; set; }

    [Ignore]
    public AiType AiType { get; set; }

    [Ignore] public List<string> SelectedModels => Models?.Select(x => x.ApiModel ?? x.Model).ToList() ?? [];
}

/// <summary>
/// The models this API Provider can process 
/// </summary>
public class AiProviderModel
{
    /// <summary>
    /// Ollama Model Id
    /// </summary>
    public string Model { get; set; }
        
    /// <summary>
    /// What Model to use for this API Provider
    /// </summary>
    public string? ApiModel { get; set; }
}

public enum AiProviderType
{
    OllamaAiProvider,
    OpenAiProvider,
    GoogleAiProvider,
    AnthropicAiProvider,
}

/// <summary>
/// The behavior of the AI Provider
/// </summary>
[Icon(Svg = Icons.Type)]
public class AiType : IHasId<string>
{
    /// <summary>
    /// Name for this API Provider Type
    /// </summary>
    public string Id { get; set; }
        
    /// <summary>
    /// The AI Provider to process AI Requests
    /// </summary>
    public AiProviderType Provider { get; set; }

    /// <summary>
    /// The website for this provider
    /// </summary>
    public string Website { get; set; }
        
    /// <summary>
    /// The API Base Url
    /// </summary>
    public string ApiBaseUrl { get; set; }
        
    /// <summary>
    /// Url to check if the API is online
    /// </summary>
    public string? HeartbeatUrl { get; set; }
        
    /// <summary>
    /// Icon Path or URL
    /// </summary>
    public string? Icon { get; set; }

    /// <summary>
    /// Mapping of Ollama Models to API Models
    /// </summary>
    public Dictionary<string, string> ApiModels { get; set; } = new();
}
