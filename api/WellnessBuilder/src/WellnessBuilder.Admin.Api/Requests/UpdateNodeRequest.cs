namespace WellnessBuilder.Admin.Api.Requests;

public class UpdateNodeRequest
{
    public required string Type { get; set; }
    public required string Title { get; set; }
    public string? Body { get; set; }
    public string? InputType { get; set; }
    public string? AttributeKey { get; set; }
    public string? ImageUrl { get; set; }
    public Guid? OfferId { get; set; }
    public double PositionX { get; set; }
    public double PositionY { get; set; }
    public int DisplayOrder { get; set; }
    public List<CreateNodeOptionRequest> Options { get; set; } = [];
}
