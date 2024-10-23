using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class OpenAiChatTests
{
    [Test]
    public async Task Can_send_adhoc_OpenAiChatRequest()
    {
        var json = """
                   {
                       "messages": [
                           {
                               "content": "You are a friendly AI Assistant that helps answer developer questions. Think step by step and assist the user with their question, ensuring that your answer is relevant, on topic and provides actionable advice with code examples as appropriate.",
                               "role": "system"
                           },
                           {
                               "content": "I'm learning C#.  From what I know, you have to set things up correctly to have the garbage collector actually delete everything as it should be.  I'm looking for wisdom learned over the years from you, the intelligent.\r\n\r\nI'm coming from a C++ background and am VERY used to code-smells and development patterns.  I want to learn what code-smells are like in C#.  Give me advice!\r\n\r\nWhat are the best ways to get things deleted?\r\n\r\nHow can you figure out when you have \"memory leaks\"?\r\n\r\nI am trying to develop a punch-list of \"stuff to always do for memory management\"",
                               "role": "user"
                           }
                       ],
                       "model": "codellama",
                       "max_tokens": 2048,
                       "temperature": 0.7
                   }
                   """;

        var baseUrl = "https://macbook.pvq.app";
        var response = await baseUrl.CombineWith("/v1/chat/completions").PostJsonToUrlAsync(json);
        response.Print();
    }
    
    [Test]
    public async Task Can_send_open_ai_compatible_request_AiServer()
    {
        var apiClient = new JsonApiClient("https://localhost:5005");
        apiClient = TestUtils.IgnoreSslErrors(apiClient);
        apiClient.BearerToken = Environment.GetEnvironmentVariable("AI_SERVER_API_KEY");

        var response = await apiClient.PostAsync<OpenAiChatResponse>("/v1/chat/completions", new OpenAiChat()
        {
            Model = "llama3:8b",
            Messages = [
                new() { Role = "system", Content = "You are a helpful AI assistant." },
                new() { Role = "user", Content = "How do LLMs work?" }
            ],
            MaxTokens = 50
        });

        response.PrintDump();
    }
}