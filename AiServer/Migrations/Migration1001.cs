using AiServer.ServiceModel;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.Text;

namespace AiServer.Migrations;

public class Migration1001 : MigrationBase
{
    /// <summary>
    ///  An API Provider that can process tasks
    /// </summary>
    public class AiProvider
{
    [AutoIncrement]
    public int Id { get; set; }
        
    /// <summary>
    /// The unique name for this API Provider
    /// </summary>
    [Index(Unique = true)]
    public string Name { get; set; }
        
    /// <summary>
    /// Override Base URL for the API Provider
    /// </summary>
    public string? ApiBaseUrl { get; set; }
        
    /// <summary>
    /// The Environment Variable for the API Key to use for this Provider
    /// </summary>
    public string? ApiKeyVar { get; set; }

    /// <summary>
    /// The API Key to use for this Provider
    /// </summary>
    public string? ApiKey { get; set; }
    
    /// <summary>
    /// Send the API Key in the Header instead of Authorization Bearer
    /// </summary>
    public string? ApiKeyHeader { get; set; }
        
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
        
    /// <summary>
    /// The models this API Provider should process 
    /// </summary>
    public List<ServiceModel.AiProviderModel> Models { get; set; } = [];

    /// <summary>
    /// The behavior for this API Provider
    /// </summary>
    public string AiTypeId { get; set; }

    [Ignore]
    public AiType AiType { get; set; }

    [Ignore] public List<string> SelectedModels => Models?.Select(x => x.ApiModel ?? x.Model).ToList() ?? [];
}

    /// <summary>
    /// The models this API Provider can process 
    /// </summary>
    public class AiProviderModel
    {
        /// <summary>
        /// Ollama Model Id
        /// </summary>
        public string Model { get; set; }
        
        /// <summary>
        /// What Model to use for this API Provider
        /// </summary>
        public string? ApiModel { get; set; }
    }

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

    public override void Up()
    {
        Db.CreateTable<AiProvider>();
        Db.CreateTable<ChatSummary>();

        var now = DateTime.UtcNow;
        var aiProviders = File.ReadAllText("seed/ai-providers.json").FromJson<List<AiProvider>>();
        foreach (var aiProvider in aiProviders)
        {
            var apiKey = aiProvider.ApiKeyVar != null
                ? Environment.GetEnvironmentVariable(aiProvider.ApiKeyVar)
                : null;
            if (aiProvider.ApiKeyVar == null || apiKey != null)
            {
                if (apiKey != null)
                {
                    aiProvider.ApiKey = apiKey;
                    Console.WriteLine($"Found API Key for {aiProvider.ApiKeyVar}");
                }
                aiProvider.CreatedDate = now;
                Console.WriteLine($"Adding {aiProvider.Name} API Provider...");
                Db.Insert(aiProvider);
            }
        }

        var dataFiles = new DirectoryInfo("wwwroot/lib/data").GetFiles("*.json");
        var overridesDir = "App_Data/overrides".AssertDir();
        foreach (var dataFile in dataFiles)
        {
            var overrideFile = Path.Combine(overridesDir, dataFile.Name);
            if (!File.Exists(overrideFile))
            {
                File.WriteAllText(overrideFile, "[]");
            }
        }
    }

    public override void Down()
    {
        Db.DropTable<ChatSummary>();
        Db.DropTable<AiProvider>();
    }
}
