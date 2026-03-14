using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class NodeService(AppDbContext db) : INodeService
{
    public async Task<List<NodeDto>> GetAllAsync()
    {
        return await db.Nodes
            .Include(n => n.Options)
            .OrderBy(n => n.DisplayOrder)
            .Select(n => MapToDto(n))
            .ToListAsync();
    }

    public async Task<NodeDto> GetByIdAsync(Guid id)
    {
        var node = await db.Nodes
            .Include(n => n.Options)
            .FirstOrDefaultAsync(n => n.Id == id);

        if (node is null)
            throw new KeyNotFoundException($"Node {id} not found");

        return MapToDto(node);
    }

    public async Task<NodeDto> CreateAsync(CreateNodeRequest request)
    {
        var node = new Node
        {
            Id = Guid.NewGuid(),
            NodeType = Enum.Parse<NodeType>(request.Type, true),
            Title = request.Title,
            Body = request.Body,
            InputType = request.InputType is null
                ? null
                : Enum.Parse<InputType>(request.InputType, true),
            AttributeKey = request.AttributeKey,
            DisplayOrder = request.DisplayOrder,
            Options = request.Options.Select((o, i) => new NodeOption
            {
                Id = Guid.NewGuid(),
                Label = o.Label,
                Value = o.Value,
                DisplayOrder = o.DisplayOrder
            }).ToList()
        };

        db.Nodes.Add(node);
        await db.SaveChangesAsync();

        return MapToDto(node);
    }

    public async Task<NodeDto> UpdateAsync(Guid id, UpdateNodeRequest request)
    {
        var node = await db.Nodes
            .Include(n => n.Options)
            .FirstOrDefaultAsync(n => n.Id == id);

        if (node is null)
            throw new KeyNotFoundException($"Node {id} not found");

        node.NodeType = Enum.Parse<NodeType>(request.Type, true);
        node.Title = request.Title;
        node.Body = request.Body;
        node.InputType = request.InputType is null
            ? null
            : Enum.Parse<InputType>(request.InputType, true);
        node.AttributeKey = request.AttributeKey;
        node.DisplayOrder = request.DisplayOrder;

        db.NodeOptions.RemoveRange(node.Options);
        node.Options = request.Options.Select(o => new NodeOption
        {
            Id = Guid.NewGuid(),
            NodeId = id,
            Label = o.Label,
            Value = o.Value,
            DisplayOrder = o.DisplayOrder
        }).ToList();

        await db.SaveChangesAsync();

        return MapToDto(node);
    }


    public async Task DeleteAsync(Guid id)
    {
        var node = await db.Nodes.FirstOrDefaultAsync(n => n.Id == id);

        if (node is null)
            throw new KeyNotFoundException($"Node {id} not found");

        db.Nodes.Remove(node);
        await db.SaveChangesAsync();
    }

    private static NodeDto MapToDto(Node node)
    {
        return new NodeDto
        {
            Id = node.Id,
            Type = node.NodeType.ToString().ToLowerInvariant(),
            Title = node.Title,
            Body = node.Body,
            InputType = node.InputType?.ToString(),
            Options = node.Options
                .OrderBy(o => o.DisplayOrder)
                .Select(o => new NodeOptionDto
                {
                    Label = o.Label,
                    Value = o.Value,
                    Order = o.DisplayOrder
                }).ToList()
        };
    }
}