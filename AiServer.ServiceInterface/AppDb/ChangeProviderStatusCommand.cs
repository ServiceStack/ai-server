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
public class ChangeProviderStatusCommand(ILogger<ChangeProviderStatusCommand> log,
    AppData appData, IDbConnection db) : IAsyncCommand<ChangeProviderStatus>
{
    public async Task ExecuteAsync(ChangeProviderStatus request)
    {
        var apiProvider = appData.ApiProviders.FirstOrDefault(x => x.Name == request.Name);
        if (apiProvider != null)
            apiProvider.OfflineDate = request.OfflineDate;

        await db.UpdateOnlyAsync(() => new ApiProvider {
            OfflineDate = request.OfflineDate,
        }, where:x => x.Name == request.Name);

        if (request.OfflineDate != null)
        {
            log.LogError("[{Name}] has been taken offline", request.Name);
        }
        else
        {
            log.LogError("[{Name}] is back online", request.Name);
        }
    }
}
