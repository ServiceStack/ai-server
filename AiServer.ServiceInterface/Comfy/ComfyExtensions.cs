namespace AiServer.ServiceInterface.Comfy;


public static class ComfyExtensions
{
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
    
    public static ComfyTextToSpeech ToComfy(this OpenAiTextToSpeech textToSpeech)
    {
        return new ComfyTextToSpeech
        {
            Input = textToSpeech.Input,
            //Model = textToSpeech.Model
            Quality = textToSpeech?.Quality ?? "high",
            Voice = textToSpeech.Voice
        };
    }
    
    public static ComfySpeechToText ToComfy(this OpenAiWhisperSpeechToText speechToText)
    {
        return new ComfySpeechToText
        {
            WhisperModel = speechToText.Model,
            InitAudio = speechToText.File
        };
    }
    
    public static ComfyImageToText ToComfy(this StableDiffusionImageToText imageToText)
    {
        return new ComfyImageToText
        {
            InitImage = imageToText.InitImage
        };
    }
    
    public static ComfyImageToImageUpscale ToComfy(this StableDiffusionImageToImageUpscale imageToImage)
    {
        return new ComfyImageToImageUpscale
        {
            InitImage = imageToImage.Image
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
            InitImage = imageWithMask.InitImage,
            InitMask = imageWithMask.MaskImage,
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
            InitImage = imageToImage.InitImage,
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