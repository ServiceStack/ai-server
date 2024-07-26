using System.Data;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

[Tag(Tags.ComfyWorkflow)]
public class FailComfyGenerationCommand(IDbConnectionFactory dbFactory) : IAsyncCommand<FailComfyGeneration>
{
    public async Task ExecuteAsync(FailComfyGeneration request)
    {
        using var db = dbFactory.OpenDbConnection();
        var error = request.Error;
        await db.UpdateAddAsync(() => new ComfyGenerationTask()
        {
            Provider = request.Provider,
            ErrorCode = error.ErrorCode,
            Error = error,
            Retries = 1,
        }, where: x => x.Id == request.Id);
        
        var task = await db.SingleByIdAsync<ComfyGenerationTask>(request.Id);
        if (task.Retries >= 3)
        {
            using var dbMonth = dbFactory.GetMonthDbConnection(task.CreatedDate);
            await dbMonth.InsertAsync(task.ToComfyGenerationFailed());
            
            await db.DeleteByIdAsync<ComfyGenerationTask>(request.Id);
        }
    }
}