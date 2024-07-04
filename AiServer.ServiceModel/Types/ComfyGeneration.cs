using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel.Types;

public class ComfyGenerationTask : TaskBase
{
    [AutoIncrement]
    public long Id { get; set; }
    public object Request { get; set; }
    
    public ComfyTaskType TaskType { get; set; }
    public string WorkflowTemplate { get; set; }
    public ComfyWorkflowResponse? Response { get; set; }
}

public class ComfyGenerationCompleted : ComfyGenerationTask
{
    public ComfyWorkflowStatus? Status { get; set; }
}

public class ComfyGenerationFailed : ComfyGenerationTask
{
    public DateTime FailedDate { get; set; }
}

public class ComfyWorkflowRequest
{
    public long Id { get; set; }
    public string Model { get; set; }
    public string Provider { get; set; }
    public object Request { get; set; }
}

public class ComfyTaskSummary
{

    public long Id { get; set; }

    /// <summary>
    /// The type of Task
    /// </summary>
    public ComfyTaskType Type { get; set; }
    
    /// <summary>
    /// The model to use for the Task
    /// </summary>
    public string Model { get; set; }

    /// <summary>
    /// The specific provider used to complete the Task
    /// </summary>
    public string? Provider { get; set; }

    /// <summary>
    /// Unique External Reference for the Task
    /// </summary>
    [Index(Unique = true)]
    public string? RefId { get; set; }
    
    /// <summary>
    /// Optional Tag to group related Tasks
    /// </summary>
    public string? Tag { get; set; }
    
    /// <summary>
    /// The duration reported by the worker to complete the task
    /// </summary>
    public int DurationMs { get; set; }

    /// <summary>
    /// The Month DB the Task was created in
    /// </summary>
    public DateTime CreatedDate { get; set; }
}

[EnumAsInt]
public enum ComfyTaskType
{
    TextToImage = 1,
    ImageToImage = 2,
    ImageToImageUpscale = 3,
    ImageToImageWithMask = 4,
    ImageToText = 5,
    TextToAudio = 6,
    TextToSpeech = 7,
    SpeechToText = 8,
} 

