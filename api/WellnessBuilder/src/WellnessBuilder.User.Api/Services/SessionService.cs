using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Contracts.Offers;
using WellnessBuilder.Shared.Contracts.Sessions;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.User.Api.Services;

public class SessionService(
    AppDbContext db,
    IRuleEngine ruleEngine,
    IOfferResolver offerResolver) : ISessionService
{
    public async Task<CreateSessionResponse> CreateAsync()
    {
        var firstNode = await db.Nodes
            .Include(n => n.Options)
            .Where(n => !db.Edges.Any(e => e.ToNodeId == n.Id))
            .OrderBy(n => n.DisplayOrder)
            .FirstOrDefaultAsync();

        if (firstNode is null)
            throw new InvalidOperationException("Graph has no starting node");

        var session = new Session
        {
            Id = Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow
        };

        db.Sessions.Add(session);
        await db.SaveChangesAsync();

        return new CreateSessionResponse
        {
            SessionId = session.Id,
            Node = MapToNodeDto(firstNode)
        };
    }

    public async Task<SessionStepResponse> SubmitAnswerAsync(Guid sessionId, AnswerRequest request)
    {
        var session = await db.Sessions
            .Include(s => s.Answers)
            .FirstOrDefaultAsync(s => s.Id == sessionId);

        if (session is null)
            throw new KeyNotFoundException($"Session {sessionId} not found");

        if (session.CompletedAt is not null)
            throw new InvalidOperationException("Session is already completed");

        var node = await db.Nodes.FirstOrDefaultAsync(n => n.Id == request.NodeId);

        if (node is null)
            throw new KeyNotFoundException($"Node {request.NodeId} not found");

        if (node.NodeType == NodeType.Question && node.AttributeKey is not null)
        {
            var answer = new Answer
            {
                Id = Guid.NewGuid(),
                SessionId = sessionId,
                NodeId = request.NodeId,
                AttributeKey = node.AttributeKey,
                Value = request.Value
            };

            db.Answers.Add(answer);
            await db.SaveChangesAsync();

            await db.Entry(session).Collection(s => s.Answers).LoadAsync();
        }

        var context = session.Answers
            .Where(a => !string.IsNullOrEmpty(a.AttributeKey))
            .ToDictionary(a => a.AttributeKey, a => a.Value);

        var nextNode = await ruleEngine.GetNextNodeAsync(request.NodeId, context);

        if (nextNode is null)
        {
            var offers = await offerResolver.ResolveAsync(context);

            session.CompletedAt = DateTime.UtcNow;
            session.AssignedOffers = offers.Select(o => new SessionOffer
            {
                Id = Guid.NewGuid(),
                SessionId = sessionId,
                OfferId = o.Id,
                AssignedAt = DateTime.UtcNow
            }).ToList();

            await db.SaveChangesAsync();

            return new SessionStepResponse
            {
                Completed = true,
                Offers = offers.Select(o => new OfferDto
                {
                    Id = o.Id,
                    Name = o.Name,
                    Description = o.Description,
                    DigitalPlanDetails = o.DigitalPlanDetails,
                    WellnessKitDetails = o.WellnessKitDetails,
                    Why = BuildWhy(o, context)
                }).ToList()
            };
        }

        return new SessionStepResponse
        {
            Completed = false,
            Node = MapToNodeDto(nextNode)
        };
    }

    private static string BuildWhy(Offer offer, Dictionary<string, string> context)
    {
        var parts = new List<string>();

        if (context.TryGetValue("goal", out var goal))
            parts.Add($"ціль: {goal}");

        if (context.TryGetValue("location", out var location))
            parts.Add($"місце: {location}");

        return parts.Any()
            ? $"Підібрано на основі: {string.Join(", ", parts)}"
            : "Підібрано індивідуально для вас";
    }

    private static NodeDto MapToNodeDto(Node node)
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