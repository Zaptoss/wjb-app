namespace WellnessBuilder.Shared.Contracts.Graph;

public class NodeDto
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
