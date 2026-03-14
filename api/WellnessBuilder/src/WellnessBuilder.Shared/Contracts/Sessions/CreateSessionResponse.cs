using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Shared.Contracts.Sessions;

public class CreateSessionResponse
{
    public Guid SessionId { get; set; }
    public required NodeDto Node { get; set; }
}