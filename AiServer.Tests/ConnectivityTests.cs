using System.Net.Http.Headers;
using System.Text;
using NUnit.Framework;

namespace AiServer.Tests;

public class ConnectivityTests
{
    [Test, Explicit("Integration test")]
    public async Task Can_call_supermicro()
    {
        // Environment.SetEnvironmentVariable("DOTNET_SYSTEM_NET_DISABLEIPV6", "1");
        // var url = "http://192.168.4.200:11434/api/tags";
        var url = "https://supermicro.pvq.app/api/tags";
        using var client = new HttpClient();
        var res = await client.GetAsync(url);
        res.EnsureSuccessStatusCode();
        var json = await res.Content.ReadAsStringAsync();
        Console.WriteLine(json);        
    }

    [Test, Explicit("Integration test")]
    public async Task Can_call_GetOllamaModels()
    {
        // Environment.SetEnvironmentVariable("DOTNET_SYSTEM_NET_DISABLEIPV6", "1");
        // var url = "https://openai.servicestack.net/api/GetOllamaModels"
        //     .AddQueryParam("ApiBaseUrl", "https://supermicro.pvq.app");
        var url = "https://okai.servicestack.com/models/gist?prompt=1735872878252";
        using var client = new HttpClient();
        var res = await client.GetAsync(url);
        res.EnsureSuccessStatusCode();
        var json = await res.Content.ReadAsStringAsync();
        Console.WriteLine(json);        
    }

    [Test, Explicit("Integration test")]
    public async Task Can_call_groq()
    {
        var url = "https://api.groq.com/openai/v1/chat/completions";
        using var client = new HttpClient();
        var content = new StringContent(
            """
            {
                "messages": [{
                    "role": "user",
                    "content": "Capital of France?"
                 }],
                "model": "qwen-qwq-32b",
                "max_tokens": 2048,
                "temperature": 0.7,
                "stream": false
            }
            """,
            Encoding.UTF8, "application/json");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("GROQ_API_KEY"));
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var res = await client.PostAsync(url, content);
        res.EnsureSuccessStatusCode();
        var json = await res.Content.ReadAsStringAsync();
        Console.WriteLine(json);        
    }
}