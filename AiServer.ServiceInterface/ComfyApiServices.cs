using System.Text.RegularExpressions;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Host;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyApiServices(IComfyClient comfyClient,
    CivitAiClient civitAiClient,
    ILogger<ComfyApiServices> log,
    IMessageProducer mq,
    AppConfig appConfig) : Service
{
    public async Task<object> Post(QueueComfyWorkflow request)
    {
        // Look up provider if present
        var provider = request.Provider.IsNullOrEmpty() ? 
            await Db.SingleAsync<ComfyApiProvider>(x => x.Name == request.Provider) : null;
        
        // Check if model string is provided
        if (request.Model.IsNullOrEmpty() && provider == null)
            throw new Exception("Model or Provider must be provided");

        ComfyApiModelSettings? modelSettings = null;
        if(provider != null && request.Model.IsNullOrEmpty())
        {
            // Check if provider has a model
            var providerModel = await Db.SelectAsync<ComfyApiProviderModel>(x => 
                x.ComfyApiProviderId == provider.Id);
            
            if(providerModel.IsNullOrEmpty())
                throw new Exception("Can't infer model from provider as no models are related to it");
            
            // Get the first model related to the provider
            var model = await Db.SingleByIdAsync<ComfyApiModel>(providerModel[0].ComfyApiModelId);
            request.Model = model.Filename;
            
            // Get related model settings
            modelSettings = await Db.SingleByIdAsync<ComfyApiModelSettings>(model.Id) ?? appConfig.DefaultModelSettings;
        }
        
        // Convert the request DTO to a ComfyWorkflowRequest
        var comfyReq = request.ToComfy(appConfig,modelSettings);

        var availableModels = await comfyClient.GetModelsListAsync();
        var defaultModel = appConfig.DefaultModel!;
        
        if (string.IsNullOrEmpty(comfyReq.Model) && availableModels.All(x => x.Name != comfyReq.Model) &&
            availableModels.All(x => x.Name != defaultModel.Filename))
        {
            await TryDownloadModel(defaultModel);
        }
        
        // Apply files to the request
         ApplyFiles(comfyReq);

        var tcs = new TaskCompletionSource<ComfyOutput>();
        try
        {
            // TODO: Change to async once app queuing is setup
            var response = await comfyClient.PromptGeneration(comfyReq, waitResult:true);
            var promptId = response.PromptId;

            var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId);
            if (status == null)
                throw new Exception("Failed to get workflow status");
            
            var fileOutputs = await UpdateComfyHostedFileOutputs(status, promptId);

            // Clear streams from comfyReq
            request.ImageInput = null;
            request.MaskInput = null;
            request.SpeechInput = null;
            
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
                Request = comfyReq,
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

    private async Task<List<ComfyHostedFileOutput>> UpdateComfyHostedFileOutputs(ComfyWorkflowStatus status, string promptId)
    {
        var fileOutputs = new List<ComfyHostedFileOutput>();

        // For each file in Outputs[0], download and write to virtual files with promptId prefix
        await Parallel.ForEachAsync(status.Outputs[0].Files, async (file, token) =>
        {
            var downloadStream = await comfyClient.DownloadComfyOutputAsync(file);
            var fileNameSuffix = file.Filename.SplitOnLast(".")[1];
            var fileName = file.Filename.SplitOnLast(".")[0];
            var filePath = GetNewFilePath($"{promptId}-{fileName}.{fileNameSuffix}");
            VirtualFiles.WriteFile(filePath, downloadStream);
            fileOutputs.Add(new ComfyHostedFileOutput
            {
                Url = filePath,
                FileName = file.Filename
            });
        });

        return fileOutputs;
    }

    private async Task TryDownloadModel(ComfyApiModel defaultModel)
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
            
        // Set a max timeout of 5 minutes for the download job
        var timeout = DateTime.UtcNow.AddMinutes(5);
            
        // Poll the download job until it's complete
        while ((timeout - DateTime.UtcNow).TotalSeconds > 0 && 
               downloadJob.Name != defaultModel.Filename || downloadJob.Progress != 100)
        {
            await Task.Delay(1000);
            downloadJob = await comfyClient.GetDownloadStatusAsync(defaultModel.Filename);
        }
            
        if(downloadJob.Progress != 100)
            throw new Exception("Model download failed");
    }
    
    public async Task<object> Any(ImportCivitAiModel request)
    {
        // Check if provider name is valid by looking it up in database
        var provider = await Db.SingleAsync<ComfyApiProvider>(x => 
            x.Name == request.Provider);
        
        if(provider == null)
            throw new Exception("Invalid provider name");
        
        // Extract modelId and modelVersionId from the ModelUrl
        var regexModelId = new Regex(@"models\/(\d+)");
        var regexModelVersionId = new Regex(@"modelVersionId=(\d+)");
        var modelId = regexModelId.Match(request.ModelUrl).Success ? 
            regexModelId.Match(request.ModelUrl).Groups[1].Value : null;
        var modelVersionId = regexModelVersionId.Match(request.ModelUrl).Success ? 
            regexModelVersionId.Match(request.ModelUrl).Groups[1].Value : null;
        
        // Import the model using the extracted modelId and modelVersionId
        // Only need one
        if (modelId == null || modelVersionId == null)
            throw new Exception("ModelId and ModelVersionId not found in ModelUrl");

        // Ensure modelVersionId and modelId are numbers
        if (!int.TryParse(modelId, out _))
            throw new Exception("ModelId is not a number");
        
        if (!int.TryParse(modelVersionId, out _))
            throw new Exception("ModelVersionId is not a number");
        
        // Prioritize modelVersionId over modelId
        var modelVersion = await civitAiClient.GetModelVersionDetailsAsync(int.Parse(modelVersionId));
        var model = await civitAiClient.GetModelDetailsAsync(int.Parse(modelId));
        
        // extract safetensors file
        var safetensorsFile =
            modelVersion.Files.FirstOrDefault(x => x.Metadata.Format.ToLower() == "safetensor");
        
        if(safetensorsFile == null)
            throw new Exception("No safetensors file found in model version");

        var comfyModel = new ComfyApiModel
        {
            Filename = safetensorsFile.Name,
            Name = modelVersion.Name,
            CreatedDate = modelVersion.CreatedAt,
            Description = modelVersion.Description,
            DownloadUrl = modelVersion.DownloadUrl,
            Url = request.ModelUrl,
            IconUrl = modelVersion.Images.FirstOrDefault()?.Url ?? "",
            Tags = model.Tags.Join(",")
        };
        
        // Check if model already exists in database
        var existingModel = await Db.SingleAsync<ComfyApiModel>(x => 
            x.Filename == comfyModel.Filename);

        var appDbWrites = new AppDbWrites
        {
            UpdateComfyModelInfo = new()
        };
        var comfyModelId = existingModel?.Id ?? 0;
        if (existingModel != null)
        {
            // Update details of existing model
            comfyModel.Id = existingModel.Id;
            appDbWrites.UpdateComfyModelInfo.UpdateModel = comfyModel;
        }
        else
        {
            // Insert new model
            appDbWrites.UpdateComfyModelInfo.CreateModel = comfyModel;
        }
        
        // Relate model to provider
        appDbWrites.UpdateComfyModelInfo.RelateProviderModel = new ComfyApiProviderModel
        {
            ComfyApiProviderId = provider.Id,
            ComfyApiModelId = comfyModelId
        };
        
        // Publish the AppDbWrites to the message queue
        mq.Publish(appDbWrites);

        return new ImportCivitAiModelResponse
        {
            Provider = provider,
            Model = comfyModel
        };
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

