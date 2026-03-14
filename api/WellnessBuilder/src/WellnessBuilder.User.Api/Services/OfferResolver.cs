using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Helpers;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.User.Api.Services;

public class OfferResolver : IOfferResolver
{
    private readonly AppDbContext _db;

    public OfferResolver(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Offer>> ResolveAsync(Dictionary<string, string> context)
    {
        var offers = await _db.Offers
            .Include(o => o.Rules)
            .ThenInclude(r => r.ConditionGroups)
            .ThenInclude(g => g.Conditions)
            .ToListAsync();

        return offers
            .Where(o => EvaluateOffer(o, context))
            .ToList();
    }

    private bool EvaluateOffer(Offer offer, Dictionary<string, string> context)
    {
        return offer.Rules.Any(r => EvaluateRule(r, context));
    }

    private bool EvaluateRule(OfferRule rule, Dictionary<string, string> context)
    {
        return rule.ConditionGroups.Any(g => EvaluateGroup(g, context));
    }

    private bool EvaluateGroup(OfferConditionGroup group, Dictionary<string, string> context)
    {
        return group.Conditions.All(c => EvaluateCondition(c, context));
    }

    private bool EvaluateCondition(OfferCondition c, Dictionary<string, string> context)
    {
        return ConditionEvaluator.Evaluate(c.AttributeKey, c.Operator, c.Value, context);
    }
}