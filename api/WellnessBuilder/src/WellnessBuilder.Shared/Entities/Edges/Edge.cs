using WellnessBuilder.Shared.Entities.Nodes;

namespace WellnessBuilder.Shared.Entities.Edges;

public class Edge : BaseEntity
{
    public Guid Id { get; set; }
    public Guid FromNodeId { get; set; }
    public Guid ToNodeId { get; set; }
    public int Priority { get; set; }
    public required Guid FlowId { get; set; }
    public Node? FromNode { get; set; }
    public Node? ToNode { get; set; }
    public ICollection<EdgeConditionGroup> ConditionGroups { get; set; } = [];
}