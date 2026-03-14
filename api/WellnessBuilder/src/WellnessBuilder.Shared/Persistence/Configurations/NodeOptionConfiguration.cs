using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class NodeOptionConfiguration : BaseEntityConfiguration<NodeOption>
{
    public override void Configure(EntityTypeBuilder<NodeOption> builder)
    {
        base.Configure(builder);

        builder.HasKey(o => o.Id);

        builder.Property(o => o.Label)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(o => o.Value)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasOne(o => o.Node)
            .WithMany(n => n.Options)
            .HasForeignKey(o => o.NodeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(e => new { e.NodeId, e.DisplayOrder }).IsUnique();
    }
}