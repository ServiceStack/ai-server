using System.Data;
using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb;

public record class CompleteOpenAiChat(QueueOpenAiChatCompletion Request, OpenAiChatResponse Response, BackgroundJob Job);

[Worker(Workers.AppDb)]
public class CompleteOpenAiChatCommand(IDbConnection db) : SyncCommand<CompleteOpenAiChat>
{
    protected override void Run(CompleteOpenAiChat ctx)
    {
        var summary = new ChatSummary
        {
            Id = ctx.Job.Id,
            RefId = ctx.Job.RefId!,
            CreatedDate = ctx.Job.CreatedDate,
            DurationMs = ctx.Job.DurationMs,
            Tag = ctx.Job.Tag,
            Model = ctx.Request.Request.Model,
            Provider = ctx.Job.Worker!,
            PromptTokens = ctx.Response.Usage?.PromptTokens ?? 0,
            CompletionTokens = ctx.Response.Usage?.CompletionTokens ?? 0,
        };
        try
        {
            db.Insert(summary);
        }
        catch (Exception e)
        {
            // completing failed jobs could fail with unique constraint
            db.DeleteById<ChatSummary>(summary.Id);
            db.Insert(summary);
        }
    }
}
