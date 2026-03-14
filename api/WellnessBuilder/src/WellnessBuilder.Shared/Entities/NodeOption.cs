namespace WellnessBuilder.Shared.Entities;

public class NodeOption
{
    public Guid Id { get; set; }
    public Guid NodeId { get; set; }
    public required string Label { get; set; }
    public required string Value { get; set; } 
    public int DisplayOrder { get; set; }

    public required Node Node { get; set; }
}