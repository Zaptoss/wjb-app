using System.ComponentModel.DataAnnotations;

namespace WellnessBuilder.Shared.Entities;

public class SessionOffer
{
    public Guid Id { get; set; }
    public Guid SessionId { get; set; }
    public Guid OfferId { get; set; }
    public DateTime AssignedAt { get; set; }

    public required Session Session { get; set; }
    public required Offer Offer { get; set; }
}