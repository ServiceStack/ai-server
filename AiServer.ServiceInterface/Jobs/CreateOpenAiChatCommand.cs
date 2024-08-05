using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class CreateOpenAiChatCommand(AppData appData, IBackgroundJobs jobs, AiProviderFactory aiFactory) 
    : IAsyncCommand<CreateOpenAiChat, OpenAiChatResponse>, IRequiresRequest
{
    public IRequest Request { get; set; }
    public OpenAiChatResponse Result { get; private set; }

    public async Task ExecuteAsync(CreateOpenAiChat request)
    {
        var job = Request.AssertBackgroundJob();
        var apiProvider = appData.AssertApiProvider(job.Worker!);
        var chatProvider = aiFactory.GetOpenAiProvider(apiProvider.ApiType.OpenAiProvider);

        try
        {
            var (response, durationMs) = await chatProvider.ChatAsync(apiProvider, request.Request);
            Result = response;

            if (job.ReplyTo != null)
            {
                jobs.EnqueueCommand<NotifyOpenAiChatResponseCommand>(response, new() {
                    ParentId = job.Id,
                    ReplyTo = job.ReplyTo,
                });
            }
            return;
        }
        catch
        {
            if (!await chatProvider.IsOnlineAsync(apiProvider))
            {
                jobs.ExecuteTransientCommand<ChangeProviderStatusCommand>(new ChangeProviderStatus
                {
                    Name = apiProvider.Name,
                    OfflineDate = DateTime.UtcNow,
                }, new() { Worker = Databases.App });
            }
            throw;
        }
    }
}
