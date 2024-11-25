using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[Tag(Tags.AiInfo)]
[ValidateApiKey]
public class QueryMediaProviders : QueryDb<MediaProvider>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
[AutoPopulate(nameof(MediaProvider.CreatedDate),  Eval = "utcNow")]
public class CreateMediaProvider : ICreateDb<MediaProvider>, IReturn<IdResponse>
{
    public string Name { get; set; }

    public string? ApiKey { get; set; }

    public string? ApiKeyHeader { get; set; }

    public string? ApiBaseUrl { get; set; }

    [Input(Type = "hidden")]
    public string? HeartbeatUrl { get; set; }
    
    
    [ApiMember(Description="How many requests should be made concurrently")]
    [Input(Type = "hidden")]
    public int Concurrency { get; set; }

    
    [ApiMember(Description="What priority to give this Provider to use for processing models")]
    [Input(Type = "hidden")]
    public int Priority { get; set; }

    [ApiMember(Description="Whether the Provider is enabled")]
    public bool Enabled { get; set; }

    [ApiMember(Description="The date the Provider was last online")]
    [Input(Type = "hidden")]
    public DateTime? OfflineDate { get; set; }
    
    [ApiMember(Description="Models this API Provider should process")]
    [Input(Type = "hidden")]
    public List<string>? Models { get; set; }
    
    [Input(Type = "hidden")]
    public string MediaTypeId { get; set; }
}

[Tag(Tags.AiInfo)]
[Api("Media Models")]
public class QueryMediaModels : QueryDb<MediaModel>
{
    public string? Id { get; set; }
    
    public string? ProviderId { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
[Api("Update a Generation API Provider")]
public class UpdateMediaProvider : IPatchDb<MediaProvider>, IReturn<IdResponse>
{
    public int Id { get; set; }
    
    [ApiMember(Description="The API Key to use for this Provider")]
    public string? ApiKey { get; set; }
    
    [ApiMember(Description="Send the API Key in the Header instead of Authorization Bearer")]
    public string? ApiKeyHeader { get; set; }
    
    [ApiMember(Description="Override Base URL for the Generation Provider")]
    public string? ApiBaseUrl { get; set; }
    
    [ApiMember(Description="Url to check if the API is online")]
    public string? HeartbeatUrl { get; set; }
    
    [ApiMember(Description="How many requests should be made concurrently")]
    public int? Concurrency { get; set; }

    [Input(Type = "select", EvalAllowableEntries = "{ '-1':'Low', '0':'Normal', 1:'High', 2:'Highest' }")]
    [ApiMember(Description="What priority to give this Provider to use for processing models")]
    public int? Priority { get; set; }

    [ApiMember(Description="Whether the Provider is enabled")]
    public bool? Enabled { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="The models this API Provider should process")]
    public List<string>? Models { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
[Api("Delete a Generation API Provider")]
public class DeleteMediaProvider : IDeleteDb<MediaProvider>, IReturn<IdResponse>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

[Tag(Tags.AiInfo)]
[Api("Text to Speech Voice models")]
public class QueryTextToSpeechVoices : QueryDb<TextToSpeechVoice>
{
}
