using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class Reload : IPost, IReturn<EmptyResponse> {}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChangeAiProviderStatus : IPost, IReturn<StringResponse>
{
    public string Provider { get; set; }
    public bool Online { get; set; }
}
