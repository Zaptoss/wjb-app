namespace WellnessBuilder.Shared.Contracts.Graph;

public class NodeOptionDto
{
    public required string Label { get; set; }
    public required string Value { get; set; }
    public int Order { get; set; }
}