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
        Environment.SetEnvironmentVariable("DOTNET_SYSTEM_NET_DISABLEIPV6", "1");
        
        var model = "gemma3:27b";
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

        var openApiChatEndpoint = "https://supermicro.pvq.app/v1/chat/completions";
        var responseJson = await openApiChatEndpoint.PostJsonToUrlAsync(chatRequest);

        var response = responseJson.FromJson<OpenAiChatResponse>();
        ClientConfig.ToSystemJson(response).Print();
        
        $"\n\n{response.Choices?.FirstOrDefault()?.Message?.Content}".Print();
    }

    [Test]
    public async Task Can_send_an_image_to_ollama()
    {
        Environment.SetEnvironmentVariable("DOTNET_SYSTEM_NET_DISABLEIPV6", "1");
        var ollamaGenerateEndpoint = "https://supermicro.pvq.app/api/generate";
        // var ollamaGenerateEndpoint = "http://localhost:11434/api/generate";
        
        // var model = "gemma3:27b";
        var model = "gemma3:4b";

        var imgBytes = await File.ReadAllBytesAsync("/home/mythz/Downloads/test3.png");
        
        var chatRequest = new OllamaGenerate
        {
            Model = model,
            Prompt = "Describe this image",
            Images = [Convert.ToBase64String(imgBytes)],
            Stream = false,
        };

        var responseJson = await ollamaGenerateEndpoint.PostJsonToUrlAsync(chatRequest);
        
        // responseJson.Print();

        var response = responseJson.FromJson<OllamaGenerateResponse>();
        // ClientConfig.ToSystemJson(response).Print();
        
        $"\n\n{response.Response}".Print();
    }
}
