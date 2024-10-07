using System.Data;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb;

public class ChangeMediaProviderStatus
{
    public string Name { get; set; }
    public DateTime? OfflineDate { get; set; }
}

[Tag(Tags.Database)]
[Worker(Workers.AppDb)]
public class ChangeMediaProviderStatusCommand(AppData appData, IDbConnection db) 
    : SyncCommand<ChangeMediaProviderStatus>
{
    protected override void Run(ChangeMediaProviderStatus request)
    {
        db.UpdateOnly(() => new MediaProvider
        {
            OfflineDate = request.OfflineDate,
        }, where: x => x.Name == request.Name);

        var apiProvider = appData.MediaProviders.FirstOrDefault(x => x.Name == request.Name);
        if (apiProvider != null)
            apiProvider.OfflineDate = request.OfflineDate;
    }
}
