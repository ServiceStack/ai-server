using System.Data;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;


public class ReserveComfyGenerationTask
{
    public string RequestId { get; set; }
    public string[] Models { get; set; }
    public string? Provider { get; set; }
    public int Take { get; set; }
}

[Tag(Tags.ComfyWorkflow)]
public class ReserveComfyGenerationTaskCommand(ILogger<ReserveComfyGenerationTaskCommand> log, IDbConnection db, IMessageProducer mq) 
    : IAsyncCommand<ReserveComfyGenerationTask>
{
    private static long counter;
    public static long Counter => Interlocked.Read(ref counter);
    
    public async Task ExecuteAsync(ReserveComfyGenerationTask request)
    {
        var rowsUpdated = await db.ReserveNextComfyGenerationTasksAsync(request.RequestId, request.Models, request.Provider, request.Take);
        if (rowsUpdated == 0)
        {
            log.LogWarning("Could not find {Take} available tasks for {Model} with {Provider} for Request {RequestId}", 
                request.Take, request.Models, request.Provider ?? "no provider", request.RequestId);
            return;
        }

        if (Interlocked.Increment(ref counter) % 10 == 0)
        {
            mq.Publish(new AppDbWrites {
                RequeueIncompleteComfyTasks = new RequeueIncompleteComfyTasks(),
            });
        }
    }
}