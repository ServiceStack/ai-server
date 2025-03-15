using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public record OpenAiChatResult(OpenAiChatResponse Response, int DurationMs);

public interface IOpenAiProvider
{
    Task<bool> IsOnlineAsync(AiProvider provider, CancellationToken token = default);

    Task<OpenAiChatResult> ChatAsync(AiProvider provider, OpenAiChat request, CancellationToken token = default);
}

public record OllamaGenerationResult(OllamaGenerateResponse Response, int DurationMs);
public interface IOllamaAiProvider
{
    Task<OllamaGenerationResult> GenerateAsync(AiProvider provider, OllamaGenerate request, CancellationToken token = default);
}

public class AiProviderFactory(OpenAiProvider openAiProvider, OllamaAiProvider ollamaAiProvider, GoogleAiProvider googleProvider, AnthropicAiProvider anthropicAiProvider)
{
    public IOpenAiProvider GetOpenAiProvider(AiProviderType aiProviderType=AiProviderType.OpenAiProvider)
    {
        return aiProviderType switch
        {
            AiProviderType.OllamaAiProvider => ollamaAiProvider,
            AiProviderType.GoogleAiProvider => googleProvider,
            AiProviderType.AnthropicAiProvider => anthropicAiProvider,
            _ => openAiProvider
        };
    }
}
