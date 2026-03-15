namespace WellnessBuilder.Admin.Api.Requests;

public class UpdateFlowRequest
{
    public required string Title { get; set; }
    public string? Description { get; set; }
}