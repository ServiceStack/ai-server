using System.Data;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

[Tag(Tags.ComfyWorkflow)]
public class CompleteComfyGenerationCommand(IDbConnection db) : IAsyncCommand<CompleteComfyGeneration>
{
    public async Task ExecuteAsync(CompleteComfyGeneration request)
    {
        await db.UpdateOnlyAsync(() => new ComfyGenerationTask()
        {
            Provider = request.Provider,
            DurationMs = request.DurationMs,
            Response = request.Response,
            CompletedDate = DateTime.UtcNow,
        }, where: x => x.Id == request.Id);
    }
}