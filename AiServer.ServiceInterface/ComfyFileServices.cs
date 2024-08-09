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
    ComfyProviderFactory comfyProviderFactory,
    IBackgroundJobs jobs,
    ILogger<ComfyFileServices> log) : Service
{
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
}

public static class ComfyFileServicesExtensions
{
    public static List<AiServerHostedComfyFile> ToHostedComfyFiles(this List<ComfyOutput> outputs, AppConfig appConfig, string refId, string year, string month, string day)
    {
        return outputs.SelectMany(x => x.Files.Select(y => new AiServerHostedComfyFile
        {
            FileName = $"{refId}-{y.Filename}",
            Url = $"{appConfig.AssetsBaseUrl}/comfy/{year}/{month}/{day}/{refId}-{y.Filename}",
        })).ToList();
    }
}