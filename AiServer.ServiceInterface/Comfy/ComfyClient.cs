using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using ServiceStack;
using ServiceStack.Script;
using ServiceStack.Text;

namespace AiServer.ServiceInterface.Comfy;

using System.Net.Http;
using System.Text.Json.Nodes;

public interface IComfyClient : IDisposable
{
    Task<ComfyWorkflowResponse> PromptGenerationAsync(ComfyWorkflowRequest comfyRequest, CancellationToken token, Action<string,ComfyWorkflowStatus>? callback = null, bool waitResult = false);
    Task<ComfyAgentDownloadStatus> DownloadModelAsync(string url, string filename, CancellationToken token, string? apiKey = null, string apiKeyLocation = "");
    
    Task<ComfyAgentDeleteModelResponse> DeleteModelAsync(string name, CancellationToken token);
    Task<ComfyAgentDownloadStatus> GetDownloadStatusAsync(string name, CancellationToken token);
    Task<List<ComfyModel>> GetModelsListAsync(CancellationToken token);
    Task<Stream> DownloadComfyOutputAsync(ComfyFileOutput output, CancellationToken token);

    Task<Stream> DownloadComfyOutputRawAsync(string url, CancellationToken token);
    Task<ComfyWorkflowStatus> GetWorkflowStatusAsync(string promptId, CancellationToken token);
    
    string? GetTemplateContentsByType(ComfyTaskType taskType);

    Task<HttpResponseMessage> GetClientHealthAsync(CancellationToken token);
}

public partial class ComfyClient(HttpClient httpClient) : IComfyClient
{
    private readonly Dictionary<string, JsonObject> metadataMapping = new();
    private readonly List<string> excludedNodeTypes = [
        "PrimitiveNode",
        "Note",
    ];
    private static ScriptContext context = new ScriptContext().Init();

    public string WorkflowTemplatePath { get; set; } = "workflows";
    public string DefaultTextToImageTemplate { get; set; } = "text_to_image.json";
    public string DefaultImageToTextTemplate { get; set; } = "image_to_text.json";
    public string DefaultImageToImageTemplate { get; set; } = "image_to_image.json";
    public string DefaultImageToImageUpscaleTemplate { get; set; } = "image_to_image_upscale.json";
    public string DefaultImageToImageWithMaskTemplate { get; set; } = "image_to_image_with_mask.json";
    public string DefaultTextToSpeechTemplate { get; set; } = "text_to_speech.json";
    public string DefaultTextToAudioTemplate { get; set; } = "text_to_audio.json";
    public string DefaultAudioToTextTemplate { get; set; } = "audio_to_text.json";
    
    public string DefaultSpeechToTextTemplate { get; set; } = "speech_to_text.json";
    
    // Mapping for each workflow type to a template file path, from a matching model name
    public Dictionary<string,string> TextToImageModelOverrides { get; set; } = new();
    public Dictionary<string,string> ImageToTextModelOverrides { get; set; } = new();
    public Dictionary<string,string> ImageToImageModelOverrides { get; set; } = new();
    public Dictionary<string,string> ImageToImageUpscaleModelOverrides { get; set; } = new();
    public Dictionary<string,string> ImageToImageWithMaskModelOverrides { get; set; } = new();
    public Dictionary<string,string> TextToSpeechModelOverrides { get; set; } = new();
    public Dictionary<string,string> TextToAudioModelOverrides { get; set; } = new();
    public Dictionary<string,string> AudioToTextModelOverrides { get; set; } = new();
    public Dictionary<string,string> SpeechToTextModelOverrides { get; set; } = new();
    
    public ConcurrentDictionary<string,Action<string,ComfyWorkflowStatus>> OnGenerationComplete = new();
    private ConcurrentDictionary<string,string?> innerPromptIdToPromptIdMapping = new();
    private ConcurrentDictionary<string,string> promptIdToInnerPromptIdMapping = new();

    private string clientId = Guid.NewGuid().ToString();
    
    ILoggerFactory? loggerFactory;
    
    private ILogger<ComfyClient> Logger => loggerFactory?.CreateLogger<ComfyClient>() ?? new NullLogger<ComfyClient>();

