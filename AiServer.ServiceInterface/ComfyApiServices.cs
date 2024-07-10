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
        if(appConfig.ArtStyleModelMappings.IsNullOrEmpty())
            log.LogWarning("ArtStyleModelMappings is empty");
        var artStyle = (comfyReq.ArtStyle ?? ArtStyle.Photographic).ToString();
        if(!appConfig.ArtStyleModelMappings.ContainsKey(artStyle))
            throw new Exception($"ArtStyleModelMappings does not contain key: {artStyle}");
        var defaultModel = appConfig.ArtStyleModelMappings[artStyle];
        
        if (string.IsNullOrEmpty(comfyReq.Model) && availableModels.All(x => x.Name != comfyReq.Model) &&
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
        
        // Apply files to the request
         ApplyFiles(comfyReq);

        var tcs = new TaskCompletionSource<ComfyOutput>();
        Stream downloadStream;
        
        try
        {
            var response = await comfyClient.PromptGeneration(comfyReq, waitResult:true);
            var promptId = response.PromptId;

            var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId);
            if (status == null)
                throw new Exception("Failed to get workflow status");
            
            var fileOutputs = new List<ComfyHostedFileOutput>();
            
            // For each file in Outputs[0], download and write to virtual files with promptId prefix
            foreach(var file in status.Outputs[0].Files)
            {
                downloadStream = await comfyClient.DownloadComfyOutputAsync(file);
                var fileNameSuffix = file.Filename.SplitOnLast(".")[1];
                var fileName = file.Filename.SplitOnLast(".")[0];
                var filePath = GetNewFilePath($"{promptId}-{fileName}.{fileNameSuffix}");
                VirtualFiles.WriteFile(filePath, downloadStream);
                fileOutputs.Add(new ComfyHostedFileOutput
                {
                    Url = filePath,
                    FileName = file.Filename
                });
            }
            
            var task = request.ConvertTo<ComfyGenerationTask>();
            task.Request = comfyReq;
            task.Response = response;
            task.TaskType = request.TaskType;
            task.WorkflowTemplate = comfyClient.GetTemplateContentsByType(request.TaskType) ?? "";

            tcs.TrySetResult(status.Outputs[0]);
            
            mq?.Publish(new AppDbWrites {
                CreateComfyGenerationTask = task,
            });

            return new QueueComfyWorkflowResponse
            {
                Status = status,
                PromptId = promptId,
                WorkflowResponse = response,
                FileOutputs = fileOutputs,
                TextOutputs = status.Outputs[0].Texts
            };
        }
        catch (Exception ex)
        {
            return ex;
        }
    }

    private void ApplyFiles(ComfyWorkflowRequest request)
    {
        // Pull HTTP file uploads from the original Request to DTOs
        request.ImageInput ??= Request?.Files.FirstOrDefault(x => x.Name == "imageInput")?.InputStream;
        request.MaskInput ??= Request?.Files.FirstOrDefault(x => x.Name == "maskInput")?.InputStream;
        request.SpeechInput ??= Request?.Files.FirstOrDefault(x => x.Name == "speechInput")?.InputStream;
    }

    private string GetNewFilePath(string fileName)
    {
        var now = DateTime.UtcNow;
        var path = $"/comfy/{now:yyyy}/{now:MM}/{now:dd}/";
        var fullPath = Path.Combine(path, fileName);
        return fullPath;
    }
}