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
    IMessageProducer mq,
    AppConfig appConfig) : Service
{
    public async Task<object> Post(QueueComfyWorkflow request)
    {
        // Convert the request DTO to a ComfyWorkflowRequest
        var comfyReq = request.ToComfy(appConfig);

        var availableModels = await comfyClient.GetModelsListAsync();
        var defaultModel = appConfig.ArtStyleModelMappings[(comfyReq.ArtStyle ?? ArtStyle.Photographic).ToString()];
        
        if (string.IsNullOrEmpty(request.Model) && availableModels.All(x => x.Name != comfyReq.Model) &&
            availableModels.All(x => x.Name != defaultModel.Filename))
        {
            // Check if download already in progress
            var downloadJob = await comfyClient.GetDownloadStatusAsync(defaultModel.Filename);

            if (downloadJob.Name == defaultModel.Filename && downloadJob.Progress == -1)
            {
                // Delete file and try again
                await comfyClient.DeleteModelAsync(defaultModel.Filename);
            } 
            else if(downloadJob.Name == defaultModel.Filename && downloadJob.Progress < 100)
            {
                throw new Exception("Model download already in progress");
            }
            
            if(appConfig.CivitAiApiKey.IsNullOrEmpty())
                downloadJob = await comfyClient.DownloadModelAsync(
                    defaultModel.DownloadUrl, 
                    defaultModel.Filename
                    );
            else
                downloadJob = await comfyClient.DownloadModelAsync(
                    defaultModel.DownloadUrl, 
                    defaultModel.Filename,
                    apiKey: appConfig.CivitAiApiKey,
                    "bearer"
                    );
            
            // Poll the download job until it's complete
            while (downloadJob.Name != defaultModel.Filename || downloadJob.Progress != 100)
            {
                await Task.Delay(1000);
                downloadJob = await comfyClient.GetDownloadStatusAsync(defaultModel.Filename);
            }
            
        }
        
        // Handle any file uploads required before processing the workflow
        // and update the ComfyWorkflowRequest with the uploaded files if required
        await ApplyFiles(request, comfyReq);
        
        var tcs = new TaskCompletionSource<Stream>();
        Stream downloadStream;
        
        try
        {
            var response = await comfyClient.PromptGeneration(comfyReq, waitResult:true);
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

    private async Task ApplyFiles(QueueComfyWorkflow request, ComfyWorkflowRequest comfyReq)
    {
        ComfyFileInput? imageInput = null;
        ComfyFileInput? maskInput = null;
        ComfyFileInput? speechInput = null;
        // Upload image assets if required
        // Using the `request.TaskType` enum, map tasks that require image assets
        if (request.TaskType is ComfyTaskType.ImageToImage or ComfyTaskType.ImageToImageUpscale
            or ComfyTaskType.ImageToImageWithMask)
        {
            if (request.ImageInput == null)
                throw new ArgumentException("ImageInput is required for this task type");
            var tempFilename = "ComfyUI_" + Guid.NewGuid().ToString("N").Take(5) + ".png";
            imageInput = await comfyClient.UploadImageAssetAsync(request.ImageInput, tempFilename);
        }

        if (request.TaskType is ComfyTaskType.ImageToImageWithMask)
        {
            if (request.MaskInput == null)
                throw new ArgumentException("MaskInput is required for this task type");
            {
                var tempFilename = "ComfyUI_" + Guid.NewGuid().ToString("N").Take(5) + ".png";
                maskInput = await comfyClient.UploadImageAssetAsync(request.MaskInput, tempFilename);
            }
        }

        if (request.TaskType is ComfyTaskType.SpeechToText)
        {
            if (request.SpeechInput == null)
                throw new ArgumentException("SpeechInput is required for this task type");
            {
                var tempFilename = "ComfyUI_" + Guid.NewGuid().ToString("N").Take(5) + ".wav";
                speechInput = await comfyClient.UploadAudioAssetAsync(request.SpeechInput, tempFilename);
            }
        }
        
        
        comfyReq.Image = imageInput;
        comfyReq.Mask = maskInput;
        comfyReq.Speech = speechInput;
    }

    private string GetNewFilePath(string fileName)
    {
        var now = DateTime.UtcNow;
        var path = $"/comfy/{now:yyyy}/{now:MM}/{now:dd}/";
        var fullPath = Path.Combine(path, fileName);
        return fullPath;
    }
}