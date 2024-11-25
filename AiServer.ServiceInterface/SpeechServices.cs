using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface;

public class SpeechServices(IBackgroundJobs jobs,
    ILogger<SpeechServices> log,
    AppData appData) : Service
{
    public async Task<QueueGenerationResponse> Any(QueueTextToSpeech request)
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
        return await diffRequest.ProcessQueuedGenerationAsync(jobs, diffServices);
    }

    public async Task<QueueGenerationResponse> Any(QueueSpeechToText request)
    {
        if(Request?.Files == null || Request.Files.Length == 0)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Audio));
        }
        
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = "speech-to-text",
                TaskType = AiTaskType.SpeechToText
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessQueuedGenerationAsync(jobs, diffServices);
    }

    public async Task<ArtifactGenerationResponse> Any(TextToSpeech request)
    {
        var model = !string.IsNullOrEmpty(request.Model) ? request.Model : "text-to-speech";
        var prompt = request.Input.Trim();
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = model,
                Seed = request.Seed,
                TaskType = AiTaskType.TextToSpeech,
                PositivePrompt = prompt
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToArtifactGenerationResponse();
    }

    public async Task<TextGenerationResponse> Any(SpeechToText request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Audio));
        }
        
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "speech-to-text",
                TaskType = AiTaskType.SpeechToText
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToTextGenerationResponse();
    }
}

 
