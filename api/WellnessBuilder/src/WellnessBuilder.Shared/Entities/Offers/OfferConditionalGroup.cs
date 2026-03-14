namespace WellnessBuilder.Shared.Entities.Offers;

public class OfferConditionGroup : BaseEntity
{
    public Guid Id { get; set; }
    public Guid OfferRuleId { get; set; }

    public OfferRule OfferRule { get; set; } = null!;
    public ICollection<OfferCondition> Conditions { get; set; } = [];
}