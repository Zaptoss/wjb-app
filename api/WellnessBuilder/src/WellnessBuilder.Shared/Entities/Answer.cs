namespace WellnessBuilder.Shared.Entities;

public class Answer
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public Guid NodeId { get; set; }
    public required string AttributeKey { get; set; }
    public required string Value { get; set; }

    public required Session Session { get; set; }
    public required Node Node { get; set; }
}