    public ComfyClient(string baseUrl,string? apiKey = null, ILoggerFactory? loggerFactory = null)
        : this(string.IsNullOrEmpty(apiKey) ? new HttpClient
        {
            BaseAddress = new Uri(baseUrl),
            DefaultRequestHeaders = { { "ContentType", "application/json" }, { "Accepts", "application/json" } }
        } : new HttpClient
        {
            BaseAddress = new Uri(baseUrl),
            DefaultRequestHeaders = { { "ContentType", "application/json" }, { "Accepts", "application/json" }, {
                "Authorization", $"Bearer {apiKey}"}}})
    {
        this.loggerFactory = loggerFactory;
        
        // Initialize WebSocket Client
        var webSocketUrl = new Uri(baseUrl.Replace("http", "ws") + "/ws?clientId=" + clientId);
        var webSocketClient = new ComfyWebSocketClient(webSocketUrl, new ClientWebSocket(), apiKey,loggerFactory?.CreateLogger(typeof(ComfyWebSocketClient)));

        // Subscribe to events
        webSocketClient.OnGenerationCompleted = OnGenerationCompleted;
        
        // Start WebSocket connection
        Task.Run(() => webSocketClient.ConnectAndListenAsync());
    }
    public async Task<string> QueueWorkflowAsync(string apiJson, CancellationToken token)
    {
        var response = await httpClient.PostAsync("/prompt", new StringContent(apiJson, Encoding.UTF8, "application/json"), token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        // returns with `prompt_id`
        var promptId = JsonNode.Parse(result)?["prompt_id"];
        if (promptId == null)
            throw new Exception("Invalid response from ComfyUI API");
        return result;
    }
    
    public async Task<ComfyFileInput> UploadImageAssetAsync(Stream fileStream, string filename, CancellationToken token)
    {
        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(fileStream), "image", filename);
        var response = await httpClient.PostAsync("/upload/image?overwrite=true&type=temp", content, token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        return result.FromJson<ComfyFileInput>();
    }
    
    public async Task<ComfyFileInput> UploadAudioAssetAsync(Stream fileStream, string filename, CancellationToken token)
    {
        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(fileStream), "image", filename);
        // Still uses /upload/image endpoint at the time of development, expecting this will change
        var response = await httpClient.PostAsync("/upload/image?overwrite=true&type=temp", content, token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        return result.FromJson<ComfyFileInput>();
    }
    
    public async Task<string> PopulateWorkflowAsync(Dictionary<string,object> args, string templatePath, CancellationToken token)
    {
        var buildInTemplatePath = Path.Combine(WorkflowTemplatePath, templatePath);
        var overrideTemplatePath = Path.Combine("App_Data","overrides", templatePath);
        string useTemplatePath = buildInTemplatePath;
        if (File.Exists(overrideTemplatePath))
            useTemplatePath = overrideTemplatePath;
        else if (!File.Exists(buildInTemplatePath))
            throw new Exception($"Template file not found: {useTemplatePath}");
        // Read template from file for Text to Image
        var template = await File.ReadAllTextAsync(useTemplatePath, token);
        
        // Populate template with request
        var workflowPageResult = new PageResult(context.OneTimePage(template)) {
            Args = args,
            Model = args.GetValueOrDefault("model"),
        };

        // Render template to JSON
        return await workflowPageResult.RenderToStringAsync();
    }
    
    private string GetModelTemplatePath(ComfyTaskType taskType, string? modelName = null)
    {
        string? use;
        return taskType switch
        {
            ComfyTaskType.TextToImage => modelName != null && TextToImageModelOverrides.TryGetValue(modelName, out use) ? use : DefaultTextToImageTemplate,
            ComfyTaskType.ImageToText => modelName != null && ImageToTextModelOverrides.TryGetValue(modelName, out use) ? use : DefaultImageToTextTemplate,
            ComfyTaskType.ImageToImage => modelName != null && ImageToImageModelOverrides.TryGetValue(modelName, out use) ? use : DefaultImageToImageTemplate,
            ComfyTaskType.ImageUpscale => modelName != null && ImageToImageUpscaleModelOverrides.TryGetValue(modelName, out use) ? use : DefaultImageToImageUpscaleTemplate,
            ComfyTaskType.ImageWithMask => modelName != null && ImageToImageWithMaskModelOverrides.TryGetValue(modelName, out use) ? use : DefaultImageToImageWithMaskTemplate,
            ComfyTaskType.TextToSpeech => modelName != null && TextToSpeechModelOverrides.TryGetValue(modelName, out use) ? use : DefaultTextToSpeechTemplate,
            ComfyTaskType.TextToAudio => modelName != null && TextToAudioModelOverrides.TryGetValue(modelName, out use) ? use : DefaultTextToAudioTemplate,
            //ComfyTaskType.AudioToText => modelName != null && AudioToTextModelOverridesTryGetValue(modelName, out use) ? use : DefaultAudioToTextTemplate,
            ComfyTaskType.SpeechToText => modelName != null && SpeechToTextModelOverrides.TryGetValue(modelName, out use) ? use : DefaultSpeechToTextTemplate,
            _ => throw new Exception("Unsupported task type")
        };
    }
    
    public async Task<ComfyWorkflowResponse> PromptGenerationAsync(ComfyWorkflowRequest comfyRequest, CancellationToken token, 
        Action<string,ComfyWorkflowStatus>? callback = null, bool waitResult = false)
    {
        var templatePath = GetModelTemplatePath(comfyRequest.TaskType, comfyRequest.Model);
        
        // Before queuing the workflow, generate a local prompt ID to track to avoid race conditions
        var promptId = Guid.NewGuid().ToString();
        innerPromptIdToPromptIdMapping[promptId] = null;
        if (callback != null)
            await AddOnGenerationCompleteAsync(promptId, callback, token);
        
        // Handle any file uploads required before processing the workflow
        await HandleAssetUploadsAsync(comfyRequest, promptId, token);
        
        var mediaModel = AppData.Instance.MediaModels.FirstOrDefault(x =>
            x.ApiModels?.TryGetValue("ComfyUI", out var comfyModel) == true && comfyModel == comfyRequest.Model);
        var workflowArgs = mediaModel?.WorkflowVars != null
            ? new(mediaModel.WorkflowVars)
            : new Dictionary<string, object>();

        // Read template from file for Text to Image
        var requestArgs = comfyRequest.ToObjectDictionary();
        foreach (var entry in requestArgs)
        {
            if (entry.Value is null or "") continue;
            workflowArgs[entry.Key.ToCamelCase()] = entry.Value;
        }
        
        var workflowJson = await PopulateWorkflowAsync(workflowArgs, templatePath, token);

        if (mediaModel != null)
        {
            AppData.Instance.WriteTextFile($"App_Data/workflows/{mediaModel.Id}.json", workflowJson);
        }
        
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson, token);

        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson, token);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        var result = response.FromJson<ComfyWorkflowResponse>();
        promptIdToInnerPromptIdMapping[result.PromptId] = promptId;
        innerPromptIdToPromptIdMapping[promptId] = result.PromptId;
        // Replace the PromptId with the local promptId
        result.PromptId = promptId;
        
