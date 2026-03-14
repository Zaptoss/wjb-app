namespace WellnessBuilder.Admin.Api.Requests;

public class CreateConditionGroupRequest
{
    public List<CreateConditionRequest> Conditions { get; set; } = [];
}