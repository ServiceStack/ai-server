namespace AiServer.ServiceModel.Types;

public class ComfyGenerationTask : TaskBase
{
    public object Request { get; set; }
    public string WorkflowTemplate { get; set; }
    public ComfyWorkflowResponse Response { get; set; }
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

