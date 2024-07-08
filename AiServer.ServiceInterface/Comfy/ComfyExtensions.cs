using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface.Comfy;


public static class ComfyExtensions
{
    public static async Task<ComfyWorkflowRequest> ToComfyAsync(this QueueComfyWorkflow request, 
        IComfyClient comfyClient,
        AppConfig appConfig)
    {
        var artStyle = request.ArtStyle ?? ArtStyle.Photographic;
        var artStyleString = artStyle.ToString();
        var artStyleEntry = appConfig.ArtStyleModelMappings[artStyleString];
        
        ComfyFileInput? imageInput = null;
        ComfyFileInput? maskInput = null;
        ComfyFileInput? speechInput = null;
        // Upload image assets if required
        if (request.ImageInput != null)
        {
            var tempFilename = "ComfyUI_" + Guid.NewGuid().ToString("N").Take(5) + ".png";
            imageInput = await comfyClient.UploadImageAssetAsync(request.ImageInput, tempFilename);
        }
        
        if (request.MaskInput != null)
        {
            var tempFilename = "ComfyUI_" + Guid.NewGuid().ToString("N").Take(5) + ".png";
            maskInput = await comfyClient.UploadImageAssetAsync(request.MaskInput, tempFilename);
        }
        
        if (request.SpeechInput != null)
        {
            var tempFilename = "ComfyUI_" + Guid.NewGuid().ToString("N").Take(5) + ".wav";
            speechInput = await comfyClient.UploadAudioAssetAsync(request.SpeechInput, tempFilename);
        }
        
        ComfyWorkflowRequest resObject;
        
        
        switch (request.TaskType)
        {
            case ComfyTaskType.TextToImage:
                resObject = new ComfyWorkflowRequest()
                {
                    Model = request.Model ?? artStyleEntry.Filename,
                    Width = request.Width ?? 1024,
                    Height = request.Height ?? 1024,
                    Sampler = ComfySampler.euler_ancestral,
                    BatchSize = request.BatchSize,
                    Seed = request.Seed ?? Random.Shared.Next(),
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt ?? 
                                     "low quality, blurry, noisy, compression artifacts",
                    Scheduler = "normal",
                    Steps = request.Steps ?? 25,
                    CfgScale = request.CfgScale ?? 7,
                };
                break;
            case ComfyTaskType.ImageToImage:
                if(imageInput == null)
                    throw new Exception("Image input required for ImageToImage task");
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model ?? artStyleEntry.Filename,
                    Denoise = request.Denoise ?? 0.5d,
                    BatchSize = request.BatchSize,
                    Seed = request.Seed ?? Random.Shared.Next(),
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt ?? 
                                     "low quality, blurry, noisy, compression artifacts",
                    Scheduler = request.Scheduler ?? "normal",
                    CfgScale = request.CfgScale ?? 7,
                    Steps = request.Steps ?? 25,
                    Sampler = request.Sampler ?? ComfySampler.euler_ancestral,
                    Image = imageInput
                };
                break;
            case ComfyTaskType.ImageToImageUpscale:
                if(imageInput == null)
                    throw new Exception("Image input required for ImageToImageUpscale task");
                resObject = new ComfyWorkflowRequest
                {
                    Image = imageInput, 
                    UpscaleModel = request.UpscaleModel ?? "RealESRGAN_x2.pth"
                };
                break;
            case ComfyTaskType.ImageToImageWithMask:
                if(imageInput == null)
                    throw new Exception("Image input required for ImageToImageWithMask task");
                if(maskInput == null)
                    throw new Exception("Mask input required for ImageToImageWithMask task");
                resObject = new ComfyWorkflowRequest
                {
                    Model = request.Model ?? artStyleEntry.Filename,
                    Denoise = request.Denoise ?? 0.5d,
                    BatchSize = request.BatchSize,
                    Seed = request.Seed ?? Random.Shared.Next(),
                    PositivePrompt = request.PositivePrompt,
                    NegativePrompt = request.NegativePrompt ?? 
                                     "low quality, blurry, noisy, compression artifacts",
                    Scheduler = request.Scheduler ?? "normal",
                    CfgScale = request.CfgScale ?? 7,
                    Steps = request.Steps ?? 25,
                    Sampler = request.Sampler ?? ComfySampler.euler_ancestral,
                    Image = imageInput,
                    Mask = maskInput,
                    MaskChannel = ComfyMaskSource.red
                };
                break;
            case ComfyTaskType.ImageToText:
                if(imageInput == null)
                    throw new Exception("Image input required for ImageToText task");
                resObject = new ComfyWorkflowRequest
                {
                    Image = imageInput
                };
                break;
            case ComfyTaskType.TextToAudio:
                resObject = new ComfyWorkflowRequest
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
                    Clip = request.Clip ?? "t5_base.safetensors"
                };
                break;
            case ComfyTaskType.TextToSpeech:
                resObject = new ComfyWorkflowRequest
                {
                    PositivePrompt = request.PositivePrompt, 
                    Model = request.Model ?? "high:en_US-lessac"
                };
                break;
            case ComfyTaskType.SpeechToText:
                if (speechInput == null)
                    throw new Exception("Speech input required for SpeechToText task");
                resObject = new ComfyWorkflowRequest
                {
                    Speech = speechInput,
                    Model = request.Model ?? "base"
                };
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

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