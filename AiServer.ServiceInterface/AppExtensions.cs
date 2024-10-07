using System.Data;
using System.Security.Cryptography;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Messaging;
using ServiceStack.Text;

namespace AiServer;

public static class AppExtensions
{
    public static System.Text.Json.JsonSerializerOptions SystemJsonOptions = new(TextConfig.SystemJsonOptions)
    {
        WriteIndented = true
    };
    public static string ToSystemJson<T>(this T obj) => System.Text.Json.JsonSerializer.Serialize(obj, SystemJsonOptions); 

    public static string GetNamedMonthDb(this IDbConnectionFactory dbFactory) => dbFactory.GetNamedMonthDb(DateTime.UtcNow); 
    public static string GetNamedMonthDb(this IDbConnectionFactory dbFactory, DateTime createdDate) => 
        $"{createdDate.Year}-{createdDate.Month:00}";

    public static IDbConnection GetMonthDbConnection(this IDbConnectionFactory dbFactory, DateTime? createdDate = null) => 
        HostContext.AppHost.GetDbConnection(dbFactory.GetNamedMonthDb(createdDate ?? DateTime.UtcNow));

    public static EmptyResponse PublishAndReturn<T>(this IMessageProducer mq, T request)
    {
        mq.Publish(request);
        return new EmptyResponse();
    }

    public static string? GetBody(this OpenAiChatResponse? response)
    {
        return response?.Choices?.FirstOrDefault()?.Message?.Content;
    }

    public static T CreateNew<T>(this TaskBase x) where T : TaskBase, new()
    {
        var to = new T
        {
            Id = x.Id,
            Model = x.Model,
            Provider = x.Provider,
            RefId = x.RefId,
            ReplyTo = x.ReplyTo,
            CreatedDate = x.CreatedDate,
            CreatedBy = x.CreatedBy,
            Worker = x.Worker,
            WorkerIp = x.WorkerIp,
            RequestId = x.RequestId,
            StartedDate = x.StartedDate,
            CompletedDate = x.CompletedDate,
            DurationMs = x.DurationMs,
            RetryLimit = x.RetryLimit,
            NotificationDate = x.NotificationDate,
            ErrorCode = x.ErrorCode,
            Error = x.Error,
        };
        return to;
    }
    
    public static string GetPreferredAiModel(this AiProvider aiProvider)
    {
        var providerModel = aiProvider.Models.FirstOrDefault()
                            ?? throw new ArgumentNullException(nameof(aiProvider.Models));
        var model = providerModel.Model;
        return aiProvider.GetAiModel(model) ?? throw new ArgumentNullException(nameof(model));
    }

    public static string GetAiModel(this AiProvider aiProvider, string model)
    {
        var aiModel = aiProvider.Models.Find(x => x.Model == model);
        if (aiModel?.ApiModel != null)
            return aiModel.ApiModel;

        return aiProvider.AiType?.ApiModels.TryGetValue(model, out var apiModelAlias) == true
            ? apiModelAlias
            : model;
    }

    public static string ComputeSha256(this byte[] data)
    {
        using var sha256 = SHA256.Create();
        byte[] hashBytes = sha256.ComputeHash(data);
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
    }
}