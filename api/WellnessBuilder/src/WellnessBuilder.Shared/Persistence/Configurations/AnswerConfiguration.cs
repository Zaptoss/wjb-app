using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class AnswerConfiguration : BaseEntityConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        base.Configure(builder);
        builder.HasKey(a => a.Id);

        builder.Property(a => a.AttributeKey)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(a => a.Value)
            .IsRequired()
            .HasMaxLength(1000);

        builder.HasOne(a => a.Session)
            .WithMany(s => s.Answers)
            .HasForeignKey(a => a.SessionId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(a => a.Node)
            .WithMany()
            .HasForeignKey(a => a.NodeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}