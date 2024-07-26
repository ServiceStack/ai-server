const mock = []
mock.push({role: "assistant", content: "Hello! I'm an AI assistant. How can I help you today?"})
mock.push({role: "user", content: "What's the capital of France?"})
mock.push({role: "assistant", content: "The capital of France is Paris."})
mock.push({role: "user", content: "Create a C# method which downloads and extracts a .zip file"})

//I'm really tired. Should I go on my bike ride today?
//Inflation is really high at the moment, where's the best place to invest my savings?

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
mock.push({
    role: "assistant", content: `            
Here's a simple method using the System.Net.Http and System.IO.Compression namespaces to download and extract a .zip file in C#:
${csharpBlock(code)}

You can use this method like so:
${csharpBlock(`var downloader = new ZipDownloader();\nawait downloader.DownloadAndExtractZipAsync(\n    "https://example.com/file.zip", @"C:\\ExtractedFiles");\n`)}

Please replace the URL and the extract path with your own values. Also, ensure you have the necessary permissions to write to the extract path.
            `
})
mock.push({role: "user", content: "What's the capital of Tokyo?"})
mock.push({role: "assistant", content: "The capital of Tokyo is Japan."})

export function reset() {
    localStorage.setItem('chat.prefs', JSON.stringify({"model":"mistral","prompt":"Act as a Linux Terminal"}))
    localStorage.setItem('chat:306754', JSON.stringify({
        "request": {
            "messages": [{
                "content": "You are an IT expert helping a user with a technical issue.\nI will provide you with all the information needed about my technical problems, and your role is to solve my problem. \nYou should use your computer science, network infrastructure, and IT security knowledge to solve my problem\nusing data from StackOverflow, Hacker News, and GitHub of content like issues submitted, closed issues, \nnumber of stars on a repository, and overall StackOverflow activity.\nUsing intelligent, simple and understandable language for people of all levels in your answers will be helpful. \nIt is helpful to explain your solutions step by step and with bullet points. \nTry to avoid too many technical details, but use them when necessary. \nI want you to reply with the solution, not write any explanations.",
                "role": "system"
            }, {"content": "ping", "role": "user"}], "model": "mixtral", "temperature": 0.7, "top_p": 0
        },
        "response": {
            "id": "chatcmpl-a9aa59b1-e326-4749-a74b-aab12e33e3c4",
            "choices": [{
                "finishReason": "stop", "index": 0, "message": {
                    "content": "Sure, I'm here to help! Before I can provide a solution, I need to know what your technical issue is. Could you please provide me with more details about the problem you're experiencing?\n\nIn the meantime, here are some general steps you can take when encountering a technical issue:\n\n1. Identify the problem: Clearly define what the issue is and what you were trying to do when it occurred.\n2. Reproduce the issue: Try to recreate the problem in a controlled environment to confirm that it's not a one-time error.\n3. Research the issue: Look up the error message or problem online to see if others have encountered and solved it.\n4. Check relevant resources: Review relevant resources such as StackOverflow, Hacker News, and GitHub to see if there are any issues or solutions related to your problem.\n5. Try potential solutions: Based on your research, try out potential solutions and see if they resolve the issue.\n6. Document your findings: Keep track of what you've tried and what worked or didn't work. This can help you and others in the future.\n\nOnce you provide me with more information about your specific issue, I can give you a more tailored solution.",
                    "role": "assistant"
                }
            }],
            "created": 1721817330,
            "model": "mixtral-8x7b-32768",
            "system_fingerprint": "fp_c5f20b5bb1",
            "object": "chat.completion",
            "usage": {"completion_tokens": 265, "prompt_tokens": 177, "total_tokens": 442}
        },
        "id": 306754,
        "model": "mixtral",
        "provider": "groq",
        "refId": "dd58a33bb3134d31ad093b64cd81e6d4",
        "createdDate": "2024-07-24T10:35:29.1151738Z",
        "createdBy": "System",
        "worker": "groq",
        "requestId": "01b529f1cdec4cfdbb16c0d1f3fd1e53",
        "startedDate": "2024-07-24T10:35:29.1423654Z",
        "completedDate": "2024-07-24T10:35:30.2675857Z",
        "durationMs": 1101,
        "retries": 0
    }))
    
    localStorage.setItem('chat:306761', JSON.stringify({
        "request": {
            "messages": [{
                "content": "I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}. My first command is pwd",
                "role": "system"
            }, {"content": "How to revert a commit in git?", "role": "user"}],
            "model": "mistral",
            "temperature": 0.7,
            "top_p": 0
        },
        "response": {
            "id": "chatcmpl-29",
            "choices": [{
                "finishReason": "stop",
                "index": 0,
                "message": {
                    "content": "```bash\n$ pwd\n/home/user/project\n```\n\nTo revert a commit in Git, use the following command:\n\n```bash\n$ git checkout <commit-hash>^ -- <file-path>\n$ git add <file-path>\n$ git commit -m \"Revert <commit-message>\"\n```\n\nReplace `<commit-hash>` with the hash of the commit you want to revert, and `<file-path>` with the path to the file(s) affected by the commit. Replace `<commit-message>` with a descriptive message for the new commit.",
                    "role": "assistant"
                }
            }],
            "created": 1721849867,
            "model": "mistral",
            "system_fingerprint": "fp_ollama",
            "object": "chat.completion",
            "usage": {"completion_tokens": 147, "prompt_tokens": 114, "total_tokens": 261}
        },
        "id": 306761,
        "model": "mistral",
        "provider": "macbook",
        "refId": "3025b805783943939be5498fb132bf2c",
        "createdDate": "2024-07-24T19:37:29.5088827Z",
        "createdBy": "System",
        "worker": "macbook",
        "requestId": "f6897fb95dfc43e6a208b8006d594037",
        "startedDate": "2024-07-24T19:37:29.5452574Z",
        "completedDate": "2024-07-24T19:37:47.8004247Z",
        "durationMs": 18221,
        "retries": 0
    }))

    localStorage.setItem('chat.history', JSON.stringify([
        { id:1721817329115, title: 'ping',                           tasks:['chat:306754'], model:'mixtral', prompt:'pvq.app' },
        { id:1721849849508, title: 'How to revert a commit in git?', tasks:['chat:306761'], model:'mistral', prompt:'Act as a Linux Terminal' },
    ]))
}

export {mock}