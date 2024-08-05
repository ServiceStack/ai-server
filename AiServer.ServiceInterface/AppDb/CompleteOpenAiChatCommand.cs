using System.Data;
using AiServer.ServiceModel;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace AiServer.ServiceInterface.AppDb;

public record class CompleteOpenAiChat(CreateOpenAiChat Request, OpenAiChatResponse Response, BackgroundJob Job);

public class CompleteOpenAiChatCommand(IDbConnection db) : IAsyncCommand<CompleteOpenAiChat>
{
    public async Task ExecuteAsync(CompleteOpenAiChat ctx)
    {
        await db.InsertAsync(new ChatSummary
        {
            Id = ctx.Job.Id,
            RefId = ctx.Job.RefId!,
            CreatedDate = ctx.Job.CreatedDate,
            DurationMs = ctx.Job.DurationMs,
            Tag = ctx.Job.Tag,
            Model = ctx.Request.Request.Model,
            Provider = ctx.Job.Worker!,
            PromptTokens = ctx.Response.Usage.PromptTokens, 
            CompletionTokens = ctx.Response.Usage.CompletionTokens, 
        });
    }
}
