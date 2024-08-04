// using System.Collections.Concurrent;
// using AiServer.ServiceModel;
// using AiServer.ServiceModel.Types;
// using Microsoft.Extensions.Logging;
// using ServiceStack;
// using ServiceStack.Data;
// using ServiceStack.Messaging;
// using ServiceStack.OrmLite;
//
// namespace AiServer.ServiceInterface;
//
// public interface IApiProviderWorker : IDisposable
// {
//     string Name { get; }
//     string? ApiKey { get; }
//     string? HeartbeatUrl { get; }
//     string GetApiEndpointUrlFor(TaskType taskType);
//     string GetPreferredApiModel();
//     string GetApiModel(string model);
// }
//
// public class ApiProviderWorker : IApiProviderWorker
// {
//     public int Id => apiProvider.Id;
//     public string Name => apiProvider.Name;
//     public readonly string[] Models;
//
//     // Can be modified at runtime
//     public int Concurrency => apiProvider.Concurrency;
//     public int Priority => apiProvider.Priority;
//     public string? ApiKey => apiProvider.ApiKey;
//     public string? HeartbeatUrl => GetHeartbeatUrl(apiProvider);
//     public bool Enabled => apiProvider.Enabled;
//     public int ChatQueueCount => isDisposed ? 0 : ChatQueue.Count;
//     
//     private BlockingCollection<string> ChatQueue { get; } = new();
//     private readonly CancellationToken token;
//
//     private bool isDisposed;
//     private long received = 0;
//     private long completed = 0;
//     private long retries = 0;
//     private long failed = 0;
//     private long running = 0;
//     private long done = 0;
//     private readonly ApiProvider apiProvider;
//     private readonly AiProviderFactory aiFactory;
//     private Func<bool> anyTasksRemaining;
//     private DateTime lastChatExecuted = DateTime.UtcNow;
//
//     public ApiProviderWorker(ApiProvider apiProvider, AiProviderFactory aiFactory, Func<bool>? anyTasksRemaining = null, CancellationToken token = default)
//     {
//         this.apiProvider = apiProvider;
//         this.aiFactory = aiFactory;
//         this.anyTasksRemaining = anyTasksRemaining ?? (() => false);
//         this.token = token;
//         Models = apiProvider.Models.Select(x => x.Model).ToArray();
//     }
//     
//     public bool IsRunning => Interlocked.Read(ref running) > 0;
//
//     public void Update(UpdateApiProvider request)
//     {
//         if (request.ApiKey != null)
//             apiProvider.ApiKey = request.ApiKey;
//         if (request.ApiBaseUrl != null)
//             apiProvider.ApiBaseUrl = request.ApiBaseUrl;
//         if (request.HeartbeatUrl != null)
//             apiProvider.HeartbeatUrl = request.HeartbeatUrl;
//         if (request.Concurrency != null)
//             apiProvider.Concurrency = request.Concurrency.Value;
//         if (request.Priority != null)
//             apiProvider.Priority = request.Priority.Value;
//         if (request.Enabled != null)
//             apiProvider.Enabled = request.Enabled.Value;
//     }
//
//     public bool IsOffline
//     {
//         get => apiProvider.OfflineDate != null;
//         set => apiProvider.OfflineDate = value ? DateTime.UtcNow : null;
//     }
//
//     private static string? GetHeartbeatUrl(ApiProvider apiProvider)
//     {
//         var heartbeatUrl = apiProvider.HeartbeatUrl;
//         if (heartbeatUrl == null)
//         {
//             heartbeatUrl = apiProvider.ApiType?.HeartbeatUrl;
//             if (heartbeatUrl != null && heartbeatUrl.StartsWith('/'))
//                 return apiProvider.ApiBaseUrl.CombineWith(heartbeatUrl);
//         }
//
//         return heartbeatUrl;
//     }
//
//     public void AddToChatQueue(string requestId)
//     {
//         ChatQueue.Add(requestId, token);
//         Interlocked.Increment(ref received);
//     }
//
//     public IOpenAiProvider GetOpenAiProvider() => aiFactory.GetOpenAiProvider(apiProvider.ApiType?.OpenAiProvider);
//
//     public string GetApiEndpointUrlFor(TaskType taskType)
//     {
//         var apiBaseUrl = apiProvider.ApiBaseUrl ?? apiProvider.ApiType?.ApiBaseUrl
//             ?? throw new NotSupportedException($"[{Name}] No ApiBaseUrl found in ApiProvider or ApiType");
//         var chatPath = apiProvider.TaskPaths?.TryGetValue(taskType, out var path) == true ? path : null;
//         if (chatPath == null)
//             apiProvider.ApiType?.TaskPaths.TryGetValue(taskType, out chatPath);
//         if (chatPath == null)
//             throw new NotSupportedException($"[{Name}] TaskPath found for TaskType.OpenAiChat in ApiType or ApiProvider");
//
//         return apiBaseUrl.CombineWith(chatPath);
//     }
//
//     public string GetApiModel(string model)
//     {
//         var apiModel = apiProvider.Models.Find(x => x.Model == model);
//         if (apiModel?.ApiModel != null)
//             return apiModel.ApiModel;
//
//         return apiProvider.ApiType?.ApiModels.TryGetValue(model, out var apiModelAlias) == true
//             ? apiModelAlias
//             : model;
//     }
//
//     public string GetPreferredApiModel()
//     {
//         var apiProviderModel = apiProvider.Models.FirstOrDefault()
//                                ?? throw new ArgumentNullException(nameof(apiProvider.Models));
//         var model = apiProviderModel.Model;
//         return GetApiModel(model) ?? throw new ArgumentNullException(nameof(model));
//     }
//
//     public WorkerStats GetStats() => new()
//     {
//         Name = Name,
//         Queued = ChatQueueCount,
//         Received = Interlocked.Read(ref received),
//         Completed = Interlocked.Read(ref completed),
//         Retries = Interlocked.Read(ref retries),
//         Failed = Interlocked.Read(ref failed),
//         Offline = apiProvider.OfflineDate,
//         Running = Interlocked.Read(ref running) > 0,
//     };
//
//     bool ShouldStopRunning() => IsOffline || isDisposed || token.IsCancellationRequested;
//
//     public async Task ExecuteTasksAsync(ILogger log, IDbConnectionFactory dbFactory, IMessageProducer mq)
//     {
//         if (ShouldStopRunning())
//             return;
//
//         if (Interlocked.CompareExchange(ref running, 1, 0) != 0)
//         {
//             log.LogInformation("[{Name}] already running...", Name);
//             return;
//         }
//
//         try
//         {
//             using var db = await dbFactory.OpenDbConnectionAsync(token:token);
//             while (Executor.ExecuteOpenAiChatTasksCommand.ShouldContinueRunning)
//             {
//                 if (ShouldStopRunning())
//                     return;
//
//                 var completedTaskIds = new List<long>();
//                 while (!IsOffline && ChatQueue.TryTake(out var requestId))
//                 {
//                     var chatTasks = await db.SelectAsync(db.From<OpenAiChatTask>().Where(x =>
//                         x.RequestId == requestId && x.CompletedDate == null && x.ErrorCode == null), token:token);
//                     var concurrentTasks = chatTasks.Select(x => ExecuteChatApiTaskAsync(log, mq, x));
//
//                     completedTaskIds.AddRange((await Task.WhenAll(concurrentTasks)).Where(x => x.HasValue)
//                         .Select(x => x!.Value));
//
//                     if (ShouldStopRunning())
//                         return;
//                 }
//
//                 if (ShouldStopRunning())
//                     return;
//
//                 // See if there are any incomplete tasks for this provider
//                 var incompleteRequestIds = await db.ColumnDistinctAsync<string>(db.From<OpenAiChatTask>()
//                     .Where(x => x.RequestId != null && x.CompletedDate == null && x.ErrorCode == null &&
//                                 x.Worker == Name
//                                 && !completedTaskIds.Contains(x.Id))
//                     .Select(x => x.RequestId), token:token);
//                 if (incompleteRequestIds.Count > 0)
//                 {
//                     log.LogWarning("[{Name}] Missed completing {Count} OpenAI Chat Tasks",
//                         Name, incompleteRequestIds.Count);
//                     foreach (var requestId in incompleteRequestIds)
//                     {
//                         if (ShouldStopRunning())
//                             return;
//
//                         ChatQueue.Add(requestId, token);
//                     }
//                 }
//
//                 if (ChatQueueCount == 0)
//                 {
//                     completedTaskIds.Clear();
//                     log.LogInformation("[{Name}] processed all its tasks, requesting new tasks...", Name);
//                     mq.Publish(new AppDbWrites
//                     {
//                         RequestOpenAiChatTasks = new()
//                         {
//                             Provider = Name,
//                             Count = 3,
//                         }
//                     });
//
//                     var polling = 0;
//                     while (polling++ < 10 && ChatQueueCount == 0)
//                     {
//                         await Task.Delay(1000, token);
//                     }
//                     log.LogInformation("[{Name}] has {Count} new Tasks assigned after polling {Polled} times...", 
//                         Name, ChatQueueCount, polling-1);
//
//                     // Finish executing when all other workers have completed as well
//                     if (!anyTasksRemaining())
//                     {
//                         log.LogInformation("[{Name}] no tasks remaining, exiting...", Name);
//                     }
//                 }
//             }
//         }
//         finally
//         {
//             Interlocked.Decrement(ref running);
//         }
//     }
//
//     async Task<long?> ExecuteChatApiTaskAsync(ILogger log, IMessageProducer mq, OpenAiChatTask task)
//     {
//         var chatProvider = GetOpenAiProvider();
//
//         try
//         {
//             if (ShouldStopRunning())
//                 return null;
//
//             lastChatExecuted = DateTime.UtcNow;
//             var (response, durationMs) = await chatProvider.ChatAsync(apiProvider, task.Request, token);
//
//             Interlocked.Increment(ref completed);
//             log.LogInformation("[{Name}] Completed Chat Task {Id} from {Request} in {Duration}ms",
//                 Name, task.Id, task.RequestId, durationMs);
//
//             mq.Publish(new AppDbWrites
//             {
//                 CompleteOpenAiChat = new()
//                 {
//                     Id = task.Id,
//                     Provider = Name,
//                     DurationMs = durationMs,
//                     Response = response,
//                     ReplyTo = task.ReplyTo,
//                 },
//             });
//
//             return task.Id;
//         }
//         catch (TaskCanceledException)
//         {
//             log.LogInformation("[{Name}] Chat Task {Id} from {Request} was cancelled", Name, task.Id, task.RequestId);
//             return null;
//         }
//         catch (Exception e)
//         {
//             if (ShouldStopRunning())
//                 return null;
//             Interlocked.Increment(ref failed);
//
//             log.LogError(e, "[{Name}] Error executing {TaskId} OpenAI Chat Task: {Message}",
//                 Name, task.Id, e.Message);
//
//             try
//             {
//                 if (!await chatProvider.IsOnlineAsync(apiProvider, token))
//                 {
//                     var offlineDate = DateTime.UtcNow;
//                     IsOffline = true;
//                     mq.Publish(new AppDbWrites
//                     {
//                         RecordOfflineProvider = new()
//                         {
//                             Name = Name,
//                             OfflineDate = offlineDate,
//                         }
//                     });
//                 }
//                 else
//                 {
//                     mq.Publish(new AppDbWrites
//                     {
//                         FailOpenAiChat = new()
//                         {
//                             Id = task.Id,
//                             Provider = Name,
//                             Error = e.ToResponseStatus(),
//                         },
//                     });
//                 }
//             }
//             catch (TaskCanceledException) {}
//
//             return null;
//         }
//     }
//
//     public void Dispose()
//     {
//         isDisposed = true;
//         ChatQueue.Dispose();
//     }
// }