namespace WellnessBuilder.Shared.Entities;

public class Answer : BaseEntity
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public Guid NodeId { get; set; }
    public required string AttributeKey { get; set; }
    public required string Value { get; set; }

    public Session? Session { get; set; }
    public Node? Node { get; set; }
}