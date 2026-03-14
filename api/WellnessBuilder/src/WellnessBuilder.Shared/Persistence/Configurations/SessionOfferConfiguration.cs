using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class SessionOfferConfiguration : BaseEntityConfiguration<SessionOffer>
{
    public override void Configure(EntityTypeBuilder<SessionOffer> builder)
    {
        base.Configure(builder);

        builder.HasKey(so => so.Id);

        builder.HasOne(so => so.Session)
            .WithMany(s => s.AssignedOffers)
            .HasForeignKey(so => so.SessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(so => so.Offer)
            .WithMany()
            .HasForeignKey(so => so.OfferId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}