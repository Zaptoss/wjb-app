namespace WellnessBuilder.Admin.Api.Requests;

public class CreateOfferRuleRequest
{
    public List<CreateConditionGroupRequest> ConditionGroups { get; set; } = [];
}