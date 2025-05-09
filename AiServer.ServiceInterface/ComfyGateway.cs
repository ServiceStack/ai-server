using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class ComfyGateway(ILogger<ComfyGateway> log, IHttpClientFactory clientFactory, ComfyMetadata metadata)
{
    public HttpClient CreateHttpClient(string url, string? apiKey=null)
    {
        HttpClient? client = null;
        try
        {
            client = clientFactory.CreateClient(nameof(ComfyGateway));
            client.BaseAddress = new Uri(url);
            if (apiKey is { Length: > 0 })
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            }
            return client;
        }
        catch
        {
            client?.Dispose();
            throw;
        }
    }
    
    public async Task<Dictionary<string, NodeInfo>> GetNodeDefinitionsAsync(string url, string apiKey)
    {
        return metadata.NodeDefinitions.GetValueOrDefault(url)
            ?? await metadata.LoadNodeDefinitionsAsync(CreateHttpClient(url, apiKey));
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
        var nodeDefs = await GetNodeDefinitionsAsync(url, apiKey);
        var workflowInfo = ComfyWorkflowParser.Parse(json, workflow, nodeDefs);
        return workflowInfo ?? throw HttpError.NotFound($"Could not parse {workflow}");
    }

    public async Task<string> ExecuteApiPromptAsync(string url, string? apiKey, string promptJson)
    {
        using var client = CreateHttpClient(url, apiKey);
        var response = await client.PostAsync("/api/prompt",
            new StringContent(promptJson, Encoding.UTF8, "application/json"));

        if (!response.IsSuccessStatusCode)
        {
            var errorJson = await response.Content.ReadAsStringAsync();
            try
            {
                errorJson = JsonSerializer.Serialize(JsonSerializer.Deserialize<JsonNode>(errorJson),
                    new JsonSerializerOptions { WriteIndented = true });
            }
            catch {}
            log.LogError("Error executing ComfyUI API Prompt: {StatusCode} {HttpError}\n{ErrorResponse}",
                response.StatusCode, response.ReasonPhrase, errorJson);
        }

        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result;
    }

    public async Task<string> GetPromptHistoryAsync(string url, string? apiKey, string promptId, CancellationToken token)
    {
        using var client = CreateHttpClient(url, apiKey);
        var response = await client.GetAsync($"/api/history/{promptId}", token);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync(token);
    }
    
    
}
