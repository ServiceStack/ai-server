using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb;

public class CompleteNotification
{
    public TaskType Type { get; set; }
    public long Id { get; set; }
    public DateTime? CompletedDate { get; set; }
    public ResponseStatus? Error { get; set; }
}

[Tag(Tags.OpenAiChat)]
public class CompleteNotificationCommand(
    ILogger<CompleteNotificationCommand> log, 
    IDbConnectionFactory dbFactory) : IAsyncCommand<CompleteNotification>
{
    public async Task ExecuteAsync(CompleteNotification request)
    {
        using var db = dbFactory.OpenDbConnection();
        if (request.Type == TaskType.OpenAiChat)
        {
            var task = await db.SingleByIdAsync<OpenAiChatTask>(request.Id);
            if (task == null)
            {
                log.LogWarning("Task {Id} does not exist", request.Id);
                return;
            }

            var succeeded = request.Error == null;
            if (succeeded)
            {
                await db.UpdateOnlyAsync(() => new OpenAiChatTask
                {
                    NotificationDate = request.CompletedDate,
                }, where: x => x.Id == request.Id);
            }
            else
            {
                task.Error = request.Error;
                task.ErrorCode = request.Error!.ErrorCode; 
                await db.UpdateOnlyAsync(() => new OpenAiChatTask
                {
                    Error = request.Error,
                    ErrorCode = task.ErrorCode,
                }, where: x => x.Id == request.Id);
            }

            await dbFactory.CompleteOpenAiChatAsync(db, task);
        }
        
        if (request.Type == TaskType.Comfy)
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

            var worker = AppData.Instance.GetActiveComfyWorkers()
                .Where(x => x.Name == task.Worker);
            var comfyProviderWorkers = worker.ToList();
            if (!comfyProviderWorkers.Any())
            {
                log.LogWarning("Task {Id} has no worker", request.Id);
                return;
            }

            var comfyClient = comfyProviderWorkers.First().GetComfyClient();

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

public static class CompleteUtils
{
    public static async Task CompleteOpenAiChatAsync(this IDbConnectionFactory dbFactory, IDbConnection db, OpenAiChatTask task)
    {
        var monthDbName = dbFactory.GetNamedMonthDb(task.CreatedDate);
        using var dbMonth = HostContext.AppHost.GetDbConnection(monthDbName);

        var succeeded = task.Error == null;
        if (succeeded)
        {
            var completedTask = task.ToOpenAiChatCompleted();
            var openAiUsage = task.Response?.Usage;
            var promptTokens = openAiUsage?.PromptTokens ?? 0;
            var completionTokens = openAiUsage?.CompletionTokens ?? 0;
            await db.UpdateOnlyAsync(() => new TaskSummary {
                Type = TaskType.OpenAiChat,
                Model = task.Model,
                PromptTokens = promptTokens, 
                CompletionTokens = completionTokens,
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
            var failedTask = task.ToOpenAiChatFailed();
            await dbMonth.InsertAsync(failedTask);
        }
            
        await db.DeleteByIdAsync<OpenAiChatTask>(task.Id);
    }
    
}