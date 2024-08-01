using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceModel;


[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class GetActiveComfyProvidersResponse
{
    public ComfyApiProvider[] Results { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class FireComfyPeriodicTask
{
    public PeriodicFrequency Frequency { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ResetActiveComfyProviders
{
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class RestartComfyWorkers
{
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class StartComfyWorkers
{
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class StopComfyWorkers
{
}




[Tag(Tag.Admin)]
[ValidateAuthSecret]
[Description("Create a Comfy API Provider that can process Comfy Workflow Tasks")]
[AutoPopulate(nameof(ApiProvider.CreatedDate),  Eval = "utcNow")]
public class CreateComfyApiProvider : ICreateDb<ComfyApiProvider>, IReturn<IdResponse>
{
    public string Name { get; set; }
    
    public string? ApiKey { get; set; }

    public string? ApiKeyHeader { get; set; }
    
    public string? ApiBaseUrl { get; set; }

    public string? HeartbeatUrl { get; set; }
    
    public Dictionary<ComfyTaskType, string>? TaskWorkflows { get; set; }
    
    public int Concurrency { get; set; }
    
    public int Priority { get; set; }
    
    public bool Enabled { get; set; }

    public List<ComfyApiProviderModel> Models { get; set; }
}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class DeleteComfyApiProvider : IDeleteDb<ComfyApiProvider>, IReturn<IdResponse>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class DeleteComfyApiModel : IDeleteDb<ComfyApiModel>, IReturn<IdResponse>
{
    public int? Id { get; set; }
    public string? Name { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
[Description("Create a Comfy API Model that can be used by Comfy API Providers")]
[AutoPopulate(nameof(ApiProvider.CreatedDate),  Eval = "utcNow")]
public class CreateComfyApiModel : ICreateDb<ComfyApiModel>, IReturn<IdResponse>
{
    public string Name { get; set; }

    public string? Description { get; set; }

    public string? Tags { get; set; }
    public string Filename { get; set; }
    public string DownloadUrl { get; set; }

    public string IconUrl { get; set; }
    public string Url { get; set; }

    public ComfyApiModelSettings? ModelSettings { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
[Description("Update a Comfy API Model that can be used by Comfy API Providers")]
public class CreateComfyApiProviderModel : ICreateDb<ComfyApiProviderModel>, IReturn<IdResponse>
{
    public int ComfyApiProviderId { get; set; }
    public int ComfyApiModelId { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class QueryComfyApiProviders : QueryDb<ComfyApiProvider>
{
    public string? Name { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class QueryComfyApiProviderModels : QueryDb<ComfyApiProviderModel>
{
    public int? ComfyApiProviderId { get; set; }
    public int? ComfyApiModelId { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class QueryComfyApiModels : QueryDb<ComfyApiModel>
{
    public string? Name { get; set; }
}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class UpdateComfyApiProvider : IUpdateDb<ComfyApiProvider>, IReturn<IdResponse>
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    public string? ApiKey { get; set; }

    public string? ApiKeyHeader { get; set; }
    
    public string? ApiBaseUrl { get; set; }

    public string? HeartbeatUrl { get; set; }
    
    public Dictionary<ComfyTaskType, string>? TaskPaths { get; set; }
    
    public int? Concurrency { get; set; }
    
    public int? Priority { get; set; }
    
    public bool? Enabled { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class AddComfyProviderModel : IPost, IReturn<IdResponse>
{
    public int ComfyApiProviderId { get; set; }
    
    public int ComfyApiModelId { get; set; }
    public string? ComfyApiModelName { get; set; }
    public string? ComfyApiProviderName { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChangeComfyApiProviderStatus : IPost, IReturn<StringResponse>
{
    public string Provider { get; set; }
    public bool Online { get; set; }
}

[Tag(Tag.Admin)]
[ValidateApiKey]
public class QueryComfyApiModelSettings : QueryDb<ComfyApiModelSettings>
{
    public int? ComfyApiModelId { get; set; }
}

[Tag(Tag.Admin)]
[ValidateApiKey]
public class CreateComfyApiModelSettings : ICreateDb<ComfyApiModelSettings>, IReturn<IdResponse>
{
    public int ComfyApiModelId { get; set; }
    public double? CfgScale { get; set; }

    public string? Scheduler { get; set; }

    public ComfySampler? Sampler { get; set; }

    public int? Width { get; set; }

    public int? Height { get; set; }

    public int? Steps { get; set; }

    public string? NegativePrompt { get; set; }
}

[Tag(Tag.Admin)]
[ValidateApiKey]
public class DeleteComfyApiModelSettings : IDeleteDb<ComfyApiModelSettings>, IReturn<EmptyResponse>
{
    public int Id { get; set; }
}

[Tag(Tag.Admin)]
[ValidateApiKey]
public class UpdateComfyApiModelSettings : IUpdateDb<ComfyApiModelSettings>, IReturn<EmptyResponse>
{
    public int Id { get; set; }
    public double? CfgScale { get; set; }

    public string? Scheduler { get; set; }

    public ComfySampler? Sampler { get; set; }

    public int? Width { get; set; }

    public int? Height { get; set; }

    public int? Steps { get; set; }

    public string? NegativePrompt { get; set; }
}

[Tag(Tag.Admin)]
[ValidateApiKey]
public class UpdateComfyApiProviderModel : IUpdateDb<ComfyApiProviderModel>, IReturn<EmptyResponse>
{
    public int Id { get; set; }
    public int ComfyApiModelId { get; set; }
    public int ComfyApiProviderId { get; set; }
}

[Tag(Tag.Admin)]
[ValidateApiKey]
public class DeleteComfyApiProviderModel : IDeleteDb<ComfyApiProviderModel>, IReturn<EmptyResponse>
{
    public int Id { get; set; }
}