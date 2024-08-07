using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceInterface.Replicate;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface;

public class DiffusionGenerationServices : Service
{
    private readonly ILogger<DiffusionGenerationServices> _log;
    private readonly DiffusionApiProviderFactory _providerFactory;
    private readonly IBackgroundJobs _jobs;
    private readonly AppConfig _appConfig;
    private readonly AppData _appData;

    public DiffusionGenerationServices(
        ILogger<DiffusionGenerationServices> log,
        DiffusionApiProviderFactory providerFactory,
        IBackgroundJobs jobs,
        AppConfig appConfig,
        AppData appData)
    {
        _log = log;
        _providerFactory = providerFactory;
        _jobs = jobs;
        _appConfig = appConfig;
        _appData = appData;
    }

    public async Task<object> Any(CreateDiffusionGeneration request)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));

        var provider = _providerFactory.GetProvider(request.Provider);
        
        if (string.IsNullOrEmpty(request.Request.Model))
            throw new ArgumentException("Model must be specified", nameof(request.Request.Model));

        var jobRef = _jobs.EnqueueCommand<CreateDiffusionGenerationCommand>(request, new()
        {
            ReplyTo = Request.GetHeader("ReplyTo"),
            Tag = Request.GetHeader("Tag"),
            Args = request.Provider == null ? null : new() {
                [nameof(request.Provider)] = request.Provider
            },
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

        var summary = await _jobs.GetJobSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");

        var backgroundJob = await _jobs.GetBackgroundJob(summary);
        if (backgroundJob?.CompletedDate != null)
        {
            var (req, res) = backgroundJob.ExtractRequestResponse<CreateDiffusionGeneration, DiffusionGenerationResponse>();
            if (req != null && res != null)
            {
                var outputs = res.Outputs.ToHostedDiffusionFiles(
                    _appConfig,
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