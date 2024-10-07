using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class OllamaApiTests
{
    [Test]
    public async Task Can_execute_ollama_task()
    {
        var model = "phi3";
        var client = TestUtils.CreatePvqClient();

        var chatRequest = new OpenAiChat
        {
            Model = model,
            Messages =
            [
                new() { Role = "system", Content = TestUtils.SystemPrompt },
                new() { Role = "user", Content = "How can I reverse a string in JavaScript?" },
            ],
            Temperature = 0.7,
            MaxTokens = 2048,
            Stream = false,
        };

        var openApiChatEndpoint = "http://macbook.pvq.app/v1/chat/completions";
        var response = await openApiChatEndpoint.PostJsonToUrlAsync(chatRequest);
        
        response.PrintDump();
    }
}
