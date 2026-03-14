namespace WellnessBuilder.Shared.Entities;

public class NodeOption : BaseEntity
{
    public Guid Id { get; set; }
    public Guid NodeId { get; set; }
    public required string Label { get; set; }
    public required string Value { get; set; }
    public int DisplayOrder { get; set; }

    public Node? Node { get; set; }
    public ICollection<NodeOptionConditionGroup> ConditionGroups { get; set; } = [];
}