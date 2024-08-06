using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

/// <summary>
///  An API Provider that can process tasks
/// </summary>
[Icon(Svg = Icons.Work)]
public class ApiProvider
{
    [AutoIncrement]
    public int Id { get; set; }
        
    /// <summary>
    /// The unique name for this API Provider
    /// </summary>
    [Index(Unique = true)]
    public string Name { get; set; }
        
    /// <summary>
    /// The behavior for this API Provider
    /// </summary>
    public int ApiTypeId { get; set; }
        
    /// <summary>
    /// The API Key to use for this Provider
    /// </summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Send the API Key in the Header instead of Authorization Bearer
    /// </summary>
    public string? ApiKeyHeader { get; set; }
        
    /// <summary>
    /// Override Base URL for the API Provider
    /// </summary>
    public string? ApiBaseUrl { get; set; }
        
    /// <summary>
    /// Url to check if the API is online
    /// </summary>
    public string? HeartbeatUrl { get; set; }

    /// <summary>
    /// Override API Paths for different AI Tasks
    /// </summary>
    public Dictionary<TaskType, string>? TaskPaths { get; set; }
        
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
        
    [Reference]
    public ApiType ApiType { get; set; }
        
    [Reference]
    public List<ApiProviderModel> Models { get; set; }
}


/// <summary>
/// The models this API Provider can process 
/// </summary>
public class ApiProviderModel
{
    [AutoIncrement]
    public int Id { get; set; }

    public int ApiProviderId { get; set; }
    
    /// <summary>
    /// Ollama Model Id
    /// </summary>
    public string Model { get; set; }
    
    /// <summary>
    /// What Model to use for this API Provider
    /// </summary>
    public string? ApiModel { get; set; }
}

/// <summary>
/// The behavior of the API Provider
/// </summary>
[Icon(Svg = Icons.Type)]
public class ApiType
{
    [AutoIncrement]
    public int Id { get; set; }
        
    /// <summary>
    /// Name for this API Provider Type
    /// </summary>
    public string Name { get; set; }
        
    /// <summary>
    /// The website for this provider
    /// </summary>
    public string Website { get; set; }

    /// <summary>
    /// The API Base Url
    /// </summary>
    public string ApiBaseUrl { get; set; }

    /// <summary>
    /// The URL to check if the API is online
    /// </summary>
    public string? HeartbeatUrl { get; set; }
        
    /// <summary>
    /// Uses a Custom IOpenAiProvider
    /// </summary>
    public string? OpenAiProvider { get; set; }
        
    /// <summary>
    /// API Paths for different AI Tasks
    /// </summary>
    public Dictionary<TaskType, string> TaskPaths { get; set; }

    /// <summary>
    /// Mapping of Ollama Models to API Models
    /// </summary>
    public Dictionary<string, string> ApiModels { get; set; } = new();
}
