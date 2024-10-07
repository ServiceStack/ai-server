using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class AdminServices(IBackgroundJobs jobs) : Service
{
    public object Any(AdminData request)
    {
        var tables = new (string Label, Type Type)[] 
        {
            (nameof(AiProvider),   typeof(AiProvider)),
        };
        var dialect = Db.GetDialectProvider();
        var totalSql = tables.Map(x => $"SELECT '{x.Label}', COUNT(*) FROM {dialect.GetQuotedTableName(x.Type.GetModelMetadata())}")
            .Join(" UNION ");
        var results = Db.Dictionary<string,int>(totalSql);
        var pageStats = tables.Map(x => new PageStats
        {
            Label = x.Label,
            Total = results[x.Label],
        });
        
        var jobTables = new (string Label, Type Type)[] 
        {
            (nameof(JobSummary),     typeof(JobSummary)),
        };
        using var dbJobs = jobs.OpenDb();
        totalSql = jobTables.Map(x => $"SELECT '{x.Label}', COUNT(*) FROM {dialect.GetQuotedTableName(x.Type.GetModelMetadata())}")
            .Join(" UNION ");
        results = dbJobs.Dictionary<string,int>(totalSql);
        pageStats.AddRange(jobTables.Map(x => new PageStats
        {
            Label = x.Label,
            Total = results[x.Label],
        }));

        return new AdminDataResponse {
            PageStats = pageStats 
        };
    }
}