using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Entities.Edges;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Entities.Offers;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class FlowConfiguration : BaseEntityConfiguration<Flow>
{
    public override void Configure(EntityTypeBuilder<Flow> builder)
    {
        base.Configure(builder);

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Description)
            .IsRequired()
            .HasMaxLength(2000);
        
        builder.HasIndex(f => f.IsActive)
            .IsUnique()
            .HasFilter("\"IsActive\" = true");
        
        builder.HasMany<Node>(f => f.Nodes)
            .WithOne(n => n.Flow)
            .HasForeignKey(n => n.FlowId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany<Edge>(f => f.Edges)
            .WithOne(e => e.Flow)
            .HasForeignKey(e => e.FlowId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}