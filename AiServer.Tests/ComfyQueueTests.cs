using AiServer.ServiceInterface;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using AiServer.ServiceModel.Types;

namespace AiServer.Tests;

[Explicit]
public class ComfyApiProviderTests
{
    private static bool useLocal = true;
    
    private static List<CreateComfyApiProvider> ComfyApiProviders = new()
    {
        new CreateComfyApiProvider
        {
            Name = "comfy-dell.pvq.app",
            ApiBaseUrl = useLocal ? "http://localhost:7860/api" : "https://comfy-dell.pvq.app/api",
            Concurrency = 1,
            HeartbeatUrl = "/",
            TaskWorkflows = new Dictionary<ComfyTaskType, string>
            {
                { ComfyTaskType.TextToImage, "text_to_image.json" },
                { ComfyTaskType.ImageToImage, "image_to_image.json" },
                { ComfyTaskType.ImageToImageUpscale, "image_to_image_upscale.json" },
                { ComfyTaskType.ImageToImageWithMask, "image_to_image_with_mask.json" },
                { ComfyTaskType.TextToAudio, "text_to_audio.json" },
                { ComfyTaskType.TextToSpeech, "text_to_speech.json" },
                { ComfyTaskType.SpeechToText, "speech_to_text.json" }
            },
            Enabled = true,
            Priority = 1,
            ApiKey = "testtest1234",
            Models = new List<ComfyApiProviderModel>()
        }
    };
    
    private static List<CreateComfyApiModel> ComfyApiModels = new()
    {
        new CreateComfyApiModel
        {
            Name = "SDXL Lightning 4-Step",
            Filename = "sdxl_lightning_4step.safetensors",
            DownloadUrl = "https://huggingface.co/ByteDance/SDXL-Lightning/resolve/main/sdxl_lightning_4step.safetensors?download=true",
            Url = "https://huggingface.co/ByteDance/SDXL-Lightning",
            ModelSettings = new ComfyApiModelSettings
            {
                Width = 1024,
                Height = 1024,
                Sampler = ComfySampler.euler,
                Scheduler = "sgm_uniform",
                Steps = 4,
                CfgScale = 1.0
            }
        }
    };

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        Environment.SetEnvironmentVariable("AUTH_SECRET","p@55wOrd");
    }
    
    
    private async Task DeleteComfyApiModels(JsonApiClient client)
    {
        foreach (var createComfyApiModel in ComfyApiModels)
        {
            var apiQuery = await client.ApiAsync(new QueryComfyApiModels
            {
                Name = createComfyApiModel.Name,
            });
            apiQuery.ThrowIfError();
            var existingModel = apiQuery.Response!.Results.FirstOrDefault();
            if (existingModel != null)
            {
                var api = await client.ApiAsync(new DeleteComfyApiModel
                {
                    Id = existingModel.Id,
                });
                api.ThrowIfError();
            }
        }
    }

    private async Task DeleteComfyApiProviders(JsonApiClient client)
    {
        foreach (var createComfyApiProvider in ComfyApiProviders)
        {
            var apiQuery = await client.ApiAsync(new QueryComfyApiProviders
            {
                Name = createComfyApiProvider.Name,
            });
            apiQuery.ThrowIfError();
            var existingProvider = apiQuery.Response!.Results.FirstOrDefault();
            if (existingProvider != null)
            {
                var api = await client.ApiAsync(new DeleteComfyApiProvider
                {
                    Id = existingProvider.Id,
                });
                api.ThrowIfError();
            }
        }
    }

    private static async Task CreateComfyApiProviders(JsonApiClient client)
    {
        foreach (var createComfyApiProvider in ComfyApiProviders)
        {
            var apiQuery = await client.ApiAsync(new QueryComfyApiProviders
            {
                Name = createComfyApiProvider.Name,
            });
            var existingProvider = apiQuery.Response?.Results?.FirstOrDefault();
            if (existingProvider != null)
            {
                // Already exists, ignore
                continue;
            }
            var api = await client.ApiAsync(createComfyApiProvider);
            api.ThrowIfError();
        }
    }

    private static async Task CreateComfyApiModels(JsonApiClient client)
    {
        
        foreach (var createComfyApiModel in ComfyApiModels)
        {
            var apiQuery = await client.ApiAsync(new QueryComfyApiModels
            {
                Name = createComfyApiModel.Name,
            });
            var existingModel = apiQuery.Response?.Results?.FirstOrDefault();
            if (existingModel != null)
            {
                // Already exists, ignore
                continue;
            }
            var api = await client.ApiAsync(createComfyApiModel);
            api.ThrowIfError();
        }
    }


    [Test]
    public async Task Create_Local_ComfyApiProviders_and_Models()
    {
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        await CreateComfyApiModels(client);
        // Update provider to use model
    }
    
    [Test]
    public async Task Assign_ComfyApiModelToProvider()
    {
        var client = TestUtils.CreateAuthSecretClient();
        // Create provider
        await CreateComfyApiProviders(client);
        // Query provider
        var resProvider = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = ComfyApiProviders[0].Name,
        });
        resProvider.ThrowIfError();
        var existingProvider = resProvider.Response!.Results.FirstOrDefault();
        if (existingProvider == null)
            throw new Exception("ComfyApiProvider not found");
        
        // Create model
        await CreateComfyApiModels(client);
        // Query model
        var resModel = await client.ApiAsync(new QueryComfyApiModels
        {
            Name = ComfyApiModels[0].Name,
        });
        resModel.ThrowIfError();
        var model = resModel.Response!.Results.FirstOrDefault();
        if (model == null)
            throw new Exception("ComfyApiModel not found");

        var api = await client.ApiAsync(new AddComfyProviderModel
        {
            ComfyApiProviderId = existingProvider.Id,
            ComfyApiModelId = model.Id,
        });
        
        api.ThrowIfError();
    }

    [Test]
    public async Task Update_ComfyApiProvider()
    {
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        var providerToUpdate = ComfyApiProviders[0]; // Assuming we want to update the first provider

        var apiQuery = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = providerToUpdate.Name,
        });
        apiQuery.ThrowIfError();
        var existingProvider = apiQuery.Response!.Results.FirstOrDefault();
        if (existingProvider == null)
            throw new Exception("ComfyApiProvider not found");

        var api = await client.ApiAsync(new UpdateComfyApiProvider
        {
            Id = existingProvider.Id,
            Enabled = providerToUpdate.Enabled,
            Priority = providerToUpdate.Priority,
            Concurrency = providerToUpdate.Concurrency,
            ApiBaseUrl = providerToUpdate.ApiBaseUrl,
            HeartbeatUrl = providerToUpdate.HeartbeatUrl,
            ApiKey = providerToUpdate.ApiKey,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task ChangeComfyApiProviderStatus_Offline()
    {
        var client = TestUtils.CreateAuthSecretClient();
        // Create
        await CreateComfyApiProviders(client);
        var api = await client.ApiAsync(new ChangeComfyApiProviderStatus
        {
            Provider = ComfyApiProviders[0].Name,
            Online = false,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task ChangeComfyApiProviderStatus_Online()
    {
        var client = TestUtils.CreateAuthSecretClient();
        // Create
        await CreateComfyApiProviders(client);
        var api = await client.ApiAsync(new ChangeComfyApiProviderStatus
        {
            Provider = ComfyApiProviders[0].Name,
            Online = true,
        });
        api.ThrowIfError();
    }

    [Test]
    public async Task EnsureProviderIsCreatedAndOnline()
    {
        // Create new provider
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        await CreateComfyApiModels(client);
        await Assign_ComfyApiModelToProvider();
        // Start workers
        var startWorkers = await client.ApiAsync(new StartWorkers());
        startWorkers.ThrowIfError();
        await ChangeComfyApiProviderStatus_Online();
    }

    [Test]
    public async Task CanSetupNewProviderWithNewModelAndRunWorkflow()
    {
        // Create new provider
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        await CreateComfyApiModels(client);
        await Assign_ComfyApiModelToProvider();
        // Start workers
        var startWorkers = await client.ApiAsync(new StartWorkers());
        startWorkers.ThrowIfError();
        await ChangeComfyApiProviderStatus_Online();
        
        // Validate provider is online
        var api = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = ComfyApiProviders[0].Name,
        });
        api.ThrowIfError();
        var provider = api.Response!.Results.FirstOrDefault();
        Assert.That(provider, Is.Not.Null);
        Assert.That(provider!.OfflineDate, Is.Null);
        

        
        // Run workflow via CreateComfyGeneration
        var createComfyGeneration = new CreateComfyGeneration
        {
            Request = new ComfyWorkflowRequest()
            {
                Model = ComfyApiModels[0].Name,
                TaskType = ComfyTaskType.TextToImage,
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.euler_ancestral,
                BatchSize = 1,
                PositivePrompt = "Ocean sunset",
            }
        };

        for (int i = 0; i < 5; i++)
        {
            createComfyGeneration.Request.PositivePrompt = $"Ocean sunset {i}";
            var createResponse = await client.ApiAsync(createComfyGeneration);
            createResponse.ThrowIfError();    
        }
    }

    [Test]
    public async Task RunTextToImageViaQueueAndDownloadResult()
    {
        // Create new provider
        var client = TestUtils.CreateAuthSecretClient();
        await CreateComfyApiProviders(client);
        await CreateComfyApiModels(client);
        await Assign_ComfyApiModelToProvider();
        // Start workers
        var startWorkers = await client.ApiAsync(new StartWorkers());
        startWorkers.ThrowIfError();
        await ChangeComfyApiProviderStatus_Online();
        
        // Validate provider is online
        var api = await client.ApiAsync(new QueryComfyApiProviders
        {
            Name = ComfyApiProviders[0].Name,
        });
        api.ThrowIfError();
        var provider = api.Response!.Results.FirstOrDefault();
        Assert.That(provider, Is.Not.Null);
        Assert.That(provider!.OfflineDate, Is.Null);
        

        
        // Run workflow via CreateComfyGeneration
        var createComfyGeneration = new CreateComfyGeneration
        {
            Request = new ComfyWorkflowRequest()
            {
                Model = ComfyApiModels[0].Name,
                TaskType = ComfyTaskType.TextToImage,
                Height = 1024,
                Width = 1024,
                Sampler = ComfySampler.euler_ancestral,
                BatchSize = 1,
                PositivePrompt = "Ocean sunset",
            }
        };

        var createResponse = await client.ApiAsync(createComfyGeneration);
        createResponse.ThrowIfError();
        
        Assert.That(createResponse.Response, Is.Not.Null);
        
        // Query for the result using 'WaitFor'
        var query = new WaitForComfyGeneration
        {
            RefId = createResponse.Response.RefId
        };
        var queryResponse = await client.ApiAsync(query);
        queryResponse.ThrowIfError();
        
        Assert.That(queryResponse.Response, Is.Not.Null);
        Assert.That(queryResponse.Response.Outputs, Is.Not.Null);
        Assert.That(queryResponse.Response.Outputs.Count, Is.GreaterThan(0));
        
        var files = queryResponse.Response.Outputs;

        // Create a new HttpClient that ignores Tls issues to make local testing easier
        var httpClient = new HttpClient(new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
        });
        foreach (var file in files)
        {
            Console.WriteLine("Downloading: " + file.Url);
            var download = await httpClient.GetStreamAsync($"{file.Url}");
            // Save to disk
            // Ensure downloads directory exists
            if(!Directory.Exists("downloads"))
                Directory.CreateDirectory("downloads");
            var filePath = Path.Combine("downloads", file.FileName);
            await download.WriteToAsync(File.OpenWrite(filePath));
            Assert.That(File.Exists(filePath), Is.True);
        }
    }
}