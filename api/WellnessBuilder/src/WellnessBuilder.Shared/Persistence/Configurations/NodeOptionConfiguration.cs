using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class NodeOptionConfiguration : IEntityTypeConfiguration<NodeOption>
{
    public void Configure(EntityTypeBuilder<NodeOption> builder)
    {
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
    }
}