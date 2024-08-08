using System.Data;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class ComfyWorkflowCallback
{
    public ComfyWorkflowStatus Status { get; set; }
    public object Context { get; set; }
    
    public string? RefId { get; set; }
}

public class NotifyComfyGenerationResponseCommand(IDbConnection db): IAsyncCommand<ComfyWorkflowCallback>, IRequiresRequest
{
    public IRequest Request { get; set; }

    public async Task ExecuteAsync(ComfyWorkflowCallback request)
    {
        var job = Request.AssertBackgroundJob();
        while (true)
        {
            await db.SingleAsync<JobSummary>(x => x.Id == job.ParentId);
            if (job.State == BackgroundJobState.Completed || job.State == BackgroundJobState.Failed)
                break;
        }
        await HttpUtils.CreateClient().SendJsonCallbackAsync(Request.AssertBackgroundJob().ReplyTo!, request);
    }
}