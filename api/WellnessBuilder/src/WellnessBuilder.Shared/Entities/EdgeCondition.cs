using WellnessBuilder.Shared.Enums;

namespace WellnessBuilder.Shared.Entities;

public class EdgeCondition : BaseEntity
{
    public Guid Id { get; set; }
    public Guid GroupId { get; set; }
    public required string AttributeKey { get; set; }
    public ConditionOperator Operator { get; set; }
    public required string Value { get; set; }

    public EdgeConditionGroup? Group { get; set; }
}