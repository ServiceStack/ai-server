using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace AiServer.Migrations;

public class Migration1000 : MigrationBase
{
    public class ChatSummary
    {
        /// <summary>
        /// Same as BackgroundJob.Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// User specified or System Generated BackgroundJob.RefId
        /// </summary>
        [Index(Unique = true)] public string RefId { get; set; }
        
        /// <summary>
        /// The model to use for the Task
        /// </summary>
        public string Model { get; set; }

        /// <summary>
        /// The specific provider used to complete the Task
        /// </summary>
        public string Provider { get; set; }

        /// <summary>
        /// Optional Tag to group related Tasks
        /// </summary>
        public string? Tag { get; set; }
        
        /// <summary>
        /// Number of tokens in the prompt.
        /// </summary>
        public int PromptTokens { get; set; }
        
        /// <summary>
        /// Number of tokens in the generated completion.
        /// </summary>
        public int CompletionTokens { get; set; }

        /// <summary>
        /// The duration reported by the worker to complete the task
        /// </summary>
        public int DurationMs { get; set; }

        /// <summary>
        /// The Month DB the Task was created in
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
    
    public override void Up()
    {
        Db.CreateTable<ChatSummary>();
    }

    public override void Down()
    {
        Db.DropTable<ChatSummary>();
    }
}
