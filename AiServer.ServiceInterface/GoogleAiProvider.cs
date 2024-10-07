using System.Diagnostics;
using System.Net;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.ServiceInterface;

public class GoogleSafetySetting
{
    public string Category { get; set; }
    public string Threshold { get; set; }
}

public class GoogleAiProvider(ILogger<GoogleAiProvider> log) : IOpenAiProvider
{
    public List<GoogleSafetySetting> SafetySettings { get; set; } =
    [
        new() { Category = "HARM_CATEGORY_DANGEROUS_CONTENT", Threshold = "BLOCK_ONLY_HIGH" },
        new() { Category = "HARM_CATEGORY_HATE_SPEECH", Threshold = "BLOCK_ONLY_HIGH" },
        new() { Category = "HARM_CATEGORY_HARASSMENT", Threshold = "BLOCK_ONLY_HIGH" },
        new() { Category = "HARM_CATEGORY_SEXUALLY_EXPLICIT", Threshold = "BLOCK_ONLY_HIGH" },
    ];

    public string GetApiEndpointUrlFor(AiProvider aiProvider, TaskType taskType)
    {
        var apiBaseUrl = aiProvider.ApiBaseUrl ?? aiProvider.AiType?.ApiBaseUrl
            ?? throw new NotSupportedException($"[{aiProvider.Name}] No ApiBaseUrl found in AiProvider or AiType");
        if (taskType == TaskType.OpenAiChat)
            return apiBaseUrl.CombineWith("/v1beta/models/${MODEL}:generateContent");

        throw new NotSupportedException($"[{aiProvider.Name}] does not support {taskType}");
    }

    public async Task<OpenAiChatResult> ChatAsync(AiProvider provider, OpenAiChat request, CancellationToken token = default)
    {
        if (string.IsNullOrEmpty(provider.ApiKey))
            throw new NotSupportedException("GoogleOpenAiProvider requires an ApiKey");

        var origModel = request.Model;
        var sw = Stopwatch.StartNew();
        var responseJson = await SendRequestAsync(provider, request, token);

        var res = (Dictionary<string, object>)JSON.parse(responseJson);
        var durationMs = (int)sw.ElapsedMilliseconds;
        var created = DateTime.UtcNow.ToUnixTime();

        var content = "";
        var finishReason = "stop";
        if (res.TryGetValue("candidates", out var oCandidates) && oCandidates is List<object> { Count: > 0 } candidates)
        {
            var candidate = (Dictionary<string, object>)candidates[0];
            if (candidate.TryGetValue("content", out var oContent) && oContent is Dictionary<string,object> contentObj)
            {
                if (contentObj.TryGetValue("parts", out var oParts) && oParts is List<object> { Count: > 0 } parts)
                {
                    if (parts[0] is Dictionary<string, object> part && part.TryGetValue("text", out var oText) && oText is string text)
                        content = text;
                }
            }
            if (candidate.TryGetValue("finishReason", out var oFinishReason))
                finishReason = (string)oFinishReason;
        }
            
        var to = new OpenAiChatResponse {
            Id = $"chatcmpl-{created}",
            Object = "chat.completion",
            Model = request.Model,
            Choices = [
                new() {
                    Index = 0,
                    Message = new() {
                        Role = "assistant",
                        Content = content,
                    },
                    FinishReason = finishReason,
                }
            ],
        };
        request.Model = origModel;
        
        return new(to, durationMs);
    }
    
