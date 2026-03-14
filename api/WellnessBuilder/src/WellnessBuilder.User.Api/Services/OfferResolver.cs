using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Entities.Offers;
using WellnessBuilder.Shared.Helpers;
using WellnessBuilder.Shared.Persistence;
using WellnessBuilder.User.Api.IServices;

namespace WellnessBuilder.User.Api.Services;

public class OfferResolver(AppDbContext db) : IOfferResolver
{
    public async Task<List<Offer>> ResolveAsync(Dictionary<string, string> context)
    {
        var offers = await db.Offers
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