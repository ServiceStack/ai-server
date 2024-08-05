namespace ServiceStack.Jobs;

public record class BackgroundJobRef(long Id, string RefId, string RequestId);
public record class BackgroundJobStatusUpdate(BackgroundJob Job, double? Progress=null, string? Status=null, string? Log=null);

public class BackgroundJobOptions
{
    public string? RefId { get; set; }
    public string? Worker { get; set; } // named or null for Queue BG Thread

    //public int? NoOfThreads { get; set; } // v1 ignore
    public string? Callback { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
    public string? CreatedBy { get; set; }
    public int? TimeoutSecs { get; set; }
    public long? ParentId { get; set; }
    public Dictionary<string, string>? Args { get; set; } //= Provider
    public Action<object>? OnSuccess { get; set; }
    public Action<Exception>? OnFailed { get; set; }
}

public interface IBackgroundJobs : IDisposable
{
    BackgroundJobRef EnqueueApi(string requestDto, object request, BackgroundJobOptions? options = null);
    BackgroundJobRef EnqueueCommand(string commandName, object arg, BackgroundJobOptions? options = null);
    BackgroundJob ExecuteTransientCommand(string commandName, object arg, BackgroundJobOptions? options = null);
    Task ExecuteJobAsync(BackgroundJob job);
    Task CancelJobAsync(BackgroundJob job);
    Task FailJobAsync(BackgroundJob job, Exception ex);
    Task CompleteJobAsync(BackgroundJob job, object? response=null);
    void UpdateJobStatus(BackgroundJobStatusUpdate status);
    void Start();
    void Tick();
    Dictionary<string, int> GetWorkerQueueCounts();
    List<WorkerStats> GetWorkerStats();
}

public class WorkerStats
{
    public string Name { get; init; }
    public long Queued { get; init; }
    public long Received { get; init; }
    public long Completed { get; init; }
    public long Retries { get; init; }
    public long Failed { get; init; }
}

/// <summary>
/// Execute AutoQuery Create/Update/Delete Request DTO in a background thread
/// </summary>
[AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = false)]
public class WorkerAttribute : AttributeBase
{
    public string Name { get; set; }
    public WorkerAttribute(string name) => Name = name;
}
