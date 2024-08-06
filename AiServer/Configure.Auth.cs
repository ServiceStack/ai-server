using ServiceStack.Auth;

[assembly: HostingStartup(typeof(ConfigureAuth))]

namespace AiServer;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            var authSecret = Environment.GetEnvironmentVariable("AUTH_SECRET");
            services.AddPlugin(new AuthFeature(new AuthSecretAuthProvider(authSecret ?? "p@55wOrd")));
            services.AddPlugin(new ApiKeysFeature());
        })
        .ConfigureAppHost(appHost =>
        {
            using var db = HostContext.AppHost.GetDbConnection();
            appHost.GetPlugin<ApiKeysFeature>().InitSchema(db);
        });
}
