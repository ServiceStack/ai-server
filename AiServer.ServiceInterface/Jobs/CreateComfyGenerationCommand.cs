using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class CreateComfyGenerationCommand(AppData appData, IBackgroundJobs jobs, ComfyProviderFactory comfyProviderFactory) 
    : IAsyncCommand<CreateComfyGeneration, ComfyWorkflowStatus>, IRequiresRequest
{
    public ComfyWorkflowStatus Result { get; set; }
    public IRequest Request { get; set; }
    
    public async Task ExecuteAsync(CreateComfyGeneration request)
    {
        var job = Request.AssertBackgroundJob();
        var apiProvider = appData.AssertComfyProvider(job.Worker!);
        var comfyProvider = comfyProviderFactory.GetComfyProvider(apiProvider.Name);
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        try
        {
            var (response, durationMs) = await comfyProvider.QueueWorkflow(apiProvider, request.Request);
            var status = await comfyProvider.GetComfyClient(apiProvider).GetWorkflowStatusAsync(response.PromptId);
            Result = status;

            if (job.ReplyTo != null)
            {
                jobs.EnqueueCommand<NotifyComfyGenerationResponseCommand>(new ComfyWorkflowCallback
                {
                    Status = status,
                    Context = request.Context,
                    RefId = job.RefId,
                }, new() {
                    ParentId = job.Id,
                    ReplyTo = job.ReplyTo
                });
            }
        }
        catch
        {
            if (!await comfyProvider.IsOnlineAsync(apiProvider))
            {
                jobs.ExecuteTransientCommand<ChangeComfyProviderStatusCommand>(new ChangeProviderStatus
                {
                    Name = apiProvider.Name,
                    OfflineDate = DateTime.UtcNow,
                }, new() { Worker = Databases.App });
            }
            throw;
        }
    }
}