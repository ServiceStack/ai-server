using System.Runtime.Serialization;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Jobs;

namespace AiServer.ServiceModel;

[Tag(Tags.AiInfo)]
[ValidateApiKey]
public class GetOpenAiChat : IGet, IReturn<GetOpenAiChatResponse>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}
public class GetOpenAiChatResponse
{
    public BackgroundJobBase? Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.AiInfo)]
public class GetOpenAiChatStatus : IGet, IReturn<GetOpenAiChatStatusResponse>
{
    public long JobId { get; set; }
    public string? RefId { get; set; }
}

public class GetOpenAiChatStatusResponse
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
    
    [ApiMember(Description = "Chat response")]
    [Description("Chat response")]
    public OpenAiChatResponse? ChatResponse { get; set; }
}

[Tag(Tags.AiInfo)]
[ValidateApiKey]
public class WaitForOpenAiChat : IGet, IReturn<GetOpenAiChatResponse>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

[Tag(Tags.AiInfo)]
[Route("/icons/models/{Model}", "GET")]
public class GetModelImage : IGet, IReturn<byte[]>
{
    public string Model { get; set; }
}


[Tag(Tags.AI)]
[ValidateApiKey]
[SystemJson(UseSystemJson.Response)]
public class QueueOpenAiChatCompletion : IReturn<QueueOpenAiChatResponse>
{
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
    public OpenAiChat Request { get; set; }
}
public class QueueOpenAiChatResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
    
    public string StatusUrl { get; set; }
    
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.AI)]
[ValidateApiKey]
[Route("/v1/chat/completions", "POST")]
[SystemJson(UseSystemJson.Response)]
public class OpenAiChatCompletion : OpenAiChat, IPost, IReturn<OpenAiChatResponse>
{
    [Description("Provide a unique identifier to track requests")]
    public string? RefId { get; set; }
    
    [Description("Specify which AI Provider to use")]
    public string? Provider { get; set; }
    
    [Description("Categorize like requests under a common group")]
    public string? Tag { get; set; }
}

[Tag(Tags.AiInfo)]
[ValidateApiKey]
public class GetActiveProviders : IGet, IReturn<GetActiveProvidersResponse> {}

public class GetActiveProvidersResponse
{
    public AiProvider[] Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.AiInfo)]
[ValidateApiKey]
public class ChatAiProvider : IPost, IReturn<OpenAiChatResponse>
{
    public string Provider { get; set; }
    public string Model { get; set; }
    public OpenAiChat? Request { get; set; }
    
    [Input(Type = "textarea"), FieldCss(Field = "col-span-12 text-center")]
    public string? Prompt { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class CreateApiKey : IPost, IReturn<CreateApiKeyResponse>
{
    public string Key { get; set; }
    public string Name { get; set; }
    public string? UserId { get; set; }
    public string? UserName { get; set; }
    public List<string> Scopes { get; set; } = new();
    public string? Notes { get; set; }
    public int? RefId { get; set; }
    public string? RefIdStr { get; set; }
    public Dictionary<string, string>? Meta { get; set; }
}
public class CreateApiKeyResponse
{
    public int Id { get; set; }
    public string Key { get; set; }
    public string Name { get; set; }
    public string? UserId { get; set; }
    public string? UserName { get; set; }
    public string VisibleKey { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public DateTime? CancelledDate { get; set; }
    public string? Notes { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class GetWorkerStats : IGet, IReturn<GetWorkerStatsResponse> { }
public class GetWorkerStatsResponse
{
    public List<WorkerStats> Results { get; set; }
    public Dictionary<string, int> QueueCounts { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class CancelWorker : IReturn<EmptyResponse>
{
    [ValidateNotEmpty]
    public string Worker { get; set; }
}
