using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class PingTests
{
    [Test]
    public async Task Can_check_all_local_providers()
    {
        var client = TestUtils.CreateAdminClient();
        await CheckAllActiveProviders(client);
    }

    [Test]
    public async Task Can_check_all_public_providers()
    {
        var client = TestUtils.CreatePublicAdminClient();
        await CheckAllActiveProviders(client);
    }

    private static async Task CheckAllActiveProviders(JsonApiClient client)
    {
        var activeProviders = await client.GetAsync(new GetActiveProviders());

        foreach (var provider in activeProviders.Results)
        {
            var model = provider.Models.First().Model;
            $"Checking {provider.Name} {model}...".Print();
            
            var request = new OpenAiChat
            {
                Model = model,
                Messages = [
                    new() { Role = "user", Content = "1+1=" },
                ],
                MaxTokens = 2,
                Stream = false,
            };

            var api = await client.ApiAsync(new ChatAiProvider
            {
                Provider = provider.Name,
                Model = model,
                Request = request,
            });

            api.Error?.PrintDump();
            
            var body = api.Response.GetBody();

            $"{provider.Name} {model} says 1+1={body}\n".Print();
            Assert.That(body, Is.Not.Null);
        }
    }
}
