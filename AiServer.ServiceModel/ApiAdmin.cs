using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;

[Tag(Tags.AiInfo)]
[Api("Different Models available in AI Server")]
public class QueryAiModels : QueryDb<AiModel> {}

[Tag(Tags.AiInfo)]
[Api("The Type and behavior of different API Providers")]
public class QueryAiTypes : QueryDb<AiType> {}

[Tag(Tags.AiInfo)]
[Api("Active AI Worker Models available in AI Server")]
public class ActiveAiModels : IGet, IReturn<ActiveAiModelsResponse>
{
    public AiProviderType? Provider { get; set; }
    public bool? Vision { get; set; }
}
public class ActiveAiModelsResponse
{
    public List<string>? Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.AiInfo)]
[Api("Active Custom AI Worker Models available in AI Server")]
public class ActiveCustomAiModels : IGet, IReturn<StringsResponse>
{
}

[Tag(Tags.AiInfo)]
[ValidateApiKey]
[Api("AI Providers")]
public class QueryAiProviders : QueryDb<AiProvider>
{
    public string? Name { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
[Api("Add an AI Provider to process AI Requests")]
[AutoPopulate(nameof(AiProvider.CreatedDate),  Eval = "utcNow")]
public class CreateAiProvider : ICreateDb<AiProvider>, IReturn<IdResponse>
{
    [ValidateGreaterThan(0)]
    [Input(Type = "hidden")]
    [ApiMember(Description="The Type of this API Provider")]
    public string AiTypeId { get; set; }
    
    [ApiMember(Description="The Base URL for the API Provider")]
    public string? ApiBaseUrl { get; set; }

    [ValidateNotEmpty]
    [ApiMember(Description="The unique name for this API Provider")]
    public string Name { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="The API Key to use for this Provider")]
    public string? ApiKeyVar { get; set; }

    [ApiMember(Description="The API Key to use for this Provider")]
    public string? ApiKey { get; set; }

    [Input(Type = "hidden")]
    [ApiMember(Description="Send the API Key in the Header instead of Authorization Bearer")]
    public string? ApiKeyHeader { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="The URL to check if the API Provider is still online")]
    public string? HeartbeatUrl { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="Override API Paths for different AI Requests")]
    public Dictionary<TaskType, string>? TaskPaths { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="How many requests should be made concurrently")]
    public int Concurrency { get; set; }
    
    [Input(Type = "select", EvalAllowableEntries = "{ '-1':'Low', '0':'Normal', 1:'High', 2:'Highest' }")]
    [ApiMember(Description="What priority to give this Provider to use for processing models")]
    public int Priority { get; set; }
    
    [ApiMember(Description="Whether the Provider is enabled")]
    public bool Enabled { get; set; }

    [Input(Type = "hidden")]
    [ApiMember(Description="The models this API Provider should process")]
    public List<AiProviderModel>? Models { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="The selected models this API Provider should process")]
    public List<string>? SelectedModels { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class UpdateAiProvider : IPatchDb<AiProvider>, IReturn<IdResponse>
{
    public int Id { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="The Type of this API Provider")]
    public string? AiTypeId { get; set; }
    
    [ApiMember(Description="The Base URL for the API Provider")]
    [Input(Type = "text", Placeholder = "e.g. http://localhost:11434")]
    public string? ApiBaseUrl { get; set; }

    [ApiMember(Description="The unique name for this API Provider")]
    public string? Name { get; set; }
    
    [ApiMember(Description="The API Key to use for this Provider")]
    public string? ApiKeyVar { get; set; }

    [ApiMember(Description="The API Key to use for this Provider")]
    public string? ApiKey { get; set; }

    [ApiMember(Description="Send the API Key in the Header instead of Authorization Bearer")]
    public string? ApiKeyHeader { get; set; }
    
    [ApiMember(Description="The URL to check if the API Provider is still online")]
    public string? HeartbeatUrl { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="Override API Paths for different AI Requests")]
    public Dictionary<TaskType, string>? TaskPaths { get; set; }
    
    [ApiMember(Description="How many requests should be made concurrently")]
    public int? Concurrency { get; set; }
    
    [Input(Type = "select", EvalAllowableEntries = "{ '-1':'Low', '0':'Normal', 1:'High', 2:'Highest' }")]
    [ApiMember(Description="What priority to give this Provider to use for processing models")]
    public int? Priority { get; set; }
    
    [ApiMember(Description="Whether the Provider is enabled")]
    public bool? Enabled { get; set; }

    [Input(Type = "hidden")]
    [ApiMember(Description="The models this API Provider should process")]
    public List<AiProviderModel>? Models { get; set; }
    
    [Input(Type = "hidden")]
    [ApiMember(Description="The selected models this API Provider should process")]
    public List<string>? SelectedModels { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
[Api("Delete API Provider")]
public class DeleteAiProvider : IDeleteDb<AiProvider>, IReturnVoid
{
    public int Id { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class AdminData : IGet, IReturn<AdminDataResponse> {}

public class PageStats
{
    public string Label { get; set; }
    public int Total { get; set; }
}

public class AdminDataResponse
{
    public List<PageStats> PageStats { get; set; }
}