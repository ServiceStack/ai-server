using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface.Comfy;


public static class ComfyExtensions
{
    public static ComfyWorkflowRequest ToComfy(this QueueComfyWorkflow request, 
        AppConfig appConfig)
    {
        var artStyle = request.ArtStyle ?? ArtStyle.Photographic;
        var artStyleString = artStyle.ToString();
        var artStyleEntry = appConfig.ArtStyleModelMappings[artStyleString];

        ComfyWorkflowRequest resObject;
        
        
        switch (request.TaskType)
        {
            case ComfyTaskType.TextToImage:
                resObject = new ComfyWorkflowRequest()
                {
                    Model = request.Model is null or "" ? artStyleEntry.Filename : request.Model,
                    Width = request.Width is null or 0 ? artStyleEntry.Width ?? 1024 : request.Width,
                    Height = request.Height is null or 0 ? artStyleEntry.Height ?? 1024 : request.Height,
                    BatchSize = request.BatchSize is null or 0 ? 1 : request.BatchSize ?? 1,
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt is null or "" ? 
                        (artStyleEntry.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts") : 
                        request.NegativePrompt,
                    Scheduler = request.Scheduler is null or "" ? artStyleEntry.Scheduler ?? "normal" : request.Scheduler,
                    Steps = request.Steps is null or 0 ? artStyleEntry.Steps ?? 25 : request.Steps,
                    CfgScale = request.CfgScale is null or 0 ? artStyleEntry.CfgScale ?? 7 : request.CfgScale,
                    Sampler = request.Sampler ?? (artStyleEntry.Sampler ?? ComfySampler.euler_ancestral),
                    TaskType = ComfyTaskType.TextToImage
                };
                break;
            case ComfyTaskType.ImageToImage:
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model is null or "" ? artStyleEntry.Filename : request.Model,
                    Denoise = request.Denoise is null or 0 ? 0.5d : request.Denoise,
                    BatchSize = request.BatchSize is null or 0 ? 1 : request.BatchSize ?? 1,
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt is null or "" ? 
                        (artStyleEntry.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts") : 
                        request.NegativePrompt,
                    Scheduler = request.Scheduler is null or "" ? artStyleEntry.Scheduler ?? "normal" : request.Scheduler,
                    Steps = request.Steps is null or 0 ? artStyleEntry.Steps ?? 25 : request.Steps,
                    CfgScale = request.CfgScale is null or 0 ? artStyleEntry.CfgScale ?? 7 : request.CfgScale,
                    Sampler = request.Sampler ?? (artStyleEntry.Sampler ?? ComfySampler.euler_ancestral),
                    TaskType = ComfyTaskType.ImageToImage
                };
                break;
            case ComfyTaskType.ImageToImageUpscale:
                resObject = new ComfyWorkflowRequest
                {
                    UpscaleModel = request.UpscaleModel ?? "RealESRGAN_x2.pth",
                    TaskType = ComfyTaskType.ImageToImageUpscale
                };
                break;
            case ComfyTaskType.ImageToImageWithMask:
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model is null or "" ? artStyleEntry.Filename : request.Model,
                    Denoise = request.Denoise ?? 0.5d,
                    BatchSize = request.BatchSize is null or 0 ? 1 : request.BatchSize ?? 1,
                    Seed = request.Seed is null or 0 ? Random.Shared.Next() : request.Seed,
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt is null or "" ? 
                        (artStyleEntry.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts") : 
                        request.NegativePrompt,
                    Scheduler = request.Scheduler is null or "" ? artStyleEntry.Scheduler ?? "normal" : request.Scheduler,
                    Steps = request.Steps is null or 0 ? artStyleEntry.Steps ?? 25 : request.Steps,
                    CfgScale = request.CfgScale is null or 0 ? artStyleEntry.CfgScale ?? 7 : request.CfgScale,
                    Sampler = request.Sampler ?? (artStyleEntry.Sampler ?? ComfySampler.euler_ancestral),
                    MaskChannel = ComfyMaskSource.red,
                    TaskType = ComfyTaskType.ImageToImageWithMask
                };
                break;
            case ComfyTaskType.ImageToText:
                resObject = new ComfyWorkflowRequest
                {
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
                    TaskType = ComfyTaskType.SpeechToText
                };
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
        
        resObject.ArtStyle = artStyle;

        return resObject;
    }
    
    public static ComfyWorkflowRequest ToComfy(this StableAudioTextToAudio textToAudio)
    {
        return new ComfyWorkflowRequest
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
            NegativePrompt = textToAudio.TextPrompts.ExtractNegativePrompt(),
            TaskType = ComfyTaskType.TextToAudio
        };
    }

    public static ComfyWorkflowRequest ToComfy(this StableDiffusionImageToText imageToText)
    {
        return new ComfyWorkflowRequest
        {
            ImageInput = imageToText.InputImage,
            TaskType = ComfyTaskType.ImageToText
        };
    }
    
    public static ComfyWorkflowRequest ToComfy(this StableDiffusionImageToImageUpscale imageToImage)
    {
        return new ComfyWorkflowRequest
        {
            ImageInput = imageToImage.ImageInput,
            UpscaleModel = imageToImage.UpscaleModel,
            TaskType = ComfyTaskType.ImageToImageUpscale
        };
    }

    public static ComfyWorkflowRequest ToComfy(this StableDiffusionImageToImageWithMask imageWithMask)
    {
        return new ComfyWorkflowRequest()
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
            },
            TaskType = ComfyTaskType.ImageToImageWithMask
        };
    }
    
    public static ComfyWorkflowRequest ToComfy(this StableDiffusionTextToImage textToImage)
    {
        return new ComfyWorkflowRequest
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
            TaskType = ComfyTaskType.TextToImage
        };
    }

    public static ComfyWorkflowRequest ToComfy(this StableDiffusionImageToImage imageToImage)
    {
        return new ComfyWorkflowRequest
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
            NegativePrompt = imageToImage.TextPrompts.ExtractNegativePrompt(),
            TaskType = ComfyTaskType.ImageToImage
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