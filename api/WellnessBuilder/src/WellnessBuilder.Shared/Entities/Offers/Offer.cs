namespace WellnessBuilder.Shared.Entities.Offers;

public class Offer : BaseEntity
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required Guid FlowId { get; set; }
    public string? Description { get; set; }
    public string? DigitalPlanDetails { get; set; }
    public string? WellnessKitDetails { get; set; }
    
    public Flow? Flow { get; set; }
    public ICollection<OfferConditionGroup> ConditionGroups { get; set; } = [];
}