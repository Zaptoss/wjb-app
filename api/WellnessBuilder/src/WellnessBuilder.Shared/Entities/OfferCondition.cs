using WellnessBuilder.Shared.Enums;

namespace WellnessBuilder.Shared.Entities;

public class OfferCondition
{
    public Guid Id { get; set; }
    public Guid GroupId { get; set; }
    public required string AttributeKey { get; set; }
    public ConditionOperator Operator { get; set; }
    public required string Value { get; set; }

    public OfferConditionGroup? Group { get; set; }
}