namespace WellnessBuilder.Admin.Api.Requests;

public class CreateConditionRequest
{
    public required string AttributeKey { get; set; }
    public required string Operator { get; set; }
    public required string Value { get; set; }
}