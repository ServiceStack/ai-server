using System.Text.RegularExpressions;
using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface;

public class VideoServices(IBackgroundJobs jobs) : Service
{
    public async Task<object> Any(ScaleVideo request)
    {
        var transformRequest = new CreateMediaTransform()
        {
            Request = new MediaTransformArgs
            {
                ScaleWidth = request.Width,
                ScaleHeight = request.Height,
                TaskType = MediaTransformTaskType.VideoScale
            }
        };
        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService, sync: true);
    }

    public async Task<object> Any(WatermarkVideo request)
    {
        string watermarkPosition = GetWatermarkPosition(request.Position);

        var transformRequest = new CreateMediaTransform()
        {
            Request = new MediaTransformArgs
            {
                WatermarkPosition = watermarkPosition,
                TaskType = MediaTransformTaskType.WatermarkVideo
            }
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService, sync: true);
    }

    private string GetWatermarkPosition(WatermarkPosition? position)
    {
        return position switch
        {
            WatermarkPosition.TopLeft => "10:10",
            WatermarkPosition.TopRight => "main_w-overlay_w-10:10",
            WatermarkPosition.BottomLeft => "10:main_h-overlay_h-10",
            WatermarkPosition.BottomRight => "main_w-overlay_w-10:main_h-overlay_h-10",
            WatermarkPosition.Center => "(main_w-overlay_w)/2:(main_h-overlay_h)/2",
            _ => "main_w-overlay_w-10:main_h-overlay_h-10" // Default to BottomRight
        };
    }

    public async Task<object> Any(ConvertVideo request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No video file provided");
        }

        var mediaOutputFormat = Enum.Parse<MediaOutputFormat>(request.OutputFormat.ToString());
        if (!IsVideoFormat(mediaOutputFormat))
            throw new ArgumentException("Invalid output format");

        var transformService = base.ResolveService<MediaTransformProviderServices>();

        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                OutputFormat = mediaOutputFormat,
                TaskType = MediaTransformTaskType.VideoConvert
            }
        };

        return await transformRequest.ProcessTransform(jobs, transformService, sync: true);
    }

    public async Task<object> Any(CropVideo request)
    {
        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                CropX = request.X,
                CropY = request.Y,
                CropWidth = request.Width,
                CropHeight = request.Height,
                TaskType = MediaTransformTaskType.VideoCrop
            }
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService, sync: true);
    }

    public async Task<object> Any(TrimVideo request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No video file provided");
        }

        ValidateTimeFormat(request.StartTime, "start time");
        if (request.EndTime != null)
        {
            ValidateTimeFormat(request.EndTime, "end time");
        }

        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                CutStart = ParseTime(request.StartTime),
                CutEnd = ParseTime(request.EndTime),
                TaskType = MediaTransformTaskType.VideoCut
            }
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService, sync: true);
    }

    private void ValidateTimeFormat(string time, string fieldName)
    {
        if (!Regex.IsMatch(time, @"^\d{2}:\d{2}$"))
        {
            throw new ArgumentException($"Invalid {fieldName} format. Expected format: mm:ss");
        }
    }

    public async Task<object> Any(QueueScaleVideo request)
    {
        // Convert request
        var transformRequest = new CreateMediaTransform()
        {
            Request = new MediaTransformArgs
            {
                ScaleWidth = request.Width,
                ScaleHeight = request.Height,
                TaskType = MediaTransformTaskType.VideoScale
            },
            ReplyTo = request.ReplyTo,
            RefId = request.RefId
        };
        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService);
    }

    public async Task<object> Any(QueueWatermarkVideo request)
    {
        string watermarkPosition;
        switch (request.Position)
        {
            case WatermarkPosition.TopLeft:
                watermarkPosition = "10:10";
                break;
            case WatermarkPosition.TopRight:
                watermarkPosition = "main_w-overlay_w-10:10";
                break;
            case WatermarkPosition.BottomLeft:
                watermarkPosition = "10:main_h-overlay_h-10";
                break;
            case WatermarkPosition.BottomRight:
                watermarkPosition = "main_w-overlay_w-10:main_h-overlay_h-10";
                break;
            case WatermarkPosition.Center:
                watermarkPosition = "(main_w-overlay_w)/2:(main_h-overlay_h)/2";
                break;
            default:
                watermarkPosition = "main_w-overlay_w-10:main_h-overlay_h-10"; // Default to BottomRight
                break;
        }

        // Convert request
        var transformRequest = new CreateMediaTransform()
        {
            Request = new MediaTransformArgs
            {
                WatermarkPosition = watermarkPosition,
                TaskType = MediaTransformTaskType.WatermarkVideo
            },
            ReplyTo = request.ReplyTo,
            RefId = request.RefId
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService);
    }

    private bool IsVideoFormat(MediaOutputFormat outputFormat)
    {
        switch (outputFormat)
        {
            case MediaOutputFormat.MP4:
            case MediaOutputFormat.AVI:
            case MediaOutputFormat.MKV:
            case MediaOutputFormat.MOV:
            case MediaOutputFormat.WebM:
            case MediaOutputFormat.GIF:
                return true;
            case MediaOutputFormat.MP3:
            case MediaOutputFormat.WAV:
            case MediaOutputFormat.FLAC:
                return false;
            default:
                throw new ArgumentOutOfRangeException(nameof(outputFormat), outputFormat, null);
        }
    }

    public async Task<object> Any(QueueConvertVideo request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No video file provided");
        }

        var mediaOutputFormat = Enum.Parse<MediaOutputFormat>(request.OutputFormat.ToString());
        if (!IsVideoFormat(mediaOutputFormat))
            throw new ArgumentException("Invalid output format");

        var transformService = base.ResolveService<MediaTransformProviderServices>();

        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                OutputFormat = mediaOutputFormat,
                TaskType = MediaTransformTaskType.VideoConvert
            },
            ReplyTo = request.ReplyTo,
            RefId = request.RefId
        };

        return await transformRequest.ProcessTransform(jobs, transformService);
    }

    public async Task<object> Any(QueueCropVideo request)
    {
        // Convert request
        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                CropX = request.X,
                CropY = request.Y,
                CropWidth = request.Width,
                CropHeight = request.Height,
                TaskType = MediaTransformTaskType.VideoCrop
            },
            ReplyTo = request.ReplyTo,
            RefId = request.RefId
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService);
    }

    public async Task<object> Any(QueueTrimVideo request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No video file provided");
        }

        // Validate request.StartTime is in format "mm:ss"
        if (!Regex.IsMatch(request.StartTime, @"^\d{2}:\d{2}$"))
        {
            throw new ArgumentException("Invalid start time format");
        }

        // Validate request.EndTime is in format "mm:ss"
        if (request.EndTime != null && !Regex.IsMatch(request.EndTime, @"^\d{2}:\d{2}$"))
        {
            throw new ArgumentException("Invalid end time format");
        }

        // Convert request
        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                CutStart = ParseTime(request.StartTime),
                CutEnd = ParseTime(request.EndTime),
                TaskType = MediaTransformTaskType.VideoCut
            },
            ReplyTo = request.ReplyTo,
            RefId = request.RefId
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService);
    }

    private float ParseTime(string? time)
    {
        if (time == null || time.StartsWith("-"))
            return -1;
        var parts = time.Split(':');
        return int.Parse(parts[0]) * 60 + int.Parse(parts[1]);
    }
}

public static class TransformServiceExtensions
{
    public static async Task<object> ProcessTransform(this CreateMediaTransform mediaTransformRequest,
        IBackgroundJobs jobs,
        MediaTransformProviderServices transformService,
        bool sync = false)
    {
        CreateTransformResponse? transformResponse;
        try
        {
            var response = await transformService.Any(mediaTransformRequest);
            transformResponse = response as CreateTransformResponse;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        if (transformResponse == null)
            throw new Exception("Failed to start transform");

        var job = jobs.GetJob(transformResponse.Id);
        // For all requests, wait for the job to be created
        while (job == null)
        {
            await Task.Delay(1000);
            job = jobs.GetJob(transformResponse.Id);
        }

        // We know at this point, we definitely have a job
        var queuedJob = job;
        
        // Return the job status URL
        var jobStatusUrl = AppConfig.Instance.ApplicationBaseUrl.CombineWith(
            $"/api/{nameof(GetJobStatus)}?RefId=" + transformResponse.RefId);

        var queueTransformResponse = new QueueMediaTransformResponse
        {
            RefId = transformResponse.RefId,
            JobId = transformResponse.Id,
            Status = queuedJob.Job?.Status,
            JobState = queuedJob.Job?.State ?? queuedJob.Summary.State,
            StatusUrl = jobStatusUrl
        };

        // Handle failed jobs
        if (job.Failed != null)
        {
            queueTransformResponse.ResponseStatus = job.Failed.Error;
        }

        // If not a synchronous request, return immediately with job details
        if (sync != true)
        {
            return queueTransformResponse;
        }

        var completedResponse = new MediaTransformResponse();

        // Wait for the job to complete max 1 minute
        var timeout = DateTime.UtcNow.AddMinutes(1);
        while (queuedJob?.Job?.State is not (BackgroundJobState.Completed or BackgroundJobState.Cancelled
                   or BackgroundJobState.Failed) && DateTime.UtcNow < timeout)
        {
            await Task.Delay(1000);
            queuedJob = jobs.GetJob(transformResponse.Id);
        }
        
        if (queuedJob?.Job == null)
            throw new Exception($"Failed to complete job within 1 minute: {transformResponse.RefId}");

        var outputs = queuedJob.GetOutputs();

        completedResponse.Outputs = outputs.Item1;
        return completedResponse;
    }
}