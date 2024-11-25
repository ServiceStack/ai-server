using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Validation;
using SixLabors.ImageSharp.Formats;

namespace AiServer.ServiceInterface;

/// <summary>
/// Hosts services for image centric generative AI operations, eg
/// TextToImage, ImageToImage, ImageUpscale
/// </summary>
public partial class ImageServices(IBackgroundJobs jobs,
    ILogger<ImageServices> log,
    AppData appData) : Service
{
    public async Task<QueueGenerationResponse> Any(QueueTextToImage request)
    {
        if (!string.IsNullOrEmpty(request.Model) && !appData.ModelSupportsTask(request.Model, AiTaskType.TextToImage))
        {
            log.LogError("Specified model {Model} does not support task {TaskType}", request.Model, AiTaskType.TextToImage);
            throw ValidationError.CreateException(new ValidationErrorField("InvalidModel",nameof(request.Model),
                $"Specified model {request.Model} does not support task {AiTaskType.TextToImage}. " +
                $"Please choose one of the following models: {appData.GetSupportedModels(AiTaskType.TextToImage).Join(",")}"));
        }
        
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = request.Model,
                Height = request.Height,
                Width = request.Width,
                Seed = request.Seed,
                BatchSize = request.BatchSize ?? 1,
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                TaskType = AiTaskType.TextToImage
            }
        };

        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessQueuedGenerationAsync(jobs, diffServices);
    }
    
    public async Task<object> Any(QueueImageUpscale request)
    {
        if(Request?.Files == null || Request.Files.Length == 0)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Image));
        }
        
        // Transform the incoming request into a CreateGeneration request
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = "image-upscale-2x",
                Seed = request.Seed,
                TaskType = AiTaskType.ImageUpscale
            }
        };

        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
    }
    
    public async Task<object> Any(QueueImageToImage request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Image));
        }
        
        // Transform the incoming request into a CreateGeneration request
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                Model = request.Model ?? "image-to-image",
                Seed = request.Seed,
                BatchSize = request.BatchSize ?? 1,
                TaskType = AiTaskType.ImageToImage,
                Denoise = request.Denoise,
            }
        };

        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
    }
    
    public async Task<object> Any(QueueImageWithMask request)
    {
        if (Request?.Files == null || Request.Files.Length > 2)
        {
            log.LogError("No files attached to request");
            throw new ArgumentNullException(nameof(request.Image));
        }
        
        // Transform the incoming request into a CreateGeneration request
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = "image-with-mask",
                PositivePrompt = request.PositivePrompt,
                NegativePrompt = request.NegativePrompt,
                Seed = request.Seed,
                TaskType = AiTaskType.ImageWithMask,
                Denoise = request.Denoise,
            }
        };

        await using var diffServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessSyncGenerationAsync(jobs, diffServices);
    }
    
    public async Task<object> Any(QueueImageToText request)
    {
        var diffRequest = new CreateGeneration
        {
            ReplyTo = request.ReplyTo,
            RefId = request.RefId,
            State = request.State,
            Request = new()
            {
                Model = "image-to-text",
                TaskType = AiTaskType.ImageToText
            }
        };

        await using var genServices = ResolveService<MediaProviderServices>();
        return await diffRequest.ProcessSyncGenerationAsync(jobs, genServices);
    }
}

public static class ImageFormats
{
    public static IImageFormat Png => SixLabors.ImageSharp.Formats.Png.PngFormat.Instance;
    public static IImageFormat Jpeg => SixLabors.ImageSharp.Formats.Jpeg.JpegFormat.Instance;
    public static IImageFormat Gif => SixLabors.ImageSharp.Formats.Gif.GifFormat.Instance;
    public static IImageFormat Bmp => SixLabors.ImageSharp.Formats.Bmp.BmpFormat.Instance;
    public static IImageFormat Tiff => SixLabors.ImageSharp.Formats.Tiff.TiffFormat.Instance;
    public static IImageFormat WebP => SixLabors.ImageSharp.Formats.Webp.WebpFormat.Instance;
}