using System.Net.Http.Headers;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class ComfyGateway(IHttpClientFactory clientFactory)
{
    public HttpClient CreateHttpClient(string url, string apiKey)
    {
        HttpClient? client = null;
        try
        {
            client = clientFactory.CreateClient(nameof(ComfyGateway));
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            return client;
        }
        catch
        {
            client?.Dispose();
            throw;
        }
    }

    public async Task<List<ComfyFileRef>> GetWorkflowsAsync(string url, string apiKey)
    {
        using var client = CreateHttpClient(url, apiKey);

        var json = await client.GetStringAsync("/api/userdata?dir=workflows&recurse=true&split=false&full_info=true");
        var ret = json.FromJson<List<ComfyFileRef>>();
        return ret;
    }

    public async Task<string> GetWorkflowJsonAsync(string url, string apiKey, string workflow)
    {
        using var client = CreateHttpClient(url, apiKey);
        var json = await client.GetStringAsync($"/api/userdata/workflows%2F{workflow}");
        return json;
    }

    public async Task<ComfyWorkflowInfo> GetWorkflowInfoAsync(string url, string apiKey, string workflow)
    {
        var json = await GetWorkflowJsonAsync(url, apiKey, workflow);
        var workflowInfo = ComfyWorkflowParser.Parse(workflow, json);
        return workflowInfo ?? throw HttpError.NotFound($"Could not parse {workflow}");
    }

}
