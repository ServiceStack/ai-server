using AiServer.ServiceInterface.Replicate;
using AiServer.ServiceModel;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

using System.Threading.Tasks;
using ServiceStack;

public class DiffusionGenerationCallback
{
    public DiffusionGenerationResponse Response { get; set; }
    public object Context { get; set; }
    public string? RefId { get; set; }
}

public class NotifyDiffusionGenerationResponseCommand : IAsyncCommand<DiffusionGenerationCallback>, IRequiresRequest
{
    public IRequest Request { get; set; }

    public async Task ExecuteAsync(DiffusionGenerationCallback request)
    {
        await HttpUtils.CreateClient().SendJsonCallbackAsync(Request.AssertBackgroundJob().ReplyTo!, request);
    }
}