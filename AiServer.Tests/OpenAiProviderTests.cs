using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class OpenAiProviderTests
{
    private readonly AiProviderFactory factory = new(
        new OpenAiProvider(new NullLogger<OpenAiProvider>()),
        new GoogleOpenAiProvider(new NullLogger<GoogleOpenAiProvider>()));

    [Test]
    public async Task Can_Send_Ollama_Phi3_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.MacbookApiProvider, factory), new OpenAiChat
        {
            Model = "phi3",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Ollama_Gemma2_27B_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.SupermicroApiProvider, factory), new OpenAiChat
        {
            Model = "gemma2:27b",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Ollama_Qwen2_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.OpenRouterProvider, factory), new OpenAiChat
        {
            Model = "qwen2:72b",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Ollama_Sonnet3_5_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.OpenRouterProvider, factory), new OpenAiChat
        {
            Model = "anthropic/claude-3.5-sonnet",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Google_GeminiPro_Request()
    {
        var openAi = factory.GetOpenAiProvider(nameof(GoogleOpenAiProvider));
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.GoogleApiProvider, factory), new OpenAiChat
        {
            Model = "gemini-pro",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Google_GeminiPro_PVQ_Request()
    {
        var openAi = factory.GetOpenAiProvider(nameof(GoogleOpenAiProvider));
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.GoogleApiProvider, factory), new OpenAiChat
        {
            Model = "gemini-pro",
            Messages =
            [
                new() {
                    Role = "system",
                    Content = TestUtils.SystemPrompt,
                },
                new() {
                    Role = "user",
                    Content = "What is the capital of France?",
                },
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_execute_codestral_task()
    {
        var model = "codestral";

        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(new ApiProviderWorker(TestUtils.MistralProvider, factory), new OpenAiChat
        {
            Model = model,
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "Write a fibonacci program in C#",
                }
            ],
            TopP = 0.7,
            MaxTokens = 1024,
        });
        
        response.PrintDump();
    }

    [Test]
    public void List_Google_Gemini_Models()
    {
        // API Docs: https://ai.google.dev/api/rest/v1beta/models/list
        var url = "https://generativelanguage.googleapis.com/v1beta/models"
            .AddQueryParam("key", TestUtils.GoogleApiProvider.ApiKey);

        var json = url.GetJsonFromUrl();
        var obj = JSON.parse(json);
        json.Print();
    }

    [Test]
    public async Task Can_detect_OpenRouterProvider_IsOnline()
    {
        var openAi = factory.GetOpenAiProvider();

        var openRouter = new ApiProviderWorker(TestUtils.OpenRouterProvider, factory);
        var isOnline = await openAi.IsOnlineAsync(openRouter);
        Assert.That(isOnline);
    }

    [Test]
    public async Task Can_detect_Groq_IsOnline()
    {
        var openAi = factory.GetOpenAiProvider();

        var openRouter = new ApiProviderWorker(TestUtils.GroqProvider, factory);
        var isOnline = await openAi.IsOnlineAsync(openRouter);
        Assert.That(isOnline);
    }
}
