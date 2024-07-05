using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Script;
using ServiceStack.Text;

namespace AiServer.ServiceInterface.Comfy;

using System.Net.Http;
using System.Text.Json.Nodes;

public interface IComfyClient
{
    Task<ComfyWorkflowResponse> PromptGeneration<T>(T comfyRequest, bool waitResult = false);
    Task<ComfyAgentDownloadStatus> DownloadModelAsync(string url, string filename, string apiKey = null, string apiKeyLocation = "");
    Task<ComfyAgentDownloadStatus> GetDownloadStatusAsync(string name);
    Task<List<ComfyModel>> GetModelsListAsync();
    Task<Stream> DownloadComfyOutputAsync(ComfyFileOutput output);
    Task<ComfyWorkflowStatus> GetWorkflowStatusAsync(string promptId);
    
    void AddOnGenerationComplete(string innerPromptId, Action<string,ComfyWorkflowStatus> callback);
    
    string? GetTemplateContentsByType<T>();
}

public partial class ComfyClient(HttpClient httpClient) : IComfyClient
{
    private readonly Dictionary<string, JsonObject> metadataMapping = new();
    private static ScriptContext context = new ScriptContext().Init();

    public static Action<string> LogMessage;

    public string WorkflowTemplatePath { get; set; } = "workflows";
    public string TextToImageTemplate { get; set; } = "text_to_image.json";
    public string ImageToTextTemplate { get; set; } = "image_to_text.json";
    public string ImageToImageTemplate { get; set; } = "image_to_image.json";
    public string ImageToImageUpscaleTemplate { get; set; } = "image_to_image_upscale.json";
    public string ImageToImageWithMaskTemplate { get; set; } = "image_to_image_with_mask.json";
    public string TextToSpeechTemplate { get; set; } = "text_to_speech.json";
    public string TextToAudioTemplate { get; set; } = "text_to_audio.json";
    public string AudioToTextTemplate { get; set; } = "audio_to_text.json";
    
    public string SpeechToTextTemplate { get; set; } = "speech_to_text.json";
    
    public ConcurrentDictionary<string,Action<string,ComfyWorkflowStatus>> OnGenerationComplete = new();
    private ConcurrentDictionary<string,string> innerPromptIdToPromptIdMapping = new();
    private ConcurrentDictionary<string,string> promptIdToInnerPromptIdMapping = new();

    private string clientId = Guid.NewGuid().ToString();

    public ComfyClient(string baseUrl,string? apiKey = null)
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
        comfyWorkflowMapping[typeof(ComfyTextToImage)] = TextToImageTemplate;
        comfyWorkflowMapping[typeof(ComfyImageToImage)] = ImageToImageTemplate;
        comfyWorkflowMapping[typeof(ComfyImageToImageUpscale)] = ImageToImageUpscaleTemplate;
        comfyWorkflowMapping[typeof(ComfyImageToImageWithMask)] = ImageToImageWithMaskTemplate;
        comfyWorkflowMapping[typeof(ComfyImageToText)] = ImageToTextTemplate;
        comfyWorkflowMapping[typeof(ComfyTextToSpeech)] = TextToSpeechTemplate;
        comfyWorkflowMapping[typeof(ComfyTextToAudio)] = TextToAudioTemplate;
        comfyWorkflowMapping[typeof(ComfySpeechToText)] = SpeechToTextTemplate;
        
        // Initialize WebSocket Client
        var webSocketUrl = new Uri(baseUrl.Replace("http", "ws") + "/ws?clientId=" + clientId);
        webSocketClient = new ComfyWebSocketClient(webSocketUrl, new ClientWebSocket(), apiKey);
        
        // Subscribe to events
        webSocketClient.OnGenerationCompleted = OnGenerationCompleted;
        
