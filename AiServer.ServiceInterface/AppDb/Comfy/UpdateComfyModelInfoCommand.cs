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
    
    public ComfyApiModelSettings? AddModelSettings { get; set; }
    
    public int? UseModelSettingsId { get; set; }
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
            // Check if already exists
            var existingModel = await db.SingleAsync<ComfyApiModel>(x => x.Name == request.CreateModel.Name);
            if (existingModel != null)
            {
                modelId = existingModel.Id;
                await db.UpdateAsync(request.CreateModel);
            }
            else
                modelId = (int)await db.InsertAsync(request.CreateModel, selectIdentity: true);
        }
        if (request.RelateProviderModel != null)
        {
            // Check if already related
            var existingRelation = await db.SingleAsync<ComfyApiProviderModel>(x =>
                x.ComfyApiModelId == request.RelateProviderModel.ComfyApiModelId &&
                x.ComfyApiProviderId == request.RelateProviderModel.ComfyApiProviderId);
            if (existingRelation == null)
                await db.InsertAsync(new ComfyApiProviderModel
                {
                    ComfyApiModelId = modelId ?? request.RelateProviderModel.ComfyApiModelId,
                    ComfyApiProviderId = request.RelateProviderModel.ComfyApiProviderId
                });
        }

        if (request.AddModelSettings != null)
        {
            // Check if already exists
            var existingSettings = await db.SingleAsync<ComfyApiModelSettings>(x =>
                x.ComfyApiModelId == request.AddModelSettings.ComfyApiModelId);
            if(existingSettings != null)
                await db.UpdateAsync(request.AddModelSettings);
            else if (modelId != null)
            {
                request.AddModelSettings.ComfyApiModelId = modelId.Value;
                await db.InsertAsync(request.AddModelSettings);
            }
        }

        if (request.UseModelSettingsId != null)
        {
            var exists = await db.SingleAsync<ComfyApiModelSettings>(x => x.Id == request.UseModelSettingsId);
            if (exists != null && modelId != null)
            {
                // Create a new entry using same details
                exists.ComfyApiModelId = modelId.Value;
                exists.Id = 0;
                await db.InsertAsync(exists);
            }
        }
    }
}