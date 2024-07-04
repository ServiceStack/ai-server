using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1002 : MigrationBase
{
    public class ComfyGenerationTask : Migration1000.TaskBase
    {
        public ComfyGenerationRequest Request { get; set; }
        public ComfyGenerationResponse? Response { get; set; }
    }
    
    public class ComfyGenerationRequest { }
    public class ComfyGenerationResponse { }
    
    public override void Up()
    {
        Db.CreateTable<ComfyGenerationTask>();
    }

    public override void Down()
    {
        Db.DropTable<ComfyGenerationTask>();
    }
}