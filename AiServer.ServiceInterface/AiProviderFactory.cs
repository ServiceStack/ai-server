using AiServer.ServiceModel;

namespace AiServer.ServiceInterface;

public record OpenAiChatResult(OpenAiChatResponse Response, int DurationMs);

public interface IOpenAiProvider
{
    Task<bool> IsOnlineAsync(ApiProvider provider, CancellationToken token = default);

    Task<OpenAiChatResult> ChatAsync(ApiProvider provider, OpenAiChat request, CancellationToken token = default);
}

public class AiProviderFactory(OpenAiProvider openAiProvider, GoogleOpenAiProvider googleProvider)
{
    public IOpenAiProvider GetOpenAiProvider(string? type = null)
    {
        return type == nameof(GoogleOpenAiProvider)
            ? googleProvider
            : openAiProvider;
    }
}