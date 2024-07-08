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
    AppData appData,
    AppConfig appConfig) : Service
{
    public async Task<object> Post(QueueComfyWorkflow request)
    {
        
        
        var comfyReq = await request.ToComfyAsync(comfyClient, appConfig);
        
        // Handle any file uploads required before processing the workflow
        
        
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
            task.TaskType = ComfyTaskType.TextToImage;
            task.WorkflowTemplate = comfyClient.GetTemplateContentsByType(request.TaskType) ?? "";
            
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