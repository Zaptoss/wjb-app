using WellnessBuilder.Shared.Entities.Edges;
using WellnessBuilder.Shared.Enums;

namespace WellnessBuilder.Shared.Entities.Nodes;

public class Node : BaseEntity
{
    public Guid Id { get; set; }
    public NodeType NodeType { get; set; }
    public required Guid FlowId { get; set; }
    public required string Title { get; set; }
    public string? Body { get; set; }
    public InputType? InputType { get; set; }
    public string? AttributeKey { get; set; }

    public Flow? Flow { get; set; }
    public ICollection<NodeOption> Options { get; set; } = [];
    public ICollection<Edge> OutgoingEdges { get; set; } = [];
    public ICollection<Edge> IncomingEdges { get; set; } = [];
}