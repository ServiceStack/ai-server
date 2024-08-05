using AiServer.ServiceInterface.Jobs;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using ServiceStack.Text;

namespace AiServer.ServiceInterface;

public class PopulateChatSummary : IGet, IReturn<StringsResponse> {}

public class ChatSummaryServices(ILogger<ChatSummaryServices> log, IBackgroundJobs jobs) : Service
{
    public async Task<object> Any(GetSummaryStats request)
    {
        string[] groups = [nameof(ChatSummary.Provider), nameof(ChatSummary.Model), "strftime('%Y-%m',CreatedDate)"];
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
                       FROM ChatSummary {condition} GROUP BY 1;
                       """;
            var stats = await Db.SelectAsync<SummaryStats>(sql);
            if (group == nameof(ChatSummary.Provider))
                to.ProviderStats = stats;
            else if (group == nameof(ChatSummary.Model))
                to.ModelStats = stats;
            else
                to.MonthStats = stats;
        }
        return to;
    }

    public async Task<object> Any(PopulateChatSummary request)
    {
        var existingIds = await Db.ColumnAsync<long>(Db.From<ChatSummary>()
            .Select(x => x.Id));

        using var monthDb = jobs.OpenJobsMonthDb(DateTime.UtcNow);
        var completedJobs = await monthDb.SelectAsync(monthDb.From<CompletedJob>()
            .Where(x => x.Request == nameof(CreateOpenAiChat) && !existingIds.Contains(x.Id)));

        var to = new StringsResponse();
        foreach (var job in completedJobs)
        {
            CreateOpenAiChat? chatRequest = null;
            OpenAiChatResponse? chatResponse = null;
            try
            {
                chatRequest = ClientConfig.FromJson<CreateOpenAiChat>(job.RequestBody);
                chatResponse = ClientConfig.FromJson<OpenAiChatResponse>(job.ResponseBody);
                if (chatResponse.Usage == null)
                    continue;
                
                await Db.InsertAsync(new ChatSummary
                {
                    Id = job.Id,
                    RefId = job.RefId!,
                    CreatedDate = job.CreatedDate,
                    DurationMs = job.DurationMs,
                    Tag = job.Tag,
                    Model = chatRequest.Request.Model,
                    Provider = job.Worker!,
                    PromptTokens = chatResponse.Usage?.PromptTokens ?? 0, 
                    CompletionTokens = chatResponse.Usage?.CompletionTokens ?? 0, 
                });
            }
            catch (Exception e)
            {
                log.LogError(e, "Couldn't create ChatSummary for {Id}", job.Id);
                chatRequest?.PrintDump();
                chatResponse?.PrintDump();
                to.Results.Add($"{job.Id}: {e.Message}");
            }
        }
        return to;
    }
}
