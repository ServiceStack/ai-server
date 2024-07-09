using AiServer.ServiceInterface.Comfy;
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
        
        var result = await genericService.Post(queueComfyReq);
        return result;
    }
    
    public async Task<object> Post(ComfyImageToText request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToText;
        
        var result = await genericService.Post(queueComfyReq);
        return result;
    }
    
    public async Task<object> Post(ComfyImageToImage request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToImage;
        
        var result = await genericService.Post(queueComfyReq);
        return result;
    }
    
    public async Task<object> Post(ComfyImageToImageUpscale request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToImageUpscale;
        
        var result = await genericService.Post(queueComfyReq);
        return result;
    }
    
    // ImageToImageWithMask
    public async Task<object> Post(ComfyImageToImageWithMask request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.ImageToImageWithMask;
        
        var result = await genericService.Post(queueComfyReq);
        return result;
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
            FilePath = result.FileOutputs[0].Url
        };
    }
    
    // SpeechToText
    public async Task<object> Post(ComfySpeechToText request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.SpeechToText;
        
        var result = await genericService.Post(queueComfyReq);
        return result;
    }
    
    // TextToAudio
    public async Task<object> Post(ComfyTextToAudio request)
    {
        var genericService = ResolveService<ComfyApiServices>();
        var queueComfyReq = request.ConvertTo<QueueComfyWorkflow>();
        queueComfyReq.TaskType = ComfyTaskType.TextToAudio;
        
        var result = await genericService.Post(queueComfyReq);
        return result;
    }
}