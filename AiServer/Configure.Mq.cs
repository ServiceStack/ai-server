using AiServer.ServiceInterface;
using ServiceStack.Data;
using ServiceStack.Messaging;

[assembly: HostingStartup(typeof(AiServer.ConfigureMq))]

namespace AiServer;

public class ConfigureMq : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            services.AddSingleton<IMessageService>(c => new BackgroundMqService
            {
                DisablePublishingToOutq = true,
                DisablePublishingResponses = true,
            });
            services.AddHostedService<TimedHostedService>();
        })
        .ConfigureAppHost(afterAppHostInit: appHost => {
            var mqService = appHost.Resolve<IMessageService>();

            //Register ServiceStack APIs you want to be able to invoke via MQ
            mqService.RegisterHandler<AppDbWrites>(appHost.ExecuteMessage);
            mqService.RegisterHandler<ExecutorTasks>(appHost.ExecuteMessage);

            mqService.Start();
            var services = appHost.GetApplicationServices();
            AppData.Instance = services.GetRequiredService<AppData>();
            using var db = services.GetRequiredService<IDbConnectionFactory>().OpenDbConnection();
            AppData.Instance.StartWorkers(db);
        });
}
