using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using ServiceStack.Web;

namespace AiServer.ServiceInterface;

public class GenerationServices(IBackgroundJobs jobs, AppData appData, AppConfig appConfig) : Service
{
    public GetTextGenerationStatusResponse Any(GetTextGenerationStatus request)
    {
        var job = (request.JobId != null
                      ? jobs.GetJob((long)request.JobId)
                      : null)
                  ?? (!string.IsNullOrEmpty(request.RefId)
                      ? jobs.GetJobByRefId(request.RefId)
                      : null);

        if (job?.Job == null || job.Summary.RefId == null)
            throw HttpError.NotFound("Job not found");
        if (job.Failed != null)
            throw new Exception($"Job failed: {job.Failed.Error}");
        
        var ret = new GetTextGenerationStatusResponse
        {
            RefId = job.Job?.RefId ?? job.Summary.RefId,
            JobId = job.Job?.Id ?? job.Summary.Id,
            Status = job.Job?.Status ?? job.Job!.State.ToString(),
            JobState = job.Job?.State ?? job.Summary.State
        };
        
        if ((job.Job?.State ?? job.Summary.State) != BackgroundJobState.Completed)
            return ret;
        
        var outputs = job.GetOutputs();
        ret.Results = outputs.Item2; // Get TextOutputs
        return ret;
    }
    
    public GetArtifactGenerationStatusResponse Any(GetArtifactGenerationStatus request)
    {
        var job = (request.JobId != null
              ? jobs.GetJob((long)request.JobId)
              : null)
          ?? (!string.IsNullOrEmpty(request.RefId)
              ? jobs.GetJobByRefId(request.RefId)
              : null);

        if (job?.Job == null || job.Summary.RefId == null)
            throw HttpError.NotFound("Job not found");
        if (job.Failed != null)
            throw new Exception($"Job failed: {job.Failed.Error}");
        
        var ret = new GetArtifactGenerationStatusResponse
        {
            RefId = job.Job?.RefId ?? job.Summary.RefId,
            JobId = job.Job?.Id ?? job.Summary.Id,
            Status = job.Job?.Status ?? job.Job!.State.ToString(),
            JobState = job.Job?.State ?? job.Summary.State
        };
        
        if ((job.Job?.State ?? job.Summary.State) != BackgroundJobState.Completed)
            return ret;
        
        var outputs = job.GetOutputs();
        ret.Results = outputs.Item1; // Get ArtifactOutputs
        return ret;
    }
    
    public object Any(ActiveMediaModels request)
    {
        var activeModels = appData.MediaProviders
            .OrderByDescending(x => x.Priority)
            .ThenBy(x => x.Id)
            .ThenBy(x => x.Name)
            .SelectMany(x => 
                x.Models.Select(m => appData.GetQualifiedMediaModel(ModelType.TextToImage, m)))
            .Where(x => x != null)
            .Select(x => x!)  // Non-null assertion after filtering out null values
            .Distinct();
        
        return new StringsResponse
        {
            Results = activeModels.ToList() 
        };
    }
    
    public async Task<ArtifactGenerationResponse> Any(TextToImage request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = request.Model,
                Seed = request.Seed,
                TaskType = AiTaskType.TextToImage,
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                Width = request.Width,
                Height = request.Height,
                BatchSize = request.BatchSize
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToArtifactGenerationResponse();
    }

    public async Task<ArtifactGenerationResponse> Any(ImageToImage request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = request.Model ?? "image-to-image",
                Seed = request.Seed,
                TaskType = AiTaskType.ImageToImage,
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                Denoise = request.Denoise,
                BatchSize = request.BatchSize,
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToArtifactGenerationResponse();
    }

    public async Task<ArtifactGenerationResponse> Any(ImageUpscale request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "image-upscale-2x",
                Seed = request.Seed,
                TaskType = AiTaskType.ImageUpscale,
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToArtifactGenerationResponse();
    }