        // If waitResult is true, wait for the result
        if (waitResult)
        {
            var tcs = new TaskCompletionSource<ComfyWorkflowResponse>();
            await AddOnGenerationCompleteAsync(innerPromptId: promptId, (finishedPromptId, status) => {
                tcs.TrySetResult(result);
            }, token);
            return await tcs.Task;
        }
        
        return result;
    }

    private async Task HandleAssetUploadsAsync(ComfyWorkflowRequest request, string promptId, CancellationToken token)
    {
        ComfyFileInput? imageInput = null;
        ComfyFileInput? maskInput = null;
        ComfyFileInput? audioInput = null;
        // Upload image assets if required
        // Using the `request.TaskType` enum, map tasks that require image assets
        if (request.TaskType is ComfyTaskType.ImageToImage or ComfyTaskType.ImageUpscale
            or ComfyTaskType.ImageWithMask or ComfyTaskType.ImageToText && request.Image == null)
        {
            if (request.ImageInput == null)
                throw new ArgumentException("ImageInput is required for this task type");
            var tempFilename = $"image_{promptId}.png";
            imageInput = await UploadImageAssetAsync(request.ImageInput, tempFilename, token);
        }

        if (request.TaskType is ComfyTaskType.ImageWithMask && request.Mask == null)
        {
            if (request.MaskInput == null)
                throw new ArgumentException("MaskInput is required for this task type");
            {
                var tempFilename = $"mask_{promptId}.png";
                maskInput = await UploadImageAssetAsync(request.MaskInput, tempFilename, token);
            }
        }

        if (request.TaskType is ComfyTaskType.SpeechToText && request.Audio == null)
        {
            if (request.AudioInput == null)
                throw new ArgumentException("AudioInput is required for this task type");
            {
                var tempFilename = $"speech_{promptId}.wav";
                audioInput = await UploadAudioAssetAsync(request.AudioInput, tempFilename, token);
            }
        }
        
        
        request.Image = imageInput;
        request.Mask = maskInput;
        request.Audio = audioInput;
        request.ImageInput?.Close();
        request.MaskInput?.Close();
        request.AudioInput?.Close();
    }

    public async Task<ComfyAgentDownloadStatus> GetDownloadStatusAsync(string name, CancellationToken token)
    {
        var response = await httpClient.GetAsync($"/agent/pull?name={name}", token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        return result.FromJson<ComfyAgentDownloadStatus>();
    }
    
    public async Task<List<ComfyModel>> GetModelsListAsync(CancellationToken token)
    {
        var response = await httpClient.GetAsync("/engines/list", token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return result.FromJson<List<ComfyModel>>();
    }

    /// <summary>
    /// Get agent to remotely download a model
    /// </summary>
    /// <param name="url">URL location to download the model from</param>
    /// <param name="filename">Unique name for the model to be saved and used as</param>
    /// <param name="token">The CancellationToken</param>
    /// <param name="apiKey">Optional API Key if the download URL requires API key authentication</param>
    /// <param name="apiKeyLocation">Optional API Key Location config which can be used to populate the API Key in a specific way.
    /// For example, `query:token` will use `token` query string when calling the download URL.
    /// `header:x-api-key` will populate the `x-api-key` request header with the API Key value.
    /// `bearer` will populate the Authorization header and use the API Key as a Bearer token.</param>
    /// <returns></returns>
    public async Task<ComfyAgentDownloadStatus> DownloadModelAsync(string url, string filename, CancellationToken token, string? apiKey = null, string apiKeyLocation = "")
    {
        var path = $"/agent/pull?url={url}&name={filename}";
        if (!string.IsNullOrEmpty(apiKey))
            path += $"&api_key={apiKey}";
        if (!string.IsNullOrEmpty(apiKeyLocation))
            path += $"&api_key_location={apiKeyLocation}";
        var response = await httpClient.PostAsync(path, new StringContent(""), token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        return result.FromJson<ComfyAgentDownloadStatus>();
    }

    private async Task<string> GetPromptHistoryAsync(string id, CancellationToken token)
    {
        var response = await httpClient.GetAsync($"/history/{id}", token);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync(token);
    }
    
    public async Task<ComfyAgentDeleteModelResponse> DeleteModelAsync(string name, CancellationToken token)
    {
        var response = await httpClient.PostAsync($"/agent/delete?name={name}", new StringContent(""), token);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync(token);
        return result.FromJson<ComfyAgentDeleteModelResponse>();
    }
    
    public async Task<Stream> DownloadComfyOutputAsync(ComfyFileOutput output, CancellationToken token)
    {
        var response = await httpClient.GetAsync($"/view?filename={output.Filename}&type={output.Type}&subfolder={output.Subfolder}", token);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStreamAsync(token);
    }

    public async Task<HttpResponseMessage> DownloadComfyOutputAsync(string url, CancellationToken token)
    {
        var response = await httpClient.GetAsync(url, token);
        return response;
    }

    public async Task<Stream> DownloadComfyOutputRawAsync(string url, CancellationToken token)
    {
        var response = await httpClient.GetAsync(url, token);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStreamAsync(token);
    }
    
    private async Task<ComfyWorkflowStatus> GetComfyWorkflowStatusAsync(string promptId, CancellationToken token)
    {
        var statusJson = await GetPromptHistoryAsync(promptId, token);
        var parsedStatus = JsonNode.Parse(statusJson);
        if (parsedStatus == null)
            throw new Exception("Invalid status JSON response");
        
        // Handle the case where the status is an empty object
        if (parsedStatus.AsObject().Count == 0)
            return new ComfyWorkflowStatus();

        ComfyWorkflowStatus status;
        try
        {
            status = ParseWorkflowStatus(parsedStatus.AsObject(), promptId);
        }
        catch (Exception e)
        {
            Logger.LogError(e,"Failed to parse workflow status: {StatusJson}", statusJson);
            throw new Exception("Failed to parse workflow status");
        }
        
        // Convert to ComfyWorkflowStatus
        return status;
    }
    
    public async Task<ComfyWorkflowStatus> GetWorkflowStatusAsync(string promptId, CancellationToken token)
    {
        var comfyPromptId = innerPromptIdToPromptIdMapping[promptId];
        if (comfyPromptId == null)
            throw new Exception("PromptId not found in mapping");
        return await GetComfyWorkflowStatusAsync(comfyPromptId, token);
    }
    
    private readonly object lockObj = new();
    
    private async Task AddOnGenerationCompleteAsync(string innerPromptId, Action<string,ComfyWorkflowStatus> callback, CancellationToken token)
    {
        // Use lock to prevent race conditions
        string? comfyPromptId;
        string? missedPromptId = null;
        var fireMissed = false;
        lock (lockObj)
        {
            if (innerPromptIdToPromptIdMapping.TryGetValue(innerPromptId, out comfyPromptId))
            {
                if (!string.IsNullOrEmpty(comfyPromptId) && missedGenerationCompleteMapping.ContainsKey(comfyPromptId))
                {
                    Logger.LogInformation("Missed AddOnGenerationComplete");
                    missedGenerationCompleteMapping[comfyPromptId] = innerPromptId;
                    missedPromptId = innerPromptId;
                    fireMissed = true;
                }
            }
            if (!fireMissed)
                OnGenerationComplete.AddOrUpdate(innerPromptId, callback, (key, oldValue) => callback);
        }

        if (fireMissed && !string.IsNullOrEmpty(missedPromptId))
        {
            Logger.LogInformation(
                """
                Running Missed AddOnGenerationComplete
                In Process Missed AddOnGenerationComplete
                """);
            var missedStatus = await GetWorkflowStatusAsync(missedPromptId, token);
            Logger.LogInformation(
                """
                Got Missed Status
                PromptId: {comfyPromptId} - InnerPromptId: {innerPromptId}
                """, comfyPromptId, innerPromptId);
            callback.Invoke(innerPromptId, missedStatus);
            Logger.LogInformation("Invoked Missed Callback");
        }
    }

    public string? GetTemplateContentsByType(ComfyTaskType taskType)
    {
        var path = GetModelTemplatePath(taskType);
        return !File.Exists(path) ? null : File.ReadAllText(Path.Combine(WorkflowTemplatePath, path));
    }

    public async Task<HttpResponseMessage> GetClientHealthAsync(CancellationToken token)
    {
        return await httpClient.GetAsync("/", token);
    }

    private readonly ConcurrentDictionary<string,string> missedGenerationCompleteMapping = new();
    private async void OnGenerationCompleted(string comfyPromptId)
    {
        string innerPromptId;
        Action<string, ComfyWorkflowStatus?>? callback = null;
        lock (lockObj)
        {
            if(!promptIdToInnerPromptIdMapping.TryGetValue(comfyPromptId, out innerPromptId))
            {
                Logger.LogInformation("No innerPromptId found for promptId: {comfyPromptId}", comfyPromptId);
                var didAdd = missedGenerationCompleteMapping.TryAdd(comfyPromptId, "");
                if(!didAdd)
                    Logger.LogInformation("Failed to add missedGenerationCompleteMapping for promptId: {comfyPromptId}", comfyPromptId);
                return;
            }
            var hasRegisteredCallback = OnGenerationComplete.TryGetValue(innerPromptId!, out callback);
            
            if (!hasRegisteredCallback)
            {
                Logger.LogInformation("No callback found for promptId: {comfyPromptId}", comfyPromptId);
                Logger.LogInformation("No callback found for innerPromptId: {innerPromptId}", innerPromptId);
                promptIdToInnerPromptIdMapping.TryRemove(comfyPromptId, out _);
                return;
            }
        }

        var status = await GetComfyWorkflowStatusAsync(comfyPromptId, default);
        if(callback != null)
            callback(innerPromptId, status);
        // Remove the callback
        lock (lockObj)
        {
            OnGenerationComplete.TryRemove(comfyPromptId, out _);
        }
    }

    public void Dispose()
    {
        loggerFactory?.Dispose();
        httpClient.Dispose();
    }
}
