using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

[Tag(Tags.ComfyWorkflow)]
public class RequeueFailedComfyTasksCommand(ILogger<RequeueFailedComfyTasksCommand> log, 
    IDbConnectionFactory dbFactory, IMessageProducer mq) : IAsyncCommand<SelectedTasks>
{
    public long Requeued { get; set; }
    
    public async Task ExecuteAsync(SelectedTasks request)
    {
        using var monthDb = dbFactory.GetMonthDbConnection();
        var failedTasks = await monthDb.SelectAsync(monthDb.From<ComfyGenerationFailed>().Where(x => request.Ids.Contains(x.Id)));
        if (failedTasks.Count == 0)
            return;
        
        var requeuedTasks = failedTasks.Map(x =>
        {
            var to = x.ConvertTo<ComfyGenerationTask>();
            if (to.Response == null)
                x.CompletedDate = null;
            to.StartedDate = null;
            to.Error = null;
            to.ErrorCode = null;
            to.Retries = 0;
            return to;
        });

        Requeued = requeuedTasks.Count;
        
        using var db = dbFactory.OpenDbConnection();
        await db.InsertAllAsync(requeuedTasks);

        await monthDb.DeleteAsync(monthDb.From<ComfyGenerationFailed>().Where(x => request.Ids.Contains(x.Id)));
        
        log.LogInformation("Requeued {Requeued} failed tasks: {Ids}", Requeued, string.Join(", ", request.Ids));

        mq.Publish(new QueueTasks {
            DelegateComfyTasks = new()
        });
    }
}