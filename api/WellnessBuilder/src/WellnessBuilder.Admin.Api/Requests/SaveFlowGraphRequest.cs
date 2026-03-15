namespace WellnessBuilder.Admin.Api.Requests;

public class SaveFlowGraphRequest
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public List<SaveFlowGraphNodeRequest> Nodes { get; set; } = [];
    public List<SaveFlowGraphEdgeRequest> Edges { get; set; } = [];
}

public class SaveFlowGraphNodeRequest
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
    public List<CreateNodeOptionRequest> Options { get; set; } = [];
}

public class SaveFlowGraphEdgeRequest
{
    public Guid Id { get; set; }
    public Guid SourceNodeId { get; set; }
    public Guid TargetNodeId { get; set; }
    public List<SaveFlowGraphConditionRequest> Conditions { get; set; } = [];
}

public class SaveFlowGraphConditionRequest
{
    public Guid Id { get; set; }
    public required string AttributeKey { get; set; }
    public required string Operator { get; set; }
    public required string Value { get; set; }
}
