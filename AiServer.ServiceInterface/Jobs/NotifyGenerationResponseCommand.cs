using AiServer.ServiceModel;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface.Jobs;

using System.Threading.Tasks;
using ServiceStack;

public class GenerationCallback
{
    public string? State { get; set; }
    public string? RefId { get; set; }
    public List<AiProviderFileOutput>? Outputs { get; set; }
    
    public List<AiProviderTextOutput>? TextOutputs { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class NotifyGenerationResponseCommand(IHttpClientFactory clientFactory) 
    : AsyncCommand<GenerationCallback>
{
    protected override async Task RunAsync(GenerationCallback request, CancellationToken token)
    {
        await clientFactory.SendJsonCallbackAsync(Request.GetBackgroundJob().ReplyTo!, request, token:token);
    }
}
