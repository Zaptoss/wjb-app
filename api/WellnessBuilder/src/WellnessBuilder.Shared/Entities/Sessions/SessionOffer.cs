using WellnessBuilder.Shared.Entities.Offers;

namespace WellnessBuilder.Shared.Entities.Sessions;

public class SessionOffer : BaseEntity
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public Guid OfferId { get; set; }
    public DateTime AssignedAt { get; set; }

    public Session? Session { get; set; }
    public Offer? Offer { get; set; }
}