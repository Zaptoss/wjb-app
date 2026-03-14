namespace WellnessBuilder.Admin.Api.Requests;

public class CreateEdgeRequest
{
    public Guid FromNodeId { get; set; }
    public Guid ToNodeId { get; set; }
    public int Priority { get; set; }
    public List<CreateConditionGroupRequest> ConditionGroups { get; set; } = [];
}