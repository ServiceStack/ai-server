using AiServer.ServiceInterface;
using AiServer.ServiceInterface.Generation;
using AiServer.ServiceInterface.Recurring;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.Web;
using AdminJobServices = ServiceStack.Jobs.AdminJobServices;

[assembly: HostingStartup(typeof(AiServer.ConfigureBackgroundJobs))]

namespace AiServer;

public class ConfigureBackgroundJobs : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            services.AddPlugin(new CommandsFeature
            {
                TypeResolvers =
                {
                    () => [typeof(LogCommand)]
                }
            });
            services.AddPlugin(new BackgroundsJobFeature
            {
                EnableAdmin = true,
                DefaultTimeoutSecs = 20 * 60, // 20 mins
            });
            services.AddHostedService<JobsHostedService>();
         }).ConfigureAppHost(afterAppHostInit: appHost => {
            var services = appHost.GetApplicationServices();
            AppData.Instance = services.GetRequiredService<AppData>();
            using var db = services.GetRequiredService<IDbConnectionFactory>().OpenDbConnection();
            AppData.Instance.Reload(db);
            
            var mediaOptions = services.GetRequiredService<ComfyMediaProviderOptions>();
            foreach (var model in AppData.Instance.MediaModels.Where(x => x.Filename != null && x.Workflow != null))
            {
                mediaOptions.TextToImageModelOverrides[model.Filename!] = model.Workflow!;
            }
            
            var jobs = services.GetRequiredService<IBackgroundJobs>();
            // #if DEBUG
            // jobs.RecurringCommand<LogCommand>("Every Minute", Schedule.EveryMinute, new() {
            //     RunCommand = true // don't persist job
            // });
            // #endif
            jobs.RecurringCommand<CheckOpenAiProviders>(Schedule.EveryMinute, new() {
                RunCommand = true // don't persist job
            });
            jobs.RecurringCommand<CheckGenerationProviders>(Schedule.EveryMinute, new() {
                RunCommand = true // don't persist job
            });
        });
}

public class LogCommand(ILogger<LogCommand> logger, IBackgroundJobs jobs) : AsyncCommand
{
    private static long count = 0;
    protected override async Task RunAsync(CancellationToken token)
    {
        Interlocked.Increment(ref count);
        var log = Request.CreateJobLogger(jobs, logger);
        log.LogInformation("Log {Count}: Hello from Recurring Command", count);
        log.UpdateStatus("Starting...", $"[{count}] Lets go...");
        for (var i = 0; i < 20; i++)
        {
            log.LogDebug("Waited {count} times", i+1);
            await Task.Delay(1000, token);
        }
        log.UpdateStatus("Fine", "it is done");
    }
}


public class JobsHostedService(ILogger<JobsHostedService> log, IBackgroundJobs jobs) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await jobs.StartAsync(stoppingToken);
        
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(3));
        var tick = 0;
        var errors = 0;
        while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                tick++;
                await jobs.TickAsync();
            }
            catch (Exception e)
            {
                log.LogError(e, "JOBS {Errors}/{Tick} Error in JobsHostedService: {Message}", 
                    ++errors, tick, e.Message);
            }
        }
    }
}
