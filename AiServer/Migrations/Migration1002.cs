using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1002 : MigrationBase
{
    public class ComfyGenerationTask : Migration1000.TaskBase
    {
        public object Request { get; set; }
        public string WorkflowTemplate { get; set; }
        public ComfyWorkflowResponse Response { get; set; }
    }
    
    public class ComfyWorkflowResponse { }
    
    public override void Up()
    {
        Db.CreateTable<ComfyGenerationTask>();
    }

    public override void Down()
    {
        Db.DropTable<ComfyGenerationTask>();
    }
}