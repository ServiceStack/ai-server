using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using Microsoft.Extensions.Logging.Abstractions;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class OpenAiProviderTests
{
    private readonly AiProviderFactory factory = new(
        new OpenAiProvider(new NullLogger<OpenAiProvider>()),
        new OllamaAiProvider(new NullLogger<OllamaAiProvider>()),
        new GoogleAiProvider(new NullLogger<GoogleAiProvider>()),
        new AnthropicAiProvider(new NullLogger<AnthropicAiProvider>()),
        new CustomOpenAiProvider(new NullLogger<CustomOpenAiProvider>());

    [Test]
    public async Task Can_Send_Ollama_Phi3_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.MacbookAiProvider, new OpenAiChat
        {
            Model = "phi3",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Ollama_Gemma2_27B_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.SupermicroAiProvider, new OpenAiChat
        {
            Model = "gemma2:27b",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Ollama_Qwen2_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.OpenRouterProvider, new OpenAiChat
        {
            Model = "qwen2:72b",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();

        var isOnline = await openAi.IsOnlineAsync(TestUtils.OpenRouterProvider);
        Assert.IsTrue(isOnline);
    }

    [Test]
    public async Task Can_Send_Ollama_Sonnet3_5_Request()
    {
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.OpenRouterProvider, new OpenAiChat
        {
            Model = "anthropic/claude-3.5-sonnet",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Google_GeminiPro_Request()
    {
        var openAi = factory.GetOpenAiProvider(AiProviderType.GoogleAiProvider);
        var response = await openAi.ChatAsync(TestUtils.GoogleAiProvider, new OpenAiChat
        {
            Model = "gemini-pro",
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "What is the capital of France?",
                }
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_Send_Google_GeminiPro_PVQ_Request()
    {
        var openAi = factory.GetOpenAiProvider(AiProviderType.GoogleAiProvider);
        var response = await openAi.ChatAsync(TestUtils.GoogleAiProvider, new OpenAiChat
        {
            Model = "gemini-pro",
            Messages =
            [
                new() {
                    Role = "system",
                    Content = TestUtils.SystemPrompt,
                },
                new() {
                    Role = "user",
                    Content = "What is the capital of France?",
                },
            ],
            MaxTokens = 100,
        });
        
        response.PrintDump();

        var isOnline = await openAi.IsOnlineAsync(TestUtils.GoogleAiProvider);
        Assert.IsTrue(isOnline);
    }

    [Test]
    public async Task Can_Send_Anthropic_Haiku_Request()
    {
        var openAi = factory.GetOpenAiProvider(AiProviderType.AnthropicAiProvider);
        var response = await openAi.ChatAsync(TestUtils.AnthropicProvider, new OpenAiChat
        {
            Model = "claude-3-haiku",
            Messages =
            [
                new() {
                    Role = "system",
                    Content = TestUtils.SystemPrompt,
                },
                new() {
                    Role = "user",
                    Content = "What is the capital of France?",
                },
            ],
            MaxTokens = 100,
        });
        response.PrintDump();
        
        var isOnline = await openAi.IsOnlineAsync(TestUtils.AnthropicProvider);
        Assert.IsTrue(isOnline);
    }

    [Test]
    public async Task Can_execute_codestral_task()
    {
        var model = "codestral";

        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.MistralProvider, new OpenAiChat
        {
            Model = model,
            Messages =
            [
                new()
                {
                    Role = "user",
                    Content = "Write a fibonacci program in C#",
                }
            ],
            TopP = 0.7,
            MaxTokens = 1024,
        });
        
        response.PrintDump();
    }

    [Test]
    public async Task Can_execute_groq_mixtral_task()
    {
        var json = """
        {
         "refId": "296ec581ef7e4acdb75ea9ae2ca43bb9",
         "replyTo": "https://pvq.app/api/RankAnswerCallback?PostId=16355670&UserId=34a471f5-e882-4d4a-8cc4-902072a5e205&Grader=mixtral",
         "tag": "pvq",
         "request": {
           "messages": [
             {
               "content": "I want you to act as a tech reviewer that votes on the quality and relevance of answers to a given question. \nI will give you the user's question and the answer that you should review and respond with a score out of 10.\nBefore giving a score, give a critique of the answer based on quality and relevance to the user's question. ",
               "role": "system"
             },
             {
               "content": "Below I have a user question and an answer to the user question. I want you to give a score out of 10 based on the quality in relation to the original user question. \n\n## Original User Question\n\nTitle: How to populate a treeview from a list of objects\nBody:\nI'm having a problem populating my treeview from my list of objects. I've been looking for solutions on google, I found some topic close to my problem, but none of them solved it. \r\n\r\nI have a List<Object> with properties for each object : Name and Group.\r\n\r\nI would like to populate my treeview like below :\r\n\r\n    +---Group 1\r\n    |   |\r\n    |   +--------object.Name <-- \r\n    |   +--------object.Name <-- all objects with object.Group = Group 1\r\n    |   +--------object.Name <--\r\n    |\r\n    +---Group 2\r\n    |   |\r\n    |   +--------object.Name <-- \r\n    |   +--------object.Name <-- all objects with object.Group = Group 2\r\n    |   +--------object.Name <--\r\n    |\r\n\r\nand so on.\nTags: c#, winforms, list, object, treeview\n---\n\nCritique the below answer to justify your score, providing a brief explanation before returning the simple JSON object showing your reasoning and score.\n\nThink about the answer given in relation to the original user question. Use the tags to help you understand the context of the question.\n\n## Answer Attempt\n\n\nHere is a solution that should work for you:\n```csharp\nprivate void PopulateTreeView(List<Object> objects)\n{\n    treeView1.Nodes.Clear();\n    \n    foreach (var group in objects.GroupBy(o => o.Group))\n    {\n        var node = new TreeNode(group.Key);\n        \n        foreach (var object in group)\n        {\n            node.Nodes.Add(new TreeNode(object.Name));\n        }\n        \n        treeView1.Nodes.Add(node);\n    }\n}\n```\nThis code uses the `GroupBy` method to group the objects by their `Group` property, and then iterates over each group to create a new `TreeNode` for that group and add its children nodes. Finally, it adds all the nodes to the `treeView1` control.\n\nYou can call this method with your list of objects as an argument, like this:\n```csharp\nPopulateTreeView(myListOfObjects);\n```\nThis should populate your tree view with the desired structure.\n---\n\nNow review and score the answer above out of 10.\n\nConcisely articulate what a good answer needs to contain and how the answer provided does or does not meet those criteria.\n\n- If the answer has mistakes or does not address all the question details, score it between 0-2. \n- If the answer is correct, but could be improved, score it between 3-6. \n- If the answer is correct and provides a good explanation, score it between 7-9.\n- If the answer is perfect and provides a clear and concise explanation, score it 10. \n\nBecause these are coding questions, mistakes in the code are critical and should be scored lower. Look closely at the syntax and logic of the code for any mistakes. Missing mistakes in reviews leads to a failed review, and many answers are not correct.\n\nYou MUST provide a JSON object with the following schema:\n\n## Example JSON Response\n\n```json\n{\n    \"reason\": \"Your reason goes here. Below score is only an example. Score should reflect the review of the answer.\",\n    \"score\": 1\n}\n```\n\nUse code fences, aka triple backticks, to encapsulate your JSON object.",
               "role": "user"
             }
           ],
           "model": "mixtral",
           "max_tokens": 1024,
           "stream": false,
           "temperature": 0.1,
           "top_p": 0
         }
        }
        """;
        var create = json.FromJson<QueueOpenAiChatCompletion>();
        create.Request.Model = "mixtral:8x7b";
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.GroqProvider, create.Request);
        response.PrintDump();
    }

    [Test]
    public async Task Can_execute_openrouter_free_phi3_task()
    {
        var json = """
        {
         "replyTo": "https://pvq.app/api/CreateAnswerCallback?PostId=30063196&UserId=1ce13ba2-5022-4ef0-93bb-b1daf43624f9",
         "tag": "pvq",
         "request": {
           "messages": [
             {
               "content": "You are an IT expert helping a user with a technical issue.\nI will provide you with all the information needed about my technical problems, and your role is to solve my problem. \nYou should use your computer science, network infrastructure, and IT security knowledge to solve my problem\nusing data from StackOverflow, Hacker News, and GitHub of content like issues submitted, closed issues, \nnumber of stars on a repository, and overall StackOverflow activity.\nUsing intelligent, simple and understandable language for people of all levels in your answers will be helpful. \nIt is helpful to explain your solutions step by step and with bullet points. \nTry to avoid too many technical details, but use them when necessary. \nI want you to reply with the solution, not write any explanations.",
               "role": "system"
             },
             {
               "content": "Title: GZipStream complains magic number in header is not correct\n\nTags: c#, .net, gzip, gzipstream\n\nI'm attempting to use National Weather Service (U.S.) data, but something has changed recently and the GZip file no longer opens.\r\n\r\n.NET 4.5 complains that...\r\n\r\n```txt\r\nMessage=The magic number in GZip header is not correct. Make sure you are passing in a GZip stream.\r\nSource=System\r\nStackTrace:\r\n   at System.IO.Compression.GZipDecoder.ReadHeader(InputBuffer input)\r\n   at System.IO.Compression.Inflater.Decode()\r\n   at System.IO.Compression.Inflater.Inflate(Byte[] bytes, Int32 offset, Int32 length)\r\n   at System.IO.Compression.DeflateStream.Read(Byte[] array, Int32 offset, Int32 count)\r\n```\r\n\r\nI don't understand what has changed, but this is becoming a real show-stopper. Can anyone with GZip format experience tell me what has changed to make this stop working?\r\n\r\nSample code\r\n\r\n```csharp\r\nconst string url = \"http://www.srh.noaa.gov/ridge2/Precip/qpehourlyshape/2015/201505/20150505/nws_precip_2015050505.tar.gz\";\r\nstring appPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);\r\nstring downloadPath = Path.Combine(appPath, Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), \"nws_precip_2015050505.tar.gz\");\r\nusing (var wc = new WebClient())\r\n{\r\n    wc.DownloadFile(url, downloadPath);\r\n}\r\n\r\nstring extractDirPath = Path.Combine(appPath, \"Extracted\");\r\nif (!Directory.Exists(extractDirPath))\r\n{\r\n    Directory.CreateDirectory(extractDirPath);\r\n}\r\nstring extractFilePath = Path.Combine(extractDirPath, \"nws_precip_2015050505.tar\");\r\n\r\nusing (var fsIn = new FileStream(downloadPath, FileMode.Open, FileAccess.Read))\r\nusing (var fsOut = new FileStream(extractFilePath, FileMode.Create, FileAccess.Write))\r\nusing (var gz = new GZipStream(fsIn, CompressionMode.Decompress, true))\r\n{\r\n    gz.CopyTo(fsOut);\r\n}\r\n```",
               "role": "user"
             }
           ],
           "model": "phi3",
           "max_tokens": 2048,
           "temperature": 0.7,
           "top_p": 0
         }
        }
        """;
        var create = json.FromJson<QueueOpenAiChatCompletion>();
        create.Request.Model = "phi3:3.8b";
        var openAi = factory.GetOpenAiProvider();
        var response = await openAi.ChatAsync(TestUtils.OpenRouterFreeProvider, create.Request);
        response.PrintDump();
    }

    [Test]
    public void List_Google_Gemini_Models()
    {
        // API Docs: https://ai.google.dev/api/rest/v1beta/models/list
        var url = "https://generativelanguage.googleapis.com/v1beta/models"
            .AddQueryParam("key", TestUtils.GoogleAiProvider.ApiKey);

        var json = url.GetJsonFromUrl();
        var obj = JSON.parse(json);
        json.Print();
    }

    [Test]
    public async Task Can_detect_GoogleAiProvider_IsOnline()
    {
        var openAi = factory.GetOpenAiProvider(AiProviderType.GoogleAiProvider);
        var isOnline = await openAi.IsOnlineAsync(TestUtils.GoogleAiProvider);
        Assert.That(isOnline);
    }

    [Test]
    public async Task Can_detect_OpenRouterProvider_IsOnline()
    {
        var openAi = factory.GetOpenAiProvider();
        var isOnline = await openAi.IsOnlineAsync(TestUtils.OpenRouterProvider);
        Assert.That(isOnline);
    }

    [Test]
    public async Task Can_detect_Groq_IsOnline()
    {
        var openAi = factory.GetOpenAiProvider();
        var isOnline = await openAi.IsOnlineAsync(TestUtils.GroqProvider);
        Assert.That(isOnline);
    }
}
