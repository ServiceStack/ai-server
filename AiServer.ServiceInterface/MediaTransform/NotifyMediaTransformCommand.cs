using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.MediaTransform;

public class MediaTransformCallback
{
    public string? State { get; set; }
    public string? RefId { get; set; }
    public List<TransformFileOutput>? Outputs { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class NotifyMediaTransformCommand(IHttpClientFactory clientFactory) 
    : AsyncCommand<MediaTransformCallback>
{
    protected override async Task RunAsync(MediaTransformCallback request, CancellationToken token)
    {
        await clientFactory.SendJsonCallbackAsync(Request.GetBackgroundJob().ReplyTo!, request, token:token);
    }
}
