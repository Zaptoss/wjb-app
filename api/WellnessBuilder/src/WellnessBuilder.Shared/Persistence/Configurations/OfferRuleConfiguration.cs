using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class OfferRuleConfiguration : IEntityTypeConfiguration<OfferRule>
{
    public void Configure(EntityTypeBuilder<OfferRule> builder)
    {
        builder.HasKey(r => r.Id);

        builder.HasOne(r => r.Offer)
            .WithMany(o => o.Rules)
            .HasForeignKey(r => r.OfferId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(r => r.ConditionGroups)
            .WithOne(g => g.OfferRule)
            .HasForeignKey(g => g.OfferRuleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}