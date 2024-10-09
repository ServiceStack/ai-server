using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.Generation;
using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;

namespace AiServer.ServiceInterface.MediaTransform;

public class CreateMediaTransformCommand(ILogger<CreateMediaTransformCommand> log,
    AppData appData,
    AppConfig appConfig,
    IBackgroundJobs jobs,
    MediaProviderFactory providerFactory,
    IHttpClientFactory httpFactory) : AsyncCommandWithResult<CreateMediaTransform,TransformResult>
{
    protected override async Task<TransformResult> RunAsync(CreateMediaTransform request, CancellationToken token)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        var job = Request.GetBackgroundJob();
        var apiProviderInstance = appData.AssertComfyProvider(job.Worker!.Replace("-ffmpeg",""));
        var transformProvider = providerFactory.GetProvider(apiProviderInstance.MediaType.Provider) as IMediaTransformProvider;
        var keyId = job.Args?.TryGetValue("KeyId", out var oKeyId) == true ? oKeyId : "0";
        
        log.LogInformation("Starting generation request {RefId} with {Provider}", request.RefId, apiProviderInstance.Name);
        
        try
        {
            
            await HandleFileUploadsAsync(job, request.Request, token);
            
            // Short circuit if is an image operation and process locally.
            // If the request task type is image crop, image scale or image convert, we can process locally
            if (request.Request.TaskType == MediaTransformTaskType.ImageCrop ||
                request.Request.TaskType == MediaTransformTaskType.ImageScale ||
                request.Request.TaskType == MediaTransformTaskType.ImageConvert ||
                request.Request.TaskType == MediaTransformTaskType.WatermarkImage)
            {
                switch (request.Request.TaskType)
                {
                    case MediaTransformTaskType.ImageCrop:
                        return await CropImageAsync(request.Request, keyId, token);
                    case MediaTransformTaskType.ImageScale:
                        return await ScaleImageAsync(request.Request, keyId, token);
                    case MediaTransformTaskType.ImageConvert:
                        return await ConvertImageAsync(request.Request, keyId, token);
                    case MediaTransformTaskType.WatermarkImage:
                        return await WatermarkImageAsync(request.Request, keyId, token);
                }
            }
            
            log.LogInformation("Running {TaskType} generation request {RefId} with {Provider}",
                request.Request.TaskType, request.RefId, apiProviderInstance.Name);
            var (response, durationMs) = await transformProvider.RunAsync(apiProviderInstance, request.Request, token);
            log.LogInformation("Finished {TaskType} generation request {RefId} with {Provider} in {DurationMs}ms",
                request.Request.TaskType, request.RefId, apiProviderInstance.Name, durationMs);
            if (response.Outputs != null && response.Outputs.Count > 0)
                await DownloadOutputsAsync(transformProvider, apiProviderInstance, response.Outputs, keyId);

            ResponseStatus? error = null;
            var outputs = new List<TransformFileOutput>();
            foreach (var output in response.Outputs ?? [])
            {
                if (!output.Url.StartsWith("/artifacts/"))
                {
                    log.LogWarning("{Url} could not be downloaded", output.Url);
                    continue;
                }

                outputs.Add(output);
                log.LogInformation("Returning artifact: {Path}", output.Url);
            }

            if (job.ReplyTo == null)
                return response;
            log.LogInformation("ReplyTo registered for {RefId}, sending response to {ReplyTo}", job.RefId, job.ReplyTo);
            jobs.EnqueueCommand<NotifyGenerationResponseCommand>(new MediaTransformCallback
            {
                State = request.State,
                RefId = job.RefId,
                Outputs = outputs,
                ResponseStatus = error,
            }, new()
            {
                ParentId = job.Id,
                ReplyTo = job.ReplyTo,
                Worker = job.Worker
            });
            return response;
        }
        catch (Exception e) when (e is not OperationCanceledException)
        {
            log.LogError(e, "Error processing generation request {RefId} with {Provider}", request.RefId,
                apiProviderInstance.Name);
            if (!await transformProvider.IsOnlineAsync(apiProviderInstance, token))
            {
                log.LogWarning("{Provider} is offline, changing status to Offline", apiProviderInstance.Name);
                jobs.RunCommand<ChangeMediaProviderStatusCommand>(new ChangeMediaProviderStatus()
                {
                    Name = apiProviderInstance.Name,
                    OfflineDate = DateTime.UtcNow,
                });
            }

            throw;
        }
        finally
        {
            new IDisposable?[] {
                request.Request.ImageInput,
                request.Request.VideoInput,
                request.Request.AudioInput,
                request.Request.WatermarkInput,
            }.Dispose();
        }

    }

    private async Task<TransformResult> ConvertImageAsync(MediaTransformArgs args, string keyId, CancellationToken token)
    {
        if (args.ImageOutputFormat == null)
            throw new ArgumentException("No output format provided");
        
        if (args.ImageInput == null)
            throw new ArgumentException("No image file provided");

        var inputFile = args.ImageInput;
        using var inputImage = await Image.LoadAsync(inputFile, token);

        var format = (ImageOutputFormat)args.ImageOutputFormat;
        var outputFormat = GetImageFormat(format);
        var outputStream = new MemoryStream();
        await inputImage.SaveAsync(outputStream, outputFormat, cancellationToken: token);
        outputStream.Position = 0;
        var response = new TransformResult
        {
            Outputs =
            [
                new()
                {
                    FileName = $"{keyId}.png",
                    Url = $"/artifacts/{keyId}.png"
                }
            ]
        };
        await SaveTransformResultAsync(response, outputStream, keyId, token);
        return response;
    }

    private async Task<TransformResult> ScaleImageAsync(MediaTransformArgs args, string keyId, CancellationToken token)
    {
        if(args.ScaleWidth == null && args.ScaleHeight == null)
            throw new ArgumentException("No scale parameters provided");
        
        if (args.ImageInput == null)
            throw new ArgumentException("No image file provided");

        var inputFile = args.ImageInput;
        using var inputImage = await Image.LoadAsync(inputFile, token);

        var width = args.ScaleWidth ?? inputImage.Width;
        var height = args.ScaleHeight ?? inputImage.Height;
        inputImage.Mutate(x => x.Resize(width, height));
        
        var outputStream = new MemoryStream();
        await inputImage.SaveAsync(outputStream, inputImage.Metadata.DecodedImageFormat ?? ImageFormats.Png, cancellationToken: token);
        outputStream.Position = 0;
        var response = new TransformResult
        {
            Outputs =
            [
                new()
                {
                    FileName = $"{keyId}.png",
                    Url = $"/artifacts/{keyId}.png"
                }
            ]
        };
        await SaveTransformResultAsync(response, outputStream, keyId, token);
        return response;
    }

    private async Task<TransformResult> CropImageAsync(MediaTransformArgs args, string keyId, CancellationToken token)
    {
        // Validate args
        if (args.CropX == null || args.CropY == null || args.CropWidth == null || args.CropHeight == null)
            throw new ArgumentException("No crop parameters provided");
        var x = (int)args.CropX;
        var y = (int)args.CropY;
        var width = (int)args.CropWidth;
        var height = (int)args.CropHeight;
        if (args.ImageInput == null)
            throw new ArgumentException("No image file provided");

        var inputFile = args.ImageInput;
        using var inputImage = await Image.LoadAsync(inputFile, token);

        inputImage.Mutate(opCtx => opCtx.Crop(
            new Rectangle(x, y, width, height)));

        var outputStream = new MemoryStream();
        await inputImage.SaveAsync(outputStream, inputImage.Metadata.DecodedImageFormat ?? ImageFormats.Png, cancellationToken: token);
        outputStream.Position = 0;
        var response = new TransformResult
        {
            Outputs =
            [
                new()
                {
                    FileName = $"{keyId}.png",
                    Url = $"/artifacts/{keyId}.png"
                }
            ]
        };
        await SaveTransformResultAsync(response, outputStream, keyId, token);
        return response;
    }

    private async Task<TransformResult> WatermarkImageAsync(MediaTransformArgs args, string keyId,
        CancellationToken token)
    {
        var inputFile = args.ImageInput;
        var watermarkFile = args.WatermarkInput;
        // Validate args
        if (inputFile == null)
            throw new ArgumentException("No image file provided");
        if (watermarkFile == null)
            throw new ArgumentException("No watermark image provided");
        if (args.WatermarkPosition == null)
            throw new ArgumentException("No watermark position provided");
        if (args.WatermarkScale == null)
            throw new ArgumentException("No watermark scale provided");
        var position = (WatermarkPosition)Enum.Parse(typeof(WatermarkPosition), args.WatermarkPosition);
        var scale = float.Parse(args.WatermarkScale);
        using var inputImage = await Image.LoadAsync(inputFile, token);
        using var watermarkImage = await Image.LoadAsync(watermarkFile, token);
        ApplyImageWatermark(inputImage, watermarkImage, position, scale);

        var outputStream = new MemoryStream();
        await inputImage.SaveAsync(outputStream, inputImage.Metadata.DecodedImageFormat ?? ImageFormats.Png, cancellationToken: token);
        outputStream.Position = 0;
        var response = new TransformResult
        {
            Outputs =
            [
                new()
                {
                    FileName = $"{keyId}.png",
                    Url = $"/artifacts/{keyId}.png"
                }
            ]
        };
        await SaveTransformResultAsync(response, outputStream, keyId, token);
        return response;
    }
    
    private void ApplyImageWatermark(Image sourceImage, Image watermarkImage, WatermarkPosition position, float opacity)
    {
        var (x, y) = CalculateWatermarkPosition(sourceImage.Width, sourceImage.Height, 
            watermarkImage.Width, watermarkImage.Height, position);
        
        sourceImage.Mutate(ctx => ctx
            .DrawImage(watermarkImage, new Point(x, y), opacity));
    }
    
    private (int x, int y) CalculateWatermarkPosition(int sourceWidth, int sourceHeight, 
        int watermarkWidth, int watermarkHeight, WatermarkPosition position)
    {
        return position switch
        {
            WatermarkPosition.TopLeft => (10, 10),
            WatermarkPosition.TopRight => (sourceWidth - watermarkWidth - 10, 10),
            WatermarkPosition.BottomLeft => (10, sourceHeight - watermarkHeight - 10),
            WatermarkPosition.BottomRight => (sourceWidth - watermarkWidth - 10, sourceHeight - watermarkHeight - 10),
            WatermarkPosition.Center => ((sourceWidth - watermarkWidth) / 2, (sourceHeight - watermarkHeight) / 2),
            _ => throw new ArgumentException("Invalid watermark position")
        };
    }

    private List<string> supportedFiles = new()
    {
        "image",
        "video",
        "watermark",
        "audio"
    };
    
    private IImageFormat GetImageFormat(ImageOutputFormat format)
    {
        return format switch
        {
            ImageOutputFormat.Png => ImageFormats.Png,
            ImageOutputFormat.Jpg => ImageFormats.Jpeg,
            ImageOutputFormat.Gif => ImageFormats.Gif,
            ImageOutputFormat.Bmp => ImageFormats.Bmp,
            ImageOutputFormat.Tiff => ImageFormats.Tiff,
            ImageOutputFormat.Webp => ImageFormats.WebP,
            _ => throw new ArgumentException($"Unsupported format: {format}")
        };
    }
    
    async Task DownloadOutputsAsync(IMediaTransformProvider aiProvider, 
        MediaProvider apiProvider,
        IEnumerable<TransformFileOutput> outputs, string keyId)
    {
        var now = DateTime.UtcNow;
        var downloadTasks = outputs.Select(x => DownloadOutputAsync(aiProvider, apiProvider, x, now, keyId));
        await Task.WhenAll(downloadTasks);
    }
    
    async Task SaveTransformResultAsync(TransformResult response, Stream data, string keyId, CancellationToken token)
    {
        var now = DateTime.UtcNow;
        var outputs = response.Outputs ?? [];
        foreach (var output in outputs)
        {
            var relativePath = $"{now:yyyy}/{now:MM}/{now:dd}/{keyId}/{output.FileName}";
            var path = appConfig.ArtifactsPath.CombineWith(relativePath);
            Path.GetDirectoryName(path).AssertDir();
            await File.WriteAllBytesAsync(path, await data.ReadFullyAsync(token: token), token);
            output.Url = $"/artifacts/{relativePath}";
        }
    }
    
    async Task DownloadOutputAsync(IMediaTransformProvider aiProvider,
        MediaProvider apiProvider,
        TransformFileOutput output, DateTime now, string keyId)
    {
        using var client = httpFactory.CreateClient();
        try
        {
            var response = await aiProvider.DownloadOutputAsync(apiProvider, output);
            response.EnsureSuccessStatusCode();
            
            // Grab file extension from response
            var ext = response.Content.Headers.ContentType?.MediaType switch
            {
                "image/jpeg" => "jpg",
                "image/png" => "png",
                "image/gif" => "gif",
                "image/webp" => "webp",
                //mp3
                "audio/mpeg" => "mp3",
                "audio/x-wav" => "wav",
                "audio/flac" => "flac",
                // Video
                "video/mp4" => "mp4",
                "video/webm" => "webm",
                "video/ogg" => "ogg",
                "video/mov" => "mov",
                "video/avi" => "avi",
                "video/mkv" => "mkv",
                _ => "mp4"
            };

            var imageBytes = await response.Content.ReadAsByteArrayAsync();
            var sha256 = imageBytes.ComputeSha256();
            output.FileName = $"{sha256}.{ext}";
            var relativePath = $"{now:yyyy}/{now:MM}/{now:dd}/{keyId}/{output.FileName}";
            var path = appConfig.ArtifactsPath.CombineWith(relativePath);
            Path.GetDirectoryName(path).AssertDir();
            await File.WriteAllBytesAsync(path, imageBytes);
            output.Url = $"/artifacts/{relativePath}";
        }
        catch (Exception e)
        {
            log.LogError(e, "Error downloading {ImageUrl}: {Message}", output.Url, e.Message);
        }
    }
    
    private async Task HandleFileUploadsAsync(BackgroundJob job, MediaTransformArgs argInstance, CancellationToken token)
    {
        if (job.Args?.TryGetValue("Files", out var files) != true)
            return;

        var fileUploads = files.FromJson<Dictionary<string, string>>();
        if (fileUploads == null)
            return;

        foreach (var file in fileUploads)
        {
            if (!supportedFiles.Contains(file.Key))
                continue;
            // Copy file from file system to memory stream
            var ms = new MemoryStream();
            using var fs = File.OpenRead(file.Value);
            await fs.CopyToAsync(ms, token);
            ms.Position = 0;
            fs.Close();
            switch (file.Key)
            {
                case "image":
                    argInstance.ImageInput = ms;
                    argInstance.ImageFileName = Path.GetFileName(file.Value);
                    break;
                case "video":
                    argInstance.VideoInput = ms;
                    argInstance.VideoFileName = Path.GetFileName(file.Value);
                    break;
                case "watermark":
                    argInstance.WatermarkInput = ms;
                    argInstance.WatermarkFileName = Path.GetFileName(file.Value);
                    break;
                case "audio":
                    argInstance.AudioInput = ms;
                    argInstance.AudioFileName = Path.GetFileName(file.Value);
                    break;
            }
        }
    }
}