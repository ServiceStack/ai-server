using System.Globalization;
using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;

namespace AiServer.ServiceInterface;

public partial class ImageServices
{
    public async Task<object> Post(ConvertImage request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (request.OutputFormat == null)
        {
            throw new ArgumentException("No output format provided");
        }

        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.ImageConvert,
            ImageFileName = Request.Files[0].FileName,
            ImageOutputFormat = request.OutputFormat,
        };
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService,true);
    }
    
    public async Task<object> Post(CropImage request)
    {
        // Validate the request
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (request.X < 0 || request.Y < 0 || request.Width <= 0 || request.Height <= 0)
        {
            throw new ArgumentException("Invalid crop dimensions");
        }

        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.ImageCrop,
            ImageFileName = Request.Files[0].FileName,
            CropX = request.X,
            CropY = request.Y,
            CropWidth = request.Width,
            CropHeight = request.Height,
        };
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService,true);
    }

    public async Task<object> Any(WatermarkImage request)
    {
        // Validate request
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (Request.Files.Length < 2)
        {
            throw new ArgumentException("No watermark image file provided");
        }
        
        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.WatermarkImage,
            ImageFileName = Request.Files[0].FileName,
            WatermarkFileName = Request.Files[1].FileName,
            WatermarkPosition = request.Position.ToString(),
            WatermarkScale = request.WatermarkScale.ToString(CultureInfo.InvariantCulture),
        };
        
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService,true);
    }

    public async Task<object> Post(ScaleImage request)
    {
        // Validate the request
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (request.Width <= 0 || request.Height <= 0)
        {
            throw new ArgumentException("Invalid scale dimensions");
        }

        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.ImageScale,
            ImageFileName = Request.Files[0].FileName,
            ScaleWidth = request.Width,
            ScaleHeight = request.Height,
        };
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService,true);
    }

    public async Task<object> Post(QueueCropImage request)
    {
        // Validate the request
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (request.X < 0 || request.Y < 0 || request.Width <= 0 || request.Height <= 0)
        {
            throw new ArgumentException("Invalid crop dimensions");
        }

        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.ImageCrop,
            ImageFileName = Request.Files[0].FileName,
            CropX = request.X,
            CropY = request.Y,
            CropWidth = request.Width,
            CropHeight = request.Height,
        };
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService);
    }
    
    public async Task<object> Post(QueueScaleImage request)
    {
        // Validate the request
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (request.Width <= 0 || request.Height <= 0)
        {
            throw new ArgumentException("Invalid scale dimensions");
        }

        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.ImageScale,
            ImageFileName = Request.Files[0].FileName,
            ScaleWidth = request.Width,
            ScaleHeight = request.Height,
        };
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService);
    }
    
    public async Task<object> Post(QueueWatermarkImage request)
    {
        // Validate request
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (Request.Files.Length < 2)
        {
            throw new ArgumentException("No watermark image file provided");
        }
        
        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.WatermarkImage,
            ImageFileName = Request.Files[0].FileName,
            WatermarkFileName = Request.Files[1].FileName,
            WatermarkPosition = request.Position.ToString(),
            WatermarkScale = request.WatermarkScale.ToString(CultureInfo.InvariantCulture),
        };
        
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService);
    }
    
    public async Task<object> Post(QueueConvertImage request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No image file provided");
        }
        
        if (request.OutputFormat == null)
        {
            throw new ArgumentException("No output format provided");
        }

        // Process via commands
        var mediaArgs = new MediaTransformArgs
        {
            TaskType = MediaTransformTaskType.ImageConvert,
            ImageFileName = Request.Files[0].FileName,
            ImageOutputFormat = request.OutputFormat,
        };
        var transformRequest = new CreateMediaTransform
        {
            Request = mediaArgs
        };
        
        var transformService = ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs,transformService);
    }
}