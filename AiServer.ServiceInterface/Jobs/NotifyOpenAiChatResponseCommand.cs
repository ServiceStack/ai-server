using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.Jobs;

public class NotifyOpenAiChatResponseCommand(IHttpClientFactory clientFactory) : AsyncCommand<OpenAiChatResponse>
{
    protected override async Task RunAsync(OpenAiChatResponse request, CancellationToken token)
    {
        await clientFactory.SendJsonCallbackAsync(Request.GetBackgroundJob().ReplyTo!, request, token:token);
    }
}
