using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class NotifyComfyGenerationResponseCommand: IAsyncCommand<ComfyWorkflowResponse>, IRequiresRequest
{
    public IRequest Request { get; set; }

    public async Task ExecuteAsync(ComfyWorkflowResponse request)
    {
        await HttpUtils.CreateClient().SendJsonCallbackAsync(Request.AssertBackgroundJob().ReplyTo!, request);
    }
}