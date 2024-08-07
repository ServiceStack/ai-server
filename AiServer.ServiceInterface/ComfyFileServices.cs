using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyFileServices(AppData appData, 
    IHttpClientFactory httpClientFactory,
    ComfyProviderFactory comfyProviderFactory,
    IDbConnectionFactory dbFactory,
    IBackgroundJobs jobs,
    AppConfig appConfig,
    ILogger<ComfyFileServices> log) : Service
{
    private static TimeSpan waitforTimeout = TimeSpan.FromSeconds(120);

    public async Task<object> Any(GetComfyGeneration request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        var summary = await jobs.GetJobSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");
        
        var backgroundJob = await jobs.GetBackgroundJob(summary);
        if (backgroundJob?.CompletedDate != null)
        {
            var (req, res) = backgroundJob.ExtractRequestResponse<CreateComfyGeneration, ComfyWorkflowStatus>();
            if (req != null && res != null)
            {
                var outputs = res.Outputs.ToHostedComfyFiles(
                    appConfig, backgroundJob.RefId, 
                    summary.CreatedDate.Year.ToString(), 
                    summary.CreatedDate.Month.ToString("00"), 
                    summary.CreatedDate.Day.ToString("00"));
                return new GetComfyGenerationResponse
                {
                    Request = req,
                    Result = res,
                    Outputs = outputs,
                };
            }
        };
        
        return HttpError.NotFound("Job not found");
    }
    
    public async Task<object> Any(WaitForComfyGeneration request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));

        var summary = await jobs.GetJobSummaryAsync(request.Id, request.RefId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");
        
        // Loop waiting for completed task
        var start = DateTime.UtcNow;
        while (DateTime.UtcNow - start < waitforTimeout)
        {
            var backgroundJob = await jobs.GetBackgroundJob(summary);
            if (backgroundJob?.CompletedDate != null)
            {
                var (req, res) = backgroundJob.ExtractRequestResponse<CreateComfyGeneration, ComfyWorkflowStatus>();
                if (req != null && res != null)
                {
                    var outputs = res.Outputs.ToHostedComfyFiles(
                        appConfig, backgroundJob.RefId, 
                        summary.CreatedDate.Year.ToString(), 
                        summary.CreatedDate.Month.ToString("00"), 
                        summary.CreatedDate.Day.ToString("00"));
                    return new GetComfyGenerationResponse
                    {
                        Request = req,
                        Result = res,
                        Outputs = outputs,
                    };
                }
            };
            await Task.Delay(1000);
        }
        
        return HttpError.NotFound("Job not found");
    }
    public async Task<object> Get(DownloadComfyFile request)
    {
        if (request.FileName == null)
            throw HttpError.NotFound("File not found");
        
        // Must use format /comfy/{YYYY}/{MM}/{DD}/{FileName}
        // Request DTO as int so must pad, ensures only date/number paths can be checked
        var day = request.Day.Value.ToString("00");
        var month = request.Month.Value.ToString("00");
        var year = request.Year.Value.ToString("0000");
        var filePath = $"/comfy/{year}/{month}/{day}/{request.FileName}";
        var fileExt = Path.GetExtension(request.FileName).TrimStart('.');
        
        log.LogInformation($"filePath: {filePath}, fileExt: {fileExt}");
        
        if (VirtualFiles.GetFile(filePath) is { } virtualFile)
        {
            var fileStream = virtualFile.OpenRead();
            return new HttpResult(fileStream, MimeTypes.GetMimeType(fileExt));
        }

        var fullFileName = Path.GetFileNameWithoutExtension(request.FileName);
        var promptId = fullFileName.SplitOnLast("-")[0];
        var comfyFile = fullFileName.SplitOnLast("-")[1];
        
        log.LogInformation($"fullFileName: {fullFileName}, promptId: {promptId}, comfyFile: {comfyFile}");
        
        var summary = await jobs.GetJobSummaryAsync(null, promptId);
        if (summary == null)
            throw HttpError.NotFound("Job not found");
        
        var job = await jobs.GetBackgroundJob(summary);
        if (job == null)
            throw HttpError.NotFound("Job not found");
        
        var (jobReq, jobRes) = job.ExtractRequestResponse<CreateComfyGeneration, ComfyWorkflowStatus>();
        if (jobReq == null || jobRes == null)
            throw HttpError.NotFound("Job not found");
        
        if (jobRes != null && jobRes.Error != null)
            throw HttpError.NotFound("File not found - Error in task");
        
        if (job == null || job.CompletedDate == null)
            throw HttpError.NotFound("File not found");
        
        log.LogDebug($"task: {job.ToJson()}");
        
        var output = jobRes?.Outputs.FirstOrDefault(x => x.Files?.Any(y => y.Filename == comfyFile + "." + fileExt) == true);
        if (output == null)
            throw HttpError.NotFound("File not found");
        
        var file = output.Files.First(x => x.Filename == comfyFile + "." + fileExt);
        
        var apiProvider = appData.AssertComfyProvider(job.Worker!);
        var comfyProvider = comfyProviderFactory.GetComfyProvider(apiProvider.Name);
        var comfyClient = comfyProvider.GetComfyClient(apiProvider);
        var contentStream = await comfyClient.DownloadComfyOutputAsync(file);

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

    private void ConfigureHttpClient(HttpClient httpClient, ComfyApiProvider provider)
    {
        if (!string.IsNullOrEmpty(provider.ApiKey))
        {
            if (!string.IsNullOrEmpty(provider.ApiKeyHeader))
            {
                httpClient.DefaultRequestHeaders.Add(provider.ApiKeyHeader, provider.ApiKey);
            }
            else
            {
                httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", provider.ApiKey);
            }
        }
    }
}

public static class BackgroundJobsFeatureExtensions
{
    public static Tuple<TReq?,TRes?> ExtractRequestResponse<TReq, TRes>(this BackgroundJob job)
    where TReq : class
    where TRes : class
    {
        var reqTypeName = job.Request;
        var resTypeName = job.Response;
        if (reqTypeName == typeof(TReq).Name && resTypeName == typeof(TRes).Name)
        {
            return new Tuple<TReq?, TRes?>(
                job.RequestBody.FromJson<TReq>(),
                job.ResponseBody.FromJson<TRes>()
            );
        }
        if(reqTypeName != typeof(TReq).Name && resTypeName != typeof(TRes).Name)
        {
            return new Tuple<TReq?, TRes?>(null, null);
        }
        if(reqTypeName != typeof(TReq).Name)
        {
            return new Tuple<TReq?, TRes?>(
                null,
                job.ResponseBody.FromJson<TRes>()
            );
        }
        return new Tuple<TReq?, TRes?>(
            job.RequestBody.FromJson<TReq>(),
            null
        );
    }
    public static async Task<BackgroundJob?> GetBackgroundJob(
        this IBackgroundJobs feature, 
        JobSummary summary)
    {
        using var db = feature.OpenJobsDb();
        
        var activeTask = await db.SingleByIdAsync<BackgroundJob>(summary.Id);
        if (activeTask != null)
        {
            // Task still active, so we don't have a result yet
            return activeTask;
        }

        using var monthDb = feature.OpenJobsMonthDb(summary.CreatedDate);
        var completedTask = await monthDb.SingleByIdAsync<CompletedJob>(summary.Id);
        if (completedTask != null)
        {
            return completedTask;
        }

        var failedTask = await monthDb.SingleByIdAsync<FailedJob>(summary.Id);
        return failedTask;
    }
    
    public static async Task<JobSummary?> GetJobSummaryAsync(
        this IBackgroundJobs feature,int? id, string? refId)
    {
        using var db = feature.OpenJobsDb();
        var q = db.From<JobSummary>();
        if (refId != null)
            q.Where(x => x.RefId == refId);
        else if (id != null)
            q.Where(x => x.Id == id);
        else
            throw new ArgumentNullException(nameof(JobSummary.Id));
        
        var summary = await db.SingleAsync(q);
        return summary;
    }
}

public class WaitForComfyGeneration : IReturn<GetComfyGenerationResponse>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

public static class ComfyFileServicesExtensions
{
    public static string GetComfyFileUrl(this ComfyFileOutput fileOutput, string comfyProviderBaseUrl)
    {
        return $"{comfyProviderBaseUrl}/view?filename={fileOutput.Filename}&type={fileOutput.Type}&subfolder={fileOutput.Subfolder}";
    }
    
    public static List<AiServerHostedComfyFile> ToHostedComfyFiles(this List<ComfyOutput> outputs, AppConfig appConfig, string refId, string year, string month, string day)
    {
        return outputs.SelectMany(x => x.Files.Select(y => new AiServerHostedComfyFile
        {
            FileName = $"{refId}-{y.Filename}",
            Url = $"{appConfig.AssetsBaseUrl}/comfy/{year}/{month}/{day}/{refId}-{y.Filename}",
        })).ToList();
    }
}