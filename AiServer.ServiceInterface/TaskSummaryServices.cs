using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface;

// TODO: Capture Open AI Chat Stats
public class TaskSummaryServices : Service
{
    public async Task<object> Any(GetSummaryStats request)
    {
        string[] groups = [nameof(TaskSummary.Provider), nameof(TaskSummary.Model), "strftime('%Y-%m',CreatedDate)"];
        var condition = "WHERE PromptTokens > 0";
        
        if (request.From != null)
            condition += $" AND CreatedDate >= '{request.From.Value:yyyy-MM-dd}'";
        if (request.To != null)
            condition += $" AND CreatedDate < '{request.To.Value.AddDays(1):yyyy-MM-dd}'";

        var to = new GetSummaryStatsResponse();
        foreach (var group in groups)
        {
            var sql = $"""
                       SELECT {group} AS Name,
                              COUNT(*) AS TotalTasks,
                              SUM(PromptTokens) AS TotalPromptTokens,
                              SUM(CompletionTokens) AS TotalCompletionTokens,
                              PRINTF("%.2f", SUM(DurationMs) / 1000 / 60.0) AS TotalMinutes,
                              PRINTF("%.2f", (SUM(PromptTokens) + SUM(CompletionTokens)) / (SUM(DurationMs) / 1000.0)) AS TokensPerSecond
                       FROM TaskSummary {condition} GROUP BY 1;
                       """;
            var stats = await Db.SelectAsync<SummaryStats>(sql);
            if (group == nameof(TaskSummary.Provider))
                to.ProviderStats = stats;
            else if (group == nameof(TaskSummary.Model))
                to.ModelStats = stats;
            else
                to.MonthStats = stats;
        }
        return to;
    }
}