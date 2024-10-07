using ServiceStack;
using ServiceStack.DataAnnotations;

namespace AiServer.Tests.Types;

[ValidateIsAuthenticated]
public class GetQuestion : IGet, IReturn<GetQuestionResponse>
{
    public int Id { get; set; }
}
public class GetQuestionResponse
{
    public required Post Result { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}
[ValidateIsAuthenticated]
public class GetQuestionBody : IGet, IReturn<string>
{
    public int Id { get; set; }
}

[Description("StackOverflow Question")]
[Notes("A StackOverflow Question Post")]
public class Post
{
    public int Id { get; set; }

    [Required] public int PostTypeId { get; set; }

    public int? AcceptedAnswerId { get; set; }

    public int? ParentId { get; set; }

    public int Score { get; set; }

    public int? ViewCount { get; set; }

    public string Title { get; set; }

    public int? FavoriteCount { get; set; }

    public DateTime CreationDate { get; set; }

    public DateTime LastActivityDate { get; set; }

    public DateTime? LastEditDate { get; set; }

    public int? LastEditorUserId { get; set; }

    public int? OwnerUserId { get; set; }

    public List<string> Tags { get; set; }

    public string Slug { get; set; }

    public string Summary { get; set; }
    
    public DateTime? RankDate { get; set; }
    
    public int? AnswerCount { get; set; }

    public string? CreatedBy { get; set; }
    
    public string? ModifiedBy { get; set; }
    
    public string? RefId { get; set; }

    public string? Body { get; set; }

    public string? ModifiedReason { get; set; }
    
    public DateTime? LockedDate { get; set; }

    public string? LockedReason { get; set; }

    public string GetRefId() => RefId ?? $"{Id}-{CreatedBy}";
}