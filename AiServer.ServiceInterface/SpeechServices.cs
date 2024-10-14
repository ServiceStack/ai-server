using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface;

public class SpeechServices(IBackgroundJobs jobs,
    ILogger<SpeechServices> log,
    AppData appData) : Service
{
    public async Task<object> Any(QueueTextToSpeech request)
    {
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = "text-to-speech",
                Seed = request.Seed,
                TaskType = AiTaskType.TextToSpeech,
                PositivePrompt = request.Text
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices);
    }

    public async Task<object> Any(QueueSpeechToText request)
    {
        if(Request?.Files == null || Request.Files.Length == 0)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Speech));
        }
        
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = "speech-to-text",
                TaskType = AiTaskType.SpeechToText,
                SpeechInput = request.Speech
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices);
    }

    public async Task<object> Any(TextToSpeech request)
    {
        var model = request.Model ?? "text-to-speech";
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = model,
                Seed = request.Seed,
                TaskType = AiTaskType.TextToSpeech,
                PositivePrompt = request.Input
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }

    public async Task<object> Any(SpeechToText request)
    {
        if(Request?.Files == null || Request.Files.Length == 0)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Speech));
        }
        
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "speech-to-text",
                TaskType = AiTaskType.SpeechToText,
                SpeechInput = request.Speech
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }
}

 
