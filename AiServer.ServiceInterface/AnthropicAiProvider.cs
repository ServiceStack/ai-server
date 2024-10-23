using System.Runtime.Serialization;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.ServiceInterface;

public class AnthropicAiProvider(ILogger<AnthropicAiProvider> log) : OpenAiProviderBase(log)
{
    protected override async Task<OpenAiChatResponse> SendOpenAiChatRequestAsync(AiProvider provider, OpenAiChat request, 
        Action<HttpRequestMessage>? requestFilter, Action<HttpResponseMessage> responseFilter, CancellationToken token=default)
    {
        var url = (provider.ApiBaseUrl ?? provider.AiType?.ApiBaseUrl).CombineWith("/v1/messages");
        Action<HttpRequestMessage>? useRequestFilter = req => {
            req.Headers.Add("x-api-key", provider.ApiKey);
            req.Headers.Add("anthropic-version", "2023-06-01");
        };
        var anthropicRequest = ToAnthropicMessageRequest(request);
        var responseJson = await url.PostJsonToUrlAsync(anthropicRequest,
            requestFilter: useRequestFilter,
            responseFilter: responseFilter, token: token);
        
        // responseJson.Print();
        var anthropicResponse = responseJson.FromJson<AnthropicMessageResponse>();
        var response = ToOpenAiChatResponse(anthropicResponse);
        return response;
    }

    public AnthropicMessageRequest ToAnthropicMessageRequest(OpenAiChat request)
    {
        var messages = request.Messages
            .Where(x => x.Role is "user" or "assistant").ToList();
        var ret = new AnthropicMessageRequest
        {
            Model = request.Model,
            Messages = messages,
            MaxTokens = request.MaxTokens,
            Metadata = request.User != null
                ? new AnthropicMetadata { UserId = request.User }
                : null,
            StopSequences = request.Stop,
            Stream = request.Stream,
            System = request.Messages.FirstOrDefault(x => x.Role == "system")?.Content,
            Temperature = request.Temperature,
            TopK = request.TopLogProbs,
            TopP = request.TopP,
        };
        return ret;
    }

    public OpenAiChatResponse ToOpenAiChatResponse(AnthropicMessageResponse response)
    {
        var index = 1;
        var ret = new OpenAiChatResponse
        {
            Id = response.Id,
            Created = DateTime.UtcNow.ToUnixTime(),
            Choices = response.Content.Map(x => new Choice
            {
                Index = index++,
                FinishReason = response.StopReason ?? "stop",
                Message = new()
                {
                    Role = response.Role,
                    Content = x.Text,
                },
            }),
            Model = response.Model,
            Usage = new()
            {
                PromptTokens = response.Usage.InputTokens,
                CompletionTokens = response.Usage.OutputTokens,
                TotalTokens = response.Usage.InputTokens + response.Usage.OutputTokens,
            },
            Object = response.Type,
        };

        return ret;
    }
}

[DataContract]
public class AnthropicMessageRequest
{
    [DataMember(Name = "model")]
    public string Model { get; set; }

    [DataMember(Name = "messages")] 
    public List<OpenAiMessage> Messages { get; set; } = [];
    
    [DataMember(Name = "max_tokens")]
    public int? MaxTokens { get; set; }
    
    [DataMember(Name = "metadata")]
    public AnthropicMetadata? Metadata { get; set; }

    [DataMember(Name = "stop_sequences")]
    public List<string>? StopSequences { get; set; }

    [DataMember(Name = "stream")]
    public bool? Stream { get; set; }

    [DataMember(Name = "system")]
    public string? System { get; set; }
    
    [DataMember(Name = "temperature")]
    public double? Temperature { get; set; }

    [DataMember(Name = "tool_choice")]
    public AnthropicToolChoice? ToolChoice { get; set; }
    
    [DataMember(Name = "tools")]
    public List<AnthropicTool>? Tools { get; set; }
    
    [DataMember(Name = "top_k")]
    public int? TopK { get; set; }
    
    [DataMember(Name = "top_p")]
    public double? TopP { get; set; }
}

[DataContract]
public class AnthropicMetadata
{
    [DataMember(Name = "user_id")]
    public string UserId { get; set; }
}

[DataContract]
public class AnthropicToolChoice
{
    [DataMember(Name = "type")] //auto, any, tool
    public string Type { get; set; }

    [DataMember(Name = "name")]
    public string Name { get; set; }
}

[DataContract]
public class AnthropicTool
{
    [DataMember(Name = "name")]
    public string Name { get; set; }

    [DataMember(Name = "description")] //auto, any, tool
    public string? Description { get; set; }

    [DataMember(Name = "input_schema")] //auto, any, tool
    public Dictionary<string, object>? InputSchema { get; set; }
}

[DataContract]
public class AnthropicMessageResponse
{
    [DataMember(Name = "id")] 
    public string Id { get; set; }
    
    [DataMember(Name = "type")] 
    public string Type { get; set; }
    
    [DataMember(Name = "role")] 
    public string Role { get; set; }
    
    [DataMember(Name = "content")] 
    public List<AnthropicContent> Content { get; set; }
    
    [DataMember(Name = "model")] 
    public string Model { get; set; }
    
    [DataMember(Name = "stop_reason")] 
    public string? StopReason { get; set; }

    [DataMember(Name = "stop_sequence")]
    public string? StopSequence { get; set; }
    
    [DataMember(Name = "usage")] 
    public AnthropicUsage Usage { get; set; }
}

[DataContract]
public class AnthropicContent
{
    [DataMember(Name = "type")]
    public string Type { get; set; }

    [DataMember(Name = "text")]
    public string Text { get; set; }
}

/*
{
    "id": "msg_01P8SksozNXcxNZZdE43avC9",
    "type": "message",
    "role": "assistant",
    "model": "claude-3-haiku-20240307",
    "content": [
        {
            "type": "text",
            "text": "Paris."
        }
    ],
    "stop_reason": "end_turn",
    "stop_sequence": null,
    "usage": {
        "input_tokens": 180,
        "output_tokens": 5
    }   
}
*/
[DataContract]
public class AnthropicUsage
{
    [DataMember(Name = "input_tokens")]
    public int InputTokens { get; set; }
    
    [DataMember(Name = "cache_creation_input_tokens")]
    public int CacheCreationInputTokens { get; set; }
    
    [DataMember(Name = "cache_read_input_tokens")]
    public int CacheReadInputTokens { get; set; }
    
    [DataMember(Name = "output_tokens")]
    public int OutputTokens { get; set; }
}
