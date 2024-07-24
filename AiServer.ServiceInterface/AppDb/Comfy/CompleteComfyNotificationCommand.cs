using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class CompleteComfyNotification
{
    public ComfyTaskType Type { get; set; }
    public long Id { get; set; }
    public DateTime? CompletedDate { get; set; }
    public ResponseStatus? Error { get; set; }
}


public class CompleteComfyNotificationCommand(ILogger<CompleteComfyNotificationCommand> log, 
    IDbConnectionFactory dbFactory,
    IComfyClient comfyClient) : IAsyncCommand<CompleteComfyNotification>
{
    public async Task ExecuteAsync(CompleteComfyNotification request)
    {
        using var db = dbFactory.OpenDbConnection();
        if (request.Type == ComfyTaskType.TextToImage)
        {
            var task = await db.SingleByIdAsync<ComfyGenerationTask>(request.Id);
            if (task == null)
            {
                log.LogWarning("Task {Id} does not exist", request.Id);
                return;
            }
            
            if (task.Response == null)
            {
                log.LogWarning("Task {Id} has no response", request.Id);
                return;
            }
            
            if (string.IsNullOrEmpty(task.Response.PromptId))
            {
                log.LogWarning("Task {Id} has no promptId", request.Id);
                return;
            }

            var succeeded = request.Error == null;
            if (succeeded)
            {
                await db.UpdateOnlyAsync(() => new ComfyGenerationTask
                {
                    NotificationDate = request.CompletedDate,
                }, where: x => x.Id == request.Id);
            }
            else
            {
                task.Error = request.Error;
                task.ErrorCode = request.Error!.ErrorCode; 
                await db.UpdateOnlyAsync(() => new ComfyGenerationTask
                {
                    Error = request.Error,
                    ErrorCode = task.ErrorCode,
                }, where: x => x.Id == request.Id);
            }

            var monthDbName = dbFactory.GetNamedMonthDb(task.CreatedDate);
            using var dbMonth = HostContext.AppHost.GetDbConnection(monthDbName);

            if (succeeded)
            {
                var status = await comfyClient.GetWorkflowStatusAsync(task.Response.PromptId);
                var completedTask = task.ToComfyGenerationCompleted(status);
                await db.UpdateOnlyAsync(() => new ComfySummary() {
                    Type = ComfyTaskType.TextToImage,
                    Model = task.Model,
                    Provider = task.Provider,
                    DurationMs = task.DurationMs,
                    Tag = task.Tag,
                    RefId = task.RefId,
                    CreatedDate = task.CreatedDate,
                }, x => x.Id == task.Id);
                await dbMonth.InsertAsync(completedTask);
            }
            else
            {
                var failedTask = task.ToComfyGenerationFailed();
                await dbMonth.InsertAsync(failedTask);
            }
            
            await db.DeleteByIdAsync<ComfyGenerationTask>(request.Id);
        }
    }
}

