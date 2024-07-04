using System.Data;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class CreateComfyGenerationTaskCommand(ILogger<CreateComfyGenerationTaskCommand> log, IDbConnection db) 
    : IAsyncCommand<ComfyGenerationTask>
{
    public async Task ExecuteAsync(ComfyGenerationTask request)
    {
        request.CreatedDate = DateTime.UtcNow;
        request.RefId ??= Guid.NewGuid().ToString("N");

        using var dbTrans = db.OpenTransaction();
        await db.InsertAsync(request);
        await db.InsertAsync(new ComfyTaskSummary
        {
            Id = request.Id,
            Type = request.TaskType,
            Model = request.Model,
            Provider = request.Provider,
            RefId = request.RefId,
            Tag = request.Model,
            CreatedDate = request.CreatedDate,
        });
        dbTrans.Commit();
    }
}