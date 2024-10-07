using System.Net;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class PvqApiTests
{
    public static List<CreateAiProvider> AiProviders =
    [
        new CreateAiProvider
        {
            Name = "macbook",
            AiTypeId = "Ollama",
            ApiBaseUrl = "https://macbook.pvq.app",
            Concurrency = 1,
            Priority = 4,
            Enabled = true,
            Models =
            [
                new() { Model = "gemma:2b" },
                new() { Model = "qwen:4b" },
                new() { Model = "llama3:8b", },
                new() { Model = "phi3:3.8b",        ApiModel = "phi3:latest" },
                new() { Model = "mistral:7b",       ApiModel = "mistral:latest" },
                new() { Model = "mistral-nemo:12b", ApiModel = "mistral-nemo:latest" },
                new() { Model = "gemma:7b",         ApiModel = "gemma:latest" },
                new() { Model = "codellama:7b",     ApiModel = "codellama:latest" },
            ]
        },
        new CreateAiProvider
        {
            Name = "amd",
            AiTypeId = "Ollama",
            ApiBaseUrl = "https://amd.pvq.app",
            Concurrency = 1,
            Priority = 4,
            Enabled = true,
            Models =
            [
                new() { Model = "llama3:8b", },
                new() { Model = "gemma2:27b", },
                new() { Model = "codellama:7b",     ApiModel = "codellama:latest" },
                new() { Model = "gemma:7b",         ApiModel = "gemma:latest" },
                new() { Model = "mistral:7b",       ApiModel = "mistral:latest" },
                new() { Model = "mistral-nemo:12b", ApiModel = "mistral-nemo:latest" },
                new() { Model = "phi3:3.8b",        ApiModel = "phi3:latest" },
            ]
        },
        new CreateAiProvider
        {
            Name = "supermicro",
            AiTypeId = "Ollama",
            ApiBaseUrl = "https://supermicro.pvq.app",
            Concurrency = 1,
            Priority = 0,
            Enabled = true,
            Models = [
                new() { Model = "gemma:2b" },
                new() { Model = "gemma2:27b", },
                new() { Model = "qwen:4b", },
                new() { Model = "deepseek-coder:6.7b" },
                new() { Model = "deepseek-coder:33b" },
                new() { Model = "llama3:8b", },
                new() { Model = "codellama:7b",  ApiModel = "codellama:latest" },
                new() { Model = "command-r:35b", ApiModel = "command-r:latest" },
                new() { Model = "mistral:7b",    ApiModel = "mistral:latest" },
                new() { Model = "mixtral:8x7b",  ApiModel = "mixtral:latest" },
                new() { Model = "gemma:7b",      ApiModel = "gemma:latest" },
                new() { Model = "phi3:3.8b",     ApiModel = "phi3:latest" },
            ]
        },
        new CreateAiProvider
        {
            Name = "dell",
            AiTypeId = "Ollama",
            ApiBaseUrl = "https://dell.pvq.app",
            Concurrency = 1,
            Priority = 0,
            Enabled = true,
            Models = [
                new() { Model = "deepseek-coder:6.7b" },
                new() { Model = "gemma2:27b", },
                new() { Model = "llama3:8b", },
                new() { Model = "starcoder2:7b", },
                new() { Model = "qwen:4b", },
                new() { Model = "codellama:7b",         ApiModel = "codellama:latest" },
                new() { Model = "command-r:35b",        ApiModel = "command-r:latest" },
                new() { Model = "gemma:7b",             ApiModel = "gemma:latest" },
                new() { Model = "mistral:7b",           ApiModel = "mistral:latest" },
                new() { Model = "mixtral:8x7b",         ApiModel = "mixtral:latest" },
                new() { Model = "dolphin-mixtral:8x7b", ApiModel = "dolphin-mixtral:latest" },
                new() { Model = "mistral-nemo:12b",     ApiModel = "mistral-nemo:latest" },
                new() { Model = "phi3:3.8b",            ApiModel = "phi3:latest" },
            ]
        },
        new CreateAiProvider
        {
            Name = "openrouter-free",
            AiTypeId = "OpenRouter Free",
            // ApiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY"),
            ApiKeyVar = "OPENROUTER_API_KEY",
            Concurrency = 1,
            Priority = 1,
            Enabled = true,
            Models =
            [
                new()
                {
                    Model = "mistral:7b",
                    ApiModel = "mistralai/mistral-7b-instruct:free",
                },
                new()
                {
                    Model = "gemma:7b",
                    ApiModel = "google/gemma-7b-it:free",
                },
                new()
                {
                    Model = "gemma2:9b",
                    ApiModel = "google/gemma-2-9b-it:free",
                },
                new()
                {
                    Model = "qwen2:7b",
                    ApiModel = "qwen/qwen-2-7b-instruct:free",
                },
                new()
                {
                    Model = "phi3:3.8b",
                    ApiModel = "microsoft/phi-3-mini-128k-instruct:free",
                },
                new()
                {
                    Model = "phi3:14b",
                    ApiModel = "microsoft/phi-3-medium-128k-instruct:free",
                },
                new()
                {
                    Model = "phi3:14b",
                    ApiModel = "microsoft/phi-3-medium-128k-instruct:free",
                },
                new()
                {
                    Model = "zephyr:7b",
                    ApiModel = "huggingfaceh4/zephyr-7b-beta:free",
                },
            ]
        },
        new CreateAiProvider
        {
            Name = "groq",
            AiTypeId = "GroqCloud",
            // ApiKey = Environment.GetEnvironmentVariable("GROQ_API_KEY"),
            ApiKeyVar = "GROQ_API_KEY",
            Concurrency = 1,
            Priority = 2,
            Enabled = true,
            Models =
            [
                new() { Model = "gemma:7b", },
                new() { Model = "gemma2:9b", },
                new() { Model = "llama3:8b", },
                new() { Model = "llama3:70b", },
                new() { Model = "llama3.1:8b", },
                new() { Model = "llama3.1:70b", },
                new() { Model = "llama3.1:405b", },
                new() { Model = "mixtral:8x7b", },
            ]
        },
        new CreateAiProvider
        {
            Name = "openrouter",
            AiTypeId = "OpenRouter",
            HeartbeatUrl = "https://openrouter.ai/api/v1/auth/key",
            // ApiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY"),
            ApiKeyVar = "OPENROUTER_API_KEY",
            Concurrency = 1,
            Priority = 0,
            Enabled = true,
            Models =
            [
                new() { Model = "mixtral:8x22b", },
                new() { Model = "llama3:70b" },
                new() { Model = "wizardlm2:7b", },
                new() { Model = "wizardlm2:8x22b", },
                new() { Model = "mistral-small", },
                new() { Model = "mistral-large", },
                new() { Model = "dbrx", },
                new() { Model = "command-r", },
                new() { Model = "command-r-plus", },
                new() { Model = "claude-3-haiku", },
                new() { Model = "claude-3-sonnet", },
                new() { Model = "claude-3-opus", },
                new() { Model = "gemini-pro", },
                new() { Model = "gemini-pro-1.5", },
                new() { Model = "gemini-pro-vision", },
                new() { Model = "gpt-3.5-turbo", },
                new() { Model = "gpt-4", },
                new() { Model = "gpt-4-turbo", },
                new() { Model = "gpt-4-vision", },
            ]
        },
        new CreateAiProvider
        {
            Name = "google",
            AiTypeId = "Google Cloud",
            // ApiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY"),
            ApiKeyVar = "GOOGLE_API_KEY",
            Concurrency = 1,
            Priority = 0,
            Enabled = true,
            Models =
            [
                new() { Model = "gemini-pro", },
                new() { Model = "gemini-pro-1.5", },
                new() { Model = "gemini-pro-vision", },
                new() { Model = "gemini-flash", },
            ]
        },
        new CreateAiProvider
        {
            Name = "mistral",
            AiTypeId = "Mistral AI",
            // ApiKey = Environment.GetEnvironmentVariable("MISTRAL_API_KEY"),
            ApiKeyVar = "MISTRAL_API_KEY",
            Concurrency = 1,
            Priority = 0,
            Enabled = false,
            Models =
            [
                new() { Model = "mistral:7b", },
                new() { Model = "mixtral:8x7b", },
                new() { Model = "mixtral:8x22b", },
                new() { Model = "codestral:22b", },
                new() { Model = "mistral-nemo:12b", },
                new() { Model = "mistral-large:123b", },
                new() { Model = "mistral-embed", },
            ]
        },
    ];

    private CreateAiProvider RunPod = new()
    {
        Name = "runpod-1",
        AiTypeId = "Ollama",
        ApiBaseUrl = "https://i2qjgdyzpi5cev-11434.proxy.runpod.net",
        Concurrency = 1,
        Priority = 0,
        Enabled = true,
        Models = [
            new() { Model = "llama3:8b", },
        ]
    };

    [Test]
    public async Task Init_RunPod()
    {
        var baseUrl = RunPod.ApiBaseUrl;
        var existingClientFactory = HttpUtils.CreateClient; 
        HttpUtils.CreateClient = () =>
        {
            var client = existingClientFactory();
            client.Timeout = TimeSpan.FromSeconds(600);
            return client;
        };

        var res = (Dictionary<string,object>) JSON.parse(await baseUrl.CombineWith("/api/tags").GetStringFromUrlAsync());
        var models = ((List<object>)res["models"]).Cast<string>();
        
        var missingModels = RunPod.Models.Map(x => x.Model).Except(models).ToList();
        foreach (var model in missingModels)
        {
            var requestBody = JSON.stringify(new { name = model });
            "Pulling Model: {0}...".Print(model);

            var stream = await baseUrl.CombineWith($"/api/pull")
                .SendStreamToUrlAsync(requestBody:new MemoryStream(requestBody.ToUtf8Bytes()));

            await using var outStream = Console.OpenStandardOutput();
            await stream.CopyToAsync(outStream);
        }
    }

    [Test]
    public async Task Update_local_RunPod()
    {
        var client = TestUtils.CreateAuthSecretClient();
        await UpdateRunPod(client);
    }

    [Test]
    public async Task Update_public_RunPod()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        await UpdateRunPod(client);
    }

    private async Task UpdateRunPod(JsonApiClient client)
    {
        var apiQuery = await client.ApiAsync(new QueryAiProviders
        {
            Name = RunPod.Name,
        });
        apiQuery.ThrowIfError();
        var existingRunpod = apiQuery.Response!.Results.FirstOrDefault();
        if (existingRunpod == null)
            throw new Exception("RunPod not found");
        
        apiQuery.Response.PrintDump();
        
        var api = await client.ApiAsync(new UpdateAiProvider
        {
            Id = existingRunpod.Id,
            Enabled = RunPod.Enabled,
            Priority = RunPod.Priority,
            Concurrency = RunPod.Concurrency,
            ApiBaseUrl = RunPod.ApiBaseUrl,
            HeartbeatUrl = RunPod.HeartbeatUrl,
            ApiKey = RunPod.ApiKey,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task Create_RunPod()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        var api = await client.ApiAsync(RunPod);
        api.ThrowIfError();
    }

    [Test]
    public async Task RunPod_Offline()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        var api = await client.ApiAsync(new ChangeAiProviderStatus {
            Provider = RunPod.Name,
            Online = false,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task RunPod_Online()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        var api = await client.ApiAsync(new ChangeAiProviderStatus {
            Provider = RunPod.Name,
            Online = true,
        });
        api.ThrowIfError();
    }

    public static async Task CreateAiProviders(JsonApiClient client)
    {
        ClientConfig.UseSystemJson = UseSystemJson.Always;
        foreach (var createAiProvider in AiProviders)
        {
            var api = await client.ApiAsync(createAiProvider);
            api.ThrowIfError();
        }
    }

    public static async Task CreateApiKeys(JsonApiClient client)
    {
        ClientConfig.UseSystemJson = UseSystemJson.Always;

        foreach (var apiKey in TestUtils.ApiKeys)
        {
            var res =await client.ApiAsync(apiKey);
        }
    }

    [Test]
    public async Task Create_Local_ApiKeys_and_AiProviders()
    {
        var client = TestUtils.CreateAuthSecretClient();
        await CreateApiKeys(client);
        await CreateAiProviders(client);
    }

    [Test]
    public async Task Create_Remote_ApiKeys_and_AiProviders()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        await CreateApiKeys(client);
        await CreateAiProviders(client);
    }

    [Test]
    public async Task Create_Remote_AiProvider()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        ClientConfig.UseSystemJson = UseSystemJson.Always;

        var createAiProvider = AiProviders.First(x => x.Name == "amd");
        var api = await client.ApiAsync(createAiProvider);
    }

    [Test]
    public async Task Can_call_protected_API_with_AuthSecret()
    {
        var client = TestUtils.PublicPvqApiClient();

        var api = await client.ApiAsync(new GetActiveProviders());
        api.ThrowIfError();
        
        api.Response.PrintDump();
    }
}