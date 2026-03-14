using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class ConditionGroupConfiguration : IEntityTypeConfiguration<ConditionGroup>
{
    public void Configure(EntityTypeBuilder<ConditionGroup> builder)
    {
        builder.HasKey(g => g.Id);

        builder.HasOne(g => g.Edge)
            .WithMany(e => e.ConditionGroups)
            .HasForeignKey(g => g.EdgeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(g => g.Conditions)
            .WithOne(c => c.Group)
            .HasForeignKey(c => c.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}