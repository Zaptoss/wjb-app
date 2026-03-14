using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Contracts.Offers;

namespace WellnessBuilder.Shared.Contracts.Sessions;

public class SessionStepResponse
{
    public bool Completed { get; set; }
    public NodeDto? Node { get; set; }
    public List<OfferDto> Offers { get; set; } = [];
}