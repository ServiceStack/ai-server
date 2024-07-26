using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface
{
    public class AppConfig
    {
        public static AppConfig Instance { get; } = new();
        public string? AuthSecret { get; set; }

        public Dictionary<string, ArtStyleEntry> ArtStyleModelMappings { get; set; }
        
        public string CivitAiApiKey { get; set; }
        
        public string ApplicationBaseUrl { get; set; }
        public string AssetsBaseUrl { get; set; }
    }
    
    public class ArtStyleEntry
    {
        public string Name { get; set; }
        public string Filename { get; set; }
        public string DownloadUrl { get; set; }
        
        public double? CfgScale { get; set; }
        
        public string? Scheduler { get; set; }
        
        public ComfySampler? Sampler { get; set; }
        
        public int? Width { get; set; }
        
        public int? Height { get; set; }
        
        public int? Steps { get; set; }
        
        public string? NegativePrompt { get; set; }
    }
}

namespace ServiceStack
{
    public interface IApiKey : IMeta
    {
        string Id { get; set; }
        string? Environment { get; set; }
        DateTime CreatedDate { get; set; }
        DateTime? ExpiryDate { get; set; }
        DateTime? CancelledDate { get; set; }
        int? RefId { get; set; }
        string RefIdStr { get; set; }
    }
}
