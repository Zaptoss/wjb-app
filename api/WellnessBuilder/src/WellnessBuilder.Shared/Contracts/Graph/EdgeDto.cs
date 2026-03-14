namespace WellnessBuilder.Shared.Contracts.Graph;

public class EdgeDto
{
    public Guid Id { get; set; }
    public Guid FromNodeId { get; set; }
    public Guid ToNodeId { get; set; }
    public int Priority { get; set; }
    public List<ConditionGroupDto> ConditionGroups { get; set; } = [];
}