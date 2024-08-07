using System.Data;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class ChangeComfyProviderStatus
{
    public string Name { get; set; }
    public DateTime? OfflineDate { get; set; }
}

[Tag(Tags.Database)]
public class ChangeComfyProviderStatusCommand(AppData appData, IDbConnection db) : IAsyncCommand<ChangeComfyProviderStatus>
{
    public async Task ExecuteAsync(ChangeComfyProviderStatus request)
    {
        await db.UpdateOnlyAsync(() => new ComfyApiProvider {
            OfflineDate = request.OfflineDate,
        }, where:x => x.Name == request.Name);
        
        var apiProvider = appData.ComfyApiProviders.FirstOrDefault(x => x.Name == request.Name);
        if (apiProvider != null)
            apiProvider.OfflineDate = request.OfflineDate;
    }
}