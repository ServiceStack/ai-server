using System.Security.Cryptography;
using AiServer.ServiceInterface.AppDb;
using AiServer.ServiceInterface.Generation;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Web;

namespace AiServer.ServiceInterface.Jobs;

public class CreateGenerationCommand(ILogger<CreateGenerationCommand> logger,
    AppData appData,
    AppConfig appConfig,
    IBackgroundJobs jobs, 
    MediaProviderFactory providerFactory, 
    IHttpClientFactory httpFactory) 
    : AsyncCommandWithResult<CreateGeneration, GenerationResult>
{
    async Task DownloadOutputsAsync(IAiProvider aiProvider, 
        MediaProvider apiProvider,
        IEnumerable<AiProviderFileOutput> outputs, string keyId, CancellationToken token)
    {
        var now = DateTime.UtcNow;
        var downloadTasks = outputs.Select(x => 
            DownloadOutputAsync(aiProvider, apiProvider, x, now, keyId, token));
        await Task.WhenAll(downloadTasks);
    }

    private JobLogger? _log = null;
    private JobLogger log => _log ??= Request.CreateJobLogger(jobs, logger);

    async Task DownloadOutputAsync(IAiProvider aiProvider,
        MediaProvider apiProvider,
        AiProviderFileOutput output, DateTime now, string keyId, CancellationToken token)
    {
        using var client = httpFactory.CreateClient();
        try
        {
            var response = await aiProvider.DownloadOutputAsync(apiProvider, output, token);
            response.EnsureSuccessStatusCode();
            
            // Grab file extension from response
            var ext = response.Content.Headers.ContentType?.MediaType switch
            {
                "image/jpeg" => "jpg",
                "image/png" => "png",
                "image/gif" => "gif",
                "image/webp" => "webp",
                //mp3
                "audio/mpeg" => "mp3",
                "audio/x-wav" => "wav",
                "audio/ogg" => "ogg",
                "audio/wav" => "wav",
                "audio/flac" => "flac",
                _ => "webp"
            };

            var imageBytes = await response.Content.ReadAsByteArrayAsync(token);
            var sha256 = imageBytes.ComputeSha256();
            output.FileName = $"{sha256}.{ext}";
            var relativePath = $"{now:yyyy}/{now:MM}/{now:dd}/{keyId}/{output.FileName}";
            var path = appConfig.ArtifactsPath.CombineWith(relativePath);
            Path.GetDirectoryName(path).AssertDir();
            await File.WriteAllBytesAsync(path, imageBytes, token);
            output.Url = $"/artifacts/{relativePath}";
        }
        catch (Exception e)
        {
            log.LogError(e, "Error downloading {ImageUrl}: {Message}", output.Url, e.Message);
        }
    }

    private async Task HandleFileUploadsTask(BackgroundJob job, GenerationArgs argInstance, CancellationToken token)
    {
        if (job.Args?.TryGetValue("Files", out var files) != true)
            return;

        var fileUploads = files.FromJson<Dictionary<string, string>>();
        if (fileUploads == null)
            return;

        foreach (var file in fileUploads)
        {
            if (!supportedFiles.Contains(file.Key))
                continue;
            // Copy file from file system to memory stream
            var ms = new MemoryStream();
            await using var fs = File.OpenRead(file.Value);
            await fs.CopyToAsync(ms, token);
            ms.Position = 0;
            fs.Close();
            switch (file.Key)
            {
                case "image":
                    argInstance.ImageInput = ms;
                    break;
                case "mask":
                    argInstance.MaskInput = ms;
                    break;
                case "speech":
                    argInstance.SpeechInput = ms;
                    break;
                case "audio":
                    argInstance.AudioInput = ms;
                    break;
            }
        }
    }
    
    private List<string> supportedFiles = new()
    {
        "image",
        "mask",
        "speech",
        "audio"
    };

    protected override async Task<GenerationResult> RunAsync(CreateGeneration request, CancellationToken token)
    {
        if (request.Request == null)
            throw new ArgumentNullException(nameof(request.Request));
        
        var job = Request.GetBackgroundJob();
        var apiProviderInstance = appData.AssertMediaProvider(job.Worker!);
        var generationProvider = providerFactory.GetProvider(apiProviderInstance.MediaType!.Provider);
        
        log.LogInformation("Starting generation request {RefId} with {Provider}", request.RefId, apiProviderInstance.Name);

        try
        {
            await HandleFileUploadsTask(job,request.Request, token);

            var keyId = job.Args?.TryGetValue("KeyId", out var oKeyId) == true ? oKeyId : "0";
            log.LogInformation("Running {TaskType} generation request {RefId} with {Provider}",
                request.Request.TaskType, request.RefId, apiProviderInstance.Name);
            var (response, durationMs) = await generationProvider.RunAsync(apiProviderInstance, request.Request, token);
            log.LogInformation("Finished {TaskType} generation request {RefId} with {Provider} in {DurationMs}ms",
                request.Request.TaskType, request.RefId, apiProviderInstance.Name, durationMs);
            if (response.Outputs is { Count: > 0 })
                await DownloadOutputsAsync(generationProvider, apiProviderInstance, response.Outputs, keyId, token);

            ResponseStatus? error = null;
            var outputs = new List<AiProviderFileOutput>();
            var textOutputs = new List<AiProviderTextOutput>();
            foreach (var output in response.Outputs ?? [])
            {
                if (!output.Url.StartsWith("/artifacts/"))
                {
                    log.LogWarning("{Url} could not be downloaded", output.Url);
                    continue;
                }

                outputs.Add(output);
                log.LogInformation("Returning artifact: {Path}", output.Url);
            }

            if (outputs.Count == 0 && TaskExpectsOutputFile(request.Request.TaskType))
            {
                error = new()
                {
                    ErrorCode = nameof(Exception),
                    Message = "No generated images were returned",
                };
                log.LogError("No generated images were returned: {Json}", response.ToJson());
            }

            foreach (var textOutput in response.TextOutputs ?? [])
            {
                log.LogInformation("Returning text output: {Text}", textOutput);
                textOutputs.Add(textOutput);
            }

            if (job.ReplyTo == null)
                return response;
            log.LogInformation("ReplyTo registered for {RefId}, sending response to {ReplyTo}", job.RefId, job.ReplyTo);
            jobs.EnqueueCommand<NotifyGenerationResponseCommand>(new GenerationCallback {
                State = request.State,
                RefId = job.RefId,
                Outputs = outputs,
                TextOutputs = textOutputs,
                ResponseStatus = error,
            }, new() {
                ParentId = job.Id,
                ReplyTo = job.ReplyTo,
            });
            return response;
        }
        catch (Exception e) when (e is not OperationCanceledException)
        {
            log.LogError(e, "Error processing generation request {RefId} with {Provider}", request.RefId,
                apiProviderInstance.Name);
            if (!await generationProvider.IsOnlineAsync(apiProviderInstance, token))
            {
                log.LogWarning("{Provider} is offline, changing status to Offline", apiProviderInstance.Name);
                jobs.RunCommand<ChangeMediaProviderStatusCommand>(new ChangeProviderStatus
                {
                    Name = apiProviderInstance.Name,
                    OfflineDate = DateTime.UtcNow,
                });
            }

            throw;
        }
        finally
        {
            request.Request.ImageInput?.Dispose();
            request.Request.MaskInput?.Dispose();
            request.Request.SpeechInput?.Dispose();
        }
    }
    
    private bool TaskExpectsOutputFile(AiTaskType? taskType)
    {
        return taskType switch
        {
            AiTaskType.TextToImage => true,
            AiTaskType.TextToSpeech => true,
            AiTaskType.SpeechToText => false,
            AiTaskType.ImageToImage => true,
            AiTaskType.ImageToText => false,
            AiTaskType.TextToAudio => true,
            AiTaskType.ImageUpscale => true,
            AiTaskType.ImageWithMask => true,
            _ => false
        };
    }
}