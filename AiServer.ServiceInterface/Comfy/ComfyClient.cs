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
    Task<ComfyWorkflowResponse> PromptGeneration(ComfyWorkflowRequest comfyRequest, Action<string,ComfyWorkflowStatus>? callback = null, bool waitResult = false);
    Task<ComfyAgentDownloadStatus> DownloadModelAsync(string url, string filename, string apiKey = null, string apiKeyLocation = "");
    
    Task<ComfyAgentDeleteModelResponse> DeleteModelAsync(string name);
    Task<ComfyAgentDownloadStatus> GetDownloadStatusAsync(string name);
    Task<List<ComfyModel>> GetModelsListAsync();
    Task<Stream> DownloadComfyOutputAsync(ComfyFileOutput output);

    Task<Stream> DownloadComfyOutputRawAsync(string url);
    Task<ComfyWorkflowStatus> GetWorkflowStatusAsync(string promptId);
    
    string? GetTemplateContentsByType(ComfyTaskType taskType);

    Task<HttpResponseMessage> GetClientHealthAsync();
}

public partial class ComfyClient(HttpClient httpClient) : IComfyClient
{
    private readonly Dictionary<string, JsonObject> metadataMapping = new();
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
    private ConcurrentDictionary<string,string> innerPromptIdToPromptIdMapping = new();
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
        // Initialize ComfyWorkflowMapping
        comfyWorkflowMapping[ComfyTaskType.TextToImage] = DefaultTextToImageTemplate;
        comfyWorkflowMapping[ComfyTaskType.ImageToImage] = DefaultImageToImageTemplate;
        comfyWorkflowMapping[ComfyTaskType.ImageToImageUpscale] = DefaultImageToImageUpscaleTemplate;
        comfyWorkflowMapping[ComfyTaskType.ImageToImageWithMask] = DefaultImageToImageWithMaskTemplate;
        comfyWorkflowMapping[ComfyTaskType.ImageToText] = DefaultImageToTextTemplate;
        comfyWorkflowMapping[ComfyTaskType.TextToSpeech] = DefaultTextToSpeechTemplate;
        comfyWorkflowMapping[ComfyTaskType.TextToAudio] = DefaultTextToAudioTemplate;
        comfyWorkflowMapping[ComfyTaskType.SpeechToText] = DefaultSpeechToTextTemplate;
        
        this.loggerFactory = loggerFactory;
        
        // Initialize WebSocket Client
        var webSocketUrl = new Uri(baseUrl.Replace("http", "ws") + "/ws?clientId=" + clientId);
        var webSocketClient = new ComfyWebSocketClient(webSocketUrl, new ClientWebSocket(), apiKey,loggerFactory?.CreateLogger(typeof(ComfyWebSocketClient)));

        // Subscribe to events
        webSocketClient.OnGenerationCompleted = OnGenerationCompleted;
        
        // Start WebSocket connection
        Task.Run(() => webSocketClient.ConnectAndListenAsync());
    }
    
    private readonly Dictionary<ComfyTaskType, string> comfyWorkflowMapping = new();

    public async Task<string> QueueWorkflowAsync(string apiJson)
    {
        var response = await httpClient.PostAsync("/prompt", new StringContent(apiJson, Encoding.UTF8, "application/json"));
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        // returns with `prompt_id`
        var promptId = JsonNode.Parse(result)?["prompt_id"];
        if (promptId == null)
            throw new Exception("Invalid response from ComfyUI API");
        return result;
    }
    
    public async Task<ComfyFileInput> UploadImageAssetAsync(Stream fileStream, string filename)
    {
        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(fileStream), "image", filename);
        var response = await httpClient.PostAsync("/upload/image?overwrite=true&type=temp", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result.FromJson<ComfyFileInput>();
    }
    
    public async Task<ComfyFileInput> UploadAudioAssetAsync(Stream fileStream, string filename)
    {
        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(fileStream), "image", filename);
        // Still uses /upload/image endpoint at the time of development, expecting this will change
        var response = await httpClient.PostAsync("/upload/image?overwrite=true&type=temp", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result.FromJson<ComfyFileInput>();
    }
    
    public async Task<string> PopulateWorkflow(ComfyWorkflowRequest request, string templatePath)
    {
        // Read template from file for Text to Image
        var template = await File.ReadAllTextAsync(Path.Combine(WorkflowTemplatePath, templatePath));
        // Populate template with request
        var workflowPageResult = new PageResult(context.OneTimePage(template))
        {
            Args = request.ToObjectDictionary(),
        };

        // Render template to JSON
        return await workflowPageResult.RenderToStringAsync();
    }
    
    private string GetModelTemplatePath(ComfyTaskType taskType, string? modelName = null)
    {
        if(!comfyWorkflowMapping.TryGetValue(taskType, out var templatePath))
            throw new Exception($"No default template found for task type {taskType}");
        
        if(modelName == null)
            return templatePath;
        
        return taskType switch
        {
            ComfyTaskType.TextToImage => TextToImageModelOverrides.ContainsKey(modelName) ? TextToImageModelOverrides[modelName] : DefaultTextToImageTemplate,
            ComfyTaskType.ImageToText => ImageToTextModelOverrides.ContainsKey(modelName) ? ImageToTextModelOverrides[modelName] : DefaultImageToTextTemplate,
            ComfyTaskType.ImageToImage => ImageToImageModelOverrides.ContainsKey(modelName) ? ImageToImageModelOverrides[modelName] : DefaultImageToImageTemplate,
            ComfyTaskType.ImageToImageUpscale => ImageToImageUpscaleModelOverrides.ContainsKey(modelName) ? ImageToImageUpscaleModelOverrides[modelName] : DefaultImageToImageUpscaleTemplate,
            ComfyTaskType.ImageToImageWithMask => ImageToImageWithMaskModelOverrides.ContainsKey(modelName) ? ImageToImageWithMaskModelOverrides[modelName] : DefaultImageToImageWithMaskTemplate,
            ComfyTaskType.TextToSpeech => TextToSpeechModelOverrides.ContainsKey(modelName) ? TextToSpeechModelOverrides[modelName] : DefaultTextToSpeechTemplate,
            ComfyTaskType.TextToAudio => TextToAudioModelOverrides.ContainsKey(modelName) ? TextToAudioModelOverrides[modelName] : DefaultTextToAudioTemplate,
            //ComfyTaskType.AudioToText => AudioToTextModelOverrides.ContainsKey(modelName) ? AudioToTextModelOverrides[modelName] : DefaultAudioToTextTemplate,
            ComfyTaskType.SpeechToText => SpeechToTextModelOverrides.ContainsKey(modelName) ? SpeechToTextModelOverrides[modelName] : DefaultSpeechToTextTemplate,
            _ => throw new Exception("Unsupported task type")
        };
    }
    
    public async Task<ComfyWorkflowResponse> PromptGeneration(ComfyWorkflowRequest comfyRequest, 
        Action<string,ComfyWorkflowStatus>? callback = null, bool waitResult = false)
    {
        var templatePath = GetModelTemplatePath(comfyRequest.TaskType, comfyRequest.Model);
        
        // Before queuing the workflow, generate a local prompt ID to track to avoid race conditions
        var promptId = Guid.NewGuid().ToString();
        innerPromptIdToPromptIdMapping[promptId] = null;
        if(callback != null)
            AddOnGenerationComplete(promptId, callback);
        
        // Handle any file uploads required before processing the workflow
        await HandleAssetUploads(comfyRequest, promptId);
        
        // Read template from file for Text to Image
        var workflowJson = await PopulateWorkflow(comfyRequest, templatePath);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);

        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
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
            AddOnGenerationComplete(innerPromptId: promptId, (finishedPromptId, status) =>
            {
                tcs.TrySetResult(result);
            });
            return await tcs.Task;
        }
        
        return result;
    }

    private async Task HandleAssetUploads(ComfyWorkflowRequest request, string promptId)
    {
        ComfyFileInput? imageInput = null;
        ComfyFileInput? maskInput = null;
        ComfyFileInput? speechInput = null;
        // Upload image assets if required
        // Using the `request.TaskType` enum, map tasks that require image assets
        if (request.TaskType is ComfyTaskType.ImageToImage or ComfyTaskType.ImageToImageUpscale
            or ComfyTaskType.ImageToImageWithMask or ComfyTaskType.ImageToText && request.Image == null)
        {
            if (request.ImageInput == null)
                throw new ArgumentException("ImageInput is required for this task type");
            var tempFilename = $"image_{promptId}.png";
            imageInput = await UploadImageAssetAsync(request.ImageInput, tempFilename);
        }

        if (request.TaskType is ComfyTaskType.ImageToImageWithMask && request.Mask == null)
        {
            if (request.MaskInput == null)
                throw new ArgumentException("MaskInput is required for this task type");
            {
                var tempFilename = $"mask_{promptId}.png";
                maskInput = await UploadImageAssetAsync(request.MaskInput, tempFilename);
            }
        }

        if (request.TaskType is ComfyTaskType.SpeechToText && request.Speech == null)
        {
            if (request.SpeechInput == null)
                throw new ArgumentException("SpeechInput is required for this task type");
            {
                var tempFilename = $"speech_{promptId}.wav";
                speechInput = await UploadAudioAssetAsync(request.SpeechInput, tempFilename);
            }
        }
        
        
        request.Image = imageInput;
        request.Mask = maskInput;
        request.Speech = speechInput;
    }

    public async Task<ComfyAgentDownloadStatus> GetDownloadStatusAsync(string name)
    {
        var response = await httpClient.GetAsync($"/agent/pull?name={name}");
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result.FromJson<ComfyAgentDownloadStatus>();
    }
    
    public async Task<List<ComfyModel>> GetModelsListAsync()
    {
        var response = await httpClient.GetAsync("/engines/list");
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return result.FromJson<List<ComfyModel>>();
    }
    
    /// <summary>
    /// Get agent to remotely download a model
    /// </summary>
    /// <param name="url">URL location to download the model from</param>
    /// <param name="filename">Unique name for the model to be saved and used as</param>
    /// <param name="apiKey">Optional API Key if the download URL requires API key authentication</param>
    /// <param name="apiKeyLocation">Optional API Key Location config which can be used to populate the API Key in a specific way.
    /// For example, `query:token` will use `token` query string when calling the download URL.
    /// `header:x-api-key` will populate the `x-api-key` request header with the API Key value.
    /// `bearer` will populate the Authorization header and use the API Key as a Bearer token.</param>
    /// <returns></returns>
    public async Task<ComfyAgentDownloadStatus> DownloadModelAsync(string url, string filename, string apiKey = null, string apiKeyLocation = "")
    {
        var path = $"/agent/pull?url={url}&name={filename}";
        if (!string.IsNullOrEmpty(apiKey))
            path += $"&api_key={apiKey}";
        if (!string.IsNullOrEmpty(apiKeyLocation))
            path += $"&api_key_location={apiKeyLocation}";
        var response = await httpClient.PostAsync(path, new StringContent(""));
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result.FromJson<ComfyAgentDownloadStatus>();
    }

    private async Task<string> GetPromptHistory(string id)
    {
        var response = await httpClient.GetAsync($"/history/{id}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
    
    public async Task<ComfyAgentDeleteModelResponse> DeleteModelAsync(string name)
    {
        var response = await httpClient.PostAsync($"/agent/delete?name={name}", new StringContent(""));
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result.FromJson<ComfyAgentDeleteModelResponse>();
    }
    
    public async Task<Stream> DownloadComfyOutputAsync(ComfyFileOutput output)
    {
        var response = await httpClient.GetAsync($"/view?filename={output.Filename}&type={output.Type}&subfolder={output.Subfolder}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStreamAsync();
    }

    public async Task<Stream> DownloadComfyOutputRawAsync(string url)
    {
        var response = await httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStreamAsync();
    }
    
    private async Task<ComfyWorkflowStatus> GetComfyWorkflowStatusAsync(string promptId)
    {
        var statusJson = await GetPromptHistory(promptId);
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
            Logger?.LogError(e,"Failed to parse workflow status: {StatusJson}", statusJson);
            throw new Exception("Failed to parse workflow status");
        }
        
        // Convert to ComfyWorkflowStatus
        return status;
    }
    
    public async Task<ComfyWorkflowStatus> GetWorkflowStatusAsync(string promptId)
    {
        var comfyPromptId = innerPromptIdToPromptIdMapping[promptId];
        if (comfyPromptId == null)
            throw new Exception("PromptId not found in mapping");
        return await GetComfyWorkflowStatusAsync(comfyPromptId);
    }
    
    private readonly object lockObj = new();
    
    private void AddOnGenerationComplete(string innerPromptId, Action<string,ComfyWorkflowStatus> callback)
    {
        // Use lock to prevent race conditions
        string? comfyPromptId;
        string? missedPromptId = null;
        var fireMissed = false;
        lock (lockObj)
        {
            if (innerPromptIdToPromptIdMapping.TryGetValue(innerPromptId, out comfyPromptId))
            {
                if(!string.IsNullOrEmpty(comfyPromptId) && missedGenerationCompleteMapping.ContainsKey(comfyPromptId))
                {
                    Console.WriteLine("Missed AddOnGenerationComplete");
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
            Console.WriteLine("Running Missed AddOnGenerationComplete");
            Task.Run(async () =>
            {
                Console.WriteLine("In Process Missed AddOnGenerationComplete");
                var missedStatus = await GetWorkflowStatusAsync(missedPromptId);
                Console.WriteLine("Got Missed Status");
                Console.WriteLine($"PromptId: {comfyPromptId} - InnerPromptId: {innerPromptId}");
                callback?.Invoke(innerPromptId, missedStatus);
                Console.WriteLine("Invoked Missed Callback");
            });
        }
    }

    public string? GetTemplateContentsByType(ComfyTaskType taskType)
    {
        var path = GetModelTemplatePath(taskType);
        return !File.Exists(path) ? null : File.ReadAllText(Path.Combine(WorkflowTemplatePath, path));
    }

    public async Task<HttpResponseMessage> GetClientHealthAsync()
    {
        return await httpClient.GetAsync("/");
    }

    private ConcurrentDictionary<string,string> missedGenerationCompleteMapping = new();

    private async void OnGenerationCompleted(string comfyPromptId)
    {
        string innerPromptId;
        Action<string, ComfyWorkflowStatus?>? callback = null;
        lock (lockObj)
        {
            if(!promptIdToInnerPromptIdMapping.TryGetValue(comfyPromptId, out innerPromptId))
            {
                Console.WriteLine($"No innerPromptId found for promptId: {comfyPromptId}");
                var didAdd = missedGenerationCompleteMapping.TryAdd(comfyPromptId, "");
                if(!didAdd)
                    Console.WriteLine($"Failed to add missedGenerationCompleteMapping for promptId: {comfyPromptId}");
                return;
            }
            var hasRegisteredCallback = OnGenerationComplete.TryGetValue(innerPromptId!, out callback);
            
            if (!hasRegisteredCallback)
            {
                Console.WriteLine($"No callback found for promptId: {comfyPromptId}");
                Console.WriteLine($"No callback found for innerPromptId: {innerPromptId}");
                promptIdToInnerPromptIdMapping.TryRemove(comfyPromptId, out _);
                return;
            }
        }

        var status = await GetComfyWorkflowStatusAsync(comfyPromptId);
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