        // Start WebSocket connection
        Task.Run(() => webSocketClient.ConnectAndListenAsync());
    }
    
    private readonly Dictionary<Type, string> comfyWorkflowMapping = new();
    private readonly ComfyWebSocketClient? webSocketClient;

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
    
    public async Task<ComfyImageInput> UploadImageAssetAsync(Stream fileStream, string filename)
    {
        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(fileStream), "image", filename);
        var response = await httpClient.PostAsync("/upload/image?overwrite=true&type=temp", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        return result.FromJson<ComfyImageInput>();
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
    
    public async Task<string> PopulateWorkflow<T>(T request, string templatePath)
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
    
    public async Task<ComfyWorkflowResponse> PromptGeneration<T>(T comfyRequest, bool waitResult = false)
    {
        // Check if the request type is supported
        if (!comfyWorkflowMapping.ContainsKey(typeof(T)))
            throw new Exception($"Unsupported request type: {typeof(T).Name}");
        var templatePath = comfyWorkflowMapping[typeof(T)];
        // Read template from file for Text to Image
        var workflowJson = await PopulateWorkflow(comfyRequest, templatePath);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Before queuing the workflow, generate a local prompt ID to track to avoid race conditions
        var promptId = Guid.NewGuid().ToString();
        innerPromptIdToPromptIdMapping[promptId] = null;
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
    
    public async Task<ComfyWorkflowResponse> GenerateTextToSpeechAsync(ComfyTextToSpeech request)
    {
        return await PromptGeneration(request);
    }
    
    public async Task<ComfyWorkflowResponse> GenerateSpeechToTextAsync(ComfySpeechToText request)
    {
        if (request.AudioFile == null)
            throw new Exception("Audio input is required for Speech to Text");
        
        // Upload audio asset
        request.Audio = await UploadAudioAssetAsync(request.AudioFile, $"speech2text_{Guid.NewGuid()}.wav");
        
        return await PromptGeneration(request);
    }
    
    public async Task<ComfyWorkflowResponse> GenerateTextToAudioAsync(StableAudioTextToAudio request)
    {
        var comfyRequest = request.ToComfy();
        return await PromptGeneration(comfyRequest);
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToTextAsync(StableDiffusionImageToText request)
    {
        var comfyRequest = request.ToComfy();
        if (comfyRequest.Image == null && request.InputImage != null)
        {
            var tempFileName = $"image2text_{Guid.NewGuid()}.png";
            comfyRequest.Image = await UploadImageAssetAsync(request.InputImage, tempFileName);
        }

        if (comfyRequest.Image == null)
            throw new Exception("Image input is required for Image to Text");
        
        return await PromptGeneration(comfyRequest);
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToImageWithMaskAsync(
        StableDiffusionImageToImageWithMask request)
    {
        var comfyRequest = request.ToComfy();
        if (comfyRequest.ImageInput == null)
            throw new Exception("Image input is required for Image to Image with Mask");
        if (comfyRequest.MaskInput == null)
            throw new Exception("Mask image input is required for Image to Image with Mask");
        
        if (comfyRequest.Image == null && request.ImageInput != null)
        {
            var tempFileName = $"image2image_mask_{Guid.NewGuid()}.png";
            comfyRequest.Image = await UploadImageAssetAsync(request.ImageInput, tempFileName);
        }
        
        if (comfyRequest.MaskImage == null && request.MaskInput != null)
        {
            var tempFileName = $"image2image_mask_{Guid.NewGuid()}.png";
            comfyRequest.MaskImage = await UploadImageAssetAsync(request.MaskInput, tempFileName);
        }
        
        if (comfyRequest.Image == null)
            throw new Exception("Image input failed to upload for Image to Image with Mask");
        
        if (comfyRequest.MaskImage == null)
            throw new Exception("Mask input failed to upload for Image to Image with Mask");
        
        return await PromptGeneration(comfyRequest);
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToImageUpscaleAsync(StableDiffusionImageToImageUpscale request)
    {
        var comfyRequest = request.ToComfy();
        if(comfyRequest.ImageInput == null)
            throw new Exception("Image input is required for Image to Image Upscale");
        
        // Upload image asset
        comfyRequest.Image = await UploadImageAssetAsync(comfyRequest.ImageInput, $"image2image_upscale_{Guid.NewGuid()}.png");
        
        return await PromptGeneration(comfyRequest);
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToImageAsync(StableDiffusionImageToImage request)
    {
        var comfyRequest = request.ToComfy();
        if (comfyRequest.Image == null && request.InitImage != null)
        {
            var tempFileName = $"image2image_{Guid.NewGuid()}.png";
            comfyRequest.Image = await UploadImageAssetAsync(request.InitImage, tempFileName);
        }

        if (comfyRequest.Image == null)
            throw new Exception("Image input is required for Image to Image");
        
        return await PromptGeneration(comfyRequest);
    }

    public async Task<ComfyWorkflowResponse> GenerateTextToImageAsync(StableDiffusionTextToImage request)
    {
        // Convert to Internal DTO
        var comfyRequest = request.ToComfy();
        return await PromptGeneration(comfyRequest);
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
        var response = await httpClient.PostAsync(path,null);
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
    
    public async Task<string> DeleteModelAsync(string name)
    {
        var response = await httpClient.PostAsync($"/agent/delete?name={name}", null);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
    
    public async Task<Stream> DownloadComfyOutputAsync(ComfyFileOutput output)
    {
        var response = await httpClient.GetAsync($"/view?filename={output.Filename}&type={output.Type}&subfolder={output.Subfolder}");
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
        
        var status = ParseWorkflowStatus(parsedStatus.AsObject(), promptId);
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
    
    public void AddOnGenerationComplete(string innerPromptId, Action<string,ComfyWorkflowStatus> callback)
    {
        // Use lock to prevent race conditions
        string? comfyPromptId;
        string? missedPromptId = null;
        var fireMissed = false;
        lock (lockObj)
        {
            if (innerPromptIdToPromptIdMapping.TryGetValue(innerPromptId, out comfyPromptId))
            {
                if(missedGenerationCompleteMapping.ContainsKey(comfyPromptId))
                {
                    LogMessage("Missed AddOnGenerationComplete");
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
            LogMessage("Running Missed AddOnGenerationComplete");
            Task.Run(async () =>
            {
                LogMessage("In Process Missed AddOnGenerationComplete");
                var missedStatus = await GetWorkflowStatusAsync(missedPromptId);
                LogMessage("Got Missed Status");
                LogMessage($"PromptId: {comfyPromptId} - InnerPromptId: {innerPromptId}");
                callback?.Invoke(innerPromptId, missedStatus);
                LogMessage("Invoked Missed Callback");
            });
        }
    }

    public string? GetTemplateContentsByType<T>()
    {
        var path = comfyWorkflowMapping.ContainsKey(typeof(T)) == false ? null : comfyWorkflowMapping[typeof(T)];
        if (path == null)
            return null;
        return File.ReadAllText(Path.Combine(WorkflowTemplatePath, path));
    }

    private ConcurrentDictionary<string,string> missedGenerationCompleteMapping = new();

    private async void OnGenerationCompleted(string comfyPromptId)
    {
        string innerPromptId;
        Action<string, ComfyWorkflowStatus>? callback = null;
        lock (lockObj)
        {
            if(!promptIdToInnerPromptIdMapping.TryGetValue(comfyPromptId, out innerPromptId))
            {
                LogMessage($"No innerPromptId found for promptId: {comfyPromptId}");
                var didAdd = missedGenerationCompleteMapping.TryAdd(comfyPromptId, "");
                if(!didAdd)
                    LogMessage($"Failed to add missedGenerationCompleteMapping for promptId: {comfyPromptId}");
                return;
            }
            var hasRegisteredCallback = OnGenerationComplete.TryGetValue(innerPromptId!, out callback);
            
            if (!hasRegisteredCallback)
            {
                LogMessage($"No callback found for promptId: {comfyPromptId}");
                LogMessage($"No callback found for innerPromptId: {innerPromptId}");
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
}
