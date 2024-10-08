using ServiceStack;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace AiServer.ServiceInterface.Generation;

public class FileServices(ILogger<FileServices> log, AppConfig appConfig) : Service
{
    public object Any(GetArtifact request)
    {
        var filePath = appConfig.ArtifactsPath.CombineWith(request.Path);
        if (!File.Exists(filePath))
            throw HttpError.NotFound("Artifact not found");

        return new HttpResult(new FileInfo(filePath),
            asAttachment:request.Download == true);
    }

    private string? GetFilePath(string path)
    {
        var filePath = path.StartsWith("/pub") 
            ? appConfig.FilesPath.CombineWith(path)
            : path.StartsWith("/artifacts")
                ? appConfig.ArtifactsPath.CombineWith(path.RightPart("/artifacts"))
                : null;
        return filePath;
    }

    public object Any(DeleteFile request)
    {
        var apiKeyId = ((ApiKeysFeature.ApiKey)Request.GetApiKey()).Id;
        var path = request.Path;
        var dir = path.LastLeftPart('/');
        var ownerKey = dir.LastRightPart('/');
        if (int.TryParse(ownerKey, out var ownerKeyId) && ownerKeyId == apiKeyId)
        {
            var filePath = GetFilePath(path);
            if (filePath == null)
                throw HttpError.Forbidden("Invalid Path");
            
            log.LogInformation("Deleting File {Path}", path);
            var fileInfo = new FileInfo(filePath);
            fileInfo.Delete();
        }
        else
        {
            throw HttpError.Forbidden("Invalid API Key for File");
        }
        return new EmptyResponse();
    }

    public object Any(DeleteFiles request)
    {
        if (request.Paths == null || request.Paths.Count == 0)
            throw new ArgumentException("No artifact paths specified", nameof(request.Paths));

        var to = new DeleteFilesResponse();
        var apiKeyId = ((ApiKeysFeature.ApiKey)Request.GetApiKey()).Id;
        foreach (var path in request.Paths)
        {
            var dir = path.LastLeftPart('/');
            var ownerKey = dir.LastRightPart('/');
            if (int.TryParse(ownerKey, out var ownerKeyId) && ownerKeyId == apiKeyId)
            {
                var filePath = GetFilePath(path);
                if (filePath == null)
                {
                    to.Failed.Add(path);
                    continue;
                }
                var fileInfo = new FileInfo(filePath);
                if (fileInfo.Exists)
                {
                    try
                    {
                        log.LogInformation("Deleting File {Path}", path);
                        fileInfo.Delete();
                        to.Deleted.Add(path);
                    }
                    catch (Exception e)
                    {
                        log.LogError(e, "Failed to delete file {FilePath}", filePath);
                        to.Failed.Add(path);
                    }
                }
                else
                {
                    to.Missing.Add(path);
                }
            }
            else
            {
                to.Failed.Add(path);
            }
        }
        return to;
    }

    public async Task<object> Any(GetVariant request)
    {
        var filePath = request.Path.StartsWith("pub") 
            ? appConfig.FilesPath.CombineWith(request.Path)
            : appConfig.ArtifactsPath.CombineWith(request.Path);
        var file = new FileInfo(filePath);
        if (!file.Exists)
            throw HttpError.NotFound("Artifact not found");

        return await GetImageVariant(request, filePath, file);
    }

    private static async Task<object> GetImageVariant(GetVariant request, string filePath, FileInfo file)
    {
        var options = request.Variant.Split(',');
        int? width = null; 
        int? height = null;
        foreach (var option in options)
        {
            var key = option.LeftPart('=');
            var right = option.RightPart('=');
            switch (key)
            {
                case "width":
                    width = int.Parse(right);
                    break;
                case "height":
                    height = int.Parse(right);
                    break;
                default:
                    throw HttpError.BadRequest("Invalid option");
            }
        }
        
        if (width == null && height == null)
            throw new NotSupportedException("width or height is required");

        var variantPath = filePath.WithoutExtension();
        variantPath += (width != null && height != null 
            ? $"_{width}w{height}h" 
            : width != null
                ? $"_{width}w"
                : $"_{height}h") + ".webp";

        var variantFile = new FileInfo(variantPath);
        if (variantFile.Exists && variantFile.LastWriteTime > file.LastWriteTime)
            return new HttpResult(variantFile);

        await using var stream = file.OpenRead();
        using var image = await Image.LoadAsync(stream);
        image.Mutate(x => x.Resize(width ?? 0, height ?? 0));
        await image.SaveAsync(variantPath);
        return new HttpResult(new FileInfo(variantPath));
    }

    public async Task<object> Any(MigrateArtifact request)
    {
        if (!request.Path.StartsWith("/artifacts/"))
            throw new NotSupportedException("Only artifact files can be migrated");
        
        var filePath = appConfig.ArtifactsPath.CombineWith(request.Path.RightPart("/artifacts"));
        var file = new FileInfo(filePath);
        if (!file.Exists)
            throw HttpError.NotFound("Artifact not found");
        
        var date = request.Date ?? DateTime.UtcNow;
        var imageBytes = await file.ReadFullyAsync();
        var sha256 = imageBytes.ComputeSha256();

        var keyId = (Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0;
        var fileName = $"{sha256}.webp";
        var relativePath = $"{date:yyyy}/{date:MM}/{date:dd}/{keyId}/{fileName}";
        var path = appConfig.ArtifactsPath.CombineWith(relativePath);
        Path.GetDirectoryName(path).AssertDir();
        await File.WriteAllBytesAsync(path, imageBytes);
        return new MigrateArtifactResponse {
            FilePath = $"/artifacts/{relativePath}",
        };
    }
}
