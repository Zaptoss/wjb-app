namespace WellnessBuilder.Admin.Api.Requests;

public class CreateNodeOptionRequest
{
    public required string Label { get; set; }
    public required string Value { get; set; }
    public int DisplayOrder { get; set; }
}