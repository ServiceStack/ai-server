using AiServer.Migrations;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace AiServer.Tests;

[TestFixture, Explicit, Category(nameof(MigrationTasks))]
public class MigrationTasks
{
    IDbConnectionFactory ResolveDbFactory() => new ConfigureDb().ConfigureAndResolve<IDbConnectionFactory>();
    Migrator CreateMigrator() => new(ResolveDbFactory(), typeof(Migration1000).Assembly);

    [Test]
    public void Run_Migration1000()
    {
        OrmLiteUtils.PrintSql();
        var dbFactory = ResolveDbFactory();
        Migrator.Run(dbFactory, typeof(Migration1000), m => m.Up());
    }
}
