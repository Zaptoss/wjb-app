namespace WellnessBuilder.Admin.Api.Requests;

public class CreateFlowRequest
{
    public required string Title { get; set; }
    public string? Description { get; set; }
}