namespace WellnessBuilder.Shared.Entities;

public class Flow : BaseEntity
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
}