using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.Replicate;
using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class CreateDiffusionGenerationCommand(AppData appData, IBackgroundJobs jobs, DiffusionApiProviderFactory providerFactory) : IAsyncCommand<CreateDiffusionGeneration, DiffusionGenerationResponse>, IRequiresRequest
{
    public DiffusionGenerationResponse Result { get; set; }
    public IRequest Request { get; set; }

    public async Task ExecuteAsync(CreateDiffusionGeneration request)
    {
        var job = Request.AssertBackgroundJob();
        var apiProvider = appData.AssertDiffusionProvider(job.Worker!);
        var diffusionProvider = providerFactory.GetProvider(apiProvider.Name);
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));

        try
        {
            var (response, durationMs) = await diffusionProvider.QueueAsync(apiProvider, request.Request);
            Result = response;

            if (job.ReplyTo != null)
            {
                jobs.EnqueueCommand<NotifyDiffusionGenerationResponseCommand>(new DiffusionGenerationCallback
                {
                    Response = response,
                    Context = request,
                    RefId = job.RefId,
                }, new() {
                    ParentId = job.Id,
                    ReplyTo = job.ReplyTo,
                    Worker = job.Worker
                });
            }
        }
        catch
        {
            if (!await diffusionProvider.IsOnlineAsync(apiProvider))
            {
                jobs.ExecuteTransientCommand<ChangeDiffusionProviderStatusCommand>(new ChangeProviderStatus
                {
                    Name = apiProvider.Name,
                    OfflineDate = DateTime.UtcNow,
                }, new() { Worker = Databases.App });
            }
            throw;
        }
    }
}