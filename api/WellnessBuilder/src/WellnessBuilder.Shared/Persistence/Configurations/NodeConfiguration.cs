using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities.Nodes;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class NodeConfiguration : BaseEntityConfiguration<Node>
{
    public override void Configure(EntityTypeBuilder<Node> builder)
    {
        base.Configure(builder);

        builder.HasKey(n => n.Id);

        builder.Property(n => n.Title)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(n => n.Body)
            .HasMaxLength(4000);

        builder.Property(n => n.AttributeKey)
            .HasMaxLength(100);

        builder.Property(n => n.ImageUrl)
            .HasMaxLength(2000);

        builder.HasOne(n => n.Flow)
            .WithMany(f => f.Nodes)
            .HasForeignKey(n => n.FlowId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
