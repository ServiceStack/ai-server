using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using Microsoft.Extensions.Logging;
using ServiceStack;
using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public class OpenAiProvider(ILogger<OpenAiProvider> log) : OpenAiProviderBase(log)
{
}

public class OllamaAiProvider(ILogger<OllamaAiProvider> log) : OpenAiProviderBase(log), IOllamaAiProvider
{
    protected virtual async Task<OllamaGenerateResponse> SendOllamaGenerateRequestAsync(AiProvider provider, OllamaGenerate request, 
        Action<HttpRequestMessage>? requestFilter=null, Action<HttpResponseMessage>? responseFilter=null, CancellationToken token=default)
    {
        request.Stream ??= false;
        if (request.Images?.Count > 0)
        {
            for (var i = 0; i < request.Images.Count; i++)
            {
                var imgUrl = request.Images[i];
                if (imgUrl.StartsWith("http://") || imgUrl.StartsWith("https://"))
                {
                    log.LogInformation($"Downloading image {imgUrl} ...");
                    var bytes = await imgUrl.GetBytesFromUrlAsync(token:token);
                    request.Images[i] = Convert.ToBase64String(bytes);
                    log.LogInformation($"Downloaded image {bytes.Length} bytes, {request.Images[i].Length} base64 chars");
                }
            }
        }
        
        var url = GetApiEndpointUrlFor(provider,TaskType.OllamaGenerate);
        var responseJson = await url.PostJsonToUrlAsync(request,
            requestFilter: requestFilter,
            responseFilter: responseFilter, token: token);
        var response = responseJson.FromJson<OllamaGenerateResponse>();
        return response;
    }

    public virtual async Task<OllamaGenerationResult> GenerateAsync(AiProvider provider, OllamaGenerate request, CancellationToken token = default)
    {
        var requestFilter = CreateRequestFilter(provider);
        return await GenerateAsync(provider, request, token, requestFilter);
    }

    protected virtual Action<HttpRequestMessage>? CreateRequestFilter(AiProvider provider)
    {
        Action<HttpRequestMessage>? requestFilter = provider.ApiKey != null
            ? req =>
            {
                if (provider.ApiKeyHeader != null)
                {
                    req.Headers.Add(provider.ApiKeyHeader, provider.ApiKey);
                }
                else
                {
                    req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", provider.ApiKey);
                }
            }
            : null;
        return requestFilter;
    }

    public async Task<OllamaGenerationResult> GenerateAsync(AiProvider provider, OllamaGenerate request, CancellationToken token, Action<HttpRequestMessage>? requestFilter)
    {
        var sw = Stopwatch.StartNew();

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
                Action<HttpResponseMessage>? responseFilter = res =>
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
                };

                var response = await SendOllamaGenerateRequestAsync(provider, request, requestFilter, responseFilter, token);
                var durationMs = (int)sw.ElapsedMilliseconds;
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
                    log.LogInformation("[{Name}] {Message} for {Provider}, retrying after {SleepMs}ms",
                        provider.Name, e.Message, provider.Name, sleepMs);
                    await Task.Delay(sleepMs, token);
                }
                else throw;
            }
        }
        throw firstEx ?? new Exception($"[{provider.Name}] Failed to complete OpenAI Chat request after {retries} retries");
    }
}

public class OpenAiProviderBase(ILogger log) : IOpenAiProvider
{
    public string GetApiEndpointUrlFor(AiProvider aiProvider, TaskType taskType)
    {
        var apiBaseUrl = aiProvider.ApiBaseUrl ?? aiProvider.AiType?.ApiBaseUrl
            ?? throw new NotSupportedException($"[{aiProvider.Name}] No ApiBaseUrl found in AiProvider or AiType");
        if (taskType == TaskType.OllamaGenerate)
            return apiBaseUrl.CombineWith("/api/generate");
        if (taskType == TaskType.OpenAiChat)
            return apiBaseUrl.CombineWith("/v1/chat/completions");

        throw new NotSupportedException($"[{aiProvider.Name}] does not support {taskType}");
    }

    public virtual async Task<OpenAiChatResult> ChatAsync(AiProvider provider, OpenAiChat request, CancellationToken token = default)
    {
        var requestFilter = CreateRequestFilter(provider);
        return await ChatAsync(provider, request, token, requestFilter);
    }

    protected virtual Action<HttpRequestMessage>? CreateRequestFilter(AiProvider provider)
    {
        Action<HttpRequestMessage>? requestFilter = provider.ApiKey != null
            ? req =>
            {
                if (provider.ApiKeyHeader != null)
                {
                    req.Headers.Add(provider.ApiKeyHeader, provider.ApiKey);
                }
                else
                {
                    req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", provider.ApiKey);
                }
            }
            : null;
        return requestFilter;
    }

    protected virtual async Task<OpenAiChatResult> ChatAsync(AiProvider provider, OpenAiChat request, CancellationToken token, Action<HttpRequestMessage>? requestFilter)
    {
        var sw = Stopwatch.StartNew();

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
                Action<HttpResponseMessage>? responseFilter = res =>
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
                };
        
                var response = await SendOpenAiChatRequestAsync(provider, request, requestFilter, responseFilter, token);
                var durationMs = (int)sw.ElapsedMilliseconds;
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
                    log.LogInformation("[{Name}] {Message} for {Provider}, retrying after {SleepMs}ms",
                        provider.Name, e.Message, provider.Name, sleepMs);
                    await Task.Delay(sleepMs, token);
                }
                else throw;
            }
        }
        throw firstEx ?? new Exception($"[{provider.Name}] Failed to complete OpenAI Chat request after {retries} retries");
    }

    protected virtual async Task<OpenAiChatResponse> SendOpenAiChatRequestAsync(AiProvider provider, OpenAiChat request, 
        Action<HttpRequestMessage>? requestFilter=null, Action<HttpResponseMessage>? responseFilter=null, CancellationToken token=default)
    {
        var url = GetApiEndpointUrlFor(provider,TaskType.OpenAiChat);
        var responseJson = await url.PostJsonToUrlAsync(request,
            requestFilter: requestFilter,
            responseFilter: responseFilter, token: token);
        var response = responseJson.FromJson<OpenAiChatResponse>();
        return response;
    }

    public virtual async Task<bool> IsOnlineAsync(AiProvider provider, CancellationToken token = default)
    {
        try
        {
            var requestFilter = CreateRequestFilter(provider);
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

            var response = await SendOpenAiChatRequestAsync(provider, request, 
                requestFilter: requestFilter, responseFilter: null, token: token);
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

