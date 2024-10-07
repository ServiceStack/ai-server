using AiServer.Migrations;
using AiServer.ServiceModel;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Text;

namespace AiServer.Tests;

[TestFixture, Explicit, Category(nameof(MigrationTasks))]
public class MigrationTasks
{
    IDbConnectionFactory ResolveDbFactory() => new ConfigureDb().ConfigureAndResolve<IDbConnectionFactory>();
    Migrator CreateMigrator() => new(ResolveDbFactory(), typeof(Migration1001).Assembly);

    [Test]
    public void Run_Migration1000()
    {
        OrmLiteUtils.PrintSql();
        var dbFactory = ResolveDbFactory();
        Migrator.Run(dbFactory, typeof(Migration1001), m => m.Up());
    }

    [Test]
    public void Generate_Api_Providers_Json()
    {
        OrmLiteUtils.PrintSql();
        var dbFactory = ResolveDbFactory();

        using var db = dbFactory.Open();
        var apiProviders = db.Select<AiProvider>();
        apiProviders.ToJson().Print();
        Environment.CurrentDirectory.Print();
    }

    [Test]
    public void Print_loaded_models()
    {
        string[] ollamaUrls =
        [
            "https://macbook.pvq.app",
            "https://amd.pvq.app",
            "https://supermicro.pvq.app",
            "https://dell.pvq.app",
        ];

        var map = new Dictionary<string, List<OllamaModel>>();
        foreach (var url in ollamaUrls)
        {
            var apiTagsUrl = url.CombineWith("/api/tags");
            var json = apiTagsUrl.GetJsonFromUrl();
            var ollamaModels = new List<OllamaModel>();
            map[url] = ollamaModels;
            var obj = (Dictionary<string,object>) JSON.parse(json);
            if (obj.TryGetValue("models", out var oModels) && oModels is List<object> models)
            {
                foreach (var oModel in models.Cast<Dictionary<string,object>>())
                {
                    var dto = new OllamaModel();
                    oModel.PopulateInstance(dto);
                    ollamaModels.Add(dto);
                }
            }
        }

        foreach (var entry in map)
        {
            "\n".Print();
            entry.Key.Print();
            entry.Value.ForEach(x => x.Model.Print());
        }
    }

    [Test]
    public void Generate_ApIProviders()
    {
        PvqApiTests.AiProviders.ToJson().Print();
    }
}
