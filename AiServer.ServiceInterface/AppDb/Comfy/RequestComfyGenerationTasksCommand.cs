using System.Data;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb.Comfy;

public class RequestComfyGenerationTasks
{
    public string Provider { get; set; }
    public int Count { get; set; }
}


public class RequestComfyGenerationTasksCommand(ILogger<RequestComfyGenerationTasks> log, AppData appData, IDbConnectionFactory dbFactory) 
    : IAsyncCommand<RequestComfyGenerationTasks>
{
    public async Task ExecuteAsync(RequestComfyGenerationTasks request)
    {
        var worker = appData.ComfyProviderWorkers.FirstOrDefault(x => x.Name == request.Provider) 
                     ?? throw new ArgumentNullException(nameof(request.Provider));

        using var db = await dbFactory.OpenDbConnectionAsync();

        var assigned = 0; 
        for (int i = 0; i < request.Count; i++)
        {
            var requestId = appData.CreateRequestId();
            var rowsUpdated = await db.ReserveNextComfyGenerationTasksAsync(requestId, worker.Models, worker.Name, worker.Concurrency);
            if (rowsUpdated == 0)
            {
                log.LogInformation("[{Provider}] No tasks available to reserve for Models {Models} at Concurrency {Concurrency}, exiting...", 
                    worker.Name, string.Join(",", worker.Models), worker.Concurrency);
                return;
            }
            
            assigned += rowsUpdated;
            worker.AddToChatQueue(requestId);
        }

        log.LogInformation("[{Provider}] Assigned {Assigned} tasks", worker.Name, assigned);
    }
}

public static class ReserveComfyGenerationTaskCommandExtensions
{
    public static async Task<int> ReserveNextComfyGenerationTasksAsync(this IDbConnection db, 
        string requestId, string[] models, string? provider=null, int take=1, string? workerIp = null)
    {
        var startedDate = DateTime.UtcNow;
        var sql = """
                  UPDATE ComfyGenerationTask SET RequestId = @requestId, StartedDate = @startedDate, Worker = @provider, WorkerIp = @workerIp
                  WHERE Id IN
                      (SELECT Id
                        FROM ComfyGenerationTask
                        WHERE RequestId IS NULL AND StartedDate IS NULL AND CompletedDate IS NULL
                        AND Model IN (@models)
                        AND (Provider IS NULL OR Provider = @provider)
                        ORDER BY Id
                        LIMIT @take)
                  """;

        var rowsUpdated = await db.ExecuteSqlAsync(sql,
            new { requestId, startedDate, models, provider, take, workerIp });
        return rowsUpdated;
    }
}