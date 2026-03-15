using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities.Offers;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class OfferConfiguration : BaseEntityConfiguration<Offer>
{
    public override void Configure(EntityTypeBuilder<Offer> builder)
    {
        base.Configure(builder);

        builder.HasKey(o => o.Id);

        builder.Property(o => o.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(o => o.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(o => o.DigitalPlanDetails)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(o => o.WellnessKitDetails)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(o => o.Why)
            .HasMaxLength(2000);

        builder.HasMany(o => o.ConditionGroups)
            .WithOne(g => g.Offer)
            .HasForeignKey(g => g.OfferId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
