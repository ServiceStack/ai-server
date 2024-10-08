﻿using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using Microsoft.Extensions.Logging;
using ServiceStack;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class OpenAiProvider(ILogger<OpenAiProvider> log) : IOpenAiProvider
{
    public string GetApiEndpointUrlFor(AiProvider aiProvider, TaskType taskType)
    {
        var apiBaseUrl = aiProvider.ApiBaseUrl ?? aiProvider.AiType?.ApiBaseUrl
            ?? throw new NotSupportedException($"[{aiProvider.Name}] No ApiBaseUrl found in AiProvider or AiType");
        if (taskType == TaskType.OpenAiChat)
            return apiBaseUrl.CombineWith("/v1/chat/completions");

        throw new NotSupportedException($"[{aiProvider.Name}] does not support {taskType}");
    }

    public async Task<OpenAiChatResult> ChatAsync(AiProvider provider, OpenAiChat request, CancellationToken token = default)
    {
        var sw = Stopwatch.StartNew();
        var openApiChatEndpoint = GetApiEndpointUrlFor(provider,TaskType.OpenAiChat);

        Action<HttpRequestMessage>? requestFilter = provider.ApiKey != null
            ? req => req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", provider.ApiKey)
            : null;

        var origModel = request.Model;
        request.Model = provider.GetAiModel(request.Model);
        Exception? firstEx = null;

        var retries = 0;
        while (retries++ < 10)
        {
            var headers = Array.Empty<string>();
            var contentHeaders = Array.Empty<string>();
            string? errorResponse = null;
                
            int retryAfter = 0;
            var sleepMs = 1000 * retries;
            try
            {
                var responseJson = await openApiChatEndpoint.PostJsonToUrlAsync(request,
                    requestFilter: requestFilter,
                    responseFilter: res =>
                    {
                        headers = res.Headers.Select(x => $"{x.Key}: {x.Value.FirstOrDefault()}").ToArray();
                        contentHeaders = res.Content.Headers.Select(x => $"{x.Key}: {x.Value.FirstOrDefault()}")
                            .ToArray();

                        // GROQ
                        if (res.Headers.TryGetValues("retry-after", out var retryAfterValues))
                        {
                            var retryAfterStr = retryAfterValues.FirstOrDefault();
                            log.LogWarning("retry-after: {RetryAfter}", retryAfterStr ?? "null");
                            if (retryAfterStr != null)
                                int.TryParse(retryAfterStr, out retryAfter);
                        }

                        if (res.StatusCode >= HttpStatusCode.BadRequest)
                        {
                            errorResponse = res.Content.ReadAsString();
                        }
                    }, token: token);
                var durationMs = (int)sw.ElapsedMilliseconds;
                var response = responseJson.FromJson<OpenAiChatResponse>();
                request.Model = origModel;
                return new(response, durationMs);
            }
            catch (HttpRequestException e)
            {
                log.LogInformation("[{Name}] Headers:\n{Headers}", provider.Name, string.Join('\n', headers));
                log.LogInformation("[{Name}] Content Headers:\n{Headers}", provider.Name,
                    string.Join('\n', contentHeaders));
                if (!string.IsNullOrEmpty(errorResponse))
                {
                    log.LogError("[{Name}] Error Response:\n{ErrorResponse}", provider.Name, errorResponse);
                }

                firstEx ??= e;
                if (e.StatusCode is null or HttpStatusCode.TooManyRequests or >= HttpStatusCode.InternalServerError)
                {
                    if (retryAfter > 0)
                        sleepMs = retryAfter * 1000;
                    log.LogInformation("[{Name}] {Message} for {Url}, retrying after {SleepMs}ms",
                        provider.Name, e.Message, openApiChatEndpoint, sleepMs);
                    await Task.Delay(sleepMs, token);
                }
                else throw;
            }
        }
        throw firstEx ?? new Exception($"[{provider.Name}] Failed to complete OpenAI Chat request after {retries} retries");
    }

    public async Task<bool> IsOnlineAsync(AiProvider provider, CancellationToken token = default)
    {
        try
        {
            Action<HttpRequestMessage>? requestFilter = provider.ApiKey != null
                ? req => req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", provider.ApiKey)
                : null;

            var heartbeatUrl = provider.HeartbeatUrl;
            if (heartbeatUrl != null)
            {
                await heartbeatUrl.GetStringFromUrlAsync(requestFilter:requestFilter, token: token);
            }

            var apiModel = provider.GetPreferredAiModel();
            var request = new OpenAiChat
            {
                Model = apiModel,
                Messages = [
                    new() { Role = "user", Content = "1+1=" },
                ],
                MaxTokens = 2,
                Stream = false,
            };

            var openApiChatEndpoint = GetApiEndpointUrlFor(provider, TaskType.OpenAiChat);
            await openApiChatEndpoint.PostJsonToUrlAsync(request, requestFilter:requestFilter, token: token);
            return true;
        }
        catch (Exception e)
        {
            if (e is TaskCanceledException)
                throw;
            return false;
        }
    }
}
