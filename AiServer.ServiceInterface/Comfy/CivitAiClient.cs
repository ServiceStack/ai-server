using System.Net.Http.Headers;
using System.Runtime.Serialization;
using ServiceStack;

namespace AiServer.ServiceInterface.Comfy;

using System.Net.Http.Json;
using System.Text.Json;
using System.Web;


public class CivitAiClient
{
    private readonly HttpClient httpClient;
    private readonly string apiKey;
    private const string BaseUrl = "https://civitai.com/api/v1";

    public CivitAiClient(IHttpClientFactory httpClientFactory, string apiKey)
    {
        httpClient = httpClientFactory.CreateClient("CivitAiClient");
        this.apiKey = apiKey;
            
        if (!string.IsNullOrEmpty(this.apiKey))
        {
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", this.apiKey);
        }
    }

    public async Task<CivitModelsResponse> ListModelsAsync(CivitListModelsRequest request)
    {
        var query = HttpUtility.ParseQueryString(string.Empty);
        if (request.Limit.HasValue) query["limit"] = request.Limit.Value.ToString();
        if (request.Page.HasValue) query["page"] = request.Page.Value.ToString();
        if (!string.IsNullOrEmpty(request.Query)) query["query"] = request.Query;
        if (!string.IsNullOrEmpty(request.Tag)) query["tag"] = request.Tag;
        if (!string.IsNullOrEmpty(request.Username)) query["username"] = request.Username;
        if (request.Types != null && request.Types.Any()) query["types"] = string.Join(",", request.Types);
        if (!string.IsNullOrEmpty(request.Sort)) query["sort"] = request.Sort;
        if (!string.IsNullOrEmpty(request.Period)) query["period"] = request.Period;
        if (request.Rating.HasValue) query["rating"] = request.Rating.Value.ToString();
        if (request.Favorites.HasValue) query["favorites"] = request.Favorites.Value.ToString();
        if (request.Hidden.HasValue) query["hidden"] = request.Hidden.Value.ToString();
        if (request.PrimaryFileOnly.HasValue) query["primaryFileOnly"] = request.PrimaryFileOnly.Value.ToString();

        var response = await httpClient.GetAsync($"{BaseUrl}/models?{query}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<CivitModelsResponse>();
    }

    public async Task<CivitModelDetails> GetModelDetailsAsync(int modelId)
    {
        var response = await httpClient.GetAsync($"{BaseUrl}/models/{modelId}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<CivitModelDetails>();
    }

    public async Task<CivitModelVersionDetails> GetModelVersionDetailsAsync(int modelVersionId)
    {
        var response = await httpClient.GetAsync($"{BaseUrl}/model-versions/{modelVersionId}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<CivitModelVersionDetails>();
    }

    public async Task<CivitModelVersionDetails> GetModelVersionByHashAsync(string hash)
    {
        var response = await httpClient.GetAsync($"{BaseUrl}/model-versions/by-hash/{hash}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<CivitModelVersionDetails>();
    }
}

public class CivitListModelsRequest
{
    public int? Limit { get; set; }
    public int? Page { get; set; }
    public string Query { get; set; }
    public string Tag { get; set; }
    public string Username { get; set; }
    public List<string> Types { get; set; }
    public string? Sort { get; set; }
    public string? Period { get; set; }
    public int? Rating { get; set; }
    public bool? Favorites { get; set; }
    public bool? Hidden { get; set; }
    public bool? PrimaryFileOnly { get; set; }
}

[DataContract]
public enum CivitSortOption
{
    [EnumMember(Value = "Highest Rated")]
    HighestRated,
    [EnumMember(Value = "Most Downloaded")]
    MostDownloaded,
    [EnumMember(Value = "Newest")]
    Newest
}

[DataContract]
public enum CivitPeriodOption
{
    [EnumMember(Value = "All Time")]
    AllTime,
    [EnumMember(Value = "Year")]
    Year,
    [EnumMember(Value = "Month")]
    Month,
    [EnumMember(Value = "Week")]
    Week,
    [EnumMember(Value = "Day")]
    Day
}

public class CivitModelsResponse
{
    public List<CivitModelSummary> Items { get; set; }
    public CivitMetadata Metadata { get; set; }
}

public class CivitMetadata
{
    public int TotalItems { get; set; }
    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
    public string NextPage { get; set; }
    public string PrevPage { get; set; }
}

public class CivitModelSummary
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Type { get; set; }
    public bool Nsfw { get; set; }
    public List<string> Tags { get; set; }
    public CivitCreator Creator { get; set; }
    public CivitStats Stats { get; set; }
    public List<CivitModelVersion> ModelVersions { get; set; }
}

public class CivitModelDetails : CivitModelSummary { }

public class CivitCreator
{
    public string Username { get; set; }
    public string Image { get; set; }
}

public class CivitStats
{
    public int DownloadCount { get; set; }
    public int FavoriteCount { get; set; }
    public int CommentCount { get; set; }
    public int RatingCount { get; set; }
    public double Rating { get; set; }
}

public class CivitModelVersionDetails : CivitModelVersion
{
    public int ModelId { get; set; }
    public string Description { get; set; }
    public string BaseModel { get; set; }
    public CivitStats Stats { get; set; }
}

public class CivitModelVersion
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public CivitModel Model { get; set; }
    public int ModelId { get; set; }
    public DateTime CreatedAt { get; set; }
    public string DownloadUrl { get; set; }
    public List<string> TrainedWords { get; set; }
    public List<CivitModelFile> Files { get; set; }
    public CivitStats Stats { get; set; }
    public List<CivitImage> Images { get; set; }
}

public class CivitModel
{
    public string Name { get; set; }
    public string Type { get; set; }
    public bool Nsfw { get; set; }
    public bool Poi { get; set; }
    public string Mode { get; set; }
}

public class CivitModelFile
{
    public string Name { get; set; }
    public double SizeKb { get; set; }
    public string Type { get; set; }
    public CivitFileMetadata Metadata { get; set; }
    public string PickleScanResult { get; set; }
    public string VirusScanResult { get; set; }
    public DateTime? ScannedAt { get; set; }
    public Dictionary<string, string> Hashes { get; set; }
    public bool Primary { get; set; }
    public string DownloadUrl { get; set; }
}

public class CivitFileMetadata
{
    public string Fp { get; set; }
    public string Size { get; set; }
    public string Format { get; set; }
}

public class CivitImage
{
    public string Url { get; set; }
    public string Nsfw { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public string Hash { get; set; }
    public object Meta { get; set; }
}
