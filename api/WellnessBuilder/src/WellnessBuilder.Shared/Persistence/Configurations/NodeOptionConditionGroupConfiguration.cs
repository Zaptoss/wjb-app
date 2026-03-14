using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class NodeOptionConditionGroupConfiguration : BaseEntityConfiguration<NodeOptionConditionGroup>
{
    public override void Configure(EntityTypeBuilder<NodeOptionConditionGroup> builder)
    {
        base.Configure(builder);

        builder.HasKey(g => g.Id);

        builder.HasOne(g => g.NodeOption)
            .WithMany(o => o.ConditionGroups)
            .HasForeignKey(g => g.NodeOptionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(g => g.Conditions)
            .WithOne(c => c.Group)
            .HasForeignKey(c => c.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}