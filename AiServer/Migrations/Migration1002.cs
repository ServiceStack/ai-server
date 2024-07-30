using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1002 : MigrationBase
{
    public class ComfyGenerationTask : Migration1000.TaskBase
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
    }

    public class ComfyApiModel
    {
        [AutoIncrement] 
        public int Id { get; set; }
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

    public override void Up()
    {
        Db.CreateTable<ComfyApiModel>();
        Db.CreateTable<ComfyApiProvider>();
        Db.CreateTable<ComfyApiProviderModel>();
        Db.CreateTable<ComfyApiType>();
        Db.CreateTable<ComfyApiModelSettings>();
        
        Db.CreateTable<ComfyGenerationTask>();
        Db.CreateTable<ComfySummary>();
        
        // Initialize providers, models, model settings into database
        
        // Each type is prefixed with 'ComfyApi'
        // A `Provider` is a server that can provide the functionality of the workflow processing
        // A `Model` is the model details about where it came from, name etc.
        // A `ModelSettings` is the default settings for a specific model, since models can be sensitive to 
        // Inference settings due to how they are trained or fine tuned.
        // A `ProviderModel` is the relationship between agents and what models they have available.

        // var provider = new ComfyApiProvider
        // {
        //     Name = "comfy-dell.pvq.app",
        //     ApiBaseUrl = "https://comfy-dell.pvq.app/api",
        //     Concurrency = 1,
        //     HeartbeatUrl = "/",
        //     Enabled = true,
        //     CreatedDate = DateTime.UtcNow,
        //     Priority = 1,
        //     ApiKey = "testtest1234",
        // };
        //
        // var providerId = (int)Db.Insert(provider, selectIdentity: true);
        // provider.Id = providerId;
        //
        // var model = new ComfyApiModel
        // {
        //     Name = "SDXL Lightning 4-Step",
        //     Filename = "sdxl_lightning_4step.safetensors",
        //     DownloadUrl =
        //         "https://huggingface.co/ByteDance/SDXL-Lightning/resolve/main/sdxl_lightning_4step.safetensors?download=true",
        //     CreatedDate = DateTime.UtcNow,
        //     Url = "https://huggingface.co/ByteDance/SDXL-Lightning"
        // };
        //
        // var modelId = (int)Db.Insert(model, selectIdentity: true);
        // model.Id = modelId;
        //
        // var modelSetting = new ComfyApiModelSettings
        // {
        //     Width = 1024,
        //     Height = 1024,
        //     Sampler = ComfySampler.euler,
        //     Scheduler = "sgm_uniform",
        //     Steps = 4,
        //     CfgScale = 1.0,
        //     ComfyApiModelId = modelId
        // };
        //
        // var modelSettingId = (int)Db.Insert(modelSetting, selectIdentity: true);
        // modelSetting.Id = modelSettingId;
        //
        // var providerModel = new ComfyApiProviderModel
        // {
        //     ComfyApiModelId = modelId,
        //     ComfyApiProviderId = providerId
        // };
        //
        // Db.Insert(providerModel);

    }

    public override void Down()
    {
        Db.DropTable<ComfyGenerationTask>();
        Db.DropTable<ComfySummary>();
        Db.DropTable<ComfyApiModelSettings>();
        Db.DropTable<ComfyApiType>();
        Db.DropTable<ComfyApiProviderModel>();
        Db.DropTable<ComfyApiModel>();
        Db.DropTable<ComfyApiProvider>();
    }
}