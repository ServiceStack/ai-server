using ServiceStack;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class PromptServices(AppData appData, IAutoQueryData autoQueryData) : Service
{
    public object Get(QueryPrompts query)
    {
        var db = appData.Prompts.ToDataSource(query, Request!);
        return autoQueryData.Execute(query, autoQueryData.CreateQuery(query, Request, db), db);
    }
}
