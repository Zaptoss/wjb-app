using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class EdgeConfiguration : BaseEntityConfiguration<Edge>
{
    public override void Configure(EntityTypeBuilder<Edge> builder)
    {
        base.Configure(builder);

        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.FromNode)
            .WithMany(n => n.OutgoingEdges)
            .HasForeignKey(e => e.FromNodeId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.ToNode)
            .WithMany(n => n.IncomingEdges)
            .HasForeignKey(e => e.ToNodeId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(e => e.ConditionGroups)
            .WithOne(g => g.Edge)
            .HasForeignKey(g => g.EdgeId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasIndex(e => new { e.Priority, e.FromNodeId }).IsUnique();
        builder.HasIndex(e => new { e.FromNodeId, e.ToNodeId }).IsUnique();
        
        builder.ToTable(t => t.HasCheckConstraint(
            "CK_Edge_FromNode_NotEqual_ToNode",
            "\"FromNodeId\" <> \"ToNodeId\""));
    }
}