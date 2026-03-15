using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.Contracts.Flows;

public class AdminFlowGraphDto
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<AdminFlowGraphNodeDto> Nodes { get; set; } = [];
    public List<AdminFlowGraphEdgeDto> Edges { get; set; } = [];
}

public class AdminFlowGraphNodeDto
{
    public Guid Id { get; set; }
    public required string Type { get; set; }
    public required string Title { get; set; }
    public string? Body { get; set; }
    public string? InputType { get; set; }
    public string? AttributeKey { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? OfferId { get; set; }
    public double PositionX { get; set; }
    public double PositionY { get; set; }
    public List<NodeOptionDto> Options { get; set; } = [];
}

public class AdminFlowGraphEdgeDto
{
    public Guid Id { get; set; }
    public Guid SourceNodeId { get; set; }
    public Guid TargetNodeId { get; set; }
    public int Priority { get; set; }
    public List<ConditionDto> Conditions { get; set; } = [];
}
