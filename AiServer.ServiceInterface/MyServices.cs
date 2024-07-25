using ServiceStack;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
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
            (nameof(TaskSummary),    typeof(TaskSummary)),
            (nameof(OpenAiChatTask), typeof(OpenAiChatTask)),
        };
        var dialect = Db.GetDialectProvider();
        var totalSql = tables.Map(x => $"SELECT '{x.Label}', COUNT(*) FROM {dialect.GetQuotedTableName(x.Type.GetModelMetadata())}")
            .Join(" UNION ");
        var results = await Db.DictionaryAsync<string,int>(totalSql);
        
        return new AdminDataResponse {
            PageStats = tables.Map(x => new PageStats {
                Label = x.Label, 
                Total = results[x.Label],
            })
        };
    }
}
