using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using NUnit.Framework;
using ServiceStack;

namespace AiServer.Tests;

/* Using Comfy Manager:
 * Install Model: POST http://localhost:7860/api/manager/queue/install_model
    {
       "base": "upscale",
       "description": "4x-AnimeSharp upscaler model",
       "filename": "4x-AnimeSharp.pth",
       "name": "4x-AnimeSharp",
       "reference": "https://huggingface.co/Kim2091/AnimeSharp/",
       "save_path": "default",
       "size": "67.0MB",
       "type": "upscale",
       "url": "https://huggingface.co/Kim2091/AnimeSharp/resolve/main/4x-AnimeSharp.pth",
       "installed": "False",
       "ui_id": "06e94a2964e2cde52253e244d9ab9206"
   }
 *
 * Model List: https://github.com/Comfy-Org/ComfyUI-Manager/blob/main/model-list.json
 * Node List: https://github.com/Comfy-Org/ComfyUI-Manager/blob/main/custom-node-list.json
 */
public class ComfyInstallerTests
{
    string ComfyEndpoint = "http://localhost:7860";

    [Test]
    public async Task Can_install_model()
    {
        var client = new HttpClient();
        client.BaseAddress = new Uri(ComfyEndpoint);

        //https://huggingface.co/Comfy-Org/stable-diffusion-v1-5-archive/resolve/main/v1-5-pruned-emaonly-fp16.safetensors
        var model = new Dictionary<string, object>
        {
            ["name"] = "v1-5-pruned-emaonly-fp16",
            ["base"] = "SD1.5",
            ["type"] = "checkpoint",
            ["save_path"] = "default",
            ["description"] = "Stable Diffusion 1.5 base model",
            ["reference"] = "https://huggingface.co/Comfy-Org/stable-diffusion-v1-5-archive/",
            ["filename"] = "v1-5-pruned-emaonly-fp16.safetensors",
            ["url"] = "https://huggingface.co/Comfy-Org/stable-diffusion-v1-5-archive/resolve/main/v1-5-pruned-emaonly-fp16.safetensors",
            ["installed"] = "False",
            ["size"] = "2.13GB",
            ["ui_id"] = "06e94a2964e2cde52253e244d9ab9206"
        };

        var modelJson = JSON.stringify(model);
        Console.WriteLine(modelJson);
        
        var response = await client.PostAsync("/api/manager/queue/install_model",
            new StringContent(modelJson, Encoding.UTF8, "application/json"));
        
        if (!response.IsSuccessStatusCode)
        {
            var errorJson = await response.Content.ReadAsStringAsync();
            Console.WriteLine("ComfyUI API Error:");
            try
            {
                Console.WriteLine(JsonSerializer.Serialize(JsonSerializer.Deserialize<JsonNode>(errorJson),
                    new JsonSerializerOptions { WriteIndented = true }));
            }
            catch (Exception e)
            {
                Console.WriteLine(errorJson);
                //throw;
            }

            // Don't fail the test if the server returns an error that's not related to our JSON format
            Assert.Fail($"ComfyUI API returned an error: {response.StatusCode}");
        }

        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        Console.WriteLine(json);
    }
}