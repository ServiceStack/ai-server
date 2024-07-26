using System.Data;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class ResetFailedComfyTasksCommand(ILogger<ResetFailedComfyTasksCommand> log, IDbConnection db, IMessageProducer mq) 
    : IAsyncCommand<SelectedTasks>
{
    public long Reset { get; set; }
    
    public async Task ExecuteAsync(SelectedTasks request)
    {
        if (request.Ids is { Count: > 0 })
        {
            Reset += await db.ExecuteSqlAsync(
                "UPDATE ComfyGenerationTask SET RequestId = NULL, StartedDate = NULL, Worker = NULL, WorkerIp = NULL, ErrorCode = NULL, Error = NULL, Retries = 0 WHERE CompletedDate IS NULL AND Id IN (@ids)",
                new { ids = request.Ids });
        }
        else
        {
            Reset += await db.ExecuteSqlAsync(
                "UPDATE ComfyGenerationTask SET RequestId = NULL, StartedDate = NULL, Worker = NULL, WorkerIp = NULL, ErrorCode = NULL, Error = NULL, Retries = 0 WHERE CompletedDate IS NULL");
        }
    }
}