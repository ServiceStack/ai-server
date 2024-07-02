using System.Net.Http.Json;
using System.Runtime.Serialization;
using System.Text;
using ServiceStack;
using ServiceStack.Script;
using ServiceStack.Text;

namespace AiServer.ServiceInterface.Comfy;

using System.Net.Http;
using System.Text.Json.Nodes;

public partial class ComfyClient(HttpClient httpClient)
{
    private readonly Dictionary<string, JsonObject> metadataMapping = new();
    private static ScriptContext context = new ScriptContext().Init();

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
    
    public int PollIntervalMs { get; set; } = 1000;
    public int TimeoutMs { get; set; } = 60000;

    public ComfyClient(string baseUrl,string apiKey = null)
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
    }

    public async Task<string> QueueWorkflowAsync(string apiJson)
    {
        var response = await httpClient.PostAsync("/prompt", new StringContent(apiJson, Encoding.UTF8, "application/json"));
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
    
    public async Task<ComfyImageInput> UploadImageAssetAsync(Stream fileStream, string filename)
    {
        var content = new MultipartFormDataContent();
        content.Add(new StreamContent(fileStream), "image", filename);
        var response = await httpClient.PostAsync("/upload/image?overwrite=true&type=temp", content);
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadAsStringAsync();
        await Task.Delay(1000);
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
    
    public async Task<string> PopulateSpeechToTextWorkflowAsync(ComfySpeechToText request)
    {
        return await PopulateWorkflow(request, SpeechToTextTemplate);
    }
    
    public async Task<string> PopulateTextToSpeechWorkflowAsync(ComfyTextToSpeech request)
    {
        return await PopulateWorkflow(request, TextToSpeechTemplate);
    }

    public async Task<string> PopulateImageToTextWorkflowAsync(ComfyImageToText request)
    {
        return await PopulateWorkflow(request, ImageToTextTemplate);
    }
    
    public async Task<string> PopulateImageToImageWithMaskWorkflowAsync(ComfyImageToImageWithMask request)
    {
        return await PopulateWorkflow(request, ImageToImageWithMaskTemplate);
    }
    
    public async Task<string> PopulateTextToImageWorkflowAsync(ComfyTextToImage request)
    {
        return await PopulateWorkflow(request, TextToImageTemplate);
    }
    
    public async Task<string> PopulateImageToImageWorkflowAsync(ComfyImageToImage request)
    {
        return await PopulateWorkflow(request, ImageToImageTemplate);
    }
    
    private async Task<string> PopulateTextToAudioWorkflowAsync(ComfyTextToAudio request)
    {
        return await PopulateWorkflow(request, TextToAudioTemplate);
    }
    
    public async Task<string> PopulateImageToImageUpscaleWorkflowAsync(ComfyImageToImageUpscale request)
    {
        return await PopulateWorkflow(request, ImageToImageUpscaleTemplate);
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
    
    public async Task<ComfyWorkflowResponse> GenerateTextToSpeechAsync(OpenAiTextToSpeech request)
    {
        var comfyRequest = request.ToComfy();
        // Read template from file for Text to Speech
        var workflowJson = await PopulateTextToSpeechWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
    }
    
    public async Task<ComfyWorkflowResponse> GenerateSpeechToTextAsync(OpenAiWhisperSpeechToText request)
    {
        var comfyRequest = request.ToComfy();
        if (comfyRequest.InitAudio == null)
            throw new Exception("Audio input is required for Speech to Text");
        
        // Upload audio asset
        comfyRequest.Audio = await UploadAudioAssetAsync(comfyRequest.InitAudio, $"speech2text_{Guid.NewGuid()}.wav");
        
        // Read template from file for Speech to Text
        var workflowJson = await PopulateSpeechToTextWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
    }
    
    public async Task<ComfyWorkflowResponse> GenerateTextToAudioAsync(StableAudioTextToAudio request)
    {
        var comfyRequest = request.ToComfy();
        // Read template from file for Text to Audio
        var workflowJson = await PopulateTextToAudioWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToTextAsync(StableDiffusionImageToText request)
    {
        var comfyRequest = request.ToComfy();
        if (comfyRequest.Image == null && request.InitImage != null)
        {
            var tempFileName = $"image2text_{Guid.NewGuid()}.png";
            comfyRequest.Image = await UploadImageAssetAsync(request.InitImage, tempFileName);
        }

        if (comfyRequest.Image == null)
            throw new Exception("Image input is required for Image to Text");
        
        // Read template from file for Image to Text
        var workflowJson = await PopulateImageToTextWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToImageWithMaskAsync(
        StableDiffusionImageToImageWithMask request)
    {
        var comfyRequest = request.ToComfy();
        if (comfyRequest.InitImage == null)
            throw new Exception("Image input is required for Image to Image with Mask");
        if (comfyRequest.InitMask == null)
            throw new Exception("Mask image input is required for Image to Image with Mask");
        
        if (comfyRequest.Image == null && request.InitImage != null)
        {
            var tempFileName = $"image2image_mask_{Guid.NewGuid()}.png";
            comfyRequest.Image = await UploadImageAssetAsync(request.InitImage, tempFileName);
        }
        
        if (comfyRequest.MaskImage == null && request.MaskImage != null)
        {
            var tempFileName = $"image2image_mask_{Guid.NewGuid()}.png";
            comfyRequest.MaskImage = await UploadImageAssetAsync(request.MaskImage, tempFileName);
        }
        
        if (comfyRequest.Image == null)
            throw new Exception("Image input failed to upload for Image to Image with Mask");
        
        if (comfyRequest.MaskImage == null)
            throw new Exception("Mask input failed to upload for Image to Image with Mask");
        
        // Read template from file for Image to Image with Mask
        var workflowJson = await PopulateImageToImageWithMaskWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
    }

    public async Task<ComfyWorkflowResponse> GenerateImageToImageUpscaleAsync(StableDiffusionImageToImageUpscale request)
    {
        var comfyRequest = request.ToComfy();
        if(comfyRequest.InitImage == null)
            throw new Exception("Image input is required for Image to Image Upscale");
        
        // Upload image asset
        comfyRequest.Image = await UploadImageAssetAsync(comfyRequest.InitImage, $"image2image_upscale_{Guid.NewGuid()}.png");
        
        // Read template from file for Image to Image
        var workflowJson = await PopulateImageToImageUpscaleWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
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
        
        // Read template from file for Image to Image
        var workflowJson = await PopulateImageToImageWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
    }

    public async Task<ComfyWorkflowResponse> GenerateTextToImageAsync(StableDiffusionTextToImage request)
    {
        // Convert to Internal DTO
        var comfyRequest = request.ToComfy();
        // Read template from file for Text to Image
        var workflowJson = await PopulateTextToImageWorkflowAsync(comfyRequest);
        // Convert to ComfyUI API JSON format
        var apiJson = await ConvertWorkflowToApiAsync(workflowJson);
        // Call ComfyUI API
        var response = await QueueWorkflowAsync(apiJson);
        // Returns with job ID
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        return response.FromJson<ComfyWorkflowResponse>();
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
    public async Task<string> DownloadModelAsync(string url, string filename, string apiKey = null, string apiKeyLocation = "")
    {
        var path = $"/agent/pull?url={url}&name={filename}";
        if (!string.IsNullOrEmpty(apiKey))
            path += $"&api_key={apiKey}";
        if (!string.IsNullOrEmpty(apiKeyLocation))
            path += $"&api_key_location={apiKeyLocation}";
        var response = await httpClient.PostAsync(path,null);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetPromptHistory(string id)
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
    
    public async Task<ComfyWorkflowStatus> GetWorkflowStatusAsync(string jobId)
    {
        var statusJson = await GetPromptHistory(jobId);
        var parsedStatus = JsonNode.Parse(statusJson);
        if (parsedStatus == null)
            throw new Exception("Invalid status JSON response");
        
        // Handle the case where the status is an empty object
        if (parsedStatus.AsObject().Count == 0)
            return new ComfyWorkflowStatus();
        
        var status = ParseWorkflowStatus(parsedStatus.AsObject(), jobId);
        // Convert to ComfyWorkflowStatus
        return status;
    }
}