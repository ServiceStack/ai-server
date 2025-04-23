using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class Reload : IPost, IReturn<EmptyResponse> {}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class ChangeAiProviderStatus : IPost, IReturn<StringResponse>
{
    public string Provider { get; set; }
    public bool Online { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class CheckAiProviderStatus : IPost, IReturn<BoolResponse>
{
    public string Provider { get; set; }
}

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class CheckMediaProviderStatus : IPost, IReturn<BoolResponse>
{
    public string Provider { get; set; }
}

