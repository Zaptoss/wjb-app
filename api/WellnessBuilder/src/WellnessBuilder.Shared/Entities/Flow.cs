using WellnessBuilder.Shared.Entities.Edges;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Entities.Offers;

namespace WellnessBuilder.Shared.Entities;

public class Flow : BaseEntity
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    
    public ICollection<Node> Nodes { get; set; } = [];
    public ICollection<Edge> Edges { get; set; } = [];
    public ICollection<Offer> Offers { get; set; } = [];
}