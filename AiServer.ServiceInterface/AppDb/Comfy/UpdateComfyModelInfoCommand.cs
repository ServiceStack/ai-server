using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class UpdateComfyModelInfo
{
    public ComfyApiModel? UpdateModel { get; set; }
    public ComfyApiProviderModel? RelateProviderModel { get; set; }
    public ComfyApiModel? CreateModel { get; set; }
}

public class UpdateComfyModelInfoCommand(IDbConnectionFactory dbFactory) : IAsyncCommand<UpdateComfyModelInfo>
{
    public async Task ExecuteAsync(UpdateComfyModelInfo request)
    {
        int? modelId = null;
        using var db = dbFactory.OpenDbConnection();
        if (request.UpdateModel != null)
        {
            await db.UpdateAsync(request.UpdateModel);
        }
        if (request.CreateModel != null)
        {
            modelId = (int)await db.InsertAsync(request.CreateModel, selectIdentity: true);
        }
        if (request.RelateProviderModel != null)
        {
            await db.InsertAsync(new ComfyApiProviderModel
            {
                ComfyApiModelId = modelId ?? request.RelateProviderModel.ComfyApiModelId,
                ComfyApiProviderId = request.RelateProviderModel.ComfyApiProviderId
            });
        }
        
    }
}