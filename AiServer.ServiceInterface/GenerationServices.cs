using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using ServiceStack.Web;

namespace AiServer.ServiceInterface;

public class GenerationServices(IBackgroundJobs jobs, AppData appData) : Service
{
    public async Task<object> Any(GetJobStatus request)
    {
        JobResult? job = null;
        if (request.JobId != null)
        {
            job = jobs.GetJob((long)request.JobId);
        }

        if (!string.IsNullOrEmpty(request.RefId))
        {
            job = jobs.GetJobByRefId(request.RefId);
        }
        
        if(job == null || job.Summary.RefId == null)
            throw HttpError.NotFound("Job not found");
        
        // We know at this point, we definitely have a job
        JobResult queuedJob = job;
        
        var completedResponse = new GetJobStatusResponse
        {
            RefId = queuedJob.Job?.RefId ?? queuedJob.Summary.RefId,
            JobId = queuedJob.Job?.Id ?? queuedJob.Summary.Id,
            Status = queuedJob.Job?.Status,
            JobState = queuedJob.Job?.State ?? queuedJob.Summary.State
        };
        
        // Handle failed jobs
        if (queuedJob.Failed != null)
        {
            throw new Exception($"Job failed: {queuedJob.Failed.Error}");
        }
        
        if ((queuedJob.Job?.State ?? queuedJob.Summary.State) != BackgroundJobState.Completed)
            return completedResponse;
        
        // Process successful job results
        var outputs = queuedJob.GetOutputs();
        completedResponse.Outputs = outputs.Item1;
        completedResponse.TextOutputs = outputs.Item2;
        
        return completedResponse;
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
    
    public async Task<object> Any(TextToImage request)
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
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }

    public async Task<object> Any(ImageToImage request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "image-to-image",
                Seed = request.Seed,
                TaskType = AiTaskType.ImageToImage,
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                Denoise = request.Denoise,
                BatchSize = request.BatchSize,
                ImageInput = request.Image
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }

    public async Task<object> Any(ImageUpscale request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "image-upscale-2x",
                Seed = request.Seed,
                TaskType = AiTaskType.ImageUpscale,
                ImageInput = request.Image
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }

    public async Task<object> Any(ImageWithMask request)
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
                ImageInput = request.Image,
                MaskInput = request.Mask
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }

    public async Task<object> Any(ImageToText request)
    {
        var diffRequest = new CreateGeneration
        {
            Request = new()
            {
                Model = "image-to-text",
                TaskType = AiTaskType.ImageToText,
                ImageInput = request.Image
            }
        };
        
        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessGeneration(jobs, diffServices, sync: true);
    }
}

public static class GenerationServiceExtensions
{
    public static async Task<object> ProcessGeneration(this CreateGeneration diffRequest, IBackgroundJobs jobs,
        MediaProviderServices genProviderServices, bool sync = false)
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
        
        if(diffResponse == null)
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
            $"/api/{nameof(GetJobStatus)}?RefId=" + diffResponse.RefId);
        
        var queueResponse = new QueueGenerationResponse
        {
            RefId = diffResponse.RefId,
            JobId = diffResponse.Id,
            Status = queuedJob.Job?.Status,
            JobState = queuedJob.Job?.State ?? queuedJob.Summary.State,
            StatusUrl = jobStatusUrl
        };

        // Handle failed jobs
        if (job.Failed != null)
        {
            throw new Exception($"Job failed: {job.Failed.Error}");
        }
        
        // If not a synchronous request, return immediately with job details
        if (sync != true)
        {
            return queueResponse;
        }
        
        var completedResponse = new GenerationResponse()
        {

        };
        
        // Wait for the job to complete max 1 minute
        var timeout = DateTime.UtcNow.AddMinutes(1);
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
