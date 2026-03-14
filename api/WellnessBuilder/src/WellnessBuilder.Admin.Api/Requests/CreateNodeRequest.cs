namespace WellnessBuilder.Admin.Api.Requests;

public class CreateNodeRequest
{
    public Guid FlowId { get; set; }
    public required string Type { get; set; }
    public required string Title { get; set; }
    public string? Body { get; set; }
    public string? InputType { get; set; }
    public string? AttributeKey { get; set; }
    public int DisplayOrder { get; set; }
    public List<CreateNodeOptionRequest> Options { get; set; } = [];
}

public class CreateNodeOptionRequest
{
    public required string Label { get; set; }
    public required string Value { get; set; }
    public int DisplayOrder { get; set; }
}