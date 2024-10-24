using ServiceStack;

namespace AiServer.ServiceModel;

[Tag(Tags.Admin)]
[ValidateAuthSecret]
public class GetSummaryStats : IGet, IReturn<GetSummaryStatsResponse>
{
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
}

public class GetSummaryStatsResponse
{
    public List<SummaryStats> ProviderStats { get; set; }
    public List<SummaryStats> ModelStats { get; set; }
    public List<SummaryStats> MonthStats { get; set; }
}

public class SummaryStats
{
    public string Name { get; set; }
    public int Total { get; set; }
    public int TotalPromptTokens { get; set; }
    public int TotalCompletionTokens { get; set; }
    public double TotalMinutes { get; set; }
    public double TokensPerSecond { get; set; }
}
