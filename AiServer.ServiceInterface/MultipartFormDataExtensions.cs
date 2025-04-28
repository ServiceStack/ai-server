using System.Text;
using Microsoft.Extensions.Logging;

namespace AiServer.ServiceInterface;

// Extension method version
public static class MultipartFormDataExtensions
{
    public static async Task<string> ToDebugStringAsync(this MultipartFormDataContent content)
    {
        var sb = new StringBuilder();

        sb.AppendLine("<MultipartFormDataContent");
        sb.AppendLine($"Boundary: {content.Headers.ContentType?.Parameters.FirstOrDefault(p => p.Name == "boundary")?.Value}");
        
        int index = 0;
        foreach (var part in content)
        {
            sb.AppendLine($"\nPart {index++}:");
            
            // Headers
            foreach (var header in part.Headers)
            {
                sb.AppendLine($"  {header.Key}: {string.Join("; ", header.Value)}");
            }
            
            // Content
            if (part is StringContent stringContent)
            {
                sb.AppendLine($"  Content: {await stringContent.ReadAsStringAsync()}");
            }
            else if (part is ByteArrayContent)
            {
                sb.AppendLine("  ByteArrayContent");
            }
            else
            {
                sb.AppendLine($"  Content-Type: {part.GetType().Name}");
            }
        }
        sb.AppendLine("MultipartFormDataContent>");
        
        return sb.ToString();
    }
    public static async Task LogContentAsync(this MultipartFormDataContent content, 
        ILogger logger, LogLevel logLevel = LogLevel.Debug)
    {
        if (!logger.IsEnabled(logLevel))
            return;

        logger.Log(logLevel, await content.ToDebugStringAsync());
    }
}