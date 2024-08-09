using ServiceStack;

namespace AiServer.ServiceModel;

public class AiServerHostedDiffusionFile
{
    public string FileName { get; set; }
    public string Url { get; set; }
}

public class DiffusionApiProviderOutput
{
    public string FileName { get; set; }
    public string Url { get; set; }
}

[Route("/diffusion/generate", "POST")]
public class CreateDiffusionGeneration : IReturn<CreateDiffusionGenerationResponse>
{
    public string? Provider { get; set; }
    public DiffusionImageGeneration Request { get; set; }
}

public class CreateDiffusionGenerationResponse
{
    public long Id { get; set; }
    public string RefId { get; set; }
}

[Route("/diffusion/{Id}", "GET")]
[Route("/diffusion/ref/{RefId}", "GET")]
public class GetDiffusionGeneration : IReturn<GetDiffusionGenerationResponse>
{
    public int? Id { get; set; }
    public string? RefId { get; set; }
}

public class GetDiffusionGenerationResponse
{
    public DiffusionImageGeneration Request { get; set; }
    public DiffusionGenerationResponse Result { get; set; }
    public List<AiServerHostedDiffusionFile> Outputs { get; set; }
}

public class DiffusionImageGeneration
{
    public string? Model { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int Images { get; set; }
    public long? Seed { get; set; }
    public string Prompt { get; set; }
    public int Steps { get; set; }
}

public class DiffusionGenerationResponse
{
    // TODO: Common properties for all providers returning details of queued generation
    public List<DiffusionApiProviderOutput> Outputs { get; set; }
}
