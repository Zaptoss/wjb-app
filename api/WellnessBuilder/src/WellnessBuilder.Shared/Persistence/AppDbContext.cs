using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.Shared.Persistence;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    // Graph
    public DbSet<Node> Nodes { get; set; }
    public DbSet<NodeOption> NodeOptions { get; set; }
    public DbSet<Edge> Edges { get; set; }
    public DbSet<ConditionGroup> ConditionGroups { get; set; }
    public DbSet<Condition> Conditions { get; set; }

    // Offers
    public DbSet<Offer> Offers { get; set; }
    public DbSet<OfferRule> OfferRules { get; set; }
    public DbSet<OfferConditionGroup> OfferConditionGroups { get; set; }
    public DbSet<OfferCondition> OfferConditions { get; set; }

    // Sessions
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Answer> Answers { get; set; }
    public DbSet<SessionOffer> SessionOffers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}