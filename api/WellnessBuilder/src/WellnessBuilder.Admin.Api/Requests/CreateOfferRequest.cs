namespace WellnessBuilder.Admin.Api.Requests;

public class CreateOfferRequest
{
    public Guid FlowId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string DigitalPlanDetails { get; set; }
    public required string WellnessKitDetails { get; set; }
    public List<CreateOfferRuleRequest> Rules { get; set; } = [];
}