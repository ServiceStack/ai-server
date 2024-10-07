using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public record OpenAiChatResult(OpenAiChatResponse Response, int DurationMs);

public interface IOpenAiProvider
{
    Task<bool> IsOnlineAsync(AiProvider provider, CancellationToken token = default);

    Task<OpenAiChatResult> ChatAsync(AiProvider provider, OpenAiChat request, CancellationToken token = default);
}

public class AiProviderFactory(OpenAiProvider openAiProvider, GoogleAiProvider googleProvider)
{
    public IOpenAiProvider GetOpenAiProvider(AiProviderType aiProviderType=AiProviderType.OpenAiProvider)
    {
        return aiProviderType == AiProviderType.GoogleAiProvider
            ? googleProvider
            : openAiProvider;
    }
}