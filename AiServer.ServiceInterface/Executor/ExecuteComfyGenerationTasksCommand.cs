using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;

namespace AiServer.ServiceInterface.Executor;

public class ExecuteComfyTasks {}

public class ExecuteComfyGenerationTasksCommand(ILogger<ExecuteComfyGenerationTasksCommand> log, AppData appData, 
    IDbConnectionFactory dbFactory, IMessageProducer mq) 
    : IAsyncCommand<ExecuteComfyTasks>
{
    private static long running = 0;
    public static bool Running => Interlocked.Read(ref running) > 0;
    private static long counter = 0;

    public static bool ShouldContinueRunning => Running && AppData.Instance.HasAnyComfyTasksQueued();
    
    public async Task ExecuteAsync(ExecuteComfyTasks request)
    {
        if (Interlocked.CompareExchange(ref running, 1, 0) == 0)
        {
            try
            {
                while (true)
                {
                    if (appData.IsStopped)
                        return;
                
                    var pendingTasks = appData.ComfyTasksQueuedCount();
                    log.LogInformation("[Comfy] Executing {QueuedCount} queued tasks...", pendingTasks);

                    var runningTasks = new List<Task>();

                    foreach (var worker in appData.GetActiveComfyWorkers())
                    {
                        if (appData.IsStopped)
                            return;
                
                        if (worker.IsOffline) 
                            continue;

                        log.LogInformation("[Comfy][{Provider}] {Counter} Executing {Count} Tasks",
                            worker.Name, ++counter, worker.WorkflowQueueCount);
                        runningTasks.Add(worker.ExecuteTasksAsync(log, dbFactory, mq));
                    }

                    await Task.WhenAll(runningTasks);

                    if (!appData.HasAnyComfyTasksQueued())
                    {
                        log.LogInformation("[Comfy] No more queued tasks left to execute, exiting...");
                        break;
                    }
                }
            }
            catch (TaskCanceledException)
            {
                log.LogInformation("[Comfy] Executing tasks was cancelled, exiting...");
            }
            catch (Exception ex)
            {
                log.LogError(ex, "[Comfy] Error executing tasks, exiting...");
            }
            finally
            {
                Interlocked.Decrement(ref running);
            }
        }
    }
}
