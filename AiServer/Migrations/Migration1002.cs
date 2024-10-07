using AiServer.ServiceModel.Types;
using ServiceStack.DataAnnotations;
using ServiceStack.Model;
using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1002 : MigrationBase
{
    public class MediaProvider
    {
        [AutoIncrement] public int Id { get; set; }

        /// <summary>
        /// The unique name for this Provider
        /// </summary>
        [Index(Unique = true)]
        public string Name { get; set; }

        /// <summary>
        /// The Environment Variable for the API Key to use for this Provider
        /// </summary>
        public string? ApiKeyVar { get; set; }

        /// <summary>
        /// The Environment Variable for the ApiBaseUrl to use for this Provider
        /// </summary>
        public string? ApiUrlVar { get; set; }

        /// <summary>
        /// The API Key to use for this Provider
        /// </summary>
        public string? ApiKey { get; set; }

        /// <summary>
        /// Send the API Key in the Header instead of Authorization Bearer
        /// </summary>
        public string? ApiKeyHeader { get; set; }

        /// <summary>
        /// Override Base URL for the Provider
        /// </summary>
        public string? ApiBaseUrl { get; set; }

        /// <summary>
        /// Url to check if the API is online
        /// </summary>
        public string? HeartbeatUrl { get; set; }

        /// <summary>
        /// How many requests should be made concurrently
        /// </summary>
        public int Concurrency { get; set; }

        /// <summary>
        /// What priority to give this Provider to use for processing models 
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// Whether the Provider is enabled
        /// </summary>
        public bool Enabled { get; set; }

        /// <summary>
        /// When the Provider went offline
        /// </summary>
        public DateTime? OfflineDate { get; set; }

        /// <summary>
        /// When the Provider was created
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// The behavior for this Provider
        /// </summary>
        public string MediaTypeId { get; set; }
    
        [Ignore]
        [Input(Type = "hidden")]
        public MediaType? MediaType { get; set; }

        public List<string>? Models { get; set; }
    }

    public override void Up()
    {
        Db.CreateTable<MediaProvider>();

        var mediaTypes = File.ReadAllText("wwwroot/lib/data/media-types.json").FromJson<List<MediaType>>();
        var now = DateTime.UtcNow;
        var mediaProviders = File.ReadAllText("seed/media-providers.json").FromJson<List<MediaProvider>>();
        
        InsertModelsFromEnv(mediaProviders, mediaTypes, now);
    }

    private void InsertModelsFromEnv(List<MediaProvider> mediaProviders, List<MediaType> mediaTypes, DateTime now)
    {
        foreach (var mediaProvider in mediaProviders)
        {
            var apiKey = mediaProvider.ApiKeyVar != null
                ? Environment.GetEnvironmentVariable(mediaProvider.ApiKeyVar)
                : null;

            var mediaType = mediaTypes.First(x => x.Id == mediaProvider.MediaTypeId);
            mediaProvider.MediaType = mediaType;
            if (mediaProvider.ApiKeyVar == null || apiKey != null)
            {
                if (apiKey != null)
                {
                    mediaProvider.ApiKey = apiKey;
                    Console.WriteLine($"Found API Key for {mediaProvider.ApiKeyVar}");
                }
                mediaProvider.CreatedDate = now;
                mediaProvider.ApiBaseUrl ??= mediaType.ApiBaseUrl;
                mediaProvider.ApiKeyHeader ??= mediaType.ApiKeyHeader;
                
                // Support all by default
                mediaProvider.Models = mediaType.ApiModels.Values.ToList();
                Console.WriteLine($"Adding {mediaProvider.Name} API Provider...");
            }
            if (mediaProvider.ApiUrlVar != null)
            {
                var apiUrl = Environment.GetEnvironmentVariable(mediaProvider.ApiUrlVar);
                if (apiUrl != null)
                {
                    mediaProvider.ApiBaseUrl = apiUrl;
                    Console.WriteLine($"Found API URL for {mediaProvider.ApiUrlVar}: {apiUrl}");
                }
            }
            Db.Insert(mediaProvider);
        }
    }

    public override void Down()
    {
        Db.DropTable<MediaProvider>();
    }
}