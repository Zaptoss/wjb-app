namespace WellnessBuilder.Shared.Contracts.Graph;

public class ConditionDto
{
    public Guid Id { get; set; }
    public required string AttributeKey { get; set; }
    public required string Operator { get; set; }
    public required string Value { get; set; }
}