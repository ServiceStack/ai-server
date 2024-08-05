using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Executor;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceInterface;

[Tag(Tag.Tasks)]
[Restrict(RequestAttributes.MessageQueue), ExcludeMetadata]
public class AppDbWrites : IReturn<EmptyResponse>
{
    [Command<ChangeProviderStatusCommand>]
    public ChangeProviderStatus? RecordOfflineProvider { get; set; }
    
    [Command<AppDbPeriodicTasksCommand>]
    public PeriodicTasks? PeriodicTasks { get; set; } 
    
    // Command to update Comfy model info
    [Command<UpdateComfyModelInfoCommand>]
    public UpdateComfyModelInfo? UpdateComfyModelInfo { get; set; }
}

[Tag(Tag.Tasks)]
[Restrict(RequestAttributes.MessageQueue), ExcludeMetadata]
public class ExecutorTasks : IReturn<EmptyResponse>
{
    // Execute download comfy model for a provider
    [Command<DownloadComfyModelCommand>]
    public DownloadComfyModel? DownloadComfyModel { get; set; }
}

public class SelectedTasks
{
    public List<long> Ids { get; set; }
}

public class BackgroundMqServices  : Service
{
    public Task Any(AppDbWrites request) => Request.ExecuteCommandsAsync(request);
    public Task Any(ExecutorTasks request) => Request.ExecuteCommandsAsync(request);
}
