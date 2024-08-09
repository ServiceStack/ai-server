using System.Text.RegularExpressions;
using AiServer.ServiceInterface.AppDb.Comfy;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceInterface.Executor;
using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Host;
using ServiceStack.Jobs;
using ServiceStack.Messaging;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class ComfyApiServices(CivitAiClient civitAiClient,
    IBackgroundJobs jobs) : Service
{
    public async Task<object> Delete(DeleteComfyApiProviderModel request)
    {
        var providerModel = await Db.SingleByIdAsync<ComfyApiProviderModel>(request.Id);
        if(providerModel == null)
            throw HttpError.NotFound("ComfyApiProviderModel not found");
        var model = await Db.SingleByIdAsync<ComfyApiModel>(providerModel.ComfyApiModelId);
        var provider = await Db.SingleByIdAsync<ComfyApiProvider>(providerModel.ComfyApiProviderId);
        
        if(model == null || provider == null)
            throw HttpError.NotFound("Invalid ComfyApiProviderModel ID");
        
        jobs.EnqueueCommand<DeleteComfyModelCommand>(new DeleteComfyModel
        {
            Provider = provider.Name,
            ModelFilename = model.Filename
        }, new BackgroundJobOptions
        {
            Worker = Databases.App
        });
        return new IdResponse
        {
            Id = request.Id.ToString()
        };
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
        if (modelId == null && modelVersionId == null)
            throw new Exception("ModelId and ModelVersionId not found in ModelUrl");

        int modelIdInt = 0;
        int modelVersionIdInt = 0;
        
        // Ensure modelVersionId and modelId are numbers
        if (!int.TryParse(modelId, out modelIdInt))
            throw new Exception("ModelId is not a number");
        
        // If only modelId is found, use the latest modelVersionId by looking it up
        CivitModelDetails? model = null;
        CivitModelVersionDetails? modelVersion = null;

        if (modelVersionId == null)
        {
            model = await civitAiClient.GetModelDetailsAsync(int.Parse(modelId));
            if(model == null)
                throw new Exception("Model not found");
            modelVersionIdInt = model.ModelVersions.MaxBy(x => x.CreatedAt).Id;
        }

        if (modelVersionIdInt == 0 && modelVersionId != null)
            int.TryParse(modelVersionId, out modelVersionIdInt);
        
        if (modelVersionId == null && modelVersionIdInt == 0)
            throw new Exception("ModelVersionId Invalid");

        if (modelVersionIdInt == 0 || modelIdInt == 0)
            throw new Exception("Unable to resolve model details from Url");

        model ??= await civitAiClient.GetModelDetailsAsync(modelIdInt);
        modelVersion ??= await civitAiClient.GetModelVersionDetailsAsync(modelVersionIdInt);

        // extract safetensors file
        var safetensorsFile =
            modelVersion.Files.FirstOrDefault(x => x.Metadata.Format.ToLower() == "safetensor");
        
        if(safetensorsFile == null)
            throw new Exception("No safetensors file found in model version");

        var comfyModel = new ComfyApiModel
        {
            Filename = safetensorsFile.Name,
            Name = $"{model.Name} - {modelVersion.Name}",
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

        var updateComfyModelInfo = new UpdateComfyModelInfo();
        var comfyModelId = existingModel?.Id ?? 0;
        if (existingModel != null)
        {
            // Update details of existing model
            comfyModel.Id = existingModel.Id;
            updateComfyModelInfo.UpdateModel = comfyModel;
            
        }
        else
        {
            // Insert new model
            updateComfyModelInfo.CreateModel = comfyModel;
        }
        
        // Relate model to provider
        updateComfyModelInfo.RelateProviderModel = new ComfyApiProviderModel
        {
            ComfyApiProviderId = provider.Id,
            ComfyApiModelId = comfyModelId
        };

        if (request.Settings != null)
        {
            updateComfyModelInfo.AddModelSettings = request.Settings;
        }

        jobs.EnqueueCommand<UpdateComfyModelInfoCommand>(updateComfyModelInfo);
        
        // Download model job
        var downloadModel = new DownloadComfyModel
        {
            Provider = provider,
            DownloadModel = comfyModel
        };

        jobs.EnqueueCommand<DownloadComfyModelCommand>(downloadModel, new BackgroundJobOptions
        {
            Worker = $"{provider.Name}-Download"
        });
        
        return new ImportCivitAiModelResponse
        {
            Provider = provider,
            Model = comfyModel,
        };
    }
    
    public async Task<object> Any(DownloadComfyProviderModel request)
    {
        // Ensure ComfyApiProviderModelId exists
        if (request.ComfyApiProviderModelId == null)
            throw new Exception("ComfyApiProviderModelId must be provided");
        
        // Get the ComfyApiProviderModel
        var providerModel = await Db.SingleByIdAsync<ComfyApiProviderModel>(request.ComfyApiProviderModelId);
        if(providerModel == null)
            throw new Exception("ComfyApiProviderModel not found");
        
        // Get the ComfyApiModel
        var model = await Db.SingleByIdAsync<ComfyApiModel>(providerModel.ComfyApiModelId);
        if(model == null)
            throw new Exception("ComfyApiModel not found");
        
        var provider = await Db.SingleByIdAsync<ComfyApiProvider>(providerModel.ComfyApiProviderId);
        if(provider == null)
            throw new Exception("ComfyApiProvider not found");
        
        var downloadProviderModel = new DownloadComfyModel
        {
            Provider = provider,
            DownloadModel = model
        };
        
        jobs.EnqueueCommand<DownloadComfyModelCommand>(downloadProviderModel, new BackgroundJobOptions
        {
            Worker = $"{provider.Name}-Download"
        });
        
        var comfyClient = new ComfyClient(provider.ApiBaseUrl, provider.ApiKey);
        var downloadStatus = await comfyClient.GetDownloadStatusAsync(model.Filename);
        return new DownloadComfyProviderModelResponse
        {
            DownloadStatus = downloadStatus
        };
    }
}

