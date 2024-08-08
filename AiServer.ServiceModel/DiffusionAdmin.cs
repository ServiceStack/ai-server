using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

public class QueryDiffusionApiProviders : QueryDb<DiffusionApiProvider>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

[AutoPopulate(nameof(ApiProvider.CreatedDate),  Eval = "utcNow")]
public class CreateDiffusionApiProvider : ICreateDb<DiffusionApiProvider>, IReturn<IdResponse>
{
    public string Name { get; set; }

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
    
    public List<string>? Models { get; set; }
    
    public string Type { get; set; }
}

public class UpdateDiffusionApiProvider : IPatchDb<DiffusionApiProvider>, IReturn<DiffusionApiProvider>
{
    public int Id { get; set; }
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
    /// How many requests should be made concurrently
    /// </summary>
    public int? Concurrency { get; set; }

    /// <summary>
    /// What priority to give this Provider to use for processing models 
    /// </summary>
    public int? Priority { get; set; }

    /// <summary>
    /// Whether the Provider is enabled
    /// </summary>
    public bool? Enabled { get; set; }
    public List<string>? Models { get; set; }
}

public class DeleteDiffusionApiProvider : IDeleteDb<DiffusionApiProvider>, IReturn<IdResponse>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

