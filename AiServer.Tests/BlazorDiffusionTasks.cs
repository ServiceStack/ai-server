using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using NUnit.Framework;

namespace AiServer.Tests;

[Explicit]
public class BlazorDiffusionTasks
{
    private static List<CreateComfyApiProvider> ComfyApiProviders = new()
    {
        new CreateComfyApiProvider
        {
            Name = "comfy-dell.pvq.app",
            ApiBaseUrl = "https://comfy-dell.pvq.app/api",
            Concurrency = 1,
            HeartbeatUrl = "/",
            TaskWorkflows = new Dictionary<ComfyTaskType, string>
            {
                { ComfyTaskType.TextToImage, "text_to_image.json" },
                { ComfyTaskType.ImageToImage, "image_to_image.json" },
                { ComfyTaskType.ImageToImageUpscale, "image_to_image_upscale.json" },
                { ComfyTaskType.ImageToImageWithMask, "image_to_image_with_mask.json" },
                { ComfyTaskType.TextToAudio, "text_to_audio.json" },
                { ComfyTaskType.TextToSpeech, "text_to_speech.json" },
                { ComfyTaskType.SpeechToText, "speech_to_text.json" }
            },
            Enabled = true,
            Priority = 1,
            ApiKey = "testtest1234",
            Models = new List<ComfyApiProviderModel>()
        }
    };
    
    private static List<CreateComfyApiModel> ComfyApiModels = new()
    {
        new CreateComfyApiModel
        {
            Name = "SDXL Lightning 4-Step",
            Filename = "sdxl_lightning_4step.safetensors",
            DownloadUrl = "https://huggingface.co/ByteDance/SDXL-Lightning/resolve/main/sdxl_lightning_4step.safetensors?download=true",
            Url = "https://huggingface.co/ByteDance/SDXL-Lightning",
            ModelSettings = new ComfyApiModelSettings
            {
                Width = 1024,
                Height = 1024,
                Sampler = ComfySampler.euler,
                Scheduler = "sgm_uniform",
                Steps = 4,
                CfgScale = 1.0
            }
        }
    };
}