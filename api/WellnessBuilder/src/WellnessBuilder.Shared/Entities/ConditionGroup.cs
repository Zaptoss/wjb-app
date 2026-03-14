namespace WellnessBuilder.Shared.Entities;

public class ConditionGroup
{
    public Guid Id { get; set; }
    public Guid EdgeId { get; set; }

    public Edge? Edge { get; set; }
    public ICollection<Condition> Conditions { get; set; } = [];
}