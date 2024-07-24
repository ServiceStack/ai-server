using System.Data;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class ResetComfyTaskQueue {}

[Tag(Tags.OpenAiChat)]
public class ResetComfyTaskQueueCommand(IDbConnection db, IMessageProducer mq) : IAsyncCommand<ResetComfyTaskQueue>
{
    public long Reset { get; set; }
    
    public async Task ExecuteAsync(ResetComfyTaskQueue request)
    {
        Reset = await db.ExecuteSqlAsync(
            "UPDATE ComfyGenerationTask SET RequestId = NULL, StartedDate = NULL, Worker = NULL, WorkerIp = NULL WHERE CompletedDate IS NULL");
        
        mq.Publish(new QueueTasks {
            DelegateComfyTasks = new()
        });
        mq.Publish(new ExecutorTasks {
            ExecuteComfyGenerationTasks = new()
        });
    }
}