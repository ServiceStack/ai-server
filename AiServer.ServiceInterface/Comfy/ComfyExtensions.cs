using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface.Comfy;


public static class ComfyExtensions
{
    public static object ToComfy(this QueueComfyWorkflow request, AppConfig appConfig)
    {
        var artStyle = request.ArtStyle ?? ArtStyle.Photographic;
        var artStyleString = artStyle.ToString();
        var artStyleEntry = appConfig.ArtStyleModelMappings[artStyleString];
        object resObject;
        switch (request.TaskType)
        {
            case ComfyTaskType.TextToImage:
                resObject = new ComfyTextToImage
                {
                    Model = request.Model ?? artStyleEntry.Filename,
                    Width = request.Width ?? 1024,
                    Height = request.Height ?? 1024,
                    Sampler = ComfySampler.euler_ancestral,
                    BatchSize = request.BatchSize,
                    Seed = request.Seed ?? Random.Shared.Next(),
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts",
                    Scheduler = "normal",
                    Steps = request.Steps ?? 25,
                    CfgScale = request.CfgScale ?? 7,
                };
                break;
            case ComfyTaskType.ImageToImage:
                resObject = new ComfyImageToImage
                {
                    Model = request.Model ?? artStyleEntry.Filename,
                    Denoise = request.Denoise ?? 0.5d,
                    BatchSize = request.BatchSize,
                    Seed = request.Seed ?? Random.Shared.Next(),
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts",
                    Scheduler = request.Scheduler ?? "normal",
                    CfgScale = request.CfgScale ?? 7,
                    Steps = request.Steps ?? 25,
                    Sampler = request.Sampler ?? ComfySampler.euler_ancestral,
                    ImageInput = request.ImageInput
                };
                break;
            case ComfyTaskType.ImageToImageUpscale:
                resObject = new ComfyImageToImageUpscale
                {
                    ImageInput = request.ImageInput, UpscaleModel = request.UpscaleModel ?? "RealESRGAN_x2.pth"
                };
                break;
            case ComfyTaskType.ImageToImageWithMask:
                resObject = new ComfyImageToImageWithMask
                {
                    Model = request.Model ?? artStyleEntry.Filename,
                    Denoise = request.Denoise ?? 0.5d,
                    BatchSize = request.BatchSize,
                    Seed = request.Seed ?? Random.Shared.Next(),
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts",
                    Scheduler = request.Scheduler ?? "normal",
                    CfgScale = request.CfgScale ?? 7,
                    Steps = request.Steps ?? 25,
                    Sampler = request.Sampler ?? ComfySampler.euler_ancestral,
                    ImageInput = request.ImageInput,
                    MaskInput = request.MaskInput,
                    MaskChannel = ComfyMaskSource.red
                };
                break;
            case ComfyTaskType.ImageToText:
                resObject = new ComfyImageToText { ImageInput = request.ImageInput };
                break;
            case ComfyTaskType.TextToAudio:
                resObject = new ComfyTextToAudio
                {
                    Model = request.Model ?? "stable_audio_open_1.0.safetensors",
                    Seed = request.Seed ?? Random.Shared.Next(),
                    CfgScale = request.CfgScale ?? 7,
                    Steps = request.Steps ?? 50,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt,
                    Scheduler = request.Scheduler ?? "normal",
                    SampleLength = 47.5d,
                    Sampler = request.Sampler ?? ComfySampler.dpmpp_2s_ancestral,
                    Clip = "t5_base.safetensors"
                };
                break;
            case ComfyTaskType.TextToSpeech:
                resObject = new ComfyTextToSpeech
                {
                    Input = request.PositivePrompt, Quality = "high", Voice = request.Model ?? "en_US-lessac"
                };
                break;
            case ComfyTaskType.SpeechToText:
                resObject = new ComfySpeechToText
                {
                    AudioFile = request.SpeechInput, WhisperModel = request.Model ?? "base"
                };
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        return resObject;
    }
    
    public static ComfyTextToAudio ToComfy(this StableAudioTextToAudio textToAudio)
    {
        return new ComfyTextToAudio
        {
            Seed = textToAudio.Seed,
            CfgScale = textToAudio.CfgScale,
            Sampler = textToAudio.Sampler.ToComfy(),
            Steps = textToAudio.Steps,
            Model = textToAudio.EngineId,
            Clip = textToAudio.ClipEngineId,
            Scheduler = "normal",
            SampleLength = textToAudio.SampleLength,
            PositivePrompt = textToAudio.TextPrompts.ExtractPositivePrompt(),
            NegativePrompt = textToAudio.TextPrompts.ExtractNegativePrompt()
        };
    }

    public static ComfyImageToText ToComfy(this StableDiffusionImageToText imageToText)
    {
        return new ComfyImageToText
        {
            ImageInput = imageToText.InputImage
        };
    }
    
    public static ComfyImageToImageUpscale ToComfy(this StableDiffusionImageToImageUpscale imageToImage)
    {
        return new ComfyImageToImageUpscale
        {
            ImageInput = imageToImage.ImageInput
        };
    }

    public static ComfyImageToImageWithMask ToComfy(this StableDiffusionImageToImageWithMask imageWithMask)
    {
        return new ComfyImageToImageWithMask()
        {
            Seed = Random.Shared.Next(),
            CfgScale = imageWithMask.CfgScale,
            Sampler = imageWithMask.Sampler.ToComfy(),
            Steps = imageWithMask.Steps,
            BatchSize = imageWithMask.Samples,
            Model = imageWithMask.EngineId,
            Denoise = 1 - imageWithMask.ImageStrength,
            Scheduler = "normal",
            ImageInput = imageWithMask.ImageInput,
            MaskInput = imageWithMask.MaskInput,
            PositivePrompt = imageWithMask.TextPrompts.ExtractPositivePrompt(),
            NegativePrompt = imageWithMask.TextPrompts.ExtractNegativePrompt(),
            MaskChannel = imageWithMask.MaskSource switch
            {
                StableDiffusionMaskSource.White => ComfyMaskSource.red,
                // Could add support in future by using an invert mask step
                StableDiffusionMaskSource.Black => throw new Exception("Black mask not supported"),
                StableDiffusionMaskSource.Alpha => ComfyMaskSource.alpha,
                _ => ComfyMaskSource.red
            }
        };
    }
    
    public static ComfyTextToImage ToComfy(this StableDiffusionTextToImage textToImage)
    {
        return new ComfyTextToImage
        {
            Seed = textToImage.Seed,
            CfgScale = textToImage.CfgScale,
            Height = textToImage.Height,
            Width = textToImage.Width,
            Sampler = textToImage.Sampler.ToComfy(),
            BatchSize = textToImage.Samples,
            Steps = textToImage.Steps,
            Model = textToImage.EngineId,
            PositivePrompt = textToImage.TextPrompts.ExtractPositivePrompt(),
            NegativePrompt = textToImage.TextPrompts.ExtractNegativePrompt(),
        };
    }

    public static ComfyImageToImage ToComfy(this StableDiffusionImageToImage imageToImage)
    {
        return new ComfyImageToImage
        {
            Seed = Random.Shared.Next(),
            CfgScale = imageToImage.CfgScale,
            Sampler = imageToImage.Sampler.ToComfy(),
            Steps = imageToImage.Steps,
            BatchSize = imageToImage.Samples,
            Model = imageToImage.EngineId,
            Denoise = 1 - imageToImage.ImageStrength,
            Scheduler = "normal",
            ImageInput = imageToImage.InitImage,
            PositivePrompt = imageToImage.TextPrompts.ExtractPositivePrompt(),
            NegativePrompt = imageToImage.TextPrompts.ExtractNegativePrompt()
        };
    }
    
    private static string ExtractPositivePrompt(this List<TextPrompt> prompts)
    {
        var positivePrompts = prompts.Where(x => x.Weight > 0)
            .OrderBy(x => x.Weight).ToList();
        string positivePrompt = "";
        foreach (var prompt in positivePrompts)
        {
            positivePrompt += prompt.Text;
            // Apply weight using `:x` format for weights not equal to 1
            if (Math.Abs(prompt.Weight - 1) > 0.01)
                positivePrompt += $":{prompt.Weight}";
            
            positivePrompt += ",";
        }
        // Remove trailing comma
        return positivePrompt.TrimEnd(',');
    }
    
    private static string ExtractNegativePrompt(this List<TextPrompt> prompts)
    {
        var negativePrompts = prompts.Where(x => x.Weight < 0)
            .OrderBy(x => x.Weight).ToList();
        string negativePrompt = "";
        foreach (var prompt in negativePrompts)
        {
            negativePrompt += prompt.Text;
            // Apply weight using `:x` format for weights not equal to -1
            if (Math.Abs(prompt.Weight + 1) > 0.01)
                negativePrompt += $":{prompt.Weight}";
            
            negativePrompt += ",";
        }
        // Remove trailing comma
        return negativePrompt.TrimEnd(',');
    }
    
    private static ComfySampler ToComfy(this StableDiffusionSampler sampler)
    {
        return sampler switch
        {
            StableDiffusionSampler.K_EULER => ComfySampler.euler,
            StableDiffusionSampler.K_EULER_ANCESTRAL => ComfySampler.euler_ancestral,
            StableDiffusionSampler.DDIM => ComfySampler.ddim,
            StableDiffusionSampler.DDPM => ComfySampler.ddpm,
            StableDiffusionSampler.K_DPM_2 => ComfySampler.dpm_2,
            StableDiffusionSampler.K_DPM_2_ANCESTRAL => ComfySampler.dpm_2_ancestral,
            StableDiffusionSampler.K_HEUN => ComfySampler.huen,
            StableDiffusionSampler.K_LMS => ComfySampler.lms,
            _ => ComfySampler.euler_ancestral
        };
    }

}