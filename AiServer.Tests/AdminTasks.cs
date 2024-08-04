using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;

namespace AiServer.Tests;

[Explicit("Adhoc Admin Tasks")]
public class AdminTasks
{
    [Test]
    public async Task Add_Mistral_Nemo()
    {
        var model = "mistral-nemo";
        AdminAddModel newModel = new()
        {
            Model = new() {
                Name = model,
                Parameters = "12B",
            },
            ApiTypes = new()
            {
                ["openrouter"] = new() { Name = model, Value = "mistralai/mistral-nemo" },
                ["mistral"] = new() { Name = model, Value = "open-mistral-nemo" },
            },
            ApiProviders = new()
            {
                ["macbook"] = new() { Model = model },
                ["amd"] = new() { Model = model },
                ["supermicro"] = new() { Model = model },
                ["dell"] = new() { Model = model },
                ["openrouter"] = new() { Model = model },
            },
        };

        // var client = TestUtils.CreateAdminClient();
        var client = TestUtils.CreatePublicAdminClient();
        var response = await client.ApiAsync(newModel);
        response.ThrowIfError();
    }
    
    [Test]
    public async Task Add_DeepSeek_Coder2_236B()
    {
        var model = "deepseek-coder-v2:236b";
        AdminAddModel newModel = new()
        {
            Model = new() {
                Name = model,
                Parameters = "236B",
            },
            ApiTypes = new()
            {
                ["openrouter"] = new() { Name = model, Value = "deepseek/deepseek-coder" },
            },
            ApiProviders = new()
            {
                ["openrouter"] = new() { Model = model },
            },
        };

        // var client = TestUtils.CreateAdminClient();
        var client = TestUtils.CreatePublicAdminClient();
        var response = await client.ApiAsync(newModel);
        response.ThrowIfError();
    }
}
