using AiServer.ServiceModel.Types;
using ServiceStack;

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