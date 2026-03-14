using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class OfferConfiguration : IEntityTypeConfiguration<Offer>
{
    public void Configure(EntityTypeBuilder<Offer> builder)
    {
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

        builder.HasMany(o => o.Rules)
            .WithOne(r => r.Offer)
            .HasForeignKey(r => r.OfferId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}