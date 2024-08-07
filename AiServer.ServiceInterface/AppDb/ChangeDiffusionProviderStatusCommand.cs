using System.Data;
using AiServer.ServiceInterface.Replicate;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface.AppDb;

using System;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;

public class ChangeDiffusionProviderStatus
{
    public string Name { get; set; }
    public DateTime? OfflineDate { get; set; }
}

[Tag(Tags.Database)]
public class ChangeDiffusionProviderStatusCommand(AppData appData, IDbConnection db) : IAsyncCommand<ChangeDiffusionProviderStatus>
{
    public async Task ExecuteAsync(ChangeDiffusionProviderStatus request)
    {
        await db.UpdateOnlyAsync(() => new DiffusionApiProvider
        {
            OfflineDate = request.OfflineDate,
        }, where: x => x.Name == request.Name);

        var apiProvider = appData.DiffusionApiProviders.FirstOrDefault(x => x.Name == request.Name);
        if (apiProvider != null)
            apiProvider.OfflineDate = request.OfflineDate;
    }
}