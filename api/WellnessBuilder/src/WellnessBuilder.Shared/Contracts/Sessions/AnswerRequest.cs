namespace WellnessBuilder.Shared.Contracts.Sessions;

public class AnswerRequest
{
    public Guid NodeId { get; set; }
    public required string Value { get; set; }
}