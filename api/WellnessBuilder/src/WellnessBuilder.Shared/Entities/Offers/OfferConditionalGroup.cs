namespace WellnessBuilder.Shared.Entities.Offers;

public class OfferConditionGroup : BaseEntity
{
    public Guid Id { get; set; }
    public Guid OfferId { get; set; }
    
    public Offer? Offer { get; set; }
    public ICollection<OfferCondition> Conditions { get; set; } = [];
}