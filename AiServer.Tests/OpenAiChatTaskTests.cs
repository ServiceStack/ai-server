using System.Diagnostics;
using AiServer.ServiceModel;
using AiServer.Tests.Types;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.Text;

namespace AiServer.Tests;

[Explicit]
public class OpenAiChatTaskTests
{
    string nextId()
    {
        var refId = Guid.NewGuid().ToString("N");
        return refId;
    }

    [Test]
    public async Task Generate_phi3_tasks()
    {
        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "000/000"));
        var questionFiles = testFolder.GetMatchingFiles("???.json");
        await QueueQuestionTasks(questionFiles, model:"phi3");
    }

    [Test]
    public async Task Generate_llama3_tasks()
    {
        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "000/001"));
        var questionFiles = testFolder.GetMatchingFiles("???.json");
        await QueueQuestionTasks(questionFiles, model:"llama3:8b");
    }

    [Test]
    public async Task Generate_llama3_ollama_tasks()
    {
        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "000/002"));
        var questionFiles = testFolder.GetMatchingFiles("???.json");
        await QueueQuestionTasks(questionFiles, model:"llama3:8b", provider:"ollama");
    }

    [Test]
    public async Task Generate_llama3_openrouter_tasks()
    {
        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "000/003"));
        var questionFiles = testFolder.GetMatchingFiles("???.json");
        await QueueQuestionTasks(questionFiles, model:"llama3:8b", provider:"openrouter");
    }

    [Test]
    public async Task Generate_mixtral_openrouter_tasks()
    {
        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "000/004"));
        var questionFiles = testFolder.GetMatchingFiles("???.json");
        await QueueQuestionTasks(questionFiles, model:"mixtral", provider:"openrouter");
    }

    [Test]
    public async Task Generate_llama3_async_and_fetch_results()
    {
        var client = TestUtils.CreateSystemClient();
        var jobRes = await QueueOpenAiChatTask(client, model:"llama3:8b", body:"What is the capital of France?")
            as QueueOpenAiChatResponse;
        
        Assert.That(jobRes, Is.Not.Null);
        Assert.That(jobRes.RefId, Is.Not.Null);
        Assert.That(jobRes.Id, Is.Not.Null);
        
        // Fetch the answer
        var answer = await client.GetAsync(
            new GetOpenAiChatStatus
        {
            RefId = jobRes.RefId
        });
        
        // Wait until complete
        var timeout = DateTime.UtcNow.AddSeconds(60);
        while (answer.JobState != BackgroundJobState.Completed)
        {
            if (DateTime.UtcNow > timeout)
                break;
            await Task.Delay(500);
            answer = await client.GetAsync(
                new GetOpenAiChatStatus
            {
                RefId = jobRes.RefId
            });
        }
        
        answer.PrintDump();

        Assert.That(answer, Is.Not.Null);
        Assert.That(answer.ChatResponse, Is.Not.Null);
        Assert.That(answer.ChatResponse.Choices, Is.Not.Empty);
        Assert.That(answer.ChatResponse.Choices[0].Message, Is.Not.Null);
        Assert.That(answer.ChatResponse.Choices[0].Message.Content, Is.Not.Empty);
    }

    private async Task QueueQuestionTasks(IEnumerable<string> questionFiles, string model, string? provider = null, string? replyTo = null)
    {
        var client = TestUtils.CreateSystemClient();
        foreach (var questionFile in questionFiles)
        {
            var question = questionFile.ReadAllText().FromJson<Post>();
            var body = question.Body ?? throw new ArgumentNullException(nameof(Post.Body));
            // question.PrintDump();
            
            await QueueOpenAiChatTask(client, model:model, body:body, replyTo:replyTo, provider:provider);
        }
    }
    
    private async Task SendQuestionTasks(IEnumerable<string> questionFiles, string model, string? provider = null, string? replyTo = null)
    {
        var client = TestUtils.CreateSystemClient();
        foreach (var questionFile in questionFiles)
        {
            var question = questionFile.ReadAllText().FromJson<Post>();
            var body = question.Body ?? throw new ArgumentNullException(nameof(Post.Body));
            // question.PrintDump();
            
            await SendOpenAiChatTask(client, model:model, body:body, replyTo:replyTo, provider:provider);
        }
    }

    private async Task<object?> QueueOpenAiChatTask(JsonApiClient client, string model, string body, 
        string? replyTo=null, string? provider=null)
    {
        var api = await client.ApiAsync(new QueueOpenAiChatCompletion {
            RefId = nextId(),
            Provider = provider,
            ReplyTo = replyTo,
            Request = new()
            {
                Model = model,
                Messages = [
                    new() { Role = "system", Content = TestUtils.SystemPrompt },
                    new() { Role = "user", Content = body },
                ],
                Temperature = 0.7,
                MaxTokens = 2048,
                Stream = false,
            }
        });
        api.Error.PrintDump();
        api.ThrowIfError();
        return api.Response;
    }
    
    private async Task <object?> SendOpenAiChatTask(JsonApiClient client, string model, string body, 
        string? replyTo=null, string? provider=null)
    {
        var api = await client.ApiAsync(new OpenAiChatCompletion {
            RefId = nextId(),
            Provider = provider,
            Model = model,
            Messages = [
                new() { Role = "system", Content = TestUtils.SystemPrompt },
                new() { Role = "user", Content = body },
            ],
            Temperature = 0.7,
            MaxTokens = 2048,
            Stream = false,
        });
        api.Error.PrintDump();
        api.ThrowIfError();
        return api.Response;
    }

    [Test]
    public async Task Can_execute_sync_answer()
    {
        var model = "llama3:8b";
        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "100/000"));
        var questionFiles = testFolder.GetMatchingFiles("???.json").Take(1).ToList();

        var postId = 100000001;
        var replyTo = TestUtils.PvqBaseUrl.CombineWith("api/CreateAnswerCallback")
            .AddQueryParams(new() {
                ["PostId"] = postId,
                ["UserId"] = TestUtils.ModerUserIds[model]
            });

        await SendQuestionTasks(questionFiles, model:model, replyTo:replyTo);
    }
    
    

    [Test]
    public async Task Can_queue_pvq_answer_to_question()
    {
        var pvqApi = TestUtils.PvqApiClient();
        await pvqApi.SendAsync(new Authenticate
        {
            provider = "credentials",
            UserName = TestUtils.PvqUsername,
            Password = Environment.GetEnvironmentVariable("PVQ_PASSWORD"),
        });

        var model = "mistral-nemo";
        var postId = 100000001;
        var question = await pvqApi.ApiAsync(new GetQuestionBody
        {
            Id = postId,
        });
        var body = question.Response;
        body.Print();
        
        var client = TestUtils.CreatePvqClient();
        var replyTo = pvqApi.BaseUri.CombineWith("api/CreateAnswerCallback")
            .AddQueryParams(new() {
                ["PostId"] = postId,
                ["UserId"] = TestUtils.ModerUserIds[model]
            });
        var response = await QueueOpenAiChatTask(client, model:model, body:body!, replyTo:replyTo);
        response.PrintDump();
    }

    [Test]
    public async Task Can_execute_answers_for_llama3()
    {
        var models = new[] { "llama3:8b" };

        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "100/000"));
        
        var postId = 100000001;
        
        var questionFiles = testFolder.GetMatchingFiles("???.json").ToList();
        foreach (var model in models)
        {
            var replyTo = TestUtils.PvqBaseUrl.CombineWith("api/CreateAnswerCallback")
                .AddQueryParams(new() {
                    ["PostId"] = postId,
                    ["UserId"] = TestUtils.ModerUserIds[model]
                });
            
            await QueueQuestionTasks(questionFiles, model:model, replyTo:replyTo);
        }
    }

    [Test]
    public async Task Can_execute_answers_for_DeepSeekCoderV2()
    {
        var models = new[] { "deepseek-coder-v2:236b" };

        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "100/000"));
        
        var postId = 100000001;
        
        var questionFiles = testFolder.GetMatchingFiles("???.json").ToList();
        foreach (var model in models)
        {
            var replyTo = TestUtils.PvqBaseUrl.CombineWith("api/CreateAnswerCallback")
                .AddQueryParams(new() {
                    ["PostId"] = postId,
                    ["UserId"] = TestUtils.ModerUserIds[model]
                });
            
            await QueueQuestionTasks(questionFiles, model:model, replyTo:replyTo);
        }
    }

    [Test]
    public async Task Can_execute_answers_from_multiple_models()
    {
        var models = TestUtils.ModerUserIds.Keys.ToList();

        var testFolder = new DirectoryInfo(Path.Combine(TestUtils.GetQuestionsDir(), "100/000"));
        
        var postId = 100000001;
        
        var questionFiles = testFolder.GetMatchingFiles("???.json").ToList();
        foreach (var model in models)
        {
            var replyTo = TestUtils.PvqBaseUrl.CombineWith("api/CreateAnswerCallback")
                .AddQueryParams(new() {
                    ["PostId"] = postId,
                    ["UserId"] = TestUtils.ModerUserIds[model]
                });
            
            await QueueQuestionTasks(questionFiles, model:model, replyTo:replyTo);
        }
    }

}
