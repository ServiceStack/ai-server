using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;

namespace AiServer.ServiceInterface.Executor;

public class DownloadComfyModel
{
    public ComfyApiProvider Provider { get; set; }
    public ComfyApiModel? DownloadModel { get; set; }
}

public class DownloadComfyModelCommand(AppConfig appConfig, IDbConnectionFactory dbFactory, ILogger<DownloadComfyModelCommand> logger) : IAsyncCommand<DownloadComfyModel>
{
    public async Task ExecuteAsync(DownloadComfyModel request)
    {
        if (request.DownloadModel != null)
        {
            var providerApiUrl = request.Provider.ApiBaseUrl;
            var comfyClient = new ComfyClient(providerApiUrl,request.Provider.ApiKey);
            var model = request.DownloadModel;
            
            // Check if download already in progress by looking at status
            var downloadStatus = await comfyClient.GetDownloadStatusAsync(model.Filename);
            if(downloadStatus.Progress > 0)
            {
                logger.LogWarning("Download already in progress for {Filename}, currently {Complete}% complete.", model.Filename, downloadStatus.Progress);
                return;
            }
            // If the model has civitai in model details, use the civitai api key
            ComfyAgentDownloadStatus res;
            if(model.Url.Contains("civitai"))
            {
                logger.LogInformation("Starting download of {Filename} with CivitAI API key from {Url}.", 
                    model.Filename, model.DownloadUrl);
                res = await comfyClient.DownloadModelAsync(
                    request.DownloadModel.DownloadUrl,
                    request.DownloadModel.Filename,
                    apiKey: appConfig.CivitAiApiKey,
                    apiKeyLocation: "bearer"
                );
            }
            else
            {
                logger.LogInformation("Starting download of {Filename} from {Url}.", model.Filename, model.DownloadUrl);
                res = await comfyClient.DownloadModelAsync(
                    request.DownloadModel.DownloadUrl,
                    request.DownloadModel.Filename);
            }
            logger.LogInformation($"Download status response: {res.ToJson()}");
        }
    }
}