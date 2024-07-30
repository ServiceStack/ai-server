using AiServer.ServiceInterface.Comfy;

namespace AiServer.Tests;

using NUnit.Framework;
using System.Net.Http;
using System.Threading.Tasks;
using System.Linq;

[Explicit]
public class CivitAiClientTests
{
    private CivitAiClient client;

    [SetUp]
    public void Setup()
    {
        var httpClientFactory = new DefaultHttpClientFactory();
        client = new CivitAiClient(httpClientFactory, Environment.GetEnvironmentVariable("CIVITAI_API_KEY") ?? ""); 
    }

    [Test]
    public async Task ListModelsAsync_ReturnsModels()
    {
        var request = new CivitListModelsRequest
        {
            Limit = 5,
            Page = 1,
            Sort = "Most Downloaded"
        };

        var response = await client.ListModelsAsync(request);

        Assert.IsNotNull(response);
        Assert.IsNotNull(response.Items);
        Assert.IsTrue(response.Items.Count > 0);
        Assert.IsNotNull(response.Metadata);
        Assert.AreEqual(5, response.Items.Count);
    }

    [Test]
    public async Task GetModelDetailsAsync_ReturnsModelDetails()
    {
        int modelId = 1;

        var modelDetails = await client.GetModelDetailsAsync(modelId);

        Assert.IsNotNull(modelDetails);
        Assert.AreEqual(modelId, modelDetails.Id);
        Assert.IsNotNull(modelDetails.Name);
        Assert.IsNotNull(modelDetails.ModelVersions);
    }

    [Test]
    public async Task GetModelVersionDetailsAsync_ReturnsModelVersionDetails()
    {
        // Using a known model version ID from CivitAi
        int modelVersionId = 552771;

        var versionDetails = await client.GetModelVersionDetailsAsync(modelVersionId);

        Assert.IsNotNull(versionDetails);
        Assert.AreEqual(modelVersionId, versionDetails.Id);
        Assert.IsNotNull(versionDetails.Name);
        Assert.IsNotNull(versionDetails.Files);
        Assert.That(versionDetails.Files.Count, Is.GreaterThan(0));
    }

    [Test]
    public async Task GetModelVersionByHashAsync_ReturnsModelVersionDetails()
    {
        string hash = "E80275529B041EE10796CAD5069A56AFD0190894FA9AFD58E1C1C19DCD3352E0";

        var versionDetails = await client.GetModelVersionByHashAsync(hash);

        Assert.IsNotNull(versionDetails);
        Assert.IsNotNull(versionDetails.Files);
        Assert.That(versionDetails.Files.Count, Is.GreaterThan(0));
    }
}

public class DefaultHttpClientFactory : IHttpClientFactory
{
    public HttpClient CreateClient(string name)
    {
        return new HttpClient();
    }
}