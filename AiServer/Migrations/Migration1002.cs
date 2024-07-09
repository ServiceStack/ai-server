using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1002 : MigrationBase
{
    public class ComfyGenerationTask : Migration1000.TaskBase
    {
        [AutoIncrement] public long Id { get; set; }
        public object Request { get; set; }
        public string WorkflowTemplate { get; set; }
        public ComfyTaskType TaskType { get; set; }
        public ComfyWorkflowResponse Response { get; set; }
    }

    public class ComfyTaskSummary
    {
        [AutoIncrement] public long Id { get; set; }

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
        /// The behavior for this API Provider
        /// </summary>
        public int ApiTypeId { get; set; }

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
        /// Override API Paths for different AI Tasks
        /// </summary>
        public Dictionary<ComfyTaskType, string>? TaskPaths { get; set; }

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

        [Reference] public ComfyApiType ApiType { get; set; }

        [Reference] public List<ComfyApiProviderModel> Models { get; set; }
    }

    public class ComfyApiProviderModel
    {
        [AutoIncrement] public int Id { get; set; }

        public int ApiProviderId { get; set; }

        /// <summary>
        /// Ollama Model Id
        /// </summary>
        public string Model { get; set; }

        /// <summary>
        /// What Model to use for this API Provider
        /// </summary>
        public string? ApiModel { get; set; }
    }

    public class ComfyApiType
    {
        [AutoIncrement] public int Id { get; set; }

        /// <summary>
        /// Name for this API Provider Type
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The website for this provider
        /// </summary>
        public string Website { get; set; }

        /// <summary>
        /// The API Base Url
        /// </summary>
        public string ApiBaseUrl { get; set; }

        /// <summary>
        /// The URL to check if the API is online
        /// </summary>
        public string? HeartbeatUrl { get; set; }

        /// <summary>
        /// API Paths for different AI Tasks
        /// </summary>
        public Dictionary<ComfyTaskType, string> TaskPaths { get; set; }

        /// <summary>
        /// Mapping of Models to API Models
        /// </summary>
        public Dictionary<string, string> ApiModels { get; set; } = new();
    }

    public class ComfyApiModel
    {
        [AutoIncrement] public int Id { get; set; }

        public int ApiProviderId { get; set; }

        public string Model { get; set; }

        public ArtStyleEntry ModelMetadata { get; set; }
    }

    public class ArtStyleEntry
    {
        public string Name { get; set; }
        public string Filename { get; set; }
        public string DownloadUrl { get; set; }

        public double? CfgScale { get; set; }

        public string? Scheduler { get; set; }

        public ComfySampler? Sampler { get; set; }

        public int? Width { get; set; }

        public int? Height { get; set; }

        public int? Steps { get; set; }
    }

    public override void Up()
    {
        Db.CreateTable<ComfyApiModel>();
        Db.CreateTable<ComfyApiProvider>();
        Db.CreateTable<ComfyApiProviderModel>();
        Db.CreateTable<ComfyApiType>();
        
        Db.CreateTable<ComfyGenerationTask>();
        Db.CreateTable<ComfyTaskSummary>();
    }

    public override void Down()
    {
        Db.DropTable<ComfyGenerationTask>();
        try
        {
            Db.DropTable<ComfyTaskSummary>();
            Db.DropTable<ComfyApiType>();
            Db.DropTable<ComfyApiProviderModel>();
            Db.DropTable<ComfyApiProvider>();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
}