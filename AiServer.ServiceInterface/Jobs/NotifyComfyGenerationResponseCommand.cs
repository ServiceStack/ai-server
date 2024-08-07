using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class ComfyWorkflowCallback
{
    public ComfyWorkflowStatus Status { get; set; }
    public object Context { get; set; }
    
    public string? RefId { get; set; }
}

public class NotifyComfyGenerationResponseCommand: IAsyncCommand<ComfyWorkflowCallback>, IRequiresRequest
{
    public IRequest Request { get; set; }

    public async Task ExecuteAsync(ComfyWorkflowCallback request)
    {
        await HttpUtils.CreateClient().SendJsonCallbackAsync(Request.AssertBackgroundJob().ReplyTo!, request);
    }
}