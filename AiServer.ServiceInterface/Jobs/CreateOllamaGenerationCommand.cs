using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.Jobs;

public class CreateOllamaGenerationCommand(ILogger<CreateOllamaGenerationCommand> logger, IBackgroundJobs jobs, AppData appData, AiProviderFactory aiFactory, IHttpClientFactory clientFactory) 
    : AsyncCommandWithResult<QueueOllamaGeneration, OllamaGenerateResponse>
{
    protected override async Task<OllamaGenerateResponse> RunAsync(QueueOllamaGeneration request, CancellationToken token)
    {
        var job = Request.GetBackgroundJob();
        var log = Request.CreateJobLogger(jobs,logger);
        var apiProvider = appData.AssertAiProvider(job.Worker!);
        var chatProvider = aiFactory.GetOpenAiProvider(apiProvider.AiType.Provider);
        if (chatProvider is not IOllamaAiProvider generateProvider)
            throw new NotSupportedException($"{chatProvider.GetType()} is not an IOllamaAiProvider");

        try
        {
            var origModel = request.Request.Model;
            request.Request.Model = appData.GetQualifiedModel(origModel) ?? origModel;
            log.LogInformation("GENERATE Ollama #{JobId} request for {OriginalModel}, using {Model}", job.Id, origModel, request.Request.Model);
            var (response, durationMs) = await generateProvider.GenerateAsync(apiProvider, request.Request, token);
            request.Request.Model = origModel;

            job.DurationMs = durationMs;
            jobs.RunCommand<CompleteOllamaGenerateCommand>(
                new CompleteOllamaGenerate(Request: request, Response: response, Job: job));

            log.LogInformation("GENERATE Ollama #{JobId} request finished in {Ms} ms{ReplyMessage}", 
                job.Id, job.DurationMs, job.ReplyTo == null ? "" : $", sending response to {job.ReplyTo}");
            if (job.ReplyTo != null)
            {
                await clientFactory.SendJsonCallbackAsync(Request.GetBackgroundJob().ReplyTo!, request, token:token);
                // jobs.EnqueueCommand<NotifyOpenAiChatResponseCommand>(response, new() {
                //     ParentId = job.Id,
                //     ReplyTo = job.ReplyTo,
                // });
            }
            return response;
        }
        catch (Exception e)
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
