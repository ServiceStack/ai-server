using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Text;

[assembly: HostingStartup(typeof(AiServer.ConfigureDb))]

namespace AiServer;

public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            SqliteDialect.Provider.StringSerializer = new JsonStringSerializer();       

            var connectionString = context.Configuration.GetConnectionString("DefaultConnection")
                ?? "DataSource=App_Data/app.db;Cache=Shared";

            // Use UTC for all DateTime's stored + retrieved in SQLite
            var dateConverter = SqliteDialect.Provider.GetDateTimeConverter();
            dateConverter.DateStyle = DateTimeKind.Utc;

            var dbFactory = new OrmLiteConnectionFactory(connectionString, SqliteDialect.Provider);
            services.AddSingleton<IDbConnectionFactory>(dbFactory);

            var monthDb = dbFactory.GetNamedMonthDb();
            
            dbFactory.RegisterConnection(monthDb, 
                $"DataSource=App_Data/{monthDb}/app.db;Cache=Shared", SqliteDialect.Provider);
            
            // Enable built-in Database Admin UI at /admin-ui/database
            services.AddPlugin(new AdminDatabaseFeature
            {
                SchemasFilter = columns => columns.ForEach(x => x.Tables.Sort())
            });

            AppHost.GetDbMonthConnection(dbFactory, context.HostingEnvironment.ContentRootPath, monthDb);
        });
}