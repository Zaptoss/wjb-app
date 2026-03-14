namespace WellnessBuilder.Shared.Entities.Sessions;

public class Session
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    public ICollection<Answer> Answers { get; set; } = [];
    public ICollection<SessionOffer> AssignedOffers { get; set; } = [];
}