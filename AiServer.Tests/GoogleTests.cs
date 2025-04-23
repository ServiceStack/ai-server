using AiServer.ServiceInterface;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;

namespace AiServer.Tests;

[Explicit("Integration tests")]
public class GoogleTests
{
    private static GoogleAiProvider CreateProvider()
    {
        return new GoogleAiProvider(new NullLogger<GoogleAiProvider>());
    }
    
    [Test]
    public async Task Check_Google_Models()
    {
        // https://ai.google.dev/gemini-api/docs/models
        var aiProvider = TestUtils.GoogleAiProvider;
        var google = CreateProvider();

        foreach (var model in aiProvider.Models)
        {
            var active = await google.IsOnlineAsync(aiProvider, model.Model);
            Console.WriteLine("Google {0}: {1}", model.Model, active);
        }
    }
}