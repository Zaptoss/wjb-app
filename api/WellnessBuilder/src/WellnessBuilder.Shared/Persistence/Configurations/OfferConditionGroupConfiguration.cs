using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities.Offers;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class OfferConditionGroupConfiguration : BaseEntityConfiguration<OfferConditionGroup>
{
    public override void Configure(EntityTypeBuilder<OfferConditionGroup> builder)
    {
        base.Configure(builder);

        builder.HasKey(g => g.Id);

        builder.HasOne(g => g.Offer)
            .WithMany(r => r.ConditionGroups)
            .HasForeignKey(g => g.OfferId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(g => g.Conditions)
            .WithOne(c => c.Group)
            .HasForeignKey(c => c.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}