using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[Tag(Tag.Info)]
[ValidateApiKey]
[Description("Media Providers")]
public class QueryMediaProviders : QueryDb<MediaProvider>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
[Description("Add an API Provider to Generation API Providers")]
[AutoPopulate(nameof(MediaProvider.CreatedDate),  Eval = "utcNow")]
public class CreateMediaProvider : ICreateDb<MediaProvider>, IReturn<IdResponse>
{
    [Description("The name of the API Provider")]
    public string Name { get; set; }

    [Description("The API Key to use for this Provider")]
    public string? ApiKey { get; set; }

    [Description("Send the API Key in the Header instead of Authorization Bearer")]
    public string? ApiKeyHeader { get; set; }

    [Description("Base URL for the Generation Provider")]
    public string? ApiBaseUrl { get; set; }

    [Description("Url to check if the API is online")]
    [Input(Type = "hidden")]
    public string? HeartbeatUrl { get; set; }
    
    
    [Description("How many requests should be made concurrently")]
    [Input(Type = "hidden")]
    public int Concurrency { get; set; }

    
    [Description("What priority to give this Provider to use for processing models")]
    [Input(Type = "hidden")]
    public int Priority { get; set; }

    [Description("Whether the Provider is enabled")]
    public bool Enabled { get; set; }

    [Description("The date the Provider was last online")]
    [Input(Type = "hidden")]
    public DateTime? OfflineDate { get; set; }
    
    [Description("Models this API Provider should process")]
    [Input(Type = "hidden")]
    public List<string>? Models { get; set; }
    
    [Input(Type = "hidden")]
    public int? MediaTypeId { get; set; }
}

[Tag(Tag.Info)]
[ValidateApiKey]
[Description("Media Models")]
public class QueryMediaModels : QueryDb<MediaModel>
{
    public string? Id { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
[Description("Update a Generation API Provider")]
public class UpdateMediaProvider : IPatchDb<MediaProvider>, IReturn<IdResponse>
{
    public int Id { get; set; }
    
    [Description("The API Key to use for this Provider")]
    public string? ApiKey { get; set; }
    
    [Description("Send the API Key in the Header instead of Authorization Bearer")]
    public string? ApiKeyHeader { get; set; }
    
    [Description("Override Base URL for the Generation Provider")]
    public string? ApiBaseUrl { get; set; }
    
    [Description("Url to check if the API is online")]
    public string? HeartbeatUrl { get; set; }
    
    [Description("How many requests should be made concurrently")]
    public int? Concurrency { get; set; }

    [Input(Type = "select", EvalAllowableEntries = "{ '-1':'Low', '0':'Normal', 1:'High', 2:'Highest' }")]
    [Description("What priority to give this Provider to use for processing models")]
    public int? Priority { get; set; }

    [Description("Whether the Provider is enabled")]
    public bool? Enabled { get; set; }
    
    [Input(Type = "hidden")]
    [Description("The models this API Provider should process")]
    public List<string>? Models { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
[Description("Delete a Generation API Provider")]
public class DeleteMediaProvider : IDeleteDb<MediaProvider>, IReturn<IdResponse>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

