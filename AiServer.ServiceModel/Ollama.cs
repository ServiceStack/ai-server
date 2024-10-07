using System.Runtime.Serialization;
using ServiceStack;

namespace AiServer.ServiceModel;

public class GetOllamaModels : IGet, IReturn<GetOllamaModelsResponse> 
{
    [ValidateNotEmpty]
    public string ApiBaseUrl { get; set; }
}
public class GetOllamaModelsResponse
{
    public List<OllamaModel> Results { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}

[DataContract]
public class OllamaModel
{
    [DataMember(Name = "name")]
    public string Name { get; set; }
    [DataMember(Name = "model")]
    public string Model { get; set; }
    [DataMember(Name = "modified_at")]
    public DateTime ModifiedAt { get; set; }
    [DataMember(Name = "size")]
    public long Size { get; set; }
    [DataMember(Name = "digest")]
    public string Digest { get; set; }
    [DataMember(Name = "details")]
    public OllamaModelDetails Details { get; set; }
}

[DataContract]
public class OllamaModelDetails
{
    [DataMember(Name = "parent_model")]
    public string ParentModel { get; set; }
    [DataMember(Name = "format")]
    public string Format { get; set; }
    [DataMember(Name = "family")]
    public string Family { get; set; }
    [DataMember(Name = "families")]
    public List<string> Families { get; set; }
    [DataMember(Name = "parameter_size")]
    public string ParameterSize { get; set; }
    [DataMember(Name = "quantization_level")]
    public string QuantizationLevel { get; set; }
}
