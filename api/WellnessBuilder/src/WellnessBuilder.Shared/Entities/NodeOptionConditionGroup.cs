namespace WellnessBuilder.Shared.Entities;

public class NodeOptionConditionGroup : BaseEntity
{
    public Guid Id { get; set; }
    public Guid NodeOptionId { get; set; }
    public NodeOption? NodeOption { get; set; }
    public ICollection<NodeOptionCondition> Conditions { get; set; } = [];
}