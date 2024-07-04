using AiServer.ServiceInterface.Comfy;
using ServiceStack;
using ServiceStack.Host;

namespace AiServer.ServiceInterface;

public class ComfyApiServices(IComfyClient comfyClient) : Service
{
    public async Task<object> Post(CreateComfyTextToImage request)
    {
        var comfyReq = new ComfyTextToImage
        {
            Model = request.Model,
            Width = request.Width,
            Height = request.Height,
            Sampler = ComfySampler.euler_ancestral,
            BatchSize = request.Samples,
            Seed = request.Seed ?? Random.Shared.Next(),
            PositivePrompt = request.PositivePrompt,
            NegativePrompt = request.NegativePrompt ?? "low quality, blurry, noisy, compression artifacts",
            Scheduler = "normal",
            Steps = 25,
            CfgScale = 7,
        };
        
        var tcs = new TaskCompletionSource<Stream>();
        Stream downloadStream;
        
        try
        {
            var response = await comfyClient.PromptGeneration(comfyReq, true);
            var promptId = response.PromptId;

            var status = await comfyClient.GetWorkflowStatusAsync(response.PromptId);
            if (status == null)
                throw new Exception("Failed to get workflow status");
            
            downloadStream = await comfyClient.DownloadComfyOutputAsync(status.Outputs[0].Files[0]);
            if (tcs.TrySetResult(downloadStream))
            {
                Console.WriteLine($"PromptId: {promptId} - Image URL: {status.Outputs[0].Files[0]}");
            }
            else
            {
                Console.WriteLine($"Failed to set result for PromptId: {promptId}");
            }
            
            var filesUploadFeature = HostContext.GetPlugin<FilesUploadFeature>();

            // Wait for the event to fire and get the image URL
            var imageData = await tcs.Task;
            var imageGuid = Guid.NewGuid().ToString();
            // Save the image using the files upload feature
            var location = filesUploadFeature.GetLocation("comfy");
            if (location == null)
                throw new Exception("Upload location not found");

            if (Request == null)
                throw new Exception("Request is null");
            var downloadUrl = await filesUploadFeature.UploadFileAsync(location, Request, await GetSessionAsync(),
                new HttpFile()
                {
                    InputStream = imageData,
                    Name = $"{imageGuid}.png",
                    ContentLength = imageData.Length,
                    ContentType = MimeTypes.GetMimeType("png"),
                    FileName = $"{imageGuid}.png"
                });

            if (downloadUrl == null)
                throw new Exception("Failed to upload image");

            return new CreateComfyTextToImageResponse { ImageUrl = downloadUrl };
        }
        catch (Exception ex)
        {
            return ex;
        }
    }
}


[ValidateApiKey]
public class CreateComfyTextToImage : IReturn<CreateComfyTextToImageResponse>
{
    public string Model { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int Samples { get; set; } = 1;
    public long? Seed { get; set; }
    public string PositivePrompt { get; set; }
    public string? NegativePrompt { get; set; }
}

public class CreateComfyTextToImageResponse
{
    public string ImageUrl { get; set; }
}