    public async Task<ArtifactGenerationResponse> Any(ImageWithMask request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "image-with-mask",
                Seed = request.Seed,
                TaskType = AiTaskType.ImageWithMask,
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                Denoise = request.Denoise,
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToArtifactGenerationResponse();
    }

    public async Task<TextGenerationResponse> Any(ImageToText request)
    {
        if (request is { Model: not null, Prompt: not null })
        {
            var filesMap = Request!.HandleFileUploads(appConfig);
            if (filesMap.Count == 0)
                throw new ArgumentNullException(nameof(request.Image));

            var file = Request!.Files.First(x => x.Name == filesMap.First().Key);
            var fileBytes = file.InputStream.ReadFully();
            var generateRequest = new QueueOllamaGeneration
            {
                Request = new()
                {
                    Model =  request.Model,
                    Prompt =  request.Prompt,
                    Images = [Convert.ToBase64String(fileBytes)],
                },
                RefId = request.RefId,
                Tag = request.Tag,
            };

            await using var chatService = HostContext.ResolveService<OpenAiChatServices>(Request);
            var response = await generateRequest.ProcessSync(jobs, chatService);

            return new TextGenerationResponse
            {
                Results = response.Response != null ? [
                    new() { Text = response.Response }
                ] : null,
                ResponseStatus = response.ResponseStatus
            };
        }
        
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "image-to-text",
                TaskType = AiTaskType.ImageToText,
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        var result = await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
        return result.ToTextGenerationResponse();
    }
}

public static class GenerationServiceExtensions
{
    public static async Task<QueueGenerationResponse> ProcessQueuedGenerationAsync(this CreateGeneration diffRequest, IBackgroundJobs jobs, MediaProviderServices genProviderServices)
    {
        CreateGenerationResponse? diffResponse = null;
        try
        {
            var response = genProviderServices.Any(diffRequest);
            diffResponse = response as CreateGenerationResponse;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
        if (diffResponse == null)
            throw new Exception("Failed to start generation");
        
        var job = jobs.GetJob(diffResponse.Id);
        // For synchronous requests, wait for the job to be created
        while (job == null)
        {
            await Task.Delay(1000);
            job = jobs.GetJob(diffResponse.Id);
        }
        
        // We know at this point, we definitely have a job
        JobResult? queuedJob = job;

        // Return the job status URL
        var jobStatusUrl = AppConfig.Instance.ApplicationBaseUrl.CombineWith(
            $"/api/{nameof(GetArtifactGenerationStatus)}?RefId=" + diffResponse.RefId);
        
        var queueResponse = new QueueGenerationResponse
        {
            RefId = diffResponse.RefId,
            JobId = diffResponse.Id,
            Status = queuedJob.Job?.Status,
            JobState = queuedJob.Job?.State ?? queuedJob.Summary.State,
            StatusUrl = GetStatusUrl(diffRequest, diffResponse)
        };

        // Handle failed jobs
        if (job.Failed != null)
        {
            throw new Exception($"Job failed: {job.Failed.Error}");
        }
        
        return queueResponse;
    }

    public static async Task<GenerationResponse> ProcessSyncGenerationAsync(this CreateGeneration diffRequest, IBackgroundJobs jobs, MediaProviderServices genProviderServices)
    {
        CreateGenerationResponse? diffResponse = null;
        try
        {
            var response = genProviderServices.Any(diffRequest);
            diffResponse = response as CreateGenerationResponse;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
        if (diffResponse == null)
            throw new Exception("Failed to start generation");
        
        var job = jobs.GetJob(diffResponse.Id);
        // For synchronous requests, wait for the job to be created
        while (job == null)
        {
            await Task.Delay(1000);
            job = jobs.GetJob(diffResponse.Id);
        }
        
        // We know at this point, we definitely have a job
        JobResult? queuedJob = job;

        var completedResponse = new GenerationResponse { };
        
        // Wait for the job to complete max 20 minutes
        var timeout = DateTime.UtcNow.AddSeconds(job.Job?.TimeoutSecs ?? 20 * 60);
        while (queuedJob?.Job?.State is not (BackgroundJobState.Completed or BackgroundJobState.Cancelled
                   or BackgroundJobState.Failed) && DateTime.UtcNow < timeout)
        {
            await Task.Delay(1000);
            queuedJob = jobs.GetJob(diffResponse.Id);
        }
        
        // Handle null job
        if (queuedJob?.Job == null || queuedJob.Job.State == BackgroundJobState.Queued ||
            queuedJob.Job.State == BackgroundJobState.Started)
            throw new Exception("Failed to complete job within timeout");
        
        // Handle failed jobs
        if (queuedJob.Failed != null)
            throw new Exception($"Job failed: {queuedJob.Failed.Error?.Message}");
        
        // Handle cancelled jobs
        if (queuedJob.Job?.State == BackgroundJobState.Cancelled)
            throw new Exception("Job was cancelled");
        
        // Process successful job results
        var jobReqRes = queuedJob.Job!.ExtractRequestResponse<CreateGeneration, GenerationResult>();
        var jobRes = jobReqRes.Item2;
        if (jobRes == null) 
            return completedResponse;
        var outputs = queuedJob.GetOutputs();
        completedResponse.Outputs = outputs.Item1;
        completedResponse.TextOutputs = outputs.Item2;

        return completedResponse;
    }
    
    public static string GetStatusUrl(this CreateGeneration request, CreateGenerationResponse response)
    {
        switch (request.Request.TaskType)
        {
            case AiTaskType.TextToImage:
            case AiTaskType.ImageToImage:
            case AiTaskType.ImageUpscale:
            case AiTaskType.ImageWithMask:
            case AiTaskType.TextToSpeech:
            case AiTaskType.TextToAudio:
                return AppConfig.Instance.ApplicationBaseUrl.CombineWith(
                    $"/api/{nameof(GetArtifactGenerationStatus)}?RefId=" + response.RefId);
            case AiTaskType.SpeechToText:
            case AiTaskType.ImageToText:
                return AppConfig.Instance.ApplicationBaseUrl.CombineWith(
                    $"/api/{nameof(GetTextGenerationStatus)}?RefId=" + response.RefId);
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    public static Tuple<List<ArtifactOutput>?,List<TextOutput>?> GetOutputs(this JobResult? job)
    {
        var outputs = new List<ArtifactOutput>();
        var textOutputs = new List<TextOutput>();
        if(job.Completed == null)
            return new Tuple<List<ArtifactOutput>?, List<TextOutput>?>(null, null);
        var jobReqRes = new Tuple<CommandReqWithProvider?, CommandResultWithOutputs?>(
            job.Completed.RequestBody.FromJson<CommandReqWithProvider>(),
            job.Completed.ResponseBody.FromJson<CommandResultWithOutputs>()
        );
        var jobReq = jobReqRes.Item1;
        var jobRes = jobReqRes.Item2;
        if (jobRes != null)
        {
            var baseUrl = AppConfig.Instance.AssetsBaseUrl;
            // Map job outputs to ArtifactOutputs
            foreach (var output in jobRes.Outputs ?? [])
            {
                outputs.Add(new ArtifactOutput
                {
                    FileName = output.FileName,
                    Url = baseUrl.CombineWith(output.Url),
                    Provider = jobReq?.Provider,
                });
            }

            foreach (var textOutput in jobRes.TextOutputs ?? [])
            {
                textOutputs.Add(new TextOutput
                {
                    Text = textOutput.Text
                });
            }
        }
        
        return new Tuple<List<ArtifactOutput>?, List<TextOutput>?>(outputs, textOutputs);
    }
    
    private class CommandResultWithOutputs
    {
        public List<ArtifactOutput> Outputs { get; set; }
        public List<TextOutput> TextOutputs { get; set; }
    }

    private class CommandReqWithProvider
    {
        public string? Provider { get; set; }
    }
}
