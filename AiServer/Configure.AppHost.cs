using System.Data;
using AiServer.ServiceInterface;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceInterface.Diffusion;
using AiServer.ServiceModel.Types;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.IO;
using ServiceStack.OrmLite;

[assembly: HostingStartup(typeof(AiServer.AppHost))]

namespace AiServer;

public class AppHost() : AppHostBase("AiServer"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context,services) => {
            // Configure ASP.NET Core IOC Dependencies
            context.Configuration.GetSection(nameof(AppConfig)).Bind(AppConfig.Instance);
            var authSecret = Environment.GetEnvironmentVariable("AUTH_SECRET");
            if (authSecret != null)
                AppConfig.Instance.AuthSecret = authSecret;
            
            AppConfig.Instance.ReplicateApiKey ??= Environment.GetEnvironmentVariable("REPLICATE_API_KEY");
            
            services.AddHttpClient("ReplicateClient", client =>
            {
                // Configure the HttpClient as needed
                client.BaseAddress = new Uri("https://api.replicate.com");
                // Add any default headers, timeout settings, etc.
            });
            
            services.AddScoped<IDiffusionProvider, ReplicateDiffusionProvider>();
            
            services.AddSingleton(AppConfig.Instance);
            services.AddSingleton<AppData>();
            
            services.AddSingleton<OpenAiProvider>();
            services.AddSingleton<GoogleOpenAiProvider>();
            services.AddSingleton<AiProviderFactory>();
            
            services.AddSingleton<ComfyProvider>();
            services.AddSingleton<ComfyProviderFactory>();

            services.AddSingleton<ComfyDiffusionProvider>();
            services.AddSingleton<ReplicateDiffusionProvider>();
            services.AddSingleton<DiffusionApiProviderFactory>();
            
            // If development, ignore SSL
            if (context.HostingEnvironment.IsDevelopment())
            {
                HttpClientHandler? clientHandler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (message, certificate2, arg3, arg4) => true
                };
                HttpUtils.CreateClient = () => new HttpClient(clientHandler);
            }

            AppConfig.Instance.CivitAiApiKey ??= Environment.GetEnvironmentVariable("CIVIT_AI_API_KEY");
            
            services.AddSingleton(x => new CivitAiClient(x.GetService<IHttpClientFactory>(), 
                AppConfig.Instance.CivitAiApiKey));
            services.AddHttpClient("ComfyClientFileDownload", client =>
            {
                client.Timeout = TimeSpan.FromSeconds(300); // Set a reasonable timeout
            });
            
            var appFs = new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath.CombineWith("App_Data").AssertDir());
            services.AddSingleton<IVirtualFiles>(appFs);
        });

    public override IDbConnection GetDbConnection(string? namedConnection)
    {
        var dbFactory = Container.TryResolve<IDbConnectionFactory>();
        if (namedConnection == null) 
            return dbFactory.OpenDbConnection();
            
        return namedConnection.IndexOf('-') >= 0 && namedConnection.LeftPart('-').IsInt() 
            ? GetDbMonthConnection(dbFactory, HostingEnvironment.ContentRootPath, namedConnection) 
            : dbFactory.OpenDbConnection(namedConnection);
    }

    public static IDbConnection GetDbMonthConnection(IDbConnectionFactory dbFactory, string contentDir, string monthDb)
    {
        var dataSource = $"App_Data/{monthDb}/app.db";
        var monthDbPath = Path.Combine(contentDir, dataSource);

        if (!File.Exists(monthDbPath))
            Path.GetDirectoryName(monthDbPath).AssertDir();

        if (!OrmLiteConnectionFactory.NamedConnections.ContainsKey(monthDb))
            dbFactory.RegisterConnection(monthDb, $"DataSource={dataSource};Cache=Shared", SqliteDialect.Provider);

        var db = dbFactory.OpenDbConnection(monthDb);
        db.CreateTableIfNotExists<ComfyGenerationCompleted>();
        db.CreateTableIfNotExists<ComfyGenerationFailed>();

        return db;
    }

    public override void Configure()
    {
        // Increase timeout on all HttpClient requests
        var existingClientFactory = HttpUtils.CreateClient; 
        HttpUtils.CreateClient = () =>
        {
            var client = existingClientFactory();
            client.Timeout = TimeSpan.FromSeconds(180);
            return client;
        };
        
        // Get comfy client from IoC
        if (TryResolve<IComfyClient>() is ComfyClient comfyClient)
        {
            // Add custom workflow template for flux
            comfyClient.TextToImageModelOverrides.Add("flux1-schnell", "flux1/text_to_image.json");
        }
        else
            Log.Warn("Unable to register custom workflow templates. Expected ComfyClient not registered in IoC");
        
        #if DEBUG
        // Avoid having to re-renter AuthSecret and API Keys during Development
        PreRequestFilters.Add((req, res) =>
        {
            // req.Items[Keywords.AuthSecret] = Config.AdminAuthSecret;
            // req.Items[Keywords.Authorization] = "Bearer " + Config.AdminAuthSecret;
        });
        #endif
    }
}
