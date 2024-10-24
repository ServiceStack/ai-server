using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;


[Tag(Tags.MediaInfo)]
public class GetComfyModels : IReturn<GetComfyModelsResponse>
{
    public string? ApiBaseUrl { get; set; }
    public string? ApiKey { get; set; }
}

public class GetComfyModelsResponse
{
    public List<string> Results { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class GetComfyModelMappingsResponse
{
    public Dictionary<string, string> Models { get; set; }
}

[Tag(Tags.MediaInfo)]
public class GetComfyModelMappings : IReturn<GetComfyModelMappingsResponse>
{
}

