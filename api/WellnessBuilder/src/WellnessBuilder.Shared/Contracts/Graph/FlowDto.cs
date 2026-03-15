namespace WellnessBuilder.Shared.Contracts.Graph;

public class FlowDto
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime UpdatedAt { get; set; }
}
