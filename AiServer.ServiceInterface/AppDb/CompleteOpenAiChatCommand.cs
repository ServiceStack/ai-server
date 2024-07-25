using System.Data;
using ServiceStack;
using ServiceStack.OrmLite;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack.Data;
using ServiceStack.Messaging;

namespace AiServer.ServiceInterface.AppDb;

[Tag(Tags.OpenAiChat)]
public class CompleteOpenAiChatCommand(IDbConnectionFactory dbFactory, IMessageProducer mq) : IAsyncCommand<CompleteOpenAiChat>
{
    public async Task ExecuteAsync(CompleteOpenAiChat request)
    {
        using var db = await dbFactory.OpenAsync();
        await db.UpdateOnlyAsync(() => new OpenAiChatTask
        {
            Provider = request.Provider,
            DurationMs = request.DurationMs,
            Response = request.Response,
            CompletedDate = DateTime.UtcNow,
        }, where: x => x.Id == request.Id);
        
        if (request.ReplyTo != null)
        {
            var json = request.Response.ToJson();
            mq.Publish(new NotificationTasks
            {
                NotificationRequest = new()
                {
                    Url = request.ReplyTo,
                    ContentType = MimeTypes.Json,
                    Body = json,
                    CompleteNotification = new()
                    {
                        Type = TaskType.OpenAiChat,
                        Id = request.Id,
                    },
                },
            });
        }
        else
        {
            var task = await db.SingleByIdAsync<OpenAiChatTask>(request.Id);
            if (task != null)
            {
                await dbFactory.CompleteOpenAiChatAsync(db, task);
            }
        }
    }
}