namespace WellnessBuilder.Shared.Entities.Edges;

public class EdgeConditionGroup : BaseEntity
{
    public Guid Id { get; set; }
    public Guid EdgeId { get; set; }

    public Edge? Edge { get; set; }
    public ICollection<EdgeCondition> Conditions { get; set; } = [];
}