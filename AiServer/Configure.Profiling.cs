using ServiceStack;

[assembly: HostingStartup(typeof(AiServer.ConfigureProfiling))]

namespace AiServer;

public class ConfigureProfiling : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            if (context.HostingEnvironment.IsDevelopment())
            {
                services.AddPlugin(new ProfilingFeature
                {
                    IncludeStackTrace = true,
                });
            }
        });
}