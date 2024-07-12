using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class ComfyFriendlyServices : Service
{
    public async Task<object> Post(ComfyTextToImage request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.TextToImage;
        
        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyTextToImageResponse
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            Images = result?.FileOutputs.Select(x => new ComfyHostedFileOutput
            {
                Url = x.Url,
                FileName = x.FileName
            }).ToList()
        };
    }
    
    public async Task<object> Post(ComfyImageToText request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToText;

        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyImageToTextResponse
        {
            PromptId = result?.PromptId,
            TextOutput = result?.TextOutputs[0]
        };
    }
    
    public async Task<object> Post(ComfyImageToImage request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToImage;

        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyImageToImageResponse
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            Images = result?.FileOutputs
        };
    }
    
    public async Task<object> Post(ComfyImageToImageUpscale request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToImageUpscale;
        
        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyImageToImageUpscaleResponse()
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            Images = result?.FileOutputs
        };
    }
    
    // ImageToImageWithMask
    public async Task<object> Post(ComfyImageToImageWithMask request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToImageWithMask;
        
        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyImageToImageWithMaskResponse
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            Images = result?.FileOutputs
        };
    }
    
    // TextToSpeech
    public async Task<object> Post(ComfyTextToSpeech request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.TextToSpeech;

        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyTextToSpeechResponse
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            Speech = result?.FileOutputs
        };
    }
    
    // SpeechToText
    public async Task<object> Post(ComfySpeechToText request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.SpeechToText;

        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfySpeechToTextResponse
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            TextOutput = result?.TextOutputs[0]
        };
    }
    
    // TextToAudio
    public async Task<object> Post(ComfyTextToAudio request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.TextToAudio;

        var result = await genericService.Post(queueComfyReq) as QueueComfyWorkflowResponse;
        return new ComfyTextToAudioResponse
        {
            PromptId = result?.PromptId,
            Request = result?.Request,
            Sounds = result?.FileOutputs
        };
    }
}