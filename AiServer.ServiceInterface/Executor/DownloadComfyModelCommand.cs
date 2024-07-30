using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Data;

namespace AiServer.ServiceInterface.Executor;

public class DownloadComfyModel
{
    public ComfyApiProvider Provider { get; set; }
    public ComfyApiModel? DownloadModel { get; set; }
}

public class DownloadComfyModelCommand(AppConfig appConfig, IDbConnectionFactory dbFactory) : IAsyncCommand<DownloadComfyModel>
{
    public async Task ExecuteAsync(DownloadComfyModel request)
    {
        if (request.DownloadModel != null)
        {
            var providerApiUrl = request.Provider.ApiBaseUrl;
            var comfyClient = new ComfyClient(providerApiUrl,request.Provider.ApiKey);
            var model = request.DownloadModel;
            // If the model has civitai in model details, use the civitai api key
            ComfyAgentDownloadStatus res;
            if(model.Url.Contains("civitai"))
            {
                res = await comfyClient.DownloadModelAsync(
                    request.DownloadModel.DownloadUrl,
                    request.DownloadModel.Filename,
                    apiKey: appConfig.CivitAiApiKey,
                    apiKeyLocation: "bearer"
                );
            }
            else
            {
                res = await comfyClient.DownloadModelAsync(
                    request.DownloadModel.DownloadUrl,
                    request.DownloadModel.Filename);
            }
        }
    }
}