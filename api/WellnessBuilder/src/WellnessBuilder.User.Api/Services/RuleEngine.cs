using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Entities.Edges;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Helpers;
using WellnessBuilder.Shared.Persistence;
using WellnessBuilder.User.Api.IServices;

namespace WellnessBuilder.User.Api.Services;

public class RuleEngine(AppDbContext db) : IRuleEngine
{
    public async Task<Node?> GetNextNodeAsync(Guid currentNodeId, Dictionary<string, string> context)
    {
        var edges = await db.Edges
            .Include(e => e.ConditionGroups)
            .ThenInclude(g => g.Conditions)
            .Include(e => e.ToNode)
            .ThenInclude(n => n.Options)
            .Where(e => e.FromNodeId == currentNodeId)
            .OrderBy(e => e.Priority)
            .ToListAsync();

        Edge? fallback = null;

        foreach (var edge in edges)
        {
            if (!edge.ConditionGroups.Any())
            {
                fallback ??= edge;
                continue;
            }

            if (EvaluateEdge(edge, context))
                return edge.ToNode;
        }

        return fallback?.ToNode;
    }

    private bool EvaluateEdge(Edge edge, Dictionary<string, string> context)
    {
        return edge.ConditionGroups.Any(g => EvaluateGroup(g, context));
    }

    private bool EvaluateGroup(EdgeConditionGroup group, Dictionary<string, string> context)
    {
        return group.Conditions.All(c => EvaluateCondition(c, context));
    }

    private bool EvaluateCondition(EdgeCondition c, Dictionary<string, string> context)
    {
        return ConditionEvaluator.Evaluate(c.AttributeKey, c.Operator, c.Value, context);
    }
}