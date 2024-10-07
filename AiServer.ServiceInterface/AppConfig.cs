using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface;

public class AppConfig
{
    public static AppConfig Instance { get; } = new();
    public string? AuthSecret { get; set; }
    public string? ArtifactsPath { get; set; }
    public string? FilesPath { get; set; }

    public ComfyApiModel? DefaultModel { get; set; }
    public ComfyApiModelSettings? DefaultModelSettings { get; set; }
        
    public string? CivitAiApiKey { get; set; }
    public string? ReplicateApiKey { get; set; }
        
    public string ApplicationBaseUrl { get; set; }
    public string AssetsBaseUrl { get; set; }
}