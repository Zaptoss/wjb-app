using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class OfferConditionConfiguration : IEntityTypeConfiguration<OfferCondition>
{
    public void Configure(EntityTypeBuilder<OfferCondition> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.AttributeKey)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(c => c.Value)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(c => c.Operator)
            .HasConversion<string>();

        builder.HasOne(c => c.Group)
            .WithMany(g => g.Conditions)
            .HasForeignKey(c => c.GroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}