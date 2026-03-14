using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

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
    }
}