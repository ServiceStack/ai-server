using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Executor;
using AiServer.ServiceInterface.Notification;
using AiServer.ServiceInterface.Queue;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceInterface;

[Tag(Tag.Tasks)]
[Restrict(RequestAttributes.MessageQueue), ExcludeMetadata]
public class AppDbWrites : IReturn<EmptyResponse>
{
    [Command<CompleteNotificationCommand>]
    public CompleteNotification? CompleteNotification { get; set; }
    
    [Command<ChangeProviderStatusCommand>]
    public ChangeProviderStatus? RecordOfflineProvider { get; set; }
    
    [Command<AppDbPeriodicTasksCommand>]
    public PeriodicTasks? PeriodicTasks { get; set; } 
    
    // Comfy Tasks
    
    [Command<CreateComfyGenerationTaskCommand>]
    public ComfyGenerationTask? CreateComfyGenerationTask { get; set; }
    
    [Command<CompleteComfyGenerationCommand>]
    public CompleteComfyGeneration? CompleteComfyGeneration { get; set; }
    
    [Command<FailComfyGenerationCommand>]
    public FailComfyGeneration? FailComfyGeneration { get; set; }
    
    [Command<ChangeComfyProviderStatusCommand>]
    public ChangeComfyProviderStatus? RecordOfflineComfyProvider { get; set; }
    
    [Command<RequestComfyGenerationTasksCommand>]
    public RequestComfyGenerationTasks? RequestComfyGenerationTasks { get; set; }
    
    [Command<ReserveComfyGenerationTaskCommand>]
    public ReserveComfyGenerationTask? ReserveComfyGenerationTask { get; set; }
    
    [Command<RequeueIncompleteComfyTasksCommand>]
    public RequeueIncompleteComfyTasks? RequeueIncompleteComfyTasks { get; set; }
    
    [Command<ResetFailedComfyTasksCommand>]
    public SelectedTasks? ResetFailedComfyTasks { get; set; }
    
    // Command to update Comfy model info
    [Command<UpdateComfyModelInfoCommand>]
    public UpdateComfyModelInfo? UpdateComfyModelInfo { get; set; }
}

[Tag(Tag.Tasks)]
[Restrict(RequestAttributes.MessageQueue), ExcludeMetadata]
public class QueueTasks : IReturn<EmptyResponse>
{
    [Command<DelegateComfyWorkflowTasksCommand>]
    public DelegateComfyWorkflowTasks? DelegateComfyTasks { get; set; }
}

[Tag(Tag.Tasks)]
[Restrict(RequestAttributes.MessageQueue), ExcludeMetadata]
public class NotificationTasks : IReturn<EmptyResponse>
{
    [Command<NotificationRequestCommand>]
    public NotificationRequest? NotificationRequest { get; set; }

    [Command<SendPendingNotificationsCommand>]
    public SendPendingNotifications? SendPendingNotifications { get; set; }
}

public class ExecuteTasks {}

[Tag(Tag.Tasks)]
[Restrict(RequestAttributes.MessageQueue), ExcludeMetadata]
public class ExecutorTasks : IReturn<EmptyResponse>
{
    [Command<ExecuteComfyGenerationTasksCommand>]
    public ExecuteTasks? ExecuteComfyGenerationTasks { get; set; }
    
    [Command<ExecutorPeriodicTasksCommand>]
    public PeriodicTasks? PeriodicTasks { get; set; } 
    
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
    public Task Any(QueueTasks request) => Request.ExecuteCommandsAsync(request);
    public Task Any(NotificationTasks request) => Request.ExecuteCommandsAsync(request);
    public Task Any(ExecutorTasks request) => Request.ExecuteCommandsAsync(request);
}
