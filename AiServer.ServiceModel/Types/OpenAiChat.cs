namespace AiServer.ServiceModel.Types;

public class PeriodicTasks
{
    public PeriodicFrequency PeriodicFrequency { get; set; }
}
public enum PeriodicFrequency
{
    Minute,
    Hourly,
    Daily,
    Monthly,
}

