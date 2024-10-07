using AiServer.ServiceModel;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class OllamaServices : Service
{
    public async Task<object> Any(GetOllamaModels request)
    {
        var apiTagsUrl = request.ApiBaseUrl.CombineWith("/api/tags");
        var json = await apiTagsUrl.GetJsonFromUrlAsync();
        var ollamaModels = new List<OllamaModel>();
        var obj = (Dictionary<string,object>) JSON.parse(json);
        if (obj.TryGetValue("models", out var oModels) && oModels is List<object> models)
        {
            foreach (var oModel in models.Cast<Dictionary<string,object>>())
            {
                var dto = new OllamaModel();
                oModel.PopulateInstance(dto);
                ollamaModels.Add(dto);
            }
        }
        return new GetOllamaModelsResponse
        {
            Results = ollamaModels
        };
    }
}