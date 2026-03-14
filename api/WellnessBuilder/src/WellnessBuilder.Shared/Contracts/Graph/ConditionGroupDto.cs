namespace WellnessBuilder.Shared.Contracts.Graph;

public class ConditionGroupDto
{
    public Guid Id { get; set; }
    public List<ConditionDto> Conditions { get; set; } = [];
}