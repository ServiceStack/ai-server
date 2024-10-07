using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Model;

namespace AiServer.ServiceModel;

/// <summary>
/// Different Models available in AI Server 
/// </summary>
[Icon(Svg = Icons.AiModel)]
public class AiModel : IHasId<string> 
{
    public required string Id { get; set; }
    public List<string> Tags { get; set; } = [];
    public string? Latest { get; set; }
    public string? Website { get; set; }
    public string? Description { get; set; }
    public string? Icon { get; set; }
}

[Icon(Svg = Icons.Stats)]
public class ChatSummary
{
    /// <summary>
    /// Same as BackgroundJob.Id
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// User specified or System Generated BackgroundJob.RefId
    /// </summary>
    [Index(Unique = true)] public string RefId { get; set; }
        
    /// <summary>
    /// The model to use for the Task
    /// </summary>
    public string Model { get; set; }

    /// <summary>
    /// The model used in the API
    /// </summary>
    public string ApiModel { get; set; }

    /// <summary>
    /// The specific provider used to complete the Task
    /// </summary>
    public string Provider { get; set; }

    /// <summary>
    /// Optional Tag to group related Tasks
    /// </summary>
    public string? Tag { get; set; }
        
    /// <summary>
    /// Number of tokens in the prompt.
    /// </summary>
    public int PromptTokens { get; set; }
        
    /// <summary>
    /// Number of tokens in the generated completion.
    /// </summary>
    public int CompletionTokens { get; set; }

    /// <summary>
    /// The duration reported by the worker to complete the task
    /// </summary>
    public int DurationMs { get; set; }

    /// <summary>
    /// The Month DB the Task was created in
    /// </summary>
    public DateTime CreatedDate { get; set; }
}

public abstract class TaskBase : IHasLongId
{
    /// <summary>
    /// Primary Key for the Task
    /// </summary>
    public virtual long Id { get; set; }

    /// <summary>
    /// The model to use for the Task
    /// </summary>
    [Index]
    public virtual string Model { get; set; }

    /// <summary>
    /// The specific provider to use to complete the Task
    /// </summary>
    public virtual string? Provider { get; set; }
    
    /// <summary>
    /// Unique External Reference for the Task
    /// </summary>
    [Index(Unique = true)]
    public virtual string? RefId { get; set; }
    
    /// <summary>
    /// Optional Tag to group related Tasks
    /// </summary>
    public string? Tag { get; set; }
    
    /// <summary>
    /// URL to publish the Task to
    /// </summary>
    public virtual string? ReplyTo { get; set; } 
    
    /// <summary>
    /// When the Task was created
    /// </summary>
    public virtual DateTime CreatedDate { get; set; }

    /// <summary>
    /// The API Key UserName which created the Task
    /// </summary>
    public virtual string CreatedBy { get; set; }

    /// <summary>
    /// The worker that is processing the Task
    /// </summary>
    public virtual string? Worker { get; set; }

    /// <summary>
    /// The Remote IP Address of the worker
    /// </summary>
    public virtual string? WorkerIp { get; set; }

    /// <summary>
    /// The HTTP Request Id reserving the task for the worker
    /// </summary>
    public virtual string? RequestId { get; set; }
    
    /// <summary>
    /// When the Task was started
    /// </summary>
    [Index]
    public virtual DateTime? StartedDate { get; set; }

    /// <summary>
    /// When the Task was completed
    /// </summary>
    public virtual DateTime? CompletedDate { get; set; }
    
    /// <summary>
    /// The duration reported by the worker to complete the task
    /// </summary>
    public virtual int DurationMs { get; set; }
    
    /// <summary>
    /// How many times to attempt to retry the task
    /// </summary>
    public virtual int? RetryLimit { get; set; }
    
    /// <summary>
    /// How many times the Task has been retried
    /// </summary>
    public virtual int Retries { get; set; }

    /// <summary>
    /// When the callback for the Task completed
    /// </summary>
    public virtual DateTime? NotificationDate { get; set; }

    /// <summary>
    /// The Exception Type or other Error Code for why the Task failed 
    /// </summary>
    public virtual string? ErrorCode { get; set; }

    /// <summary>
    /// Why the Task failed
    /// </summary>
    public virtual ResponseStatus? Error { get; set; }
}

[EnumAsInt]
public enum TaskType
{
    OpenAiChat = 1,
    Comfy = 2,
}

