using AiServer.ServiceModel;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1001 : MigrationBase
{
    /// <summary>
    ///  An API Provider that can process tasks
    /// </summary>
    public class ApiProvider
    {
        [AutoIncrement]
        public int Id { get; set; }
        
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
        public Dictionary<TaskType, string>? TaskPaths { get; set; }
        
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
        
        [Reference]
        public ApiType ApiType { get; set; }
        
        [Reference]
        public List<ApiProviderModel> Models { get; set; }
    }

    /// <summary>
    /// The models this API Provider can process 
    /// </summary>
    public class ApiProviderModel
    {
        [AutoIncrement]
        public int Id { get; set; }

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

    /// <summary>
    /// The behavior of the API Provider
    /// </summary>
    public class ApiType
    {
        [AutoIncrement]
        public int Id { get; set; }
        
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
        /// Url to check if the API is online
        /// </summary>
        public string? HeartbeatUrl { get; set; }
        
        /// <summary>
        /// Uses a Custom IOpenAiProvider
        /// </summary>
        public string? OpenAiProvider { get; set; }
        
        /// <summary>
        /// Name for this API Provider Type
        /// </summary>
        public Dictionary<TaskType, string> TaskPaths { get; set; }

        /// <summary>
        /// Mapping of Ollama Models to API Models
        /// </summary>
        public Dictionary<string, string> ApiModels { get; set; } = new();
    }
    
    /// <summary>
    /// Different Models available for the API 
    /// </summary>
    public class ApiModel
    {
        [AutoIncrement]
        public int Id { get; set; }
        
        [Index(Unique = true)]
        public string Name { get; set; }
    
        public string? Parameters { get; set; }

        public int? ContextSize { get; set; }

        public string? Website { get; set; }

        public string? Developer { get; set; }
    
        public string? Notes { get; set; }
    }

    public override void Up()
    {
        Db.CreateTable<ApiModel>();
        Db.CreateTable<ApiProvider>();
        Db.CreateTable<ApiProviderModel>();
        Db.CreateTable<ApiType>();
        
        Db.InsertAll(new List<ApiModel>
        {
            new() { Name = "phi3", Parameters = "4B" },
            new() { Name = "gemma:2b", Parameters = "2B" },
            new() { Name = "gemma2:27b", Parameters = "27B" },
            new() { Name = "qwen:4b", Parameters = "4B" },
            new() { Name = "qwen:72b", Parameters = "72B" },
            new() { Name = "qwen:110b", Parameters = "110B" },
            new() { Name = "qwen2:72b", Parameters = "72B" },
            new() { Name = "codellama", Parameters = "7B" },
            new() { Name = "llama3:8b", Parameters = "8B" },
            new() { Name = "llama3:70b", Parameters = "70B" },
            new() { Name = "gemma", Parameters = "7B" },
            new() { Name = "deepseek-coder:6.7b", Parameters = "6.7B" },
            new() { Name = "deepseek-coder:33b", Parameters = "33B" },
            new() { Name = "mistral", Parameters = "7B" },
            new() { Name = "mistral-nemo", Parameters = "12B" },
            new() { Name = "mixtral", Parameters = "8x7B" },
            new() { Name = "command-r", Parameters = "35B" },
            new() { Name = "command-r-plus", Parameters = "104B" },
            new() { Name = "wizardlm2:7b", Parameters = "7B" },
            new() { Name = "wizardlm2:8x22b", Parameters = "8x22B" },
            new() { Name = "dbrx", Parameters = "132B" },
            new() { Name = "gemini-pro" },
            new() { Name = "gemini-pro-1.5" },
            new() { Name = "gemini-pro-vision" },
            new() { Name = "gemini-flash" },
            new() { Name = "gpt-3.5-turbo" },
            new() { Name = "gpt-4" },
            new() { Name = "gpt-4-turbo" },
            new() { Name = "gpt-4-vision" },
            new() { Name = "gpt-4o" },
            new() { Name = "gpt-4o-mini" },
            new() { Name = "claude-3-haiku" },
            new() { Name = "claude-3-sonnet" },
            new() { Name = "claude-3-opus" },
            new() { Name = "claude-3-5-sonnet" },
            new() { Name = "mistral-small" },
            new() { Name = "mistral-large" },
            new() { Name = "mistral-embed" },
        });

        Db.Insert(new ApiType
        {
            Id = 1,
            Name = "ollama",
            TaskPaths = new() {
                [TaskType.OpenAiChat] = "/v1/chat/completions",
            },
            HeartbeatUrl = "/api/tags",
        });
        Db.Insert(new ApiType
        {
            Id = 2,
            Name = "openrouter",
            Website = "https://openrouter.ai",
            ApiBaseUrl = "https://openrouter.ai/api",
            TaskPaths = new() {
                [TaskType.OpenAiChat] = "/v1/chat/completions",
            },
            HeartbeatUrl = "https://openrouter.ai/api/v1/auth/key",
            ApiModels = new()
            {
                ["mistral"] = "mistralai/mistral-7b-instruct",
                ["mistral-nemo"] = "mistralai/mistral-nemo",
                ["gemma"] = "google/gemma-7b-it",
                ["gemma2:27b"] = "google/gemma-2-27b-it",
                ["mixtral"] = "mistralai/mixtral-8x7b-instruct",
                ["mixtral:8x22b"] = "mistralai/mixtral-8x22b-instruct",
                ["llama3:8b"] = "meta-llama/llama-3-8b-instruct",
                ["llama3:70b"] = "meta-llama/llama-3-70b-instruct",
                ["wizardlm2:7b"] = "microsoft/wizardlm-2-7b",
                ["wizardlm2:8x22b"] = "microsoft/wizardlm-2-8x22b",
                ["mistral-small"] = "mistralai/mistral-small",
                ["mistral-large"] = "mistralai/mistral-large",
                ["dbrx"] = "databricks/dbrx-instruct",

                ["command-r"] = "cohere/command-r",
                ["command-r-plus"] = "cohere/command-r-plus",
                
                ["claude-3-haiku"] = "anthropic/claude-3-haiku",
                ["claude-3-sonnet"] = "anthropic/claude-3-sonnet",
                ["claude-3-opus"] = "anthropic/claude-3-opus",
                ["claude-3-5-sonnet"] = "anthropic/claude-3.5-sonnet",

                ["gemini-pro"] = "google/gemini-pro",
                ["gemini-pro-1.5"] = "google/gemini-pro-1.5",
                ["gemini-pro-vision"] = "google/gemini-pro-vision",
                ["gemini-flash"] = "google/gemini-flash-1.5",
                
                ["gpt-3.5-turbo"] = "openai/gpt-3.5-turbo",
                ["gpt-4"] = "openai/gpt-4",
                ["gpt-4-turbo"] = "openai/gpt-4-turbo",
                ["gpt-4-vision"] = "openai/gpt-4-vision-preview",
                ["gpt-4o"] = "openai/gpt-4o",
                ["gpt-4o-mini"] = "openai/gpt-4o-mini",
            }
        });
        Db.Insert(new ApiType
        {
            Id = 3,
            Name = "groq",
            Website = "https://groq.com",
            ApiBaseUrl = "https://api.groq.com/openai",
            TaskPaths = new() {
                [TaskType.OpenAiChat] = "/v1/chat/completions",
            },
            HeartbeatUrl = "https://api.groq.com",
            ApiModels = new()
            {
                ["llama3:8b"] = "llama3-8b-8192",
                ["llama3:70b"] = "llama3-70b-8192",
                ["mixtral"] = "mixtral-8x7b-32768",
                ["gemma"] = "gemma-7b-it",
            } 
        });
        Db.Insert(new ApiType
        {
            Id = 4,
            Name = "mistral",
            Website = "https://mistral.ai",
            ApiBaseUrl = "https://api.mistral.ai",
            TaskPaths = new() {
                [TaskType.OpenAiChat] = "/v1/chat/completions",
            },
            HeartbeatUrl = "https://api.mistral.ai/models",
            ApiModels = new()
            {
                ["mistral"] = "open-mistral-7b",
                ["mistral-nemo"] = "open-mistral-nemo",
                ["mixtral"] = "open-mixtral-8x7b",
                ["mixtral:8x22b"] = "open-mixtral-8x22b",
                ["mistral-small"] = "mistral-small-latest",
                ["mistral-large"] = "mistral-large-latest",
                ["mistral-embed"] = "mistral-embed",
            }
        });
        Db.Insert(new ApiType
        {
            Id = 5,
            Name = "google",
            Website = "https://cloud.google.com",
            ApiBaseUrl = "https://generativelanguage.googleapis.com",
            OpenAiProvider = "GoogleOpenAiProvider",
            TaskPaths = new() {
                [TaskType.OpenAiChat] = "/v1beta/models/gemini-pro:generateContent",
            },
            ApiModels = new()
            {
                ["gemini-pro"] = "gemini-1.0-pro-latest",
                ["gemini-pro-1.5"] = "gemini-1.5-pro-001",
                ["gemini-pro-vision"] = "gemini-1.0-pro-vision-latest",
                ["gemini-flash"] = "gemini-1.5-flash-001",
            }
        });
    }

    public override void Down()
    {
        Db.DropTable<ApiType>();
        Db.DropTable<ApiProviderModel>();
        Db.DropTable<ApiProvider>();
    }
}