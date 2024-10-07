[assembly: HostingStartup(typeof(ConfigureAutoQuery))]

namespace AiServer;

public class ConfigureAutoQuery : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            
            services.AddPlugin(new AutoQueryFeature {
                MaxLimit = 1000,
                //IncludeTotal = true,
            });

            services.AddPlugin(new AutoQueryDataFeature());

            //services.AddPlugin(new AutoQueryDataFeature());
        });
}
