using System.Net.WebSockets;
using System.Text;
using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.Extensions.Logging;

namespace AiServer.ServiceInterface.Comfy;

public class ComfyWebSocketClient(Uri serverUrl, ClientWebSocket clientWebSocket, string? apiKey = null, ILogger? logger = null)
{
    private readonly ConcurrentQueue<string> messageQueue = new();
    
    private readonly CancellationTokenSource cancellationTokenSource = new();
    private const int ReconnectDelayMs = 3000;

    public Action<string>? OnMessageReceived { get; set; }
    public Action<int, int, string>? OnProgressUpdated { get; set; }
    public Action<int>? OnQueueRemaining { get; set; }
    public Action<string>? OnGenerationCompleted { get; set; }

    public async Task ConnectAndListenAsync()
    {

        while (!cancellationTokenSource.IsCancellationRequested)
        {
            try
            {
                await ConnectAsync();
                await ReceiveMessagesAsync();
            }
            catch (Exception ex)
            {
                logger?.LogError($"Error: {ex.Message}");
                logger?.LogDebug($"Stack Trace: {ex.StackTrace}");
                
                // Attempt to reconnect
                logger?.LogInformation($"Attempting to reconnect in {ReconnectDelayMs / 1000} seconds...");
                await Task.Delay(ReconnectDelayMs);
            }
        }
    }
    
    private async Task ConnectAsync()
    {
        clientWebSocket = new ClientWebSocket();
        if (apiKey != null)
            clientWebSocket.Options.SetRequestHeader("Authorization", $"Bearer {apiKey}");
        await clientWebSocket.ConnectAsync(serverUrl, cancellationTokenSource.Token);
        logger?.LogInformation("Connected to WebSocket server");

        // Start message processing on a separate thread
        Task.Run(ProcessMessagesAsync);
    }

    private async Task ReceiveMessagesAsync()
    {
        var buffer = new byte[1024 * 4];
        while (clientWebSocket.State == WebSocketState.Open)
        {
            try
            {
                var result = await clientWebSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cancellationTokenSource.Token);
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    string message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    messageQueue.Enqueue(message);
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await clientWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, cancellationTokenSource.Token);
                    break;
                }
            }
            catch (WebSocketException)
            {
                // Connection lost, break the loop to trigger reconnection
                break;
            }
        }
    }

    private async Task ProcessMessagesAsync()
    {
        while (!cancellationTokenSource.IsCancellationRequested)
        {
            if (messageQueue.TryDequeue(out string? message))
            {
                OnMessageReceived?.Invoke(message);
                ProcessMessage(message);
            }
            else
            {
                await Task.Delay(10); // Small delay to prevent busy waiting
            }
        }
    }

    private void ProcessMessage(string message)
    {
        try
        {
            var jsonDocument = JsonDocument.Parse(message);
            var root = jsonDocument.RootElement;

            if (root.TryGetProperty("type", out var typeElement) && typeElement.GetString() is { } type)
            {
                switch (type)
                {
                    case "progress":
                        if (root.TryGetProperty("data", out var dataElement))
                        {
                            int value = dataElement.GetProperty("value").GetInt32();
                            int max = dataElement.GetProperty("max").GetInt32();
                            string promptId = dataElement.GetProperty("prompt_id").GetString() ?? string.Empty;
                            OnProgressUpdated?.Invoke(value, max, promptId);
                        }
                        break;
                    case "status":
                        if (root.TryGetProperty("data", out var statusDataElement) &&
                            statusDataElement.TryGetProperty("status", out var statusElement) &&
                            statusElement.TryGetProperty("exec_info", out var execInfoElement) &&
                            execInfoElement.TryGetProperty("queue_remaining", out var queueRemainingElement))
                        {
                            int queueRemaining = queueRemainingElement.GetInt32();
                            OnQueueRemaining?.Invoke(queueRemaining);
                        }
                        break;
                    case "executing":
                        if (root.TryGetProperty("data", out var executingDataElement) &&
                            executingDataElement.TryGetProperty("prompt_id", out var executingPromptIdElement) &&
                            executingDataElement.TryGetProperty("node", out var executingJsonDataElement))
                        {
                            string promptId = executingPromptIdElement.GetString()!;
                            // Check if node is null, if it is, it means the generation is completed
                            string? jsonData = executingJsonDataElement.ValueKind == JsonValueKind.Null
                                ? null
                                : executingJsonDataElement.Clone().GetRawText();
                            if (jsonData == null)
                            {
                                OnGenerationCompleted?.Invoke(promptId);
                            }
                                
                        }
                        break;
                    default:
                        logger?.LogWarning($"Unhandled message type: {type}");
                        logger?.LogDebug($"Full message: {message}");
                        break;
                }
            }
        }
        catch (JsonException ex)
        {
            logger?.LogError($"Error parsing JSON: {ex.Message}");
            logger?.LogDebug($"Stack Trace: {ex.StackTrace}");
        }
    }
    
    public void Stop()
    {
        cancellationTokenSource.Cancel();
    }
}
