namespace WellnessBuilder.Shared.Contracts.Graph;

public class NodeDto
{
    public Guid Id { get; set; }
    public required string Type { get; set; }
    public required string Title { get; set; }
    public string? Body { get; set; }
    public string? InputType { get; set; }
    public List<NodeOptionDto> Options { get; set; } = [];
}