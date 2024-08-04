using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceModel;

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class StopWorkers : IPost, IReturn<EmptyResponse> {}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class StartWorkers : IPost, IReturn<EmptyResponse> {}
[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class RestartWorkers : IPost, IReturn<EmptyResponse> {}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class ChangeApiProviderStatus : IPost, IReturn<StringResponse>
{
    public string Provider { get; set; }
    public bool Online { get; set; }
}

[Tag(Tag.Admin)]
[ValidateAuthSecret]
public class FirePeriodicTask : IPost, IReturn<EmptyResponse>
{
    public PeriodicFrequency Frequency { get; set; }
}
