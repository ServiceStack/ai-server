using System.Data;
using AiServer.ServiceInterface;
using AiServer.ServiceInterface.Comfy;
using AiServer.ServiceInterface.Generation;
using AiServer.ServiceModel;
using ServiceStack.Configuration;
using ServiceStack.Data;
using ServiceStack.IO;
using ServiceStack.Jobs;
using ServiceStack.NativeTypes;
using ServiceStack.OrmLite;

[assembly: HostingStartup(typeof(AiServer.AppHost))]

namespace AiServer;

public class AppHost() : AppHostBase("AI Server"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context,services) => {
            // Configure ASP.NET Core IOC Dependencies
            context.Configuration.GetSection(nameof(AppConfig)).Bind(AppConfig.Instance);
            var appConfig = AppConfig.Instance;
            services.AddSingleton(appConfig);
            var authSecret = Environment.GetEnvironmentVariable("AUTH_SECRET");
            if (authSecret != null)
                appConfig.AuthSecret = authSecret;
            var artifactsPath = Environment.GetEnvironmentVariable("ARTIFACTS_PATH");
            if (artifactsPath != null)
                appConfig.ArtifactsPath = artifactsPath;
            var filesPath = Environment.GetEnvironmentVariable("AI_FILES_PATH");
            if (filesPath != null)
                appConfig.FilesPath = filesPath;
            var assetsBaseUrl = Environment.GetEnvironmentVariable("ASSETS_BASE_URL");
            if (assetsBaseUrl != null)
                appConfig.AssetsBaseUrl = assetsBaseUrl;
            
            appConfig.ReplicateApiKey ??= Environment.GetEnvironmentVariable("REPLICATE_API_KEY");
            
            services.AddHttpClient("ReplicateClient", client => {
                client.BaseAddress = new Uri("https://api.replicate.com");
            });
            services.AddHttpClient("DalleClient", client => {
                client.BaseAddress = new Uri("https://api.openai.com");
            });
            
            services.AddSingleton<AppData>();
            
            services.AddSingleton<OpenAiProvider>();
            services.AddSingleton<GoogleAiProvider>();
            services.AddSingleton<AnthropicAiProvider>();
            services.AddSingleton<AiProviderFactory>();

            services.AddSingleton(new ComfyMediaProviderOptions
            {
                TextToImageModelOverrides = new Dictionary<string, string>
                {
                    ["flux1-schnell.safetensors"] = "flux1/text_to_image.json",
                    ["sd3.5_large_fp8_scaled.safetensors"] = "sd35/text_to_image.json"
                }
            });
            services.AddSingleton<ComfyProvider>();
            services.AddSingleton<ReplicateAiProvider>();
            services.AddSingleton<OpenAiMediaProvider>();
            
            services.AddSingleton<MediaProviderFactory>();
            
            services.AddPlugin(new CorsFeature(["https://localhost:5001"]));
            
            // services.AddPlugin(new RequestInfoFeature());
            
            // If development, ignore SSL
            if (context.HostingEnvironment.IsDevelopment())
            {
                HttpUtils.HttpClientHandlerFactory = () => new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
                };
            }
            
            var appFs = new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath.CombineWith("App_Data").AssertDir());
            services.AddSingleton<IVirtualFiles>(appFs);

            var fileFs = new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath.CombineWith(appConfig.FilesPath).AssertDir());
            services.AddPlugin(new FilesUploadFeature(
                new UploadLocation("pub", 
                    fileFs,
                    readAccessRole: RoleNames.AllowAnon,
                    requireApiKey: new(),
                    maxFileBytes: 10 * 1024 * 1024,
                    resolvePath:ctx => "pub".CombineWith((ctx.Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0, ctx.FileName)),
                new UploadLocation("secure", 
                    fileFs,
                    requireApiKey: new(),
                    maxFileBytes: 10 * 1024 * 1024,
                    resolvePath:ctx => "secure".CombineWith((ctx.Request.GetApiKey() as ApiKeysFeature.ApiKey)?.Id ?? 0, ctx.FileName))
            ));

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

        ConfigurePlugin<UiFeature>(feature => feature.Info.BrandIcon.Uri = "/img/logo.svg");
        
        var request = new OpenAiChatCompletion {
            Model = "gpt-4-turbo",
            Messages =
            [
                new ()
                {
                    Role = "user",
                    Content = "What is the capital of France?"
                }
            ],
            MaxTokens = 50
        };
        
        ConfigurePlugin<NativeTypesFeature>(feature =>
        {
            feature.MetadataTypesConfig.DefaultNamespaces.Add(typeof(BackgroundJobBase).Namespace);
        });
        
        #if DEBUG && !FALSE
        Metadata.ForceInclude = [
            typeof(AdminQueryApiKeys),
            typeof(AdminCreateApiKey),
            typeof(AdminUpdateApiKey),
            typeof(AdminDeleteApiKey),
            typeof(AdminQueryBackgroundJobs),
            typeof(AdminQueryJobSummary),
            typeof(AdminQueryScheduledTasks),
            typeof(AdminQueryCompletedJobs),
            typeof(AdminQueryFailedJobs),
            typeof(AdminCancelJobs),
            typeof(AdminGetJob),
            typeof(AdminJobInfo),
            typeof(AdminJobDashboard),
            typeof(AdminRequeueFailedJobs),
            typeof(AdminGetJobProgress),
            typeof(QueryPrompts),
        ];

        // Avoid having to re-renter AuthSecret and API Keys during Development
        // PreRequestFilters.Add((req, res) =>
        // {
        //     req.Items[Keywords.AuthSecret] = Config.AdminAuthSecret;
        //     req.Items[Keywords.Authorization] = "Bearer " + Config.AdminAuthSecret;
        // });
        #endif
    }
}
