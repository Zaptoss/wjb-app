using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.Contracts.Flows;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Common;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Entities.Edges;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class FlowService(AppDbContext db) : IFlowService
{
    public async Task<PagedResponse<FlowDto>> GetAllAsync(PagedRequest request)
    {
        var query = db.Flows.AsQueryable();

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(f => f.Title)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(f => MapToDto(f))
            .ToListAsync();

        return new PagedResponse<FlowDto>
        {
            Items = items,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }

    public async Task<FlowDto> GetByIdAsync(Guid id)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        return MapToDto(flow);
    }

    public async Task<AdminFlowGraphDto> GetGraphAsync(Guid id)
    {
        var flow = await LoadGraphAsync(id);
        return MapToGraphDto(flow);
    }

    public async Task<FlowDto> CreateAsync(CreateFlowRequest request)
    {
        var title = request.Title.Trim();
        if (string.IsNullOrWhiteSpace(title))
            throw new InvalidOperationException("Flow title is required.");

        var flow = new Flow
        {
            Id = Guid.NewGuid(),
            Title = title,
            Description = request.Description?.Trim(),
            IsActive = false
        };

        db.Flows.Add(flow);
        await db.SaveChangesAsync();

        return MapToDto(flow);
    }

    public async Task<FlowDto> UpdateAsync(Guid id, UpdateFlowRequest request)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        var title = request.Title.Trim();
        if (string.IsNullOrWhiteSpace(title))
            throw new InvalidOperationException("Flow title is required.");

        flow.Title = title;
        flow.Description = request.Description?.Trim();

        await db.SaveChangesAsync();

        return MapToDto(flow);
    }

    public async Task<AdminFlowGraphDto> SaveGraphAsync(Guid id, SaveFlowGraphRequest request)
    {
        var flow = await LoadGraphAsync(id);

        ValidateGraph(request);
        await ValidateOffersAsync(request.Nodes);

        flow.Title = request.Title.Trim();
        flow.Description = request.Description?.Trim();
        flow.UpdatedAt = DateTime.UtcNow;

        var requestNodeIds = request.Nodes.Select(n => n.Id).ToHashSet();
        var requestEdgeIds = request.Edges.Select(e => e.Id).ToHashSet();

        var existingNodes = flow.Nodes.ToDictionary(n => n.Id);
        var existingEdges = flow.Edges.ToDictionary(e => e.Id);

        var removedEdges = flow.Edges
            .Where(edge => !requestEdgeIds.Contains(edge.Id)
                || !requestNodeIds.Contains(edge.FromNodeId)
                || !requestNodeIds.Contains(edge.ToNodeId))
            .ToList();

        if (removedEdges.Count > 0)
            db.Edges.RemoveRange(removedEdges);

        var removedNodes = flow.Nodes
            .Where(node => !requestNodeIds.Contains(node.Id))
            .ToList();

        if (removedNodes.Count > 0)
            db.Nodes.RemoveRange(removedNodes);

        foreach (var nodeRequest in request.Nodes)
        {
            if (existingNodes.TryGetValue(nodeRequest.Id, out var existingNode))
            {
                db.NodeOptions.RemoveRange(existingNode.Options);
                UpdateNode(existingNode, nodeRequest);
            }
            else
            {
                var newNode = BuildNode(flow.Id, nodeRequest);
                flow.Nodes.Add(newNode);
                existingNodes[newNode.Id] = newNode;
            }
        }

        var priorityMap = BuildPriorityMap(request.Edges);

        foreach (var edgeRequest in request.Edges)
        {
            if (existingEdges.TryGetValue(edgeRequest.Id, out var existingEdge))
            {
                db.EdgeConditionGroups.RemoveRange(existingEdge.ConditionGroups);
                UpdateEdge(existingEdge, flow.Id, edgeRequest, priorityMap[edgeRequest.Id]);
            }
            else
            {
                var newEdge = BuildEdge(flow.Id, edgeRequest, priorityMap[edgeRequest.Id]);
                flow.Edges.Add(newEdge);
            }
        }

        await db.SaveChangesAsync();

        var savedFlow = await LoadGraphAsync(id);
        return MapToGraphDto(savedFlow);
    }

    public async Task DeleteAsync(Guid id)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        if (flow.IsActive)
            throw new InvalidOperationException("Cannot delete an active flow. Deactivate it first.");

        db.Flows.Remove(flow);
        await db.SaveChangesAsync();
    }

    public async Task ActivateAsync(Guid id)
    {
        var hasActiveFlow = await db.Flows.AnyAsync(f => f.IsActive && f.Id != id);

        if (hasActiveFlow)
            throw new InvalidOperationException("Another flow is already active. Deactivate it first.");

        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        flow.IsActive = true;
        await db.SaveChangesAsync();
    }

    public async Task DeactivateAsync(Guid id)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        if (!flow.IsActive)
            throw new InvalidOperationException($"Flow {id} is not active.");

        flow.IsActive = false;
        await db.SaveChangesAsync();
    }

    private async Task<Flow> LoadGraphAsync(Guid id)
    {
        var flow = await db.Flows
            .Include(f => f.Nodes)
            .ThenInclude(n => n.Options)
            .Include(f => f.Edges)
            .ThenInclude(e => e.ConditionGroups)
            .ThenInclude(g => g.Conditions)
            .FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        return flow;
    }

    private async Task ValidateOffersAsync(IEnumerable<SaveFlowGraphNodeRequest> nodes)
    {
        var offerIds = nodes
            .Where(n => string.Equals(n.Type, "offer", StringComparison.OrdinalIgnoreCase))
            .Select(n => n.OfferId)
            .Where(id => id.HasValue)
            .Select(id => id!.Value)
            .Distinct()
            .ToList();

        if (offerIds.Count == 0)
            return;

        var existing = await db.Offers
            .Where(o => offerIds.Contains(o.Id))
            .Select(o => o.Id)
            .ToListAsync();

        var missing = offerIds.Except(existing).ToList();
        if (missing.Count > 0)
            throw new KeyNotFoundException($"Offer(s) not found: {string.Join(", ", missing)}");
    }

    private static void ValidateGraph(SaveFlowGraphRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            throw new InvalidOperationException("Flow title is required.");

        if (request.Nodes.Count == 0)
            throw new InvalidOperationException("Flow must contain at least one node.");

        var duplicateNodeId = request.Nodes
            .GroupBy(node => node.Id)
            .FirstOrDefault(group => group.Key == Guid.Empty || group.Count() > 1);
        if (duplicateNodeId is not null)
            throw new InvalidOperationException("Node ids must be unique non-empty GUIDs.");

        var duplicateEdgeId = request.Edges
            .GroupBy(edge => edge.Id)
            .FirstOrDefault(group => group.Key == Guid.Empty || group.Count() > 1);
        if (duplicateEdgeId is not null)
            throw new InvalidOperationException("Edge ids must be unique non-empty GUIDs.");

        var nodeMap = request.Nodes.ToDictionary(n => n.Id);

        foreach (var edge in request.Edges)
        {
            if (!nodeMap.ContainsKey(edge.SourceNodeId) || !nodeMap.ContainsKey(edge.TargetNodeId))
                throw new InvalidOperationException("Each edge must connect existing nodes.");

            if (edge.SourceNodeId == edge.TargetNodeId)
                throw new InvalidOperationException("Edge cannot connect a node to itself.");

            foreach (var condition in edge.Conditions)
            {
                if (condition.Id == Guid.Empty)
                    throw new InvalidOperationException("Condition ids must be non-empty GUIDs.");

                if (string.IsNullOrWhiteSpace(condition.AttributeKey) || string.IsNullOrWhiteSpace(condition.Value))
                    throw new InvalidOperationException("Each condition must have an attribute key and value.");

                _ = ParseConditionOperator(condition.Operator);
            }
        }

        var incomingTargets = request.Edges.Select(e => e.TargetNodeId).ToHashSet();
        var startNodes = request.Nodes.Where(node => !incomingTargets.Contains(node.Id)).ToList();

        if (startNodes.Count != 1)
            throw new InvalidOperationException("Flow must have exactly one start node.");

        if (ParseNodeType(startNodes[0].Type) == NodeType.Offer)
            throw new InvalidOperationException("Flow cannot start with an offer node.");

        var outgoingMap = request.Edges
            .GroupBy(e => e.SourceNodeId)
            .ToDictionary(group => group.Key, group => group.ToList());

        foreach (var node in request.Nodes)
        {
            var nodeType = ParseNodeType(node.Type);

            if (string.IsNullOrWhiteSpace(node.Title))
                throw new InvalidOperationException($"Node {node.Id} must have a title.");

            if (nodeType == NodeType.Question)
            {
                if (string.IsNullOrWhiteSpace(node.Body))
                    throw new InvalidOperationException($"Question node {node.Id} must have body text.");

                if (string.IsNullOrWhiteSpace(node.AttributeKey))
                    throw new InvalidOperationException($"Question node {node.Id} must have an attribute key.");

                var inputType = ParseInputType(node.InputType);
                if (inputType is null)
                    throw new InvalidOperationException($"Question node {node.Id} must have an input type.");

                if (inputType != InputType.Text && inputType != InputType.Number && node.Options.Count == 0)
                    throw new InvalidOperationException($"Choice question node {node.Id} must have at least one option.");

                if (node.Options.Any(option => string.IsNullOrWhiteSpace(option.Label) || string.IsNullOrWhiteSpace(option.Value)))
                    throw new InvalidOperationException($"Question node {node.Id} has an option with empty label or value.");
            }

            if (nodeType == NodeType.Offer)
            {
                if (node.OfferId is null || node.OfferId == Guid.Empty)
                    throw new InvalidOperationException($"Offer node {node.Id} must reference an offer.");

                if (outgoingMap.TryGetValue(node.Id, out var outgoingOfferEdges) && outgoingOfferEdges.Count > 0)
                    throw new InvalidOperationException($"Offer node {node.Id} cannot have outgoing edges.");
            }
        }

        foreach (var terminalNode in request.Nodes.Where(node => !outgoingMap.ContainsKey(node.Id)))
        {
            if (ParseNodeType(terminalNode.Type) != NodeType.Offer)
                throw new InvalidOperationException($"Terminal node {terminalNode.Id} must be an offer node.");
        }
    }

    private static Dictionary<Guid, int> BuildPriorityMap(IEnumerable<SaveFlowGraphEdgeRequest> edges)
    {
        var map = new Dictionary<Guid, int>();

        foreach (var group in edges.GroupBy(edge => edge.SourceNodeId))
        {
            var index = 0;
            foreach (var edge in group)
            {
                map[edge.Id] = index++;
            }
        }

        return map;
    }

    private static Node BuildNode(Guid flowId, SaveFlowGraphNodeRequest request)
    {
        var node = new Node
        {
            Id = request.Id,
            FlowId = flowId,
            NodeType = ParseNodeType(request.Type),
            Title = request.Title.Trim(),
            Body = request.Body?.Trim(),
            InputType = ParseInputType(request.InputType),
            AttributeKey = request.AttributeKey?.Trim(),
            ImageUrl = request.ImageUrl?.Trim(),
            OfferId = request.OfferId,
            PositionX = request.PositionX,
            PositionY = request.PositionY,
        };

        node.Options = BuildNodeOptions(request.Options, node.Id);
        return node;
    }

    private static void UpdateNode(Node node, SaveFlowGraphNodeRequest request)
    {
        node.NodeType = ParseNodeType(request.Type);
        node.Title = request.Title.Trim();
        node.Body = request.Body?.Trim();
        node.InputType = ParseInputType(request.InputType);
        node.AttributeKey = request.AttributeKey?.Trim();
        node.ImageUrl = request.ImageUrl?.Trim();
        node.OfferId = request.OfferId;
        node.PositionX = request.PositionX;
        node.PositionY = request.PositionY;

        node.Options.Clear();
        node.Options = BuildNodeOptions(request.Options, node.Id);
    }

    private static List<NodeOption> BuildNodeOptions(IEnumerable<CreateNodeOptionRequest> options, Guid nodeId)
    {
        return options
            .Select((option, index) => new NodeOption
            {
                Id = Guid.NewGuid(),
                NodeId = nodeId,
                Label = option.Label.Trim(),
                Value = option.Value.Trim(),
                DisplayOrder = option.DisplayOrder != 0 ? option.DisplayOrder : index
            })
            .ToList();
    }

    private static Edge BuildEdge(Guid flowId, SaveFlowGraphEdgeRequest request, int priority)
    {
        return new Edge
        {
            Id = request.Id,
            FlowId = flowId,
            FromNodeId = request.SourceNodeId,
            ToNodeId = request.TargetNodeId,
            Priority = priority,
            ConditionGroups = BuildConditionGroups(request.Conditions)
        };
    }

    private static void UpdateEdge(Edge edge, Guid flowId, SaveFlowGraphEdgeRequest request, int priority)
    {
        edge.FlowId = flowId;
        edge.FromNodeId = request.SourceNodeId;
        edge.ToNodeId = request.TargetNodeId;
        edge.Priority = priority;
        edge.ConditionGroups = BuildConditionGroups(request.Conditions);
    }

    private static List<EdgeConditionGroup> BuildConditionGroups(IEnumerable<SaveFlowGraphConditionRequest> conditions)
    {
        var items = conditions.ToList();
        if (items.Count == 0)
            return [];

        return
        [
            new EdgeConditionGroup
            {
                Id = Guid.NewGuid(),
                Conditions = items.Select(condition => new EdgeCondition
                {
                    Id = condition.Id,
                    AttributeKey = condition.AttributeKey.Trim(),
                    Operator = ParseConditionOperator(condition.Operator),
                    Value = condition.Value.Trim()
                }).ToList()
            }
        ];
    }

    private static AdminFlowGraphDto MapToGraphDto(Flow flow)
    {
        return new AdminFlowGraphDto
        {
            Id = flow.Id,
            Title = flow.Title,
            Description = flow.Description,
            IsActive = flow.IsActive,
            UpdatedAt = flow.UpdatedAt,
            Nodes = flow.Nodes
                .OrderBy(node => node.CreatedAt)
                .Select(MapToGraphNodeDto)
                .ToList(),
            Edges = flow.Edges
                .OrderBy(edge => edge.FromNodeId)
                .ThenBy(edge => edge.Priority)
                .Select(MapToGraphEdgeDto)
                .ToList()
        };
    }

    private static AdminFlowGraphNodeDto MapToGraphNodeDto(Node node)
    {
        return new AdminFlowGraphNodeDto
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
                .OrderBy(option => option.DisplayOrder)
                .Select(option => new NodeOptionDto
                {
                    Id = option.Id,
                    Label = option.Label,
                    Value = option.Value,
                    Order = option.DisplayOrder
                })
                .ToList()
        };
    }

    private static AdminFlowGraphEdgeDto MapToGraphEdgeDto(Edge edge)
    {
        return new AdminFlowGraphEdgeDto
        {
            Id = edge.Id,
            SourceNodeId = edge.FromNodeId,
            TargetNodeId = edge.ToNodeId,
            Priority = edge.Priority,
            Conditions = edge.ConditionGroups
                .OrderBy(group => group.CreatedAt)
                .SelectMany(group => group.Conditions)
                .OrderBy(condition => condition.CreatedAt)
                .Select(condition => new ConditionDto
                {
                    Id = condition.Id,
                    AttributeKey = condition.AttributeKey,
                    Operator = condition.Operator.ToString(),
                    Value = condition.Value
                })
                .ToList()
        };
    }

    private static FlowDto MapToDto(Flow flow) => new()
    {
        Id = flow.Id,
        Title = flow.Title,
        Description = flow.Description,
        IsActive = flow.IsActive,
        UpdatedAt = flow.UpdatedAt
    };

    private static NodeType ParseNodeType(string type)
    {
        return type.Trim().ToLowerInvariant() switch
        {
            "question" => NodeType.Question,
            "info" or "info_page" => NodeType.Info,
            "offer" => NodeType.Offer,
            _ => throw new InvalidOperationException($"Unsupported node type '{type}'.")
        };
    }

    private static InputType? ParseInputType(string? inputType)
    {
        if (string.IsNullOrWhiteSpace(inputType))
            return null;

        return inputType.Trim().ToLowerInvariant() switch
        {
            "single" or "singlechoice" or "single_choice" => InputType.SingleChoice,
            "multi" or "multiplechoice" or "multiple_choice" => InputType.MultipleChoice,
            "input" or "text" => InputType.Text,
            "number" => InputType.Number,
            _ => Enum.Parse<InputType>(inputType, true)
        };
    }

    private static ConditionOperator ParseConditionOperator(string value)
    {
        return value.Trim().ToLowerInvariant() switch
        {
            "eq" => ConditionOperator.Eq,
            "neq" or "noteq" => ConditionOperator.NotEq,
            "in" => ConditionOperator.In,
            "nin" => ConditionOperator.Nin,
            "gt" => ConditionOperator.Gt,
            "gte" => ConditionOperator.Gte,
            "lt" => ConditionOperator.Lt,
            "lte" => ConditionOperator.Lte,
            "contains" => ConditionOperator.Contains,
            _ => throw new InvalidOperationException($"Unsupported condition operator '{value}'.")
        };
    }
}
