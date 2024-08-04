using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class NotifyOpenAiChatResponseCommand : IAsyncCommand<OpenAiChatResponse>, IRequiresRequest
{
    public IRequest Request { get; set; }

    public async Task ExecuteAsync(OpenAiChatResponse request)
    {
        await HttpUtils.CreateClient().SendJsonCallbackAsync(Request.AssertBackgroundJob().ReplyTo!, request);
    }
}
