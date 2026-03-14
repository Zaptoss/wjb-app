using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class OfferConditionGroupConfiguration : IEntityTypeConfiguration<OfferConditionGroup>
{
    public void Configure(EntityTypeBuilder<OfferConditionGroup> builder)
    {
        builder.HasKey(g => g.Id);

        builder.HasOne(g => g.OfferRule)
            .WithMany(r => r.ConditionGroups)
            .HasForeignKey(g => g.OfferRuleId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(g => g.Conditions)
            .WithOne(c => c.Group)
            .HasForeignKey(c => c.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}