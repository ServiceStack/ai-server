using AiServer.ServiceInterface.MediaTransform;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface;

public class MediaTransformProviderServices(
    ILogger<MediaTransformProviderServices> log,
    IBackgroundJobs jobs,
    AppConfig appConfig,
    AppData appData) : Service
{
    public async Task<object> Any(CreateMediaTransform request)
    {
        // Validate the request
        // Pick out candidate providers from appData
        // Pick the best provider
        // Enqueue the job
        
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        request.Request.TaskType ??= MediaTransformTaskType.VideoScale;
        
        var queueCounts = jobs.GetWorkerQueueCounts();
        var providerQueueCount = int.MaxValue;
        MediaProvider? useProvider = null;

        var providers = appData.ComfyProviders;
        var candidates = providers.Where(x => x is
        {
            Enabled: true
        });
        
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
        
        if (useProvider == null)
            throw new Exception("No providers available");
        
        var KeyId = (Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0;
        log.LogInformation("User key {KeyId} using provider {Provider}", KeyId, useProvider.Name);
        var args = new Dictionary<string, string> {
            [nameof(KeyId)] = $"{KeyId}",
        };
        if (request.Provider != null)
        {
            args[nameof(request.Provider)] = request.Provider;
        }
        
        if (Request != null && Request.Files.Length > 0)
        {
            log.LogInformation("Saving {Count} uploaded files", Request.Files.Length);
            var fileMap = HandleFileUploads(Request);
            args["Files"] = fileMap.ToJson();
        }
        
        var jobRef = jobs.EnqueueCommand<CreateMediaTransformCommand>(request, new()
        {
            ReplyTo = request.ReplyTo ?? Request.GetHeader("ReplyTo"),
            Tag = Request.GetHeader("Tag"),
            Args = args,
            Worker = useProvider.Name + "-ffmpeg"
        });

        return new CreateTransformResponse
        {
            Id = jobRef.Id,
            RefId = jobRef.RefId,
        };
    }
    
    private Dictionary<string, string> HandleFileUploads(IRequest request)
    {
        var apiKeyId = (Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0;
        var now = DateTime.UtcNow;
        var fileMap = new Dictionary<string, string>();
        foreach (var file in request.Files.Where(x => 
                     supportedUploadNames.Contains(x.Name.ToLower())))
        {
            var ext = file.FileName.Contains(".") ? file.FileName.SplitOnLast(".").Last() : GetFileExtension(file.ContentType);
            var memCpy = new MemoryStream();
            file.InputStream.CopyTo(memCpy);
            memCpy.Position = 0;
            var bytes = memCpy.ReadFully();
            var sha256 = bytes.ComputeSha256();
            var uploadDir = "/input/" + now.ToString("yyyy/MM/dd/") + apiKeyId + "/";
            Directory.CreateDirectory(appConfig.ArtifactsPath.CombineWith(uploadDir));
            var uploadFile = appConfig.ArtifactsPath.CombineWith(uploadDir, sha256 + "." + ext);
            using (var fs = File.OpenWrite(uploadFile))
            {
                fs.Write(bytes, 0, bytes.Length);
                fs.Close();
            }
            file.InputStream.Position = 0; // Reset the stream position if needed for further processing
            fileMap[file.Name] = uploadFile;
        }
        return fileMap;
    }
    
    private static readonly List<string> supportedUploadNames = new()
    {
        "image",
        "video",
        "audio",
        "watermark"
    };
    
    private string GetFileExtension(string contentType)
    {
        return contentType switch
        {
            "image/png" => "png",
            "image/gif" => "gif",
            "image/webp" => "webp",
            "image/bmp" => "bmp",
            "image/tiff" => "tiff",
            // Video
            "video/mp4" => "mp4",
            "video/webm" => "webm",
            "video/ogg" => "ogg",
            // Audio
            "audio/mpeg" => "mp3",
            "audio/x-wav" => "wav",
            "audio/ogg" => "ogg",
            "audio/wav" => "wav",
            "audio/flac" => "flac",
            _ => throw new NotSupportedException($"Unsupported content type: {contentType}")
            
        };
    }
}