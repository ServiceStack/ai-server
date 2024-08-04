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

        Exception? lastEx = null;
        var i = 0;
        while (i++ < 3)
        {
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
            catch (Exception ex)
            {
                lastEx = ex;
                jobs.UpdateJobStatus(new(job, Status:$"Attempt {i} Failed", Log:ex.Message));
                if (!await chatProvider.IsOnlineAsync(apiProvider))
                {
                    jobs.ExecuteTransientCommand<ChangeProviderStatusCommand>(new ChangeProviderStatus
                    {
                        Name = apiProvider.Name,
                        OfflineDate = DateTime.UtcNow,
                    }, new() { Worker = Databases.App });
                    throw;
                }
            }
        }
        throw lastEx ?? new Exception($"Failed to execute {apiProvider.Name} OpenAiChat for {request.Request.Model}");
    }
}
