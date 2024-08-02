using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Executor;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.Queue;

public class DelegateComfyWorkflowTasks {}

[Tag(Tags.ComfyWorkflow)]
public class DelegateComfyWorkflowTasksCommand(ILogger<DelegateComfyWorkflowTasksCommand> log, AppData appData, 
    IDbConnectionFactory dbFactory, IMessageProducer mq) : IAsyncCommand<DelegateComfyWorkflowTasks>
{
    public long CheckIntervalSeconds { get; set; } = 10;
    
    private static long running = 0;
    public static bool Running => Interlocked.Read(ref running) > 0;
    
    private static long counter = 0;
    
    public int DelegatedCount { get; set; }
    
    public async Task ExecuteAsync(DelegateComfyWorkflowTasks request)
    {
        if (Running)
            return;
        
        var activeWorkerModels = appData.GetActiveComfyWorkerModels();
        using var db = await dbFactory.OpenDbConnectionAsync();
        if (!await db.ExistsAsync(db.From<ComfyGenerationTask>().Where(x => 
                x.RequestId == null && x.StartedDate == null && x.CompletedDate == null && activeWorkerModels.Contains(x.Model))))
        {
            return;
        }

        try
        {
            Interlocked.Increment(ref running);

            while (true)
            {
                foreach (var apiWorker in appData.GetActiveComfyWorkers())
                {
                    if (appData.IsStopped)
                        return;
                
                    // Don't assign more work to provider until their work queue is empty
                    if (apiWorker.WorkflowQueueCount > 0)
                        continue;
                    
                    var requestId = appData.CreateRequestId();
                    var models = apiWorker.Models;
                    // Worker might not have models
                    if (models == null || models.Length == 0)
                    {
                        log.LogWarning("[Comfy][{Provider}] {Counter}: No models found for worker, skipping...", apiWorker.Name, ++counter);
                        continue;
                    }
                    var pendingTasks = await db.ReserveNextComfyGenerationTasksAsync(
                        requestId: requestId,
                        models: models,
                        provider: apiWorker.Name,
                        take: apiWorker.Concurrency);

                    DelegatedCount += pendingTasks;
                    if (pendingTasks > 0)
                    {
                        log.LogDebug("[Comfy][{Provider}] {Counter}: Reserved and delegating {PendingTasks} tasks with Id {RequestId}",
                            apiWorker.Name, ++counter, pendingTasks, requestId);
                        apiWorker.AddToQueue(requestId);
                    }
                }

                if (appData.IsStopped)
                    return;
                
                if (!ExecuteComfyGenerationTasksCommand.Running)
                {
                    var hasWorkQueued = appData.HasAnyComfyTasksQueued();
                    if (hasWorkQueued)
                    {
                        mq.Publish(new ExecutorTasks {
                            ExecuteComfyGenerationTasks = new()
                        });
                    }
                }
                
                var hasMoreTasksToDelegate = await db.ExistsAsync(db.From<ComfyGenerationTask>()
                    .Where(x => x.RequestId == null && x.StartedDate == null && x.CompletedDate == null && activeWorkerModels.Contains(x.Model)));
                if (!hasMoreTasksToDelegate)
                {
                    log.LogInformation("[Comfy] All tasks have been delegated, exiting...");
                    return;
                }
                
                if (appData.IsStopped)
                    return;
                
                // Give time for workers to complete their tasks before trying to delegate more work to them
                log.LogInformation("[Comfy] Waiting {WaitSeconds} seconds before delegating more tasks...", CheckIntervalSeconds);
                await Task.Delay(TimeSpan.FromSeconds(CheckIntervalSeconds));
            }
        }
        catch (TaskCanceledException)
        {
            log.LogInformation("[Comfy] Delegating tasks was cancelled, exiting...");
        }
        finally
        {
            Interlocked.Decrement(ref running);
        }
    }
}