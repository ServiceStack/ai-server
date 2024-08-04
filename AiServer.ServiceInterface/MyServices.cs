using ServiceStack;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

public class MyServices : Service
{
    public object Any(Hello request)
    {
        return new HelloResponse { Result = $"Hello, {request.Name}!" };
    }

    public async Task<object> Any(AdminData request)
    {
        var tables = new (string Label, Type Type)[] 
        {
            (nameof(ApiModel),       typeof(ApiModel)),
            (nameof(ApiProvider),    typeof(ApiProvider)),
            (nameof(ApiType),        typeof(ApiType)),
        };
        var dialect = Db.GetDialectProvider();
        var totalSql = tables.Map(x => $"SELECT '{x.Label}', COUNT(*) FROM {dialect.GetQuotedTableName(x.Type.GetModelMetadata())}")
            .Join(" UNION ");
        var results = await Db.DictionaryAsync<string,int>(totalSql);
        var pageStats = tables.Map(x => new PageStats
        {
            Label = x.Label,
            Total = results[x.Label],
        });
        
        var jobTables = new (string Label, Type Type)[] 
        {
            (nameof(JobSummary),     typeof(JobSummary)),
        };
        using var dbJobs = AssertPlugin<BackgroundsJobFeature>().OpenJobsDb();
        totalSql = jobTables.Map(x => $"SELECT '{x.Label}', COUNT(*) FROM {dialect.GetQuotedTableName(x.Type.GetModelMetadata())}")
            .Join(" UNION ");
        results = await dbJobs.DictionaryAsync<string,int>(totalSql);
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
