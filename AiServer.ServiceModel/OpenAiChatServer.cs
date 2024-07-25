using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class QueryOpenAiChat : QueryDb<OpenAiChatTask>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class GetOpenAiChat : IGet, IReturn<GetOpenAiChatResponse>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}
public class GetOpenAiChatResponse
{
    public OpenAiChatTask? Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(ServiceModel.Tag.OpenAi)]
[ValidateApiKey]
public class CreateOpenAiChat : ICreateDb<OpenAiChatTask>, IReturn<CreateOpenAiChatResponse>
{
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
    public OpenAiChat Request { get; set; }
}
public class CreateOpenAiChatResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class FetchOpenAiChatRequests : IPost, IReturn<FetchOpenAiChatRequestsResponse>
{
    [ValidateNotEmpty]
    public string[] Models { get; set; }

    [ValidateNotEmpty]
    public string Provider { get; set; }
    
    public string? Worker { get; set; }
    
    public int? Take { get; set; }
}
public class FetchOpenAiChatRequestsResponse
{
    public required OpenAiChatRequest[] Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class CompleteOpenAiChat : IPost, IReturn<EmptyResponse>
{
    public long Id { get; set; }
    public string Provider { get; set; }
    public int DurationMs { get; set; }
    public OpenAiChatResponse Response { get; set; }
    public virtual string? ReplyTo { get; set; } 
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class FailOpenAiChat : IPost, IReturn<EmptyResponse>
{
    public long Id { get; set; }
    public string Provider { get; set; }
    public int DurationMs { get; set; }
    public ResponseStatus Error { get; set; }
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class QueryCompletedChatTasks : QueryDb<OpenAiChatCompleted>
{
    public string? Db { get; set; }
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class QueryFailedChatTasks : QueryDb<OpenAiChatFailed>
{
    public string? Db { get; set; }
}

[Tag(Tag.Info)]
[ValidateApiKey]
public class GetActiveProviders : IGet, IReturn<GetActiveProvidersResponse> {}

public class GetActiveProvidersResponse
{
    public ApiProvider[] Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

[Tag(Tag.OpenAi)]
[ValidateApiKey]
public class ChatApiProvider : IPost, IReturn<OpenAiChatResponse>
{
    public string Provider { get; set; }
    public string Model { get; set; }
    public OpenAiChat? Request { get; set; }
    
    [Input(Type = "textarea"), FieldCss(Field = "col-span-12 text-center")]
    public string? Prompt { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class UpdateApiProvider : IPatchDb<ApiProvider>, IReturn<IdResponse>
{
    public int Id { get; set; }
    public string? ApiKey { get; set; }
    public string? ApiBaseUrl { get; set; }
    public string? HeartbeatUrl { get; set; }
    public int? Concurrency { get; set; }
    public int? Priority { get; set; }
    public bool? Enabled { get; set; }
}

[Tag(Tag.Admin)]
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

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class GetApiWorkerStats : IGet, IReturn<GetApiWorkerStatsResponse> { }
public class GetApiWorkerStatsResponse
{
    public List<WorkerStats> Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class WorkerStats
{
    public string Name { get; init; }
    public long Queued { get; init; }
    public long Received { get; init; }
    public long Completed { get; init; }
    public long Retries { get; init; }
    public long Failed { get; init; }
    public DateTime? Offline { get; init; }
    public bool Running { get; init; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class QueryTaskSummary : QueryDb<TaskSummary> {}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class RerunCompletedTasks : IPost, IReturn<RerunCompletedTasksResponse>
{
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<long> Ids { get; set; }
}
public class RerunCompletedTasksResponse
{
    public Dictionary<long, string> Errors { get; set; } = new();
    public List<long> Results { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}
