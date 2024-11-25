using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public static class DtoExtensions
{
    public static TextGenerationResponse ToTextGenerationResponse(this GenerationResponse response) => response.TextOutputs?.Count > 0 ? new() {
        Results = response.TextOutputs,
        ResponseStatus = response.ResponseStatus
    } : throw new Exception("Failed to generate any text outputs");

    public static ArtifactGenerationResponse ToArtifactGenerationResponse(this GenerationResponse response) => response.Outputs?.Count > 0 ? new() {
        Results = response.Outputs,
        ResponseStatus = response.ResponseStatus
    } : throw new Exception("Failed to generate any outputs");
    
}