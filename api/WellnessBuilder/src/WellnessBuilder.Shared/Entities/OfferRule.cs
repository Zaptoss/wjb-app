namespace WellnessBuilder.Shared.Entities;

public class OfferRule
{
    public Guid Id { get; set; }
    public Guid OfferId { get; set; }

    public Offer? Offer { get; set; }
    public ICollection<OfferConditionGroup> ConditionGroups { get; set; } = [];
}