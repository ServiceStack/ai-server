using System.Data;
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
    
    public static ComfyGenerationCompleted ToComfyGenerationCompleted(this ComfyGenerationTask from, ComfyWorkflowStatus status)
    {
        var to = from.CreateNew<ComfyGenerationCompleted>();
        to.Request = from.Request;
        to.WorkflowTemplate = from.WorkflowTemplate;
        to.Status = status;
        to.Response = from.Response;
        return to;
    }
    
    public static ComfyGenerationFailed ToComfyGenerationFailed(this ComfyGenerationTask from)
    {
        var to = from.CreateNew<ComfyGenerationFailed>();
        to.Request = from.Request;
        to.WorkflowTemplate = from.WorkflowTemplate;
        to.Response = from.Response;
        to.FailedDate = DateTime.UtcNow;
        return to;
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
    
    public static string GetPreferredApiModel(this ApiProvider apiProvider)
    {
        var apiProviderModel = apiProvider.Models.FirstOrDefault()
                               ?? throw new ArgumentNullException(nameof(apiProvider.Models));
        var model = apiProviderModel.Model;
        return apiProvider.GetApiModel(model) ?? throw new ArgumentNullException(nameof(model));
    }

    public static string GetApiModel(this ApiProvider apiProvider, string model)
    {
        var apiModel = apiProvider.Models.Find(x => x.Model == model);
        if (apiModel?.ApiModel != null)
            return apiModel.ApiModel;

        return apiProvider.ApiType?.ApiModels.TryGetValue(model, out var apiModelAlias) == true
            ? apiModelAlias
            : model;
    }

    public static string GetApiEndpointUrlFor(this ApiProvider apiProvider, TaskType taskType)
    {
        var apiBaseUrl = apiProvider.ApiBaseUrl ?? apiProvider.ApiType?.ApiBaseUrl
            ?? throw new NotSupportedException($"[{apiProvider.Name}] No ApiBaseUrl found in ApiProvider or ApiType");
        var chatPath = apiProvider.TaskPaths?.TryGetValue(taskType, out var path) == true ? path : null;
        if (chatPath == null)
            apiProvider.ApiType?.TaskPaths.TryGetValue(taskType, out chatPath);
        if (chatPath == null)
            throw new NotSupportedException($"[{apiProvider.Name}] TaskPath found for TaskType.OpenAiChat in ApiType or ApiProvider");

        return apiBaseUrl.CombineWith(chatPath);
    }
}