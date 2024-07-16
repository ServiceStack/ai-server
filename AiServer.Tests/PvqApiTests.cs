using System.Net;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class PvqApiTests
{
    private static List<CreateApiProvider> ApiProviders =
    [
        new CreateApiProvider
        {
            Name = "macbook",
            ApiTypeId = 1,
            ApiBaseUrl = "https://macbook.pvq.app",
            Concurrency = 1,
            Priority = 4,
            Enabled = true,
            Models =
            [
                new() { Model = "gemma:2b", },
                new() { Model = "qwen:4b", },
                new() { Model = "phi3", },
                new() { Model = "mistral", },
                new() { Model = "llama3:8b", },
                new() { Model = "gemma", },
                new() { Model = "codellama", },
            ]
        },
        new CreateApiProvider
        {
            Name = "amd",
            ApiTypeId = 1,
            ApiBaseUrl = "https://amd.pvq.app",
            Concurrency = 1,
            Priority = 4,
            Enabled = true,
            Models =
            [
                new() { Model = "phi3", },
                new() { Model = "mistral", },
                new() { Model = "llama3:8b", },
                new() { Model = "codellama", },
                new() { Model = "gemma", },
                new() { Model = "gemma2:27b", },
            ]
        },
        new CreateApiProvider
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
                new() { Model = "llama3:8b", },
                new() { Model = "gemma", },
                new() { Model = "codellama", },
                new() { Model = "mixtral", },
                new() { Model = "command-r", },
            ]
        },
        new CreateApiProvider
        {
            Name = "dell",
            ApiTypeId = 1,
            ApiBaseUrl = "https://dell.pvq.app",
            Concurrency = 1,
            Priority = 0,
            Enabled = true,
            Models = [
                new() { Model = "phi3", },
                new() { Model = "mistral", },
                new() { Model = "llama3:8b", },
                new() { Model = "gemma", },
                new() { Model = "gemma2:27b", },
                new() { Model = "codellama", },
                new() { Model = "mixtral", },
                new() { Model = "command-r", },
            ]
        },
        new CreateApiProvider
        {
            Name = "openrouter-free",
            ApiTypeId = 2,
            ApiKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY"),
            Concurrency = 1,
            Priority = 1,
            Enabled = true,
            Models =
            [
                new()
                {
                    Model = "mistral",
                    ApiModel = "mistralai/mistral-7b-instruct:free",
                },
                new()
                {
                    Model = "gemma",
                    ApiModel = "google/gemma-7b-it:free",
                },
            ]
        },
        new CreateApiProvider
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
            ]
        },
        new CreateApiProvider
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
        new CreateApiProvider
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
            ]
        },
        new CreateApiProvider
        {
            Name = "mistral",
            ApiTypeId = 4,
            ApiKey = Environment.GetEnvironmentVariable("MISTRAL_API_KEY"),
            Concurrency = 1,
            Priority = 0,
            Enabled = false,
            Models =
            [
                new() { Model = "mistral", },
                new() { Model = "mixtral", },
                new() { Model = "mixtral:8x22b", },
                new() { Model = "mistral-small", },
                new() { Model = "mistral-large", },
                new() { Model = "mistral-embed", },
            ]
        },
    ];

    private CreateApiProvider RunPod = new()
    {
        Name = "runpod-1",
        ApiTypeId = 1,
        ApiBaseUrl = "https://i2qjgdyzpi5cev-11434.proxy.runpod.net",
        Concurrency = 1,
        Priority = 0,
        Enabled = true,
        Models = [
            new() { Model = "llama3:8b", },
            new() { Model = "codellama", },
            new() { Model = "mixtral", },
            new() { Model = "command-r", },
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
        var apiQuery = await client.ApiAsync(new QueryApiProviders
        {
            Name = RunPod.Name,
        });
        apiQuery.ThrowIfError();
        var existingRunpod = apiQuery.Response!.Results.FirstOrDefault();
        if (existingRunpod == null)
            throw new Exception("RunPod not found");
        
        apiQuery.Response.PrintDump();
        
        var api = await client.ApiAsync(new UpdateApiProvider
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
        var api = await client.ApiAsync(new ChangeApiProviderStatus {
            Provider = RunPod.Name,
            Online = false,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task RunPod_Online()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        var api = await client.ApiAsync(new ChangeApiProviderStatus {
            Provider = RunPod.Name,
            Online = true,
        });
        api.ThrowIfError();
    }

    private static async Task CreateAuthProviders(JsonApiClient client)
    {
        ClientConfig.UseSystemJson = UseSystemJson.Always;
        foreach (var createApiProvider in ApiProviders)
        {
            var api = await client.ApiAsync(createApiProvider);
            api.ThrowIfError();
        }
    }

    private static async Task CreateApiKeys(JsonApiClient client)
    {
        ClientConfig.UseSystemJson = UseSystemJson.Always;

        foreach (var apiKey in TestUtils.ApiKeys)
        {
            await client.ApiAsync(apiKey);
        }
    }

    [Test]
    public async Task Create_Local_ApiKeys_and_ApiProviders()
    {
        var client = TestUtils.CreateAuthSecretClient();
        await CreateApiKeys(client);
        await CreateAuthProviders(client);
    }

    [Test]
    public async Task Create_Remote_ApiKeys_and_ApiProviders()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        await CreateApiKeys(client);
        await CreateAuthProviders(client);
    }

    [Test]
    public async Task Create_Remote_ApiProvider()
    {
        var client = TestUtils.CreatePublicAuthSecretClient();
        ClientConfig.UseSystemJson = UseSystemJson.Always;

        var createApiProvider = ApiProviders.First(x => x.Name == "amd");
        var api = await client.ApiAsync(createApiProvider);
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