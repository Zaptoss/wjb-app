using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class EdgeService(AppDbContext db) : IEdgeService
{
    public async Task<EdgeDto> CreateAsync(CreateEdgeRequest request)
    {
        var fromExists = await db.Nodes.AnyAsync(n => n.Id == request.FromNodeId);
        var toExists = await db.Nodes.AnyAsync(n => n.Id == request.ToNodeId);

        if (!fromExists || !toExists)
            throw new KeyNotFoundException("One or both nodes not found");

        var edge = new Edge
        {
            Id = Guid.NewGuid(),
            FromNodeId = request.FromNodeId,
            ToNodeId = request.ToNodeId,
            Priority = request.Priority,
            ConditionGroups = request.ConditionGroups.Select(g => new ConditionGroup
            {
                Id = Guid.NewGuid(),
                Conditions = g.Conditions.Select(c => new Condition
                {
                    Id = Guid.NewGuid(),
                    AttributeKey = c.AttributeKey,
                    Operator = Enum.Parse<ConditionOperator>(c.Operator, ignoreCase: true),
                    Value = c.Value
                }).ToList()
            }).ToList()
        };

        db.Edges.Add(edge);
        await db.SaveChangesAsync();

        return MapToDto(edge);
    }

    public async Task DeleteAsync(Guid id)
    {
        var edge = await db.Edges.FirstOrDefaultAsync(e => e.Id == id);

        if (edge is null)
            throw new KeyNotFoundException($"Edge {id} not found");

        db.Edges.Remove(edge);
        await db.SaveChangesAsync();
    }

    public async Task<EdgeDto> AddConditionGroupAsync(Guid edgeId, CreateConditionGroupRequest request)
    {
        var edge = await db.Edges
            .Include(e => e.ConditionGroups)
                .ThenInclude(g => g.Conditions)
            .FirstOrDefaultAsync(e => e.Id == edgeId);

        if (edge is null)
            throw new KeyNotFoundException($"Edge {edgeId} not found");

        var group = new ConditionGroup
        {
            Id = Guid.NewGuid(),
            EdgeId = edgeId,
            Conditions = request.Conditions.Select(c => new Condition
            {
                Id = Guid.NewGuid(),
                AttributeKey = c.AttributeKey,
                Operator = Enum.Parse<ConditionOperator>(c.Operator, ignoreCase: true),
                Value = c.Value
            }).ToList()
        };

        edge.ConditionGroups.Add(group);
        await db.SaveChangesAsync();

        return MapToDto(edge);
    }

    public async Task DeleteConditionGroupAsync(Guid groupId)
    {
        var group = await db.ConditionGroups.FirstOrDefaultAsync(g => g.Id == groupId);

        if (group is null)
            throw new KeyNotFoundException($"ConditionGroup {groupId} not found");

        db.ConditionGroups.Remove(group);
        await db.SaveChangesAsync();
    }

    private static EdgeDto MapToDto(Edge edge) => new()
    {
        Id = edge.Id,
        FromNodeId = edge.FromNodeId,
        ToNodeId = edge.ToNodeId,
        Priority = edge.Priority,
        ConditionGroups = edge.ConditionGroups.Select(g => new ConditionGroupDto
        {
            Id = g.Id,
            Conditions = g.Conditions.Select(c => new ConditionDto
            {
                Id = c.Id,
                AttributeKey = c.AttributeKey,
                Operator = c.Operator.ToString(),
                Value = c.Value
            }).ToList()
        }).ToList()
    };
}