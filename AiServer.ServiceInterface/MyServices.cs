using ServiceStack;
using AiServer.ServiceModel;
using AiServer.ServiceModel.Types;

namespace AiServer.ServiceInterface;

public class MyServices : Service
{
    public object Any(Hello request)
    {
        return new HelloResponse { Result = $"Hello, {request.Name}!" };
    }
}
