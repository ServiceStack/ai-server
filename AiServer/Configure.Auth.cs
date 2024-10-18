using System.Collections.Concurrent;
using ServiceStack.Auth;
using AiServer.ServiceInterface;
using ServiceStack.Configuration;
using ServiceStack.Html;
using ServiceStack.Web;

[assembly: HostingStartup(typeof(ConfigureAuth))]

namespace AiServer;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            services.AddPlugin(new AuthFeature([
                new ApiKeyCredentialsProvider(),
                new AuthSecretAuthProvider(AppConfig.Instance.AuthSecret),
            ]));
            services.AddPlugin(new SessionFeature());
            services.AddPlugin(new ApiKeysFeature {
            });
        })
        .ConfigureAppHost(appHost =>
        {
            using var db = HostContext.AppHost.GetDbConnection();
            appHost.GetPlugin<ApiKeysFeature>().InitSchema(db);
        });
}
