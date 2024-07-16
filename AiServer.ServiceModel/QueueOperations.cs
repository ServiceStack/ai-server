using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class StopWorkers : IPost, IReturn<EmptyResponse> {}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class StartWorkers : IPost, IReturn<EmptyResponse> {}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class RestartWorkers : IPost, IReturn<EmptyResponse> {}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ResetActiveProviders : IGet, IReturn<GetActiveProvidersResponse> {}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChangeApiProviderStatus : IPost, IReturn<StringResponse>
{
    public string Provider { get; set; }
    public bool Online { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChatOperations : IPost, IReturn<EmptyResponse>
{
    public bool? ResetTaskQueue { get; set; }
    public bool? RequeueIncompleteTasks { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChatFailedTasks : IPost, IReturn<EmptyResponse>
{
    public bool? ResetErrorState { get; set; }
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<long>? RequeueFailedTaskIds { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class FirePeriodicTask : IPost, IReturn<EmptyResponse>
{
    public PeriodicFrequency Frequency { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChatNotifyCompletedTasks : IPost, IReturn<ChatNotifyCompletedTasksResponse>
{
    [ValidateNotEmpty]
    [Input(Type = "tag"), FieldCss(Field = "col-span-12")]
    public List<int> Ids { get; set; }
}
public class ChatNotifyCompletedTasksResponse
{
    public Dictionary<long, string> Errors { get; set; } = new();
    public List<long> Results { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}