using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Model;

namespace AiServer.ServiceModel;

[ExcludeMetadata]
public class QueryPrompts : QueryData<Prompt> {}
public class Prompt : IHasId<string>
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
}
