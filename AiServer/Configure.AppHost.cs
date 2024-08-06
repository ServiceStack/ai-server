using System.Data;
using AiServer.ServiceInterface;
using AiServer.ServiceInterface.Comfy;
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
            services.AddSingleton(AppConfig.Instance);
            services.AddSingleton<AppData>();
            
            services.AddSingleton<OpenAiProvider>();
            services.AddSingleton<GoogleOpenAiProvider>();
            services.AddSingleton<AiProviderFactory>();
            
            services.AddSingleton<ComfyProvider>();
            services.AddSingleton<ComfyProviderFactory>();
            
            AppConfig.Instance.CivitAiApiKey ??= Environment.GetEnvironmentVariable("CIVIT_AI_API_KEY");
            
            services.AddSingleton(x => new CivitAiClient(x.GetService<IHttpClientFactory>(), 
                AppConfig.Instance.CivitAiApiKey));
            services.AddHttpClient("ComfyClientFileDownload", client =>
            {
                client.Timeout = TimeSpan.FromSeconds(300); // Set a reasonable timeout
            });
            
            services.AddSingleton<IComfyClient>(c => 
                new ComfyClient("https://comfy-dell.pvq.app/api",
                "testtest1234",c.GetService<ILoggerFactory>()));
            
            var appFs = new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath.CombineWith("App_Data").AssertDir());
            var uploadLocations = new[]
            {
                new UploadLocation("comfy", appFs, readAccessRole: RoleNames.AllowAnon),
            };
            services.AddSingleton<IVirtualFiles>(appFs);
            services.AddPlugin(new FilesUploadFeature(uploadLocations));
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
