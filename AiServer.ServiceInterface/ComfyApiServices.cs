using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Jobs;

namespace AiServer.ServiceInterface;

public class ComfyApiServices(AppData appData) : Service
{
    public async Task<object> Any(GetComfyModels request)
    {
        try
        {
            var comfyClient = new ComfyClient(request.ApiBaseUrl!, request.ApiKey);
            var response = await comfyClient.GetModelsListAsync(default);
            return new GetComfyModelsResponse
            {
                Results = response.Select(x => x.Name).ToList()
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw HttpError.BadRequest(e.Message);
        }
    }

    public async Task<object> Any(GetComfyModelMappings request)
    {
        var models = appData.MediaModelsMap
            .Where(x => x.Value.ApiModels.ContainsKey("ComfyUI"))
            .Select(x => new KeyValuePair<string, string>(x.Value.ApiModels["ComfyUI"], x.Key))
            // Filter out duplicates
            .GroupBy(x => x.Key)
            .Select(x => x.First())
            .ToDictionary();
        return new GetComfyModelMappingsResponse
        {
            Models = models
        };
    }
}
