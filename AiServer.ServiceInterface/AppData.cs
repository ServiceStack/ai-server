using System.Data;
using AiServer.ServiceInterface.Generation;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.OrmLite;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using Microsoft.Extensions.Hosting;
using ServiceStack.Model;

namespace AiServer.ServiceInterface;

public class AppData(ILogger<AppData> log, 
    AiProviderFactory aiFactory,
    MediaProviderFactory mediaProviderFactory, 
    IHostEnvironment env)
{
    public static AppData Instance { get; set; }

    // OpenAI/standard-specific properties
    public PocoDataSource<AiModel> AiModels { get; set; } = new([]);
    public PocoDataSource<AiType> AiTypes { get; set; } = new([]);
    public AiProvider[] AiProviders { get; set; } = [];
    public MediaProvider[] MediaProviders { get; set; } = [];
    public PocoDataSource<MediaType> MediaTypes { get; set; } = new([]);
    public PocoDataSource<TextToSpeechVoice> TextToSpeechVoices { get; set; } = new([]);
    public MediaModel[] MediaModels { get; set; } = [];
    public Dictionary<string, MediaModel> MediaModelsMap { get; set; } = [];
    public PocoDataSource<Prompt> Prompts { get; set; } = new([]);

    // Shared properties
    private CancellationTokenSource? cts;
    public CancellationToken Token => cts?.Token ?? CancellationToken.None;
    public DateTime? StoppedAt { get; private set; }
    public bool IsStopped => StoppedAt != null;

    public AiProvider AssertAiProvider(string name) => AiProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"AI Provider {name} not found");

    public MediaProvider AssertMediaProvider(string name) => MediaProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"Media Provider {name} not found");
    
    public MediaProvider AssertComfyProvider(string name) => ComfyProviders.FirstOrDefault(x => x.Name == name)
        ?? throw new NotSupportedException($"Comfy Provider {name} not found");
    
    public MediaProvider[] ComfyProviders  => MediaProviders
        .Where(x => x.MediaType.Provider == AiServiceProvider.Comfy)
        .ToArray();

    string? ReadTextFile(string path)
    {
        var fullPath  = Path.Combine(env.ContentRootPath, path);
        return File.Exists(fullPath)
            ? File.ReadAllText(fullPath)
            : null;
    }
    
    T[] LoadModels<T>(string name) where T : IHasId<string>
    {
        var models = ReadTextFile($"wwwroot/lib/data/{name}").FromJson<List<T>>();
        var overrideJson = ReadTextFile($"App_Data/overrides/{name}");
        if (overrideJson != null)
        {
            var insertModels = new List<T>();
            var overrideModels = overrideJson.FromJson<List<T>>();
            foreach (var model in overrideModels)
            {
                var index = models.FindIndex(x => x.Id == model.Id);
                if (index >= 0)
                {
                    models[index] = model;
                }
                else
                {
                    insertModels.Add(model);
                }
            }
            models.InsertRange(0, insertModels);
        }
        return models.ToArray();
    }
    
    public void Reload(IDbConnection db)
    {
        Prompts = PocoDataSource.Create(LoadModels<Prompt>("prompts.json")
            .Where(x => !string.IsNullOrEmpty(x.Value)).ToList());
        AiModels = PocoDataSource.Create(LoadModels<AiModel>("ai-models.json"));
        AiTypes = PocoDataSource.Create(LoadModels<AiType>("ai-types.json"));
        MediaTypes = PocoDataSource.Create(LoadModels<MediaType>("media-types.json"));
        TextToSpeechVoices = PocoDataSource.Create(LoadModels<TextToSpeechVoice>("tts-voices.json"));

        ResetAiProviders(db);
        ResetMediaProviders(db);
        
        LoadModelDefaults();
        LogWorkerInfo(AiProviders, "API");
    }

    public void ResetAiProviders(IDbConnection db)
    {
        AiProviders = db.Select<AiProvider>()
            .OrderByDescending(x => x.Priority)
            .ThenBy(x => x.Id)
            .ToArray();
        AiProviders.Each(x => x.AiType = AiTypes.GetAll().FirstOrDefault(t => t.Id == x.AiTypeId)
            ?? throw new NotSupportedException($"Could not found AiType {x.AiTypeId}"));
    }

    public void ResetMediaProviders(IDbConnection db)
    {
        MediaProviders = db.LoadSelect<MediaProvider>()
            .OrderByDescending(x => x.Priority)
            .ThenBy(x => x.Id)
            .ToArray();
        MediaProviders.Each(x => x.MediaType = MediaTypes.GetAll().FirstOrDefault(t => t.Id == x.MediaTypeId)
            ?? throw new NotSupportedException($"Could not found MediaType {x.MediaTypeId}"));
    }

    private void LoadModelDefaults()
    {
        MediaModels = LoadModels<MediaModel>("media-models.json")
            .Where(x => x is { ApiModels.Keys.Count: > 0, ModelType: 
                ModelType.TextToImage or 
                ModelType.TextToSpeech or 
                ModelType.SpeechToText or 
                ModelType.ImageUpscale or 
                ModelType.TextToAudio or 
                ModelType.TextEncoder or 
                ModelType.ImageToImage or 
                ModelType.ImageWithMask or 
                ModelType.ImageToText
            })
            .ToArray();
        MediaModelsMap = MediaModels.ToDictionary(x => x.Id);
    }

    public string? GetMediaApiModel(MediaProvider provider, string modelId)
    {
        if (!MediaModelsMap.TryGetValue(modelId, out var mediaModel))
            throw HttpError.NotFound("Model does not exist: " + modelId.SafeVarName());
        return mediaModel.ApiModels.GetValueOrDefault(provider.MediaType!.Id);
    }
    
    public MediaModel GetMediaModelByApiModel(MediaProvider provider, string apiModel)
    {
        ArgumentNullException.ThrowIfNull(apiModel);
        var providerType = provider?.MediaType?.Id ?? throw new ArgumentNullException(nameof(provider.MediaType));
        foreach (var mediaModel in MediaModelsMap.Values)
        {
            foreach (var entry in mediaModel.ApiModels)
            {
                if (entry.Key == providerType && entry.Value == apiModel)
                    return mediaModel;
            }
        }
        throw HttpError.NotFound($"{apiModel} is not a supported model for {provider.Name} ({provider.MediaType?.Id})");
    }

    public string? GetQualifiedMediaModel(ModelType modelType, string apiModel)
    {
        foreach (var mediaModel in MediaModels
            .Where(x => x.ModelType == modelType))
        {
            foreach (var entry in mediaModel.ApiModels)
            {
                if (entry.Value == apiModel)
                    return mediaModel.Id;
            }
        }
        return null;
    }

    public string? GetDefaultMediaApiModel(MediaProvider provider, AiTaskType taskType)
    {
        ArgumentNullException.ThrowIfNull(provider);
        var supportedTaskModels = MediaModelsMap.Values
            .Where(x => x.ModelType == GetModelTypeByAiTaskType(taskType))
            .Where(x => x.ApiModels.ContainsKey(provider.MediaType!.Id) && 
                provider.Models != null &&
                provider.Models.Contains(x.ApiModels[provider.MediaType!.Id]));
        var defaultSupportedModel = supportedTaskModels.FirstOrDefault()?.Id;
        if(defaultSupportedModel == null)
            throw HttpError.NotFound($"No supported models found for {provider.Name} ({provider.MediaType?.Id})");
        return MediaModelsMap[defaultSupportedModel!].ApiModels[provider.MediaType!.Id];
    }
    
    public List<string> GetSupportedModels(AiTaskType taskType)
    {
        return MediaModelsMap
            .Where(x => x.Value.ModelType == GetModelTypeByAiTaskType(taskType))
            .Select(x => x.Key)
            .ToList();
    }
    
    public bool ProviderHasModelForTask(MediaProvider provider, AiTaskType taskType)
    {
        ArgumentNullException.ThrowIfNull(provider);
        return MediaModelsMap.Values
            .Any(x => x.ModelType == GetModelTypeByAiTaskType(taskType) &&
                x.ApiModels.ContainsKey(provider.MediaType!.Id) &&
                provider.Models != null &&
                provider.Models.Contains(x.ApiModels[provider.MediaType!.Id]));
    }
    
    public bool ModelSupportsTask(string modelId, AiTaskType taskType)
    {
        return MediaModelsMap.TryGetValue(modelId, out var modelSettings) &&
            modelSettings.ModelType == GetModelTypeByAiTaskType(taskType);
    }
    
    private ModelType GetModelTypeByAiTaskType(AiTaskType taskType)
    {
        return taskType switch
        {
            AiTaskType.TextToImage => ModelType.TextToImage,
            AiTaskType.TextToSpeech => ModelType.TextToSpeech,
            AiTaskType.SpeechToText => ModelType.SpeechToText,
            AiTaskType.ImageToImage => ModelType.ImageToImage,
            AiTaskType.ImageUpscale => ModelType.ImageUpscale,
            AiTaskType.ImageWithMask => ModelType.ImageWithMask,
            AiTaskType.ImageToText => ModelType.ImageToText,
            _ => throw new NotSupportedException($"Unsupported task type: {taskType}")
        };
    }

    private void LogWorkerInfo(AiProvider[] apiProviders, string workerType)
    {
        foreach (var worker in apiProviders.Where(x => x.Enabled))
        {
            log.LogInformation(
                """

                [{Type}] [{Name}] is {Enabled}, currently {Online} at concurrency {Concurrency}, accepting models:
                
                    {Models}
                    
                """,
                workerType,
                worker.Name,
                worker.Enabled ? "Enabled" : "Disabled",
                worker.OfflineDate != null ? "Offline" : "Online",
                worker.Concurrency, 
                string.Join("\n    ", worker.Models.Select(x => x.Model)));
        }
    }
    
    public IOpenAiProvider GetOpenAiProvider(AiProvider aiProvider) => 
        aiFactory.GetOpenAiProvider(aiProvider.AiType.Provider);
    
    public IAiProvider GetGenerationProvider(MediaProvider apiProvider) => 
        mediaProviderFactory.GetProvider(apiProvider.MediaType.Provider);
    
    /// <summary>
    /// For ollama models with 'latest' tag, returns:
    ///     - model:tag if tag exists
    ///     - model:${latest} when tag is 'latest' or unspecified
    /// For models without tags, returns ${model} when exists 
    /// </summary>
    public string? GetQualifiedModel(string model)
    {
        if (model.IndexOf(':') == -1)
        {
            var aiModel = AiModels.GetAll().FirstOrDefault(x => x.Id == model);
            if (aiModel == null)
                return null;
            return aiModel.Id + (aiModel.Latest != null ? ":" + aiModel.Latest : "");
        }
        else
        {
            var modelGroup = model.LeftPart(':');
            var modelTag = model.RightPart(':');
            var aiModel = AiModels.GetAll().FirstOrDefault(x => x.Id == modelGroup);
            if (aiModel == null)
                return null;
            if (modelTag == "latest")
                return aiModel.Id + (aiModel.Latest != null ? ":" + aiModel.Latest : "");
            if (!aiModel.Tags.Contains(modelTag))
                return null;
            return aiModel.Id + ":" + modelTag;
        }
    }
}
