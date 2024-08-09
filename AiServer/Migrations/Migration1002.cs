using ServiceStack.DataAnnotations;
using ServiceStack.Model;
using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1002 : MigrationBase
{
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

    public class ComfyGenerationTask : TaskBase
    {
        public ComfyWorkflowRequest Request { get; set; }

        public ComfyWorkflowResponse? Response { get; set; }
    
        public ComfyWorkflowStatus? Status { get; set; }

        public ComfyTaskType TaskType { get; set; }
        public string WorkflowTemplate { get; set; }
    }
    
    public class ComfyWorkflowStatus
    {
        public string StatusMessage { get; set; }
        public bool Completed { get; set; }
        public List<ComfyOutput> Outputs { get; set; } = new();
    }
    
    public class ComfyFileOutput
    {
        public string Filename { get; set; }
        public string Type { get; set; }
        public string Subfolder { get; set; }
    }

    public class ComfyTextOutput
    {
        public string? Text { get; set; }
    }
    
    public class ComfyOutput
    {
        public List<ComfyFileOutput> Files { get; set; } = new();
        public List<ComfyTextOutput> Texts { get; set; } = new();
    }
    
    public class ComfyFileInput
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Subfolder { get; set; }
    }
    
    public class ComfyWorkflowRequest
    {
        public string? Model { get; set; }

        public int? Steps { get; set; }

        public int BatchSize { get; set; }

        public int? Seed { get; set; }
        public string? PositivePrompt { get; set; }
        public string? NegativePrompt { get; set; }

        public ComfyFileInput? Image { get; set; }
        public ComfyFileInput? Speech { get; set; }
        public ComfyFileInput? Mask { get; set; }

        public Stream? ImageInput { get; set; }
        public Stream? SpeechInput { get; set; }
        public Stream? MaskInput { get; set; }

        public ComfySampler? Sampler { get; set; }
        public string? Scheduler { get; set; } = "normal";
        public double? CfgScale { get; set; }
        public double? Denoise { get; set; }

        public string? UpscaleModel { get; set; } = "RealESRGAN_x2.pth";

        public int? Width { get; set; }
        public int? Height { get; set; }

        public ComfyTaskType TaskType { get; set; }
        public string? Clip { get; set; }
        public double? SampleLength { get; set; }
        public ComfyMaskSource MaskChannel { get; set; }
    }
    
    public enum ComfyMaskSource
    {
        red,
        blue,
        green,
        alpha
    }

    
    public class ComfySummary
    {
        [AutoIncrement]
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
    
        public string? PromptId { get; set; }

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
    
        public long JobId { get; set; }
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

    public enum ComfySampler
    {
        euler,
        euler_ancestral,
        huen,
        huenpp2,
        dpm_2,
        dpm_2_ancestral,
        lms,
        dpm_fast,
        dpm_adaptive,
        dpmpp_2s_ancestral,
        dpmpp_sde,
        dpmpp_sde_gpu,
        dpmpp_2m,
        dpmpp_2m_sde,
        dpmpp_2m_sde_gpu,
        dpmpp_3m_sde,
        dpmpp_3m_sde_gpu,
        ddpm,
        lcm,
        ddim,
        uni_pc,
        uni_pc_bh2
    }

    public class ComfyWorkflowResponse
    {
    }


    public class ComfyApiProvider
    {
        [AutoIncrement] public int Id { get; set; }

        /// <summary>
        /// The unique name for this API Provider
        /// </summary>
        [Index(Unique = true)]
        public string Name { get; set; }

        /// <summary>
        /// The API Key to use for this Provider
        /// </summary>
        public string? ApiKey { get; set; }

        /// <summary>
        /// Send the API Key in the Header instead of Authorization Bearer
        /// </summary>
        public string? ApiKeyHeader { get; set; }

        /// <summary>
        /// Override Base URL for the API Provider
        /// </summary>
        public string? ApiBaseUrl { get; set; }

        /// <summary>
        /// Url to check if the API is online
        /// </summary>
        public string? HeartbeatUrl { get; set; }

        
        public Dictionary<ComfyTaskType, string>? TaskWorkflows { get; set; }

        /// <summary>
        /// How many requests should be made concurrently
        /// </summary>
        public int Concurrency { get; set; }

        /// <summary>
        /// What priority to give this Provider to use for processing models 
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// Whether the Provider is enabled
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// When the Provider went offline
        /// </summary>
        public DateTime? OfflineDate { get; set; }

        /// <summary>
        /// When the Provider was created
        /// </summary>
        public DateTime CreatedDate { get; set; }

        [Reference] public List<ComfyApiProviderModel> Models { get; set; }
    }

    public class ComfyApiProviderModel
    {
        [AutoIncrement] public int Id { get; set; }
        
        [ForeignKey(typeof(ComfyApiProvider), OnDelete = "CASCADE")]
        public int ComfyApiProviderId { get; set; }
        
        [ForeignKey(typeof(ComfyApiModel), OnDelete = "CASCADE")]
        public int ComfyApiModelId { get; set; }
        
        [Reference]
        public ComfyApiProvider ComfyApiProvider { get; set; }
        [Reference]
        public ComfyApiModel ComfyApiModel { get; set; }
    }

    public class ComfyApiModel
    {
        [AutoIncrement] 
        public int Id { get; set; }
        [Index(Unique = true)]
        public string Name { get; set; }
        
        public string? Description { get; set; }
        
        public string? Tags { get; set; }
        public string Filename { get; set; }
        public string DownloadUrl { get; set; }
        
        public string IconUrl { get; set; }
        public string Url { get; set; }
        
        public DateTime CreatedDate { get; set; }
        
        [Reference]
        public ComfyApiModelSettings? ModelSettings { get; set; }
    }

    public class ComfyApiModelSettings
    {
        [AutoIncrement]
        public int Id { get; set; }
        
        [ForeignKey(typeof(ComfyApiModel), OnDelete = "CASCADE")]
        public int ComfyApiModelId { get; set; }
        
        public double? CfgScale { get; set; }
        
        public string? Scheduler { get; set; }
        
        public ComfySampler? Sampler { get; set; }
        
        public int? Width { get; set; }
        
        public int? Height { get; set; }
        
        public int? Steps { get; set; }
        
        public string? NegativePrompt { get; set; }
    }
    
    public class DiffusionApiProvider
    {
        [AutoIncrement] 
        public int Id { get; set; }

        /// <summary>
        /// The unique name for this API Provider
        /// </summary>
        [Index(Unique = true)]
        public string Name { get; set; }

        /// <summary>
        /// The API Key to use for this Provider
        /// </summary>
        public string? ApiKey { get; set; }

        /// <summary>
        /// Send the API Key in the Header instead of Authorization Bearer
        /// </summary>
        public string? ApiKeyHeader { get; set; }

        /// <summary>
        /// Override Base URL for the API Provider
        /// </summary>
        public string? ApiBaseUrl { get; set; }

        /// <summary>
        /// Url to check if the API is online
        /// </summary>
        public string? HeartbeatUrl { get; set; }
    
        /// <summary>
        /// How many requests should be made concurrently
        /// </summary>
        public int Concurrency { get; set; }

        /// <summary>
        /// What priority to give this Provider to use for processing models 
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// Whether the Provider is enabled
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// When the Provider went offline
        /// </summary>
        public DateTime? OfflineDate { get; set; }

        /// <summary>
        /// When the Provider was created
        /// </summary>
        public DateTime CreatedDate { get; set; }

        public List<string>? Models { get; set; }
        
        public string Type { get; set; }
    }

    public override void Up()
    {
        Db.CreateTable<ComfyApiModel>();
        Db.CreateTable<ComfyApiProvider>();
        Db.CreateTable<ComfyApiProviderModel>();
        Db.CreateTable<ComfyApiModelSettings>();
        
        Db.CreateTable<ComfyGenerationTask>();
        Db.CreateTable<ComfySummary>();
        
        Db.CreateTable<DiffusionApiProvider>();
    }

    public override void Down()
    {
        Db.DropTable<ComfyGenerationTask>();
        Db.DropTable<ComfySummary>();
        Db.DropTable<ComfyApiModelSettings>();
        Db.DropTable<ComfyApiProviderModel>();
        Db.DropTable<ComfyApiModel>();
        Db.DropTable<ComfyApiProvider>();
        
        Db.DropTable<DiffusionApiProvider>();
    }
}