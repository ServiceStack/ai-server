using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyFileServices(AppData appData, 
    IHttpClientFactory httpClientFactory,
    IDbConnectionFactory dbFactory,
    AppConfig appConfig,
    ILogger<ComfyFileServices> log) : Service
{
    private static TimeSpan waitforTimeout = TimeSpan.FromSeconds(120);
    
    public async Task<object> Any(WaitForComfyGeneration request)
    {
        if (request.Id == null && request.RefId == null)
            throw new ArgumentNullException(nameof(request.Id));
        
        var q = Db.From<ComfySummary>();
        if (request.Id != null)
            q.Where(x => x.Id == request.Id);
        else if (request.RefId != null)
            q.Where(x => x.RefId == request.RefId);

        ComfySummary? summary = null;
        
        var startedAt = DateTime.UtcNow;
        while(DateTime.UtcNow - startedAt < waitforTimeout)
        {
            summary ??= await GetComfySummary(request.Id, request.RefId);
            if (summary != null)
            {
                var response = await GetComfyGenerationResponse(summary);
                if (response?.Result?.Response != null)
                    return response;
            }
            await Task.Delay(500);
        }
        return HttpError.NotFound("Task not found");
    }
    
    private async Task<GetComfyGenerationResponse?> GetComfyGenerationResponse(ComfySummary summary)
    {
        var activeTask = await Db.SingleByIdAsync<ComfyGenerationTask>(summary.Id);
        if (activeTask is { Status.Completed: true })
            return new GetComfyGenerationResponse
            {
                Result = activeTask,
                Outputs = activeTask.Status?.Outputs.ToHostedComfyFiles(appConfig, activeTask.RefId, summary.CreatedDate.Year.ToString(), summary.CreatedDate.Month.ToString(), summary.CreatedDate.Day.ToString())
                    .ToList()
            };

        if (string.IsNullOrEmpty(summary.RefId))
        {
            log.LogWarning($"RefId is null for ComfySummary: {summary.ToJson()}");
            return null;
        }
            
        
        using var monthDb = dbFactory.GetMonthDbConnection(summary.CreatedDate);
        var completedTask = await monthDb.SingleByIdAsync<ComfyGenerationCompleted>(summary.Id);
        if (completedTask != null)
            return new GetComfyGenerationResponse
            {
                Result = completedTask.ConvertTo<ComfyGenerationTask>(),
                Outputs = completedTask.Status?.Outputs.ToHostedComfyFiles(appConfig, summary.RefId, summary.CreatedDate.Year.ToString(), summary.CreatedDate.Month.ToString(), summary.CreatedDate.Day.ToString())
                    .ToList()
            };
        
        var failedTask = await monthDb.SingleByIdAsync<ComfyGenerationFailed>(summary.Id);
        if (failedTask != null)
            return new GetComfyGenerationResponse
            {
                Result = failedTask.ConvertTo<ComfyGenerationTask>(),
                ResponseStatus = failedTask.Error
            };
        
        return null;
    }
    
    private async Task<ComfySummary?> GetComfySummary(int? id, string? refId)
    {
        var q = Db.From<ComfySummary>();
        if (id != null && id != 0)
            q.Where(x => x.Id == id);
        else if (!string.IsNullOrEmpty(refId))
            q.Where(x => x.RefId == refId);
        
        return await Db.SingleAsync(q);
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
        
        var task = await Db.SingleAsync<ComfyGenerationTask>(x => x.RefId == promptId);
        if (task == null || task.Status?.Completed != true)
            throw HttpError.NotFound("File not found");
        
        log.LogDebug($"task: {task.ToJson()}");
        
        var output = task.Status.Outputs.FirstOrDefault(x => x.Files?.Any(y => y.Filename == comfyFile + "." + fileExt) == true);
        if (output == null)
            throw HttpError.NotFound("File not found");
        
        var file = output.Files.First(x => x.Filename == comfyFile + "." + fileExt);
        
        var provider = await Db.SingleAsync<ComfyApiProvider>(x => x.Name == task.Provider);
        if (provider == null)
            throw HttpError.NotFound("File not found");
        
        var comfyFileUrl = file.GetComfyFileUrl(provider.ApiBaseUrl);
        
        var httpClient = httpClientFactory.CreateClient("ComfyClientFileDownload");
        ConfigureHttpClient(httpClient, provider);

        var response = await httpClient.GetAsync(comfyFileUrl);
        if (!response.IsSuccessStatusCode)
            throw HttpError.NotFound("File not found");

        var contentStream = await response.Content.ReadAsStreamAsync();

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