namespace WellnessBuilder.Shared.Entities;

public class Edge : BaseEntity
{
    public Guid Id { get; set; }
    public Guid FromNodeId { get; set; }
    public Guid ToNodeId { get; set; }
    public int Priority { get; set; }

    public Node? FromNode { get; set; }
    public Node? ToNode { get; set; }
    public ICollection<EdgeConditionGroup> ConditionGroups { get; set; } = [];
}