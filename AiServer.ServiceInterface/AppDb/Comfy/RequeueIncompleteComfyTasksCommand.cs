using System.Data;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class RequeueIncompleteComfyTasks {}

[Tag(Tags.ComfyWorkflow)]
public class RequeueIncompleteComfyTasksCommand(IDbConnection db, IMessageProducer mq) : IAsyncCommand<RequeueIncompleteComfyTasks>
{
    public long Requeued { get; set; }
    
    public async Task ExecuteAsync(RequeueIncompleteComfyTasks request)
    {
        var threshold = DateTime.UtcNow.AddMinutes(-5);
        Requeued = await db.ExecuteSqlAsync(
            "UPDATE ComfyGenerationTask SET RequestId = NULL, StartedDate = NULL, Worker = NULL, WorkerIp = NULL WHERE CompletedDate IS NULL AND StartedDate < @threshold",
            new { threshold });
        
        mq.Publish(new QueueTasks {
            DelegateComfyTasks = new()
        });
        mq.Publish(new ExecutorTasks {
            ExecuteComfyGenerationTasks = new()
        });
    }
}