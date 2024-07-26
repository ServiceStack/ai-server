using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Configuration;

namespace AiServer.Tests;

public static class TestUtils
{
    public static string GetHostDir() => "../../../../AiServer";
    public static string GetQuestionsDir() => Path.GetFullPath("../../../../../pvq/questions");

    public const string SystemPrompt = 
        """
        You are an IT expert helping a user with a technical issue.
        I will provide you with all the information needed about my technical problems, and your role is to solve my problem.
        You should use your computer science, network infrastructure, and IT security knowledge to solve my problem
        using data from StackOverflow, Hacker News, and GitHub of content like issues submitted, closed issues,
        number of stars on a repository, and overall StackOverflow activity.
        Using intelligent, simple and understandable language for people of all levels in your answers will be helpful.
        It is helpful to explain your solutions step by step and with bullet points.
        Try to avoid too many technical details, but use them when necessary.
        I want you to reply with the solution, not write any explanations.
        """;

    public static string AiServerBaseUrl = "https://localhost:5005";
    public static string PvqBaseUrl = "https://localhost:5001";
    public static string PublicAiServerBaseUrl = "https://openai.servicestack.net";
    
    public static List<CreateApiKey> ApiKeys = [
        new() { Key = "ak-4357089af5a446cab0fdc44830e03617", UserId = "CB923F42-AE84-4B77-B2A8-5C6E71F29DF4", UserName = "Admin", Scopes = [RoleNames.Admin] },
        new() { Key = "ak-1359a079e98841a2a0c52419433d207f", UserId = "A8BBBFDB-1DA6-44E6-96D9-93995A7CBCEF", UserName = "System" },
        new() { Key = "ak-78A1B9B4CD684118B2EAFAB1F268E3DB", UserId = "3B1D6B15-86A4-44CD-AF64-75D4AC10530B", UserName = "pvq" },
        new() { UserId = "43AD9AE7-5B0E-4CBE-8C37-0752F27622E8", UserName = "imac" },
        new() { UserId = "3D373B5A-2CF9-4290-B306-BBA546D63766", UserName = "macbook" },
        new() { UserId = "E24EFC4B-8743-4CF3-8904-4C0492B285E0", UserName = "supermicro" },
    ];

    public static JsonApiClient CreateAuthSecretClient()
    {
        var client = new JsonApiClient(AiServerBaseUrl);

        // Ignore local SSL Errors
        var handler = HttpUtils.HttpClientHandlerFactory();
        handler.ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) => true;
        var httpClient = new HttpClient(handler, disposeHandler:client.HttpMessageHandler == null) {
            BaseAddress = new Uri(AiServerBaseUrl),
        };
        client = new JsonApiClient(httpClient);

        client.Headers![Keywords.AuthSecret] = Environment.GetEnvironmentVariable("AUTH_SECRET");
        return client;
    }

    public static JsonApiClient CreatePublicAuthSecretClient()
    {
        var client = new JsonApiClient(PublicAiServerBaseUrl);
        client.Headers![Keywords.AuthSecret] = Environment.GetEnvironmentVariable("AUTH_SECRET");
        return client;
    }

    public static JsonApiClient CreateSystemClient() => new(AiServerBaseUrl) {
        BearerToken = "ak-1359a079e98841a2a0c52419433d207f",
    };
    public static JsonApiClient CreateAdminClient() => new(AiServerBaseUrl) {
        BearerToken = "ak-4357089af5a446cab0fdc44830e03617",
    };
    public static JsonApiClient CreatePvqClient() => new(AiServerBaseUrl) {
        BearerToken = "ak-78A1B9B4CD684118B2EAFAB1F268E3DB",
    };

    public static JsonApiClient CreatePublicAdminClient() => new(PublicAiServerBaseUrl) {
        BearerToken = Environment.GetEnvironmentVariable("AK_ADMIN"),
    };

    public static JsonApiClient PvqApiClient() => new(PvqBaseUrl) {
        UserName = Environment.GetEnvironmentVariable("PVQ_USERNAME"),
    };
    
    public static JsonApiClient PublicPvqApiClient() => new(PublicAiServerBaseUrl) {
        UserName = Environment.GetEnvironmentVariable("PVQ_USERNAME"),
    };
    
    public static string PvqUsername = Environment.GetEnvironmentVariable("PVQ_USERNAME") ?? "servicestack";
    public static string PvqPassword = Environment.GetEnvironmentVariable("PVQ_PASSWORD") ?? "p@55wOrd";

    public static Dictionary<string, string> ModerUserIds = new()
    {
        ["phi3"] = "1d8b07ba-b1de-420c-8b7c-7e767fab9dbc",
        ["llama3:8b"] = "059fceb9-9e5e-4603-93f7-d77972b8eb2f",
        ["codellama"] = "32576297-6242-4ceb-84eb-d8e76da30a37",
        ["mistral"] = "4f96e54c-54e8-48f1-aad3-bbb7e7805469",
        ["mixtral"] = "ed334220-8614-4846-81e8-e2e94a9104ac",
        ["gemma"] = "d56768fb-bfcc-4a86-bb48-b428266d3e7c",
        ["gemini-pro"] = "e972c92b-68a9-4374-a2c4-1fb819f19cb3",
    };
    
    public static ApiType OpenAiApiType = new()
    {
        Id = 1,
        Name = "ollama",
        TaskPaths = new() {
            [TaskType.OpenAiChat] = "/v1/chat/completions",
        },
    };

    public static ApiType OpenRouterApiType = new()
    {
        Id = 2,
        Name = "openrouter",
        Website = "https://openrouter.ai",
        ApiBaseUrl = "https://openrouter.ai/api",
        TaskPaths = new()
        {
            [TaskType.OpenAiChat] = "/v1/chat/completions",
        },
        HeartbeatUrl = "https://openrouter.ai/api/v1/auth/key",
        ApiModels = new()
        {
            ["mistral"] = "mistralai/mistral-7b-instruct",
            ["mistral-nemo"] = "mistralai/mistral-nemo",
            ["gemma"] = "google/gemma-7b-it",
            ["mixtral"] = "mistralai/mixtral-8x7b-instruct",
            ["mixtral:8x22b"] = "mistralai/mixtral-8x22b-instruct",
            ["llama3:8b"] = "meta-llama/llama-3-8b-instruct",
            ["llama3:70b"] = "meta-llama/llama-3-70b-instruct",
            ["wizardlm2:7b"] = "microsoft/wizardlm-2-7b",
            ["wizardlm2:8x22b"] = "microsoft/wizardlm-2-8x22b",
            ["mistral-small"] = "mistralai/mistral-small",
            ["mistral-large"] = "mistralai/mistral-large",
            ["dbrx"] = "databricks/dbrx-instruct",
            ["qwen2:72b"] = "qwen/qwen-2-72b-instruct",

            ["command-r"] = "cohere/command-r",
            ["command-r-plus"] = "cohere/command-r-plus",

            ["claude-3-haiku"] = "anthropic/claude-3-haiku",
            ["claude-3-sonnet"] = "anthropic/claude-3-sonnet",
            ["claude-3-opus"] = "anthropic/claude-3-opus",

            // Let Google Provider handle gemini-pro
            // ["gemini-pro"] = "google/gemini-pro",
            // ["gemini-pro-1.5"] = "google/gemini-pro-1.5",
            // ["gemini-pro-vision"] = "google/gemini-pro-vision",

            ["gpt-3.5-turbo"] = "openai/gpt-3.5-turbo",
            ["gpt-4"] = "openai/gpt-4",
            ["gpt-4-turbo"] = "openai/gpt-4-turbo",
            ["gpt-4-vision"] = "openai/gpt-4-vision-preview",
        }
    };

    public static ApiType GroqApiType = new()
    {
        Id = 3,
        Name = "groq",
        Website = "https://groq.com",
        ApiBaseUrl = "https://api.groq.com/openai",
        TaskPaths = new()
        {
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
    };
    
    public static ApiType GoogleApiType = new()
    {
        Id = 5,
        Name = "google",
        Website = "https://cloud.google.com",
        ApiBaseUrl = "https://generativelanguage.googleapis.com",
        OpenAiProvider = "GoogleOpenAiProvider",
        TaskPaths = new() {
            [TaskType.OpenAiChat] =  "/v1beta/models/${MODEL}:generateContent",
        },
        ApiModels = new()
        {
            ["gemini-pro"] = "gemini-1.0-pro-latest",
            ["gemini-pro-1.5"] = "gemini-1.5-pro-001",
            ["gemini-pro-vision"] = "gemini-1.0-pro-vision-latest",
            ["gemini-flash"] = "gemini-1.5-flash-001",
        }
    };
    
    public static ApiProvider MacbookApiProvider = new()
    {
        Name = "macbook",
        ApiTypeId = 1,
        ApiBaseUrl = "https://macbook.pvq.app",
        Concurrency = 1,
        Priority = 2,
        Enabled = true,
        Models = [
            new() { Model = "llama3:8b", },
            new() { Model = "phi3", },
            new() { Model = "gemma", },
            new() { Model = "codellama", },
            new() { Model = "mistral", },
            new() { Model = "mistral-nemo", },
        ],
        ApiType = OpenAiApiType
    };

    public static ApiProvider AmdApiProvider = new()
    {
        Name = "amd",
        ApiTypeId = 1,
        ApiBaseUrl = "https://amd.pvq.app",
        Concurrency = 1,
        Priority = 2,
        Enabled = true,
        Models = [
            new() { Model = "llama3:8b", },
            new() { Model = "phi3", },
            new() { Model = "gemma", },
            new() { Model = "codellama", },
            new() { Model = "mistral", },
            new() { Model = "mistral-nemo", },
        ],
        ApiType = OpenAiApiType
    };

    public static ApiProvider SupermicroApiProvider = new()
    {
        Name = "supermicro",
        ApiTypeId = 1,
        ApiBaseUrl = "https://supermicro.pvq.app",
        Concurrency = 1,
        Priority = 0,
        Enabled = true,
        Models = [
            new() { Model = "gemma:2b", },
            new() { Model = "gemma2:27b", },
            new() { Model = "qwen:4b", },
            new() { Model = "deepseek-coder:6.7b" },
            new() { Model = "deepseek-coder:33b" },
            new() { Model = "phi3", },
            new() { Model = "mistral", },
            new() { Model = "mistral-nemo", },
            new() { Model = "llama3:8b", },
            new() { Model = "gemma", },
            new() { Model = "codellama", },
            new() { Model = "mixtral", },
            new() { Model = "command-r", },
        ],
        ApiType = OpenAiApiType
    };

    public static ApiProvider GoogleApiProvider = new()
    {
        Name = "google",
        ApiTypeId = 5,
        ApiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY"),
        Concurrency = 1,
        Priority = 0,
        Enabled = true,
        Models =
        [
            new() { Model = "gemini-pro", },
            new() { Model = "gemini-pro-1.5", },
            new() { Model = "gemini-pro-vision", },
            new() { Model = "gemini-flash", },
        ],
        ApiType = GoogleApiType
    };

    public static ApiProvider OpenRouterProvider = new()
    {
        Name = "openrouter",
        ApiTypeId = 2,
        HeartbeatUrl = "https://openrouter.ai/api/v1/auth/key",
        ApiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY"),
        Concurrency = 1,
        Priority = 0,
        Enabled = true,
        Models =
        [
            new() { Model = "gemma2:27b", },
            new() { Model = "mixtral:8x22b", },
            new() { Model = "llama3:70b" },
            new() { Model = "wizardlm2:7b", },
            new() { Model = "wizardlm2:8x22b", },
            new() { Model = "mistral-small", },
            new() { Model = "mistral-large", },
            new() { Model = "mistral-nemo", },
            new() { Model = "dbrx", },
            new() { Model = "qwen2:72b", },
            new() { Model = "command-r", },
            new() { Model = "command-r-plus", },
            new() { Model = "claude-3-haiku", },
            new() { Model = "claude-3-sonnet", },
            new() { Model = "claude-3-opus", },
            new() { Model = "claude-3-5-sonnet", },
            new() { Model = "gemini-pro", },
            new() { Model = "gemini-pro-1.5", },
            new() { Model = "gemini-pro-vision", },
            new() { Model = "gpt-3.5-turbo", },
            new() { Model = "gpt-4", },
            new() { Model = "gpt-4-turbo", },
            new() { Model = "gpt-4-vision", },
        ],
        ApiType = OpenRouterApiType,
    };

    public static ApiProvider GroqProvider = new()
    {
        Name = "groq",
        ApiTypeId = 3,
        ApiKey = Environment.GetEnvironmentVariable("GROQ_API_KEY"),
        Concurrency = 1,
        Priority = 2,
        Enabled = true,
        Models =
        [
            new() { Model = "llama3:8b", },
            new() { Model = "llama3:70b", },
            new() { Model = "gemma", },
            new() { Model = "mixtral", },
        ],
        ApiType = GroqApiType,
    };

    public static ApiType MistralApiType = new()
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
            ["codestral"] = "codestral-latest",
        }
    };

    public static ApiProvider MistralProvider = new()
    {
        Name = "mistral",
        ApiTypeId = 4,
        ApiKey = Environment.GetEnvironmentVariable("MISTRAL_API_KEY"),
        Concurrency = 1,
        Priority = 2,
        Enabled = true,
        Models =
        [
            new() { Model = "codestral" },
        ],
        ApiType = MistralApiType,
    };

}