    private async Task<string> SendRequestAsync(AiProvider provider, OpenAiChat request, CancellationToken token)
    {
        var baseUrl = GetApiEndpointUrlFor(provider, TaskType.OpenAiChat);
        request.Model = provider.GetAiModel(request.Model);
        var url = baseUrl.Replace("${MODEL}", request.Model)
            .AddQueryParam("key", provider.ApiKey);
        
        var generationConfig = new Dictionary<string, object>();
        if (request.Temperature != null)
            generationConfig["temperature"] = request.Temperature;
        if (request.MaxTokens != null)
            generationConfig["maxOutputTokens"] = request.MaxTokens;

        var systemMessage = request.Messages.FirstOrDefault(x => "system".EqualsIgnoreCase(x.Role));
        var messages = request.Messages
            .Where(x => !"system".EqualsIgnoreCase(x.Role))
            .Map(x => new Dictionary<string, object> {
                ["role"] = "user".EqualsIgnoreCase(x.Role) ? "user" : "model",
                ["parts"] = new List<object> {
                    new Dictionary<string,string> {
                        ["text"] = x.Content
                    }
                },
            });
        
        var googleRequest = new Dictionary<string, object>
        {
            ["contents"] = messages,
            ["safetySettings"] = SafetySettings.Map(x => new Dictionary<string, object> {
                ["category"] = x.Category,
                ["threshold"] = x.Threshold,
            }),
        };
        if (generationConfig.Count > 0)
        {
            googleRequest["generationConfig"] = generationConfig;
        }

        if (systemMessage != null)
        {
            // Old gemini-pro before gemini-1.0-pro-002	doesn't support system prompts
            if (request.Model.StartsWith("gemini-1.0"))
            {
                messages.Insert(0, new Dictionary<string, object> {
                    ["role"] = "model",
                    ["parts"] = new List<object> {
                        new Dictionary<string,string> {
                            ["text"] = "Understood."
                        }
                    }
                });
                messages.Insert(0, new Dictionary<string, object> {
                    ["role"] = "user",
                    ["parts"] = new List<object> {
                        new Dictionary<string,string> {
                            ["text"] = "System prompt: " + systemMessage.Content
                        }
                    }
                });
            }
            else
            {
                googleRequest["systemInstruction"] = new Dictionary<string, object> {
                    ["parts"] = new List<object> {
                        new Dictionary<string,string> {
                            ["text"] = systemMessage.Content
                        }
                    }
                };
            }
        }

        Exception? firstEx = null;
        var retries = 0;
        while (retries++ < 10)
        {
            var headers = Array.Empty<string>();
            var contentHeaders = Array.Empty<string>();
            int retryAfter = 0;
            var sleepMs = 1000 * retries;
            string? errorResponse = null;

            try
            {
                var json = JSON.stringify(googleRequest);
                var responseJson = await url.PostJsonToUrlAsync(json, responseFilter: res =>
                {
                    headers = res.Headers.Select(x => $"{x.Key}: {x.Value.FirstOrDefault()}").ToArray();
                    contentHeaders = res.Content.Headers.Select(x => $"{x.Key}: {x.Value.FirstOrDefault()}").ToArray();

                    // if (res.Headers.TryGetValues("retry-after", out var retryAfterValues))
                    // {
                    //     var retryAfterStr = retryAfterValues.FirstOrDefault();
                    //     log.LogWarning("retry-after: {RetryAfter}", retryAfterStr ?? "null");
                    //     if (retryAfterStr != null) 
                    //         int.TryParse(retryAfterStr, out retryAfter);
                    // }
                    if (res.StatusCode >= HttpStatusCode.BadRequest)
                    {
                        errorResponse = res.Content.ReadAsString();
                    }
                    
                }, token: token);
                return responseJson;
            }
            catch (HttpRequestException e)
            {
                log.LogInformation("[{Name}] Headers:\n{Headers}", provider.Name, string.Join('\n', headers));
                log.LogInformation("[{Name}] Content Headers:\n{Headers}", provider.Name, string.Join('\n', contentHeaders));
                if (!string.IsNullOrEmpty(errorResponse))
                {
                    log.LogError("[{Name}] Error Response:\n{ErrorResponse}", provider.Name, errorResponse);
                }

                firstEx ??= e;
                if (e.StatusCode is null or HttpStatusCode.TooManyRequests or >= HttpStatusCode.InternalServerError)
                {
                    // if (retryAfter > 0)
                    //     sleepMs = retryAfter * 1000;
                    log.LogInformation("[{Name}] {Message} for {Url}, retrying after {SleepMs}ms", 
                        provider.Name, e.Message, url, sleepMs);
                    await Task.Delay(sleepMs, token);
                }
                else throw;
            }
        }
        throw firstEx ?? new Exception($"[{provider.Name}] Failed to complete Google Chat request after {retries} retries");
    }

    public async Task<bool> IsOnlineAsync(AiProvider provider, CancellationToken token = default)
    {
        try
        {
            var aiModel = provider.GetPreferredAiModel();
            var request = new OpenAiChat
            {
                Model = aiModel,
                Messages = [
                    new() { Role = "user", Content = "1+1=" },
                ],
                MaxTokens = 2,
                Stream = false,
            };
            await SendRequestAsync(provider, request, token);
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
