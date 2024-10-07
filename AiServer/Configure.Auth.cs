using AiServer.ServiceInterface;
using ServiceStack.Auth;

[assembly: HostingStartup(typeof(ConfigureAuth))]

namespace AiServer;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            services.AddPlugin(new AuthFeature(new AuthSecretAuthProvider(AppConfig.Instance.AuthSecret)));
            services.AddPlugin(new ApiKeysFeature {
                
            });
        })
        .ConfigureAppHost(appHost =>
        {
            using var db = HostContext.AppHost.GetDbConnection();
            appHost.GetPlugin<ApiKeysFeature>().InitSchema(db);
        });
}
