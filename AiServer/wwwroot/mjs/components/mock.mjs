const mock = []
mock.push({ role: "assistant", content: "Hello! I'm an AI assistant. How can I help you today?" })
mock.push({ role: "user", content: "What's the capital of France?" })
mock.push({ role: "assistant", content: "The capital of France is Paris." })
mock.push({ role: "user", content: "Create a C# method which downloads and extracts a .zip file" })

const csharpBlock = code => ['```csharp', code, '```'].join('\n')
const code = `
using System;
using System.IO;
using System.IO.Compression;
using System.Net.Http;

public class ZipDownloader
{
    public async void DownloadAndExtractZipAsync(string url, string extractPath)
    {
        // Download the zip file
        using (var httpClient = new HttpClient())
        {
            var response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            // Save the zip file to a temporary location
            var tempZipPath = Path.GetTempFileName();
            using var fs = new FileStream(tempZipPath, FileMode.Create, FileAccess.Write, FileShare.None);
            await response.Content.CopyToAsync(fs);

            ZipFile.ExtractToDirectory(tempZipPath, extractPath);
            File.Delete(tempZipPath);
        }
    }
}`.trim()
mock.push({ role: "assistant", content: `            
Here's a simple method using the System.Net.Http and System.IO.Compression namespaces to download and extract a .zip file in C#:
${csharpBlock(code)}

You can use this method like so:
${csharpBlock(`var downloader = new ZipDownloader();\nawait downloader.DownloadAndExtractZipAsync(\n    "https://example.com/file.zip", @"C:\\ExtractedFiles");\n`)}

Please replace the URL and the extract path with your own values. Also, ensure you have the necessary permissions to write to the extract path.
            ` })
mock.push({ role: "user", content: "What's the capital of Tokyo?" })
mock.push({ role: "assistant", content: "The capital of Tokyo is Japan." })

export { mock }