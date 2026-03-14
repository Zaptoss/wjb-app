using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities.Edges;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class ConditionGroupConfiguration : BaseEntityConfiguration<EdgeConditionGroup>
{
    public override void Configure(EntityTypeBuilder<EdgeConditionGroup> builder)
    {
        base.Configure(builder);
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