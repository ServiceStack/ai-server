namespace AiServer.ServiceModel;

public class Databases
{
    public const string App = nameof(App);
    public const string Jobs = "jobs.db";
    public static string GetJobsMonthDb(DateTime createdDate) => $"jobs-{createdDate.Year}-{createdDate.Month:00}.db";
}
