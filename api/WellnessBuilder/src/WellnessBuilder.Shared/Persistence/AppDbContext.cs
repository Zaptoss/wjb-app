using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Graph
    public DbSet<Node> Nodes { get; set; }
    public DbSet<NodeOption> NodeOptions { get; set; }
    public DbSet<NodeOptionConditionGroup> NodeOptionConditionGroups { get; set; }
    public DbSet<NodeOptionCondition> NodeOptionConditions { get; set; }
    public DbSet<Edge> Edges { get; set; }
    public DbSet<EdgeConditionGroup> EdgeConditionGroups { get; set; }
    public DbSet<EdgeCondition> EdgeConditions { get; set; }

    // Offers
    public DbSet<Offer> Offers { get; set; }
    public DbSet<OfferRule> OfferRules { get; set; }
    public DbSet<OfferConditionGroup> OfferConditionGroups { get; set; }
    public DbSet<OfferCondition> OfferConditions { get; set; }

    // Sessions
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<SessionOffer> SessionOffers { get; set; }

    public DbSet<Admin> Admins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var entries = ChangeTracker
            .Entries<BaseEntity>();

        var now = DateTime.UtcNow;

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
                entry.Entity.UpdatedAt = now;
            }

            if (entry.State == EntityState.Modified) entry.Entity.UpdatedAt = now;
        }
    }
}