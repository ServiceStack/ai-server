using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Host;
using ServiceStack.Messaging;

namespace AiServer.ServiceInterface;

public class ComfyApiServices(IComfyClient comfyClient,
    ILogger<ComfyApiServices> log,
    IDbConnectionFactory dbFactory, 
    IMessageProducer mq,
    IAutoQueryDb autoQuery,
    AppData appData) : Service
{
    public async Task<object> Post(CreateComfyTextToImage request)
    {
        var comfyReq = new ComfyTextToImage
        {
            Model = request.Model,
            Width = request.Width,
            Height = request.Height,
            Sampler = ComfySampler.euler_ancestral,
            BatchSize = request.Samples,
            Seed = request.Seed ?? Random.Shared.Next(),
            PositivePrompt = request.PositivePrompt,
            NegativePrompt = request.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts",
            Scheduler = "normal",
            Steps = 25,
            CfgScale = 7,
        };
        
        var tcs = new TaskCompletionSource<Stream>();
        Stream downloadStream;
        
        try
        {
            var response = await comfyClient.PromptGeneration(comfyReq, true);
            var promptId = response.PromptId;

            var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId);
            if (status == null)
                throw new Exception("Failed to get workflow status");
            
            downloadStream = await comfyClient.DownloadComfyOutputAsync(status.Outputs[0].Files[0]);
            if (tcs.TrySetResult(downloadStream))
            {
                Console.WriteLine($"PromptId: {promptId} - Image URL: {status.Outputs[0].Files[0]}");
            }
            else
            {
                Console.WriteLine($"Failed to set result for PromptId: {promptId}");
            }

            var filePath = GetNewFilePath($"{promptId}.png");
            VirtualFiles.WriteFile(filePath, downloadStream);

            var task = request.ConvertTo<ComfyGenerationTask>();
            task.Request = comfyReq;
            task.Response = response;
            task.WorkflowTemplate = comfyClient.GetTemplateByType<ComfyTextToImage>() ?? "";
            
            
            mq.Publish(new AppDbWrites {
                CreateComfyGenerationTask = task,
            });

            return new CreateComfyTextToImageResponse { ImageUrl = VirtualFiles.GetFile(filePath).VirtualPath };
        }
        catch (Exception ex)
        {
            return ex;
        }
    }

    private string GetNewFilePath(string fileName)
    {
        var now = DateTime.UtcNow;
        var path = $"/comfy/{now:yyyy}/{now:MM}/{now:dd}/";
        var fullPath = Path.Combine(path, fileName);
        return fullPath;
    }
}


[ValidateApiKey]
public class CreateComfyTextToImage : IReturn<CreateComfyTextToImageResponse>
{
    public string Model { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int Samples { get; set; } = 1;
    public long? Seed { get; set; }
    public string PositivePrompt { get; set; }
    public string? NegativePrompt { get; set; }
    
    public string? RefId { get; set; }
    public string? Provider { get; set; }
    public string? ReplyTo { get; set; }
    public string? Tag { get; set; }
}

public class CreateComfyTextToImageResponse
{
    public string ImageUrl { get; set; }
}