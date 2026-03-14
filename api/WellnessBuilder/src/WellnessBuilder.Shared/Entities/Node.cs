using System.ComponentModel.DataAnnotations;
using WellnessBuilder.Shared.Enums;

namespace WellnessBuilder.Shared.Entities;

public class Node
{
    public Guid Id { get; set; }
    public NodeType NodeType { get; set; }
    public required string Title { get; set; }
    public required string Body { get; set; }
    public InputType? InputType { get; set; }
    public string? AttributeKey { get; set; }
    public int DisplayOrder { get; set; }
    
    public ICollection<NodeOption> Options { get; set; } = [];
    public ICollection<Edge> OutgoingEdges { get; set; } = [];
    public ICollection<Edge> IncomingEdges { get; set; } = [];
    
}