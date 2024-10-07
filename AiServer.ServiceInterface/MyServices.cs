using ServiceStack;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;
using ServiceStack.DataAnnotations;

namespace AiServer.ServiceInterface;

public class MyServices : Service
{
    public object Any(Hello request)
    {
        return new HelloResponse { Result = $"Hello, {request.Name}!" };
    }
}

public class DummyReplyToService : Service
{
    public static List<string> RefIds = new();
    public object Any(DummyReplyTo request)
    {
        if(RefIds.Count > 100)
            RefIds.Clear();
        RefIds.Add(request.RefId);
        return new DummyReplyToResponse { RefId = request.RefId };
    }
    
    public void Any(HasDummyReplyTo request)
    {
        if (RefIds.Contains(request.RefId))
            RefIds.Remove(request.RefId);
        else
        {
            throw HttpError.NotFound("RefId not found.");
        }
    }
}

[Route("/dummyreplyto")]
[ExcludeMetadata(Feature = Feature.All)]
public class DummyReplyTo : IReturn<DummyReplyToResponse>
{
    public string? RefId { get; set; }    
}

public class DummyReplyToResponse
{
    public string? RefId { get; set; }    
}

[ExcludeMetadata(Feature = Feature.All)]
public class HasDummyReplyTo : IReturnVoid
{
    public string? RefId { get; set; }
}

