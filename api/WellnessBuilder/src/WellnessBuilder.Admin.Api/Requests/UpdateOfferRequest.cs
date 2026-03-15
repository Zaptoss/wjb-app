namespace WellnessBuilder.Admin.Api.Requests;

public class UpdateOfferRequest
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string DigitalPlanDetails { get; set; }
    public required string WellnessKitDetails { get; set; }
    public string? Why { get; set; }
}
