using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface.Comfy;

public static class ComfyExtensions
{
    public static ComfyWorkflowRequest ApplyModelDefaults(this ComfyWorkflowRequest request, AppConfig appConfig,
        ComfyApiModelSettings? modelSettings)
    {
        ComfyWorkflowRequest resObject;
        if (string.IsNullOrEmpty(request.Model) &&
            (appConfig.DefaultModel is null || string.IsNullOrEmpty(appConfig.DefaultModel.Filename)))
            throw new Exception("Model missing and no default model is configured.");

        switch (request.TaskType)
        {
            case ComfyTaskType.TextToImage:
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model ?? appConfig.DefaultModel?.Filename!,
                    Width = request.Width,
                    Height = request.Height,
                    BatchSize = request.BatchSize is 0 ? 1 : request.BatchSize,
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt is null or ""
                        ? "low quality, blurry, noisy, compression artifacts"
                        : request.NegativePrompt + (",low quality, blurry, noisy, compression artifacts"),
                    Scheduler = request.Scheduler,
                    Steps = request.Steps,
                    CfgScale = request.CfgScale,
                    Sampler = request.Sampler,
                    TaskType = ComfyTaskType.TextToImage
                };
                break;
            case ComfyTaskType.ImageToImage:
                resObject = new ComfyWorkflowRequest
                {
                    ImageInput = request.ImageInput,
                    Model = request.Model ?? appConfig.DefaultModel?.Filename!,
                    Denoise = request.Denoise is null or 0 ? 0.5d : request.Denoise,
                    BatchSize = request.BatchSize is 0 ? 1 : request.BatchSize,
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt is null or ""
                        ? (modelSettings?.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts")
                        : request.NegativePrompt,
                    Scheduler = request.Scheduler is null or ""
                        ? modelSettings?.Scheduler ?? "normal"
                        : request.Scheduler,
                    Steps = request.Steps is null or 0 ? modelSettings?.Steps ?? 25 : request.Steps,
                    CfgScale = request.CfgScale is null or 0 ? modelSettings?.CfgScale ?? 7 : request.CfgScale,
                    Sampler = request.Sampler ?? (modelSettings?.Sampler ?? ComfySampler.euler_ancestral),
                    TaskType = ComfyTaskType.ImageToImage
                };
                break;
            case ComfyTaskType.ImageUpscale:
                resObject = new ComfyWorkflowRequest
                {
                    ImageInput = request.ImageInput,
                    UpscaleModel = request.UpscaleModel ?? "RealESRGAN_x2.pth",
                    Model = request.Model ?? "RealESRGAN_x2.pth",
                    TaskType = ComfyTaskType.ImageUpscale
                };
                break;
            case ComfyTaskType.ImageWithMask:
                resObject = new ComfyWorkflowRequest
                {
                    ImageInput = request.ImageInput,
                    MaskInput = request.MaskInput,
                    Model = request.Model ?? appConfig.DefaultModel?.Filename!,
                    Denoise = request.Denoise ?? 0.5d,
                    BatchSize = request.BatchSize is 0 ? 1 : request.BatchSize,
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt is null or ""
                        ? (modelSettings?.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts")
                        : request.NegativePrompt,
                    Scheduler = request.Scheduler is null or ""
                        ? modelSettings?.Scheduler ?? "normal"
                        : request.Scheduler,
                    Steps = request.Steps is null or 0 ? modelSettings?.Steps ?? 25 : request.Steps,
                    CfgScale = request.CfgScale is null or 0 ? modelSettings?.CfgScale ?? 7 : request.CfgScale,
                    Sampler = request.Sampler ?? (modelSettings?.Sampler ?? ComfySampler.euler_ancestral),
                    MaskChannel = ComfyMaskSource.red,
                    TaskType = ComfyTaskType.ImageWithMask
                };
                break;
            case ComfyTaskType.ImageToText:
                resObject = new ComfyWorkflowRequest
                {
                    ImageInput = request.ImageInput,
                    Model = request.Model,
                    TaskType = ComfyTaskType.ImageToText
                };
                break;
            case ComfyTaskType.TextToAudio:
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model ?? "stable_audio_open_1.0.safetensors",
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    CfgScale = request.CfgScale is null or 0 ? 4 : request.CfgScale,
                    Steps = request.Steps is null or 0 ? 50 : request.Steps,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt,
                    Scheduler = request.Scheduler is null or "" ? "normal" : request.Scheduler,
                    SampleLength = request.SampleLength is null or 0 ? 47.5d : request.SampleLength,
                    Sampler = request.Sampler ?? ComfySampler.dpmpp_2s_ancestral,
                    Clip = request.Clip is null or "" ? "t5_base.safetensors" : request.Clip,
                    TaskType = ComfyTaskType.TextToAudio
                };
                break;
            case ComfyTaskType.TextToSpeech:
                resObject = new ComfyWorkflowRequest
                {
                    PositivePrompt = request.PositivePrompt,
                    Model = request.Model is null or "" ? "high:en_US-lessac" : request.Model,
                    TaskType = ComfyTaskType.TextToSpeech
                };
                break;
            case ComfyTaskType.SpeechToText:
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model is null or "" ? "base" : request.Model,
                    AudioInput = request.AudioInput,
                    TaskType = ComfyTaskType.SpeechToText
                };
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        return resObject;
    }
}