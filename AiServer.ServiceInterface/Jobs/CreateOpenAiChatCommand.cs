using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.Jobs;

public class CreateOpenAiChatCommand(ILogger<CreateOpenAiChatCommand> logger, IBackgroundJobs jobs, AppData appData, AiProviderFactory aiFactory) 
    : AsyncCommandWithResult<QueueOpenAiChatCompletion, OpenAiChatResponse>
{
    protected override async Task<OpenAiChatResponse> RunAsync(QueueOpenAiChatCompletion request, CancellationToken token)
    {
        var job = Request.GetBackgroundJob();
        var log = Request.CreateJobLogger(jobs,logger);
        var apiProvider = appData.AssertAiProvider(job.Worker!);
        var chatProvider = aiFactory.GetOpenAiProvider(apiProvider.AiType.Provider);

        try
        {
            var origModel = request.Request.Model;
            request.Request.Model = appData.GetQualifiedModel(origModel) ?? origModel;
            log.LogInformation("CHAT OpenAi #{JobId} request for {OriginalModel}, using {Model}", job.Id, origModel, request.Request.Model);
            var (response, durationMs) = await chatProvider.ChatAsync(apiProvider, request.Request, token);
            request.Request.Model = origModel;

            job.DurationMs = durationMs;
            jobs.RunCommand<CompleteOpenAiChatCommand>(
                new CompleteOpenAiChat(Request: request, Response: response, Job: job));

            log.LogInformation("CHAT OpenAi #{JobId} request finished in {Ms} ms{ReplyMessage}", 
                job.Id, job.DurationMs, job.ReplyTo == null ? "" : $", sending response to {job.ReplyTo}");
            if (job.ReplyTo != null)
            {
                jobs.EnqueueCommand<NotifyOpenAiChatResponseCommand>(response, new() {
                    ParentId = job.Id,
                    ReplyTo = job.ReplyTo,
                });
            }
            return response;
        }
        catch(Exception e)
        {
            var offline = !await chatProvider.IsOnlineAsync(apiProvider, token);
            log.LogError("CHAT OpenAi #{JobId} request failed after {Ms} with: {Message} (offline:{Offline})", 
                job.Id, job.DurationMs, e.Message, offline);
            if (offline)
            {
                jobs.RunCommand<ChangeProviderStatusCommand>(new ChangeProviderStatus {
                    Name = apiProvider.Name,
                    OfflineDate = DateTime.UtcNow,
                });
            }
            throw;
        }
    }
}
