using System.Globalization;
using System.Net;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.ServiceInterface.Generation;

public interface IAiProvider
{
    Task<bool> IsOnlineAsync(MediaProvider provider, CancellationToken token = default);

    Task<(GenerationResult, TimeSpan)> RunAsync(MediaProvider provider, GenerationArgs request,
        CancellationToken token = default);

    Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, AiProviderFileOutput output,
        CancellationToken token = default);

    List<AiTaskType> SupportedAiTasks { get; }

    AiServiceProvider ProviderType { get; }
}

public interface IMediaTransformProvider
{
    Task<(TransformResult,TimeSpan)> RunAsync(MediaProvider provider, MediaTransformArgs request, CancellationToken token = default);
    
    Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, TransformFileOutput output,
        CancellationToken token = default);
    
    Task<bool> IsOnlineAsync(MediaProvider provider, CancellationToken token = default);
}

public class ComfyProvider(
    ComfyMediaProviderOptions? options,
    ILogger<ComfyProvider> logger) : IAiProvider, IMediaTransformProvider
{
    private Dictionary<string, ComfyClient> ComfyClients { get; } = new();
    private object lockObj = new();

    public async Task<bool> IsOnlineAsync(MediaProvider provider, CancellationToken token = default)
    {
        // Check if the client is healthy
        try
        {
            var client = GetClient(provider);
            var heartbeatResult = await client.GetClientHealthAsync(token);

            var isHealthy = heartbeatResult.StatusCode == (HttpStatusCode)200;

            return isHealthy;
        }
        catch (Exception e)
        {
            if (e is TaskCanceledException)
                throw;
            return false;
        }
    }
    
    private ComfyClient GetClient(MediaProvider provider)
    {
        lock (lockObj)
        {
            if (!ComfyClients.ContainsKey(provider.Name))
            {
                var comfyClient = new ComfyClient(provider.ApiBaseUrl!, provider.ApiKey)
                {
                    AudioToTextModelOverrides = options?.AudioToTextModelOverrides ?? new(),
                    ImageToImageModelOverrides = options?.ImageToImageModelOverrides ?? new(),
                    ImageToImageUpscaleModelOverrides = options?.ImageToImageUpscaleModelOverrides ?? new(),
                    ImageToImageWithMaskModelOverrides = options?.ImageToImageWithMaskModelOverrides ?? new(),
                    ImageToTextModelOverrides = options?.ImageToTextModelOverrides ?? new(),
                    TextToAudioModelOverrides = options?.TextToAudioModelOverrides ?? new(),
                    TextToImageModelOverrides = options?.TextToImageModelOverrides ?? new(),
                    TextToSpeechModelOverrides = options?.TextToSpeechModelOverrides ?? new(),
                    SpeechToTextModelOverrides = options?.SpeechToTextModelOverrides ?? new()
                };
                ComfyClients.Add(provider.Name, comfyClient);
            }

            return ComfyClients[provider.Name];
        }
    }

    public async Task<(GenerationResult, TimeSpan)> RunAsync(MediaProvider provider, GenerationArgs request,
        CancellationToken token = default)
    {
        var needsModel = request.TaskType == AiTaskType.TextToImage;
        if (needsModel && string.IsNullOrEmpty(request.Model))
            throw new Exception("Model is required for TextToImage tasks.");

        var modelSettings = AppData.Instance.GetMediaModelByApiModel(provider, request.Model!);
        var comfyClient = GetClient(provider);
        var start = DateTime.UtcNow;
        // Last check for null seed
        request.Seed ??= Random.Shared.Next();
        var comfyWorkflowReq = request.ConvertTo<ComfyWorkflowRequest>();
        comfyWorkflowReq =
            comfyWorkflowReq.ApplyModelDefaults(AppConfig.Instance, modelSettings.ConvertTo<ComfyApiModelSettings>());
        var response = await comfyClient.PromptGenerationAsync(comfyWorkflowReq, token, waitResult: true);
        var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId, token);
        var previewQ = GetPreviewQueryStringByTaskType(request.TaskType ?? AiTaskType.TextToImage);
        var duration = DateTime.UtcNow - start;
        var diffResponse = new GenerationResult
        {
            Outputs = status.Outputs.SelectMany(x => x.Files)
                .Select(x => new AiProviderFileOutput {
                    FileName = x.Filename,
                    Url = $"{provider.ApiBaseUrl}/view?filename={x.Filename}&type={x.Type}&subfolder={x.Subfolder}{previewQ}"
                }).ToList(),
            TextOutputs = status.Outputs.SelectMany(x => x.Texts)
                .Select(x => new AiProviderTextOutput { Text = x.Text }).ToList()
        };
        return (diffResponse, duration);
    }


    private string GetPreviewQueryStringByTaskType(AiTaskType taskType)
    {
        var q = "&preview=webp";
        switch (taskType)
        {
            case AiTaskType.TextToImage:
            case AiTaskType.ImageToImage:
            case AiTaskType.ImageUpscale:
            case AiTaskType.ImageWithMask:
                break;
            case AiTaskType.ImageToText:
            case AiTaskType.TextToAudio:
            case AiTaskType.TextToSpeech:
            case AiTaskType.SpeechToText:
            default:
                q = "";
                break;
        }
        return q;
    }

    public async Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, AiProviderFileOutput output,
        CancellationToken token = default)
    {
        var client = GetClient(provider);
        return await client.DownloadComfyOutputAsync(output.Url, token);
    }

    public List<AiTaskType> SupportedAiTasks =>
    [
        AiTaskType.TextToImage,
        AiTaskType.ImageToImage,
        AiTaskType.ImageUpscale,
        AiTaskType.ImageWithMask,
        AiTaskType.ImageToText,
        AiTaskType.TextToAudio,
        AiTaskType.TextToSpeech,
        AiTaskType.SpeechToText
    ];

    public AiServiceProvider ProviderType => AiServiceProvider.Comfy;

    private HttpClient GetHttpClient(MediaProvider provider)
    {
        var httpClient = HttpUtils.CreateClient();
        httpClient.BaseAddress = new Uri(provider.ApiBaseUrl!);
        if (provider.ApiKeyHeader != null)
            httpClient.DefaultRequestHeaders.Add(provider.ApiKeyHeader, provider.ApiKey);
        else
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {provider.ApiKey}");
        return httpClient;
    }

    public async Task<TransformResult> TransformMediaAsync(MediaProvider provider, MediaTransformArgs args, CancellationToken token)
    {
        using var content = new MultipartFormDataContent();

        // Add the input files
        if (args.VideoInput != null)
            content.Add(new StreamContent(args.VideoInput), "video", args.VideoFileName ?? "video");
        if (args.AudioInput != null)
            content.Add(new StreamContent(args.AudioInput), "audio", args.AudioFileName ?? "audio");
        if (args.ImageInput != null)
            content.Add(new StreamContent(args.ImageInput), "image", args.ImageFileName ?? "image");
        if (args.WatermarkInput != null)
            content.Add(new StreamContent(args.WatermarkInput), "watermark", args.WatermarkFileName ?? "watermark");

        if (!content.Any())
            throw new ArgumentException("No input file provided");

        // Prepare input_kwargs
        var inputKwargs = new Dictionary<string, object>();
        if (args.CutStart.HasValue)
            inputKwargs["ss"] = args.CutStart.Value.ToString(CultureInfo.InvariantCulture);
        if (args.CutEnd.HasValue && args.CutEnd.Value > 0)
            inputKwargs["t"] = (args.CutEnd.Value - (args.CutStart ?? 0)).ToString(CultureInfo.InvariantCulture);

        // Prepare output_kwargs
        var outputKwargs = new Dictionary<string, object>();
        if (args.OutputFormat != null)
            outputKwargs["format"] = args.OutputFormat.ToString()!.ToLower();
        if (args.AudioCodec != null)
            outputKwargs["acodec"] = args.AudioCodec;
        if (args.VideoCodec != null)
            outputKwargs["vcodec"] = args.VideoCodec;

        // Prepare filter_complex
        var filterComplex = new List<string>();

        // Handle scaling
        if (args.ScaleWidth.HasValue || args.ScaleHeight.HasValue)
        {
            var scaleWidth = args.ScaleWidth ?? -1;
            var scaleHeight = args.ScaleHeight ?? -1;
            filterComplex.Add($"scale={scaleWidth}:{scaleHeight}");
        }

        // Handle cropping
        if (args is { CropX: not null, CropY: not null, CropWidth: not null, CropHeight: not null })
        {
            filterComplex.Add($"crop={args.CropWidth}:{args.CropHeight}:{args.CropX}:{args.CropY}");
        }

        if (args is { WatermarkInput: not null, WatermarkPosition: not null })
        {
            args.WatermarkScale = args.WatermarkScale == null
                ? "[1]scale=iw*0.2:-1[wm]"
                : $"[1]scale={args.WatermarkScale}[wm]";
            args.WatermarkPosition = args.WatermarkPosition == null
                ? "[0][wm]overlay=main_w-overlay_w-10:main_h-overlay_h-10"
                : $"[0][wm]overlay={args.WatermarkPosition}";
            filterComplex.Add($"{args.WatermarkScale};{args.WatermarkPosition}");
        }

        if (filterComplex.Count != 0)
        {
            var filterComplexString = string.Join(";", filterComplex);
            logger.LogInformation($"Filter complex: {filterComplexString}");
            outputKwargs["filter_complex"] = filterComplexString;
        }

        // Add kwargs to the request
        content.Add(new StringContent(inputKwargs.ToJson()), "input_kwargs");
        content.Add(new StringContent(outputKwargs.ToJson()), "output_kwargs");

        var httpClient = GetHttpClient(provider);

        var response = await httpClient.PostAsync($"{provider.ApiBaseUrl}/transform", content, token);
        // Log the response
        var contentString = await response.Content.ReadAsStringAsync(token);
        logger.LogInformation($"Response: {response.StatusCode} - {contentString}");

        response.EnsureSuccessStatusCode();

        var jsonString = await response.Content.ReadAsStringAsync(token);
        using var jsConfig = JsConfig.With(new Config { TextCase = TextCase.SnakeCase });
        var transformResponse = jsonString.FromJson<FfmpegTransformResponse>();

        if (transformResponse?.Success == true)
        {
            var filename = Path.GetFileName(transformResponse.OutputPath);
            return new TransformResult
            {
                Outputs = [
                    new()
                    {
                        OutputFormat = GetOutputTypeFromTask(args.TaskType
                            ?? throw new InvalidOperationException("Task type not specified")),
                        Url = $"{provider.ApiBaseUrl}/download_output/{filename}",
                        FileName = filename
                    }
                ]
            };
        }

        return new TransformResult
        {
            Error = transformResponse?.Error
        };
    }

    private MediaFormat GetOutputTypeFromTask(MediaTransformTaskType taskType)
    {
        switch (taskType)
        {
            case MediaTransformTaskType.ImageScale:
            case MediaTransformTaskType.ImageConvert:
            case MediaTransformTaskType.ImageCrop:
            case MediaTransformTaskType.WatermarkImage:
                return MediaFormat.Image;
            case MediaTransformTaskType.VideoScale:
            case MediaTransformTaskType.VideoConvert:
            case MediaTransformTaskType.VideoCrop:
            case MediaTransformTaskType.WatermarkVideo:
            case MediaTransformTaskType.VideoCut:
                return MediaFormat.Video;
            case MediaTransformTaskType.AudioConvert:
            case MediaTransformTaskType.AudioCut:
                return MediaFormat.Audio;
            default:
                throw new ArgumentException("Invalid task type");
        }
    }


    public async Task<(TransformResult, TimeSpan)> RunAsync(MediaProvider provider, MediaTransformArgs request,
        CancellationToken token = default)
    {
        var startTime = DateTime.UtcNow;
        var result = await TransformMediaAsync(provider, request, token);

        return (result, DateTime.UtcNow - startTime);
    }

    public async Task<HttpResponseMessage> DownloadOutputAsync(MediaProvider provider, TransformFileOutput output,
        CancellationToken token = default)
    {
        var httpClient = GetHttpClient(provider);
        var response = await httpClient.GetAsync(output.Url, token);
        response.EnsureSuccessStatusCode();
        return response;
    }
}

public class ComfyMediaProviderOptions
{
    public Dictionary<string, string> TextToImageModelOverrides { get; set; } = new();
    public Dictionary<string, string> ImageToTextModelOverrides { get; set; } = new();
    public Dictionary<string, string> ImageToImageModelOverrides { get; set; } = new();
    public Dictionary<string, string> ImageToImageUpscaleModelOverrides { get; set; } = new();
    public Dictionary<string, string> ImageToImageWithMaskModelOverrides { get; set; } = new();
    public Dictionary<string, string> TextToSpeechModelOverrides { get; set; } = new();
    public Dictionary<string, string> TextToAudioModelOverrides { get; set; } = new();
    public Dictionary<string, string> AudioToTextModelOverrides { get; set; } = new();
    public Dictionary<string, string> SpeechToTextModelOverrides { get; set; } = new();
}

public class MediaProviderFactory(
    ReplicateAiProvider replicateAiProvider,
    ComfyProvider comfyProvider,
    OpenAiMediaProvider openAiMediaProvider)
{
    public IAiProvider GetProvider(AiServiceProvider provider = AiServiceProvider.Replicate)
    {
        switch (provider)
        {
            case AiServiceProvider.Replicate:
                return replicateAiProvider;
            case AiServiceProvider.Comfy:
                return comfyProvider;
            case AiServiceProvider.OpenAi:
                return openAiMediaProvider;
            default:
                return replicateAiProvider;
        }
    }

    public List<IAiProvider> GetProviders() => new()
    {
        replicateAiProvider,
        comfyProvider,
        openAiMediaProvider
    };
}