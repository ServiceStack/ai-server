using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface;

public class AudioServices(IBackgroundJobs jobs) : Service
{
    public async Task<object> Any(ConvertAudio request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No audio file provided");
        }

        var outputformat = Enum.Parse<MediaOutputFormat>(request.OutputFormat.ToString());
        if(!IsAudioFormat(outputformat))
            throw new ArgumentException("Invalid output format");
        
        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                OutputFormat = outputformat,
                TaskType = MediaTransformTaskType.AudioConvert
            }
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService, sync: true);
    }
    public async Task<object> Any(QueueConvertAudio request)
    {
        if (Request?.Files == null || Request.Files.Length == 0)
        {
            throw new ArgumentException("No audio file provided");
        }

        var outputformat = Enum.Parse<MediaOutputFormat>(request.OutputFormat.ToString());
        if(!IsAudioFormat(outputformat))
            throw new ArgumentException("Invalid output format");
        
        var transformRequest = new CreateMediaTransform
        {
            Request = new MediaTransformArgs
            {
                OutputFormat = outputformat,
                TaskType = MediaTransformTaskType.AudioConvert
            },
            ReplyTo = request.ReplyTo,
            RefId = request.RefId
        };

        var transformService = base.ResolveService<MediaTransformProviderServices>();
        return await transformRequest.ProcessTransform(jobs, transformService);
    }

    private bool IsAudioFormat(MediaOutputFormat outputformat)
    {
        switch (outputformat)
        {
            case MediaOutputFormat.MP3:
            case MediaOutputFormat.WAV:
            case MediaOutputFormat.FLAC:
                return true;
            case MediaOutputFormat.MP4:
            case MediaOutputFormat.AVI:
            case MediaOutputFormat.MKV:
            case MediaOutputFormat.MOV:
            case MediaOutputFormat.WebM:
            case MediaOutputFormat.GIF:
                return false;
            default:
                throw new ArgumentOutOfRangeException(nameof(outputformat), outputformat, null);
        }
    }
}
