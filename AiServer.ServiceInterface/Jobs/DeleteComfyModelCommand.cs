using System.Data;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.Jobs;

public class DeleteComfyModel
{
    public string Provider { get; set; }
    public string ModelFilename { get; set; }
}

public class DeleteComfyModelCommand(AppData appData, IDbConnection db) : IAsyncCommand<DeleteComfyModel>
{
    public async Task ExecuteAsync(DeleteComfyModel request)
    {
        var apiProvider = await db.SingleAsync<ComfyApiProvider>(x => x.Name == request.Provider);
        var provider = appData.GetComfyProvider(apiProvider);
        var client = provider.GetComfyClient(apiProvider);
        await client.DeleteModelAsync(request.ModelFilename);
    }
}