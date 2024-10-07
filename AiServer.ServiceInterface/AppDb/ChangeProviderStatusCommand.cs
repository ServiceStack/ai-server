using System.Data;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb;

public class ChangeProviderStatus
{
    public string Name { get; set; }
    public DateTime? OfflineDate { get; set; }
}

[Tag(Tags.Database)]
[Worker(Workers.AppDb)]
public class ChangeProviderStatusCommand(ILogger<ChangeProviderStatusCommand> log, AppData appData, IDbConnection db) 
    : SyncCommand<ChangeProviderStatus>
{
    protected override void Run(ChangeProviderStatus request)
    {
        var apiProvider = appData.AiProviders.FirstOrDefault(x => x.Name == request.Name);
        if (apiProvider != null)
            apiProvider.OfflineDate = request.OfflineDate;

        db.UpdateOnly(() => new AiProvider {
            OfflineDate = request.OfflineDate,
        }, where:x => x.Name == request.Name);

        if (request.OfflineDate != null)
        {
            log.LogError("[{Name}] has been taken offline", request.Name);
        }
        else
        {
            log.LogInformation("[{Name}] is back online", request.Name);
        }
    }
}
