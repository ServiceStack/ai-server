using AiServer.ServiceModel.Types;
using ServiceStack;

namespace AiServer.ServiceInterface
{
    public class AppConfig
    {
        public static AppConfig Instance { get; } = new();
        public string? AuthSecret { get; set; }

        public ComfyApiModel? DefaultModel { get; set; }
        public ComfyApiModelSettings? DefaultModelSettings { get; set; }
        
        public string CivitAiApiKey { get; set; }
        
        public string ApplicationBaseUrl { get; set; }
        public string AssetsBaseUrl { get; set; }
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
