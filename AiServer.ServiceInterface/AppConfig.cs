using ServiceStack;

namespace AiServer.ServiceInterface
{
    public class AppConfig
    {
        public static AppConfig Instance { get; } = new();
        public string? AuthSecret { get; set; }

        public Dictionary<string, ArtStyleEntry> ArtStyleModelMappings { get; set; } = new()
        {
            {
                "Photographic", new ArtStyleEntry
                {
                    Name = "OpenXL Version 3.0 Cinematic",
                    DownloadUrl = "https://civitai.com/api/download/models/506622",
                    Filename = "openxlVersion30_v30.safetensors"
                }
            }
        };
    }
    
    public class ArtStyleEntry
    {
        public string Name { get; set; }
        public string Filename { get; set; }
        public string DownloadUrl { get; set; }
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
