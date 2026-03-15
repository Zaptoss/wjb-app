using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.Contracts.Flows;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Entities.Edges;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class FlowService(AppDbContext db) : IFlowService
{
    public async Task<List<FlowDto>> GetAllAsync()
    {
        return await db.Flows
            .OrderByDescending(f => f.UpdatedAt)
            .Select(f => MapToDto(f))
            .ToListAsync();
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
            Description = request.Description?.Trim() ?? "",
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
        flow.Description = request.Description?.Trim() ?? "";

        await db.SaveChangesAsync();

        return MapToDto(flow);
    }

    public async Task<AdminFlowGraphDto> SaveGraphAsync(Guid id, SaveFlowGraphRequest request)
    {
        var flow = await LoadGraphAsync(id);

        ValidateGraph(request);

        flow.Title = request.Title.Trim();
        flow.Description = request.Description?.Trim() ?? "";
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
                var newOptions = BuildNodeOptions(nodeRequest.Options, existingNode.Id);
                db.NodeOptions.AddRange(newOptions);
            }
            else
            {
                var newNode = BuildNode(flow.Id, nodeRequest);
                db.Nodes.Add(newNode);
                existingNodes[newNode.Id] = newNode;
            }
        }

        var priorityMap = BuildPriorityMap(request.Edges);

        foreach (var edgeRequest in request.Edges)
        {
            if (existingEdges.TryGetValue(edgeRequest.Id, out var existingEdge))
            {
                foreach (var group in existingEdge.ConditionGroups)
                    db.EdgeConditions.RemoveRange(group.Conditions);
                db.EdgeConditionGroups.RemoveRange(existingEdge.ConditionGroups);
                UpdateEdge(existingEdge, flow.Id, edgeRequest, priorityMap[edgeRequest.Id]);
                var newGroups = BuildConditionGroups(edgeRequest.Conditions);
                foreach (var group in newGroups)
                {
                    group.EdgeId = existingEdge.Id;
                    db.EdgeConditionGroups.Add(group);
                    db.EdgeConditions.AddRange(group.Conditions);
                }
            }
            else
            {
                var newEdge = BuildEdge(flow.Id, edgeRequest, priorityMap[edgeRequest.Id]);
                db.Edges.Add(newEdge);
            }
        }

        await db.SaveChangesAsync();

        var savedFlow = await LoadGraphAsync(id);
        return MapToGraphDto(savedFlow);
    }

    public async Task DeleteAsync(Guid id)
    {
        var flow = await LoadGraphAsync(id);

        if (flow.IsActive)
            throw new InvalidOperationException("Cannot delete an active flow. Deactivate it first.");

        foreach (var edge in flow.Edges)
        {
            db.EdgeConditionGroups.RemoveRange(edge.ConditionGroups);
        }

        db.Edges.RemoveRange(flow.Edges);

        foreach (var node in flow.Nodes)
        {
            db.NodeOptions.RemoveRange(node.Options);
        }

        db.Nodes.RemoveRange(flow.Nodes);
        db.Flows.Remove(flow);
        await db.SaveChangesAsync();
    }

    public async Task ActivateAsync(Guid id)
    {
        var hasActiveFlow = await db.Flows.AnyAsync(f => f.IsActive && f.Id != id);

        if (hasActiveFlow)
            throw new InvalidOperationException("Another flow is already active. Deactivate it first.");

        var flow = await LoadGraphAsync(id);

        ValidateFlowForActivation(flow);
        await ValidateOffersForActivationAsync(flow.Nodes);

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

    private async Task ValidateOffersForActivationAsync(IEnumerable<Node> nodes)
    {
        var offerIds = nodes
            .Where(n => n.NodeType == NodeType.Offer)
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
            throw new InvalidOperationException($"Offer(s) not found: {string.Join(", ", missing)}");
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

        var nodeIds = request.Nodes.Select(n => n.Id).ToHashSet();

        foreach (var edge in request.Edges)
        {
            if (!nodeIds.Contains(edge.SourceNodeId) || !nodeIds.Contains(edge.TargetNodeId))
                throw new InvalidOperationException("Each edge must connect existing nodes.");

            if (edge.SourceNodeId == edge.TargetNodeId)
                throw new InvalidOperationException("Edge cannot connect a node to itself.");
        }

        foreach (var node in request.Nodes)
        {
            _ = ParseNodeType(node.Type);
        }
    }

    private static void ValidateFlowForActivation(Flow flow)
    {
        if (flow.Nodes.Count == 0)
            throw new InvalidOperationException("Cannot activate an empty flow. Add at least one node.");

        var incomingTargets = flow.Edges.Select(e => e.ToNodeId).ToHashSet();
        var startNodes = flow.Nodes.Where(n => !incomingTargets.Contains(n.Id)).ToList();

        if (startNodes.Count != 1)
            throw new InvalidOperationException("Flow must have exactly one start node (a node with no incoming edges).");

        if (startNodes[0].NodeType == NodeType.Offer)
            throw new InvalidOperationException("Flow cannot start with an offer node.");

        var outgoingSources = flow.Edges.Select(e => e.FromNodeId).ToHashSet();

        foreach (var node in flow.Nodes)
        {
            var isTerminal = !outgoingSources.Contains(node.Id);

            if (isTerminal && node.NodeType != NodeType.Offer)
                throw new InvalidOperationException(
                    $"Node \"{node.Title}\" is a dead end — all paths must lead to an offer node.");

            if (node.NodeType == NodeType.Offer)
            {
                if (node.OfferId is null || node.OfferId == Guid.Empty)
                    throw new InvalidOperationException(
                        $"Offer node \"{node.Title}\" has no offer selected.");

                if (outgoingSources.Contains(node.Id))
                    throw new InvalidOperationException(
                        $"Offer node \"{node.Title}\" cannot have outgoing edges.");
            }

            if (node.NodeType == NodeType.Question)
            {
                if (string.IsNullOrWhiteSpace(node.AttributeKey))
                    throw new InvalidOperationException(
                        $"Question node \"{node.Title}\" is missing an attribute key.");

                if (node.InputType is null)
                    throw new InvalidOperationException(
                        $"Question node \"{node.Title}\" is missing an input type.");
            }
        }

        // Verify all nodes are reachable from the start node
        var startNode = startNodes[0];
        var adjacency = flow.Edges
            .GroupBy(e => e.FromNodeId)
            .ToDictionary(g => g.Key, g => g.Select(e => e.ToNodeId).ToList());

        var visited = new HashSet<Guid>();
        var queue = new Queue<Guid>();
        queue.Enqueue(startNode.Id);
        visited.Add(startNode.Id);

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            if (!adjacency.TryGetValue(current, out var neighbors)) continue;
            foreach (var neighbor in neighbors)
            {
                if (visited.Add(neighbor))
                    queue.Enqueue(neighbor);
            }
        }

        var unreachable = flow.Nodes.Where(n => !visited.Contains(n.Id)).ToList();
        if (unreachable.Count > 0)
            throw new InvalidOperationException(
                $"Node(s) not reachable from start: {string.Join(", ", unreachable.Select(n => $"\"{n.Title}\""))}. All nodes must be connected.");
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
                    Id = Guid.NewGuid(),
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
