using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceInterface.Diffusion;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class DiffusionGenerationServices(ILogger<DiffusionGenerationServices> log,
    DiffusionApiProviderFactory providerFactory,
    IBackgroundJobs jobs,
    AppConfig appConfig,
    AppData appData) : Service
{
    public async Task<object> Any(CreateDiffusionGeneration request)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));

        
        var useProviderDefaultModel = request.Provider == null && string.IsNullOrEmpty(request.Request.Model);
        
        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        DiffusionApiProvider? useProvider = null;
        var candidates = appData.DiffusionApiProviders
            .Where(x => x is { Enabled: true, Models: not null } && 
                        (useProviderDefaultModel || x.Models.Any(m => 
                            m == request.Request.Model)))
            .ToList();
        foreach (var candidate in candidates)
        {
            if (candidate.OfflineDate != null)
                continue;
            var pendingJobs = queueCounts.GetValueOrDefault(candidate.Name, 0);
            if (useProvider == null)
            {
                useProvider = candidate;
                providerQueueCount = pendingJobs;
                continue;
            }
            if (pendingJobs < providerQueueCount || (pendingJobs == providerQueueCount && candidate.Priority > useProvider.Priority))
            {
                useProvider = candidate;
                providerQueueCount = pendingJobs;
            }
        }
        
        var model = request.Request.Model;

        if (useProviderDefaultModel && useProvider is { Models.Count: > 0 })
        {
            model = useProvider.Models.First();
        }

        useProvider ??= candidates.FirstOrDefault(x => x.Name == model); // Allow selecting offline models
        if (useProvider == null)
            throw new NotSupportedException("No active ComfyAPI Providers support this model");
        
        if (model == null)
            throw HttpError.NotFound($"Model {model} not found");
        
        var jobRef = jobs.EnqueueCommand<CreateDiffusionGenerationCommand>(request, new()
        {
            ReplyTo = request.ReplyTo ?? Request.GetHeader("ReplyTo"),
            Tag = Request.GetHeader("Tag"),
            Args = request.Provider == null ? null : new() {
                [nameof(request.Provider)] = request.Provider
            },
            Worker = useProvider.Name
        });

        return new CreateDiffusionGenerationResponse
        {
            Id = jobRef.Id,
            RefId = jobRef.RefId,
        };
    }

    public async Task<object> Any(GetDiffusionGeneration request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        var summary = await jobs.GetJobSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");

        var backgroundJob = await jobs.GetBackgroundJob(summary);
        var apiProvider = appData.AssertDiffusionProvider(backgroundJob?.Worker!);
        if (backgroundJob?.CompletedDate != null)
        {
            var (req, res) = backgroundJob.ExtractRequestResponse<CreateDiffusionGeneration, DiffusionGenerationResponse>();
            if (req != null && res != null)
            {
                var outputs = res.Outputs.ToHostedDiffusionFiles(
                    appConfig,
                    apiProvider.Name,
                    backgroundJob.RefId,
                    summary.CreatedDate.Year.ToString(),
                    summary.CreatedDate.Month.ToString("00"),
                    summary.CreatedDate.Day.ToString("00"));

                return new GetDiffusionGenerationResponse
                {
                    Request = req.Request,
                    Result = res,
                    Outputs = outputs,
                };
            }
        }

        return HttpError.NotFound("Job not found");
    }
    
    public async Task<object> Get(DownloadDiffusionFile request)
    {
        if (request.FileName == null)
            throw HttpError.NotFound("File not found");
        
        // Must use format /comfy/{YYYY}/{MM}/{DD}/{FileName}
        // Request DTO as int so must pad, ensures only date/number paths can be checked
        var day = request.Day.Value.ToString("00");
        var month = request.Month.Value.ToString("00");
        var year = request.Year.Value.ToString("0000");
        var filePath = $"/{request.Provider}/{year}/{month}/{day}/{request.FileName}";
        var fileExt = Path.GetExtension(request.FileName).TrimStart('.');
        
        log.LogInformation($"filePath: {filePath}, fileExt: {fileExt}");
        
        if (VirtualFiles.GetFile(filePath) is { } virtualFile)
        {
            var fileStream = virtualFile.OpenRead();
            return new HttpResult(fileStream, MimeTypes.GetMimeType(fileExt));
        }

        var fullFileName = Path.GetFileNameWithoutExtension(request.FileName);
        var refIdName = fullFileName.SplitOnFirst("-");
        var refId = refIdName[0];
        var diffusionFile = refIdName[1];
        
        log.LogInformation($"fullFileName: {fullFileName}, refId: {refId}, diffusionFile: {diffusionFile}");
        
        var summary = await jobs.GetJobSummaryAsync(null, refId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");
        
        var job = await jobs.GetBackgroundJob(summary);
        if (job == null)
            throw HttpError.NotFound("Job not found");
        
        var (jobReq, jobRes) = job.ExtractRequestResponse<CreateDiffusionGeneration, DiffusionGenerationResponse>();
        if (jobReq == null || jobRes == null)
            throw HttpError.NotFound("Job not found");
        
        if (jobRes != null && jobRes.Error != null)
            throw HttpError.NotFound("File not found - Error in task");
        
        if (job == null || job.CompletedDate == null)
            throw HttpError.NotFound("File not found");
        
        log.LogDebug($"task: {job.ToJson()}");
        
        var output = jobRes?.Outputs.FirstOrDefault(x => x.FileName == diffusionFile + "." + fileExt);
        if (output == null)
            throw HttpError.NotFound("File not found");

        var file = output;
        
        var apiProvider = appData.AssertDiffusionProvider(job.Worker!);
        var comfyProvider = providerFactory.GetProvider(apiProvider.Name);
        var contentStream = await comfyProvider.DownloadOutputAsync(apiProvider,file, token: default);

        // Store the file in VirtualFiles asynchronously
        _ = Task.Run(async () =>
        {
            using var memoryStream = new MemoryStream();
            await contentStream.CopyToAsync(memoryStream);
            memoryStream.Position = 0;
            VirtualFiles.WriteFile(filePath, memoryStream);
        });

        return new HttpResult(contentStream, MimeTypes.GetMimeType(fileExt));
    }
}

[Route("/download/{Provider}/{Year}/{Month}/{Day}/{Filename}")]
public class DownloadDiffusionFile : IReturn<Stream>
{
    public string Provider { get; set; }
    public int? Year { get; set; }
    public int? Month { get; set; }
    public int? Day { get; set; }
    public string? FileName { get; set; }
}

public static class DiffusionFileServicesExtensions
{
    public static List<AiServerHostedDiffusionFile> ToHostedDiffusionFiles(this List<DiffusionApiProviderOutput> outputs, AppConfig appConfig, string providerName, string refId, string year, string month, string day)
    {
        return outputs.Select(file => new AiServerHostedDiffusionFile
        {
            FileName = $"{refId}-{file.FileName}",
            Url = $"{appConfig.AssetsBaseUrl}/download/{providerName}/{year}/{month}/{day}/{refId}-{file.FileName}",
        }).ToList();
    }
}