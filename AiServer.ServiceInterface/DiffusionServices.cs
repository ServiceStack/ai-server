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
            ReplyTo = Request.GetHeader("ReplyTo"),
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
        if (backgroundJob?.CompletedDate != null)
        {
            var (req, res) = backgroundJob.ExtractRequestResponse<CreateDiffusionGeneration, DiffusionGenerationResponse>();
            if (req != null && res != null)
            {
                var outputs = res.Outputs.ToHostedDiffusionFiles(
                    appConfig,
                    req.Provider ?? "default",
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
}

public static class DiffusionFileServicesExtensions
{
    public static List<AiServerHostedDiffusionFile> ToHostedDiffusionFiles(this List<DiffusionApiProviderOutput> outputs, AppConfig appConfig, string providerName, string refId, string year, string month, string day)
    {
        return outputs.Select(file => new AiServerHostedDiffusionFile
        {
            FileName = $"{refId}-{file.FileName}",
            Url = $"{appConfig.AssetsBaseUrl}/{providerName}/{year}/{month}/{day}/{refId}-{file.FileName}",
        }).ToList();
    }
}