using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class NodeService(AppDbContext db) : INodeService
{
    public async Task<List<NodeDto>> GetAllAsync(Guid flowId)
    {
        return await db.Nodes
            .Include(n => n.Options)
            .Where(n => n.FlowId == flowId)
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
            FlowId = request.FlowId,
            Title = request.Title,
            Body = request.Body,
            InputType = request.InputType is null
                ? null
                : Enum.Parse<InputType>(request.InputType, true),
            AttributeKey = request.AttributeKey,
            ImageUrl = request.ImageUrl,
            OfferId = request.OfferId,
            PositionX = request.PositionX,
            PositionY = request.PositionY,
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
        node.ImageUrl = request.ImageUrl;
        node.OfferId = request.OfferId;
        node.PositionX = request.PositionX;
        node.PositionY = request.PositionY;

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
            AttributeKey = node.AttributeKey,
            ImageUrl = node.ImageUrl,
            OfferId = node.OfferId,
            PositionX = node.PositionX,
            PositionY = node.PositionY,
            Options = node.Options
                .OrderBy(o => o.DisplayOrder)
                .Select(o => new NodeOptionDto
                {
                    Id = o.Id,
                    Label = o.Label,
                    Value = o.Value,
                    Order = o.DisplayOrder
                }).ToList()
        };
    }
}
