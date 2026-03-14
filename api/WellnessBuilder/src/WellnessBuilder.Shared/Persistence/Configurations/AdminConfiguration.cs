using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence.Configurations;

public class AdminConfiguration : BaseEntity
{
    public void Configure(EntityTypeBuilder<Admin> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Email)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(a => a.PasswordHash)
            .IsRequired();

        builder.HasIndex(a => a.Email)
            .IsUnique();
    }
}