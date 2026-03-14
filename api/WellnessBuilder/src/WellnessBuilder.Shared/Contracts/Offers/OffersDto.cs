namespace WellnessBuilder.Shared.Contracts.Offers;

public class OfferDto
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string DigitalPlanDetails { get; set; }
    public required string WellnessKitDetails { get; set; }
    public required string Why { get; set; }
}