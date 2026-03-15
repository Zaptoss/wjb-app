using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Contracts.Offers;
using WellnessBuilder.Shared.Contracts.Sessions;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Entities.Nodes;
using WellnessBuilder.Shared.Entities.Offers;
using WellnessBuilder.Shared.Entities.Sessions;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;
using WellnessBuilder.User.Api.IServices;

namespace WellnessBuilder.User.Api.Services;

public class SessionService(
    AppDbContext db,
    IRuleEngine ruleEngine) : ISessionService
{
    public async Task<CreateSessionResponse> CreateAsync()
    {
        var firstNode = await db.Nodes
            .Include(n => n.Options)
            .Where(n => n.Flow.IsActive && n.NodeType != NodeType.Offer && !db.Edges.Any(e=> e.ToNodeId == n.Id && e.FlowId == n.FlowId))
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
            var existingAnswer = session.Answers
                .FirstOrDefault(a => a.AttributeKey == node.AttributeKey);

            if (existingAnswer is null)
            {
                db.Answers.Add(new Answer
                {
                    Id = Guid.NewGuid(),
                    SessionId = sessionId,
                    NodeId = request.NodeId,
                    AttributeKey = node.AttributeKey,
                    Value = request.Value
                });
            }
            else
            {
                existingAnswer.NodeId = request.NodeId;
                existingAnswer.Value = request.Value;
            }

            await db.SaveChangesAsync();

            await db.Entry(session).Collection(s => s.Answers).LoadAsync();
        }

        var context = session.Answers
            .Where(a => !string.IsNullOrEmpty(a.AttributeKey))
            .GroupBy(a => a.AttributeKey)
            .ToDictionary(
                group => group.Key,
                group => group
                    .OrderByDescending(a => a.UpdatedAt)
                    .ThenByDescending(a => a.CreatedAt)
                    .First()
                    .Value);

        var nextNode = await ruleEngine.GetNextNodeAsync(request.NodeId, context);

        if (nextNode is null)
        {
            session.CompletedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();

            return new SessionStepResponse
            {
                Completed = true,
                Offers = []
            };
        }

        if (nextNode.NodeType == NodeType.Offer)
        {
            if (nextNode.OfferId is null)
                throw new InvalidOperationException($"Offer node {nextNode.Id} has no linked offer");

            var offer = await db.Offers.FirstOrDefaultAsync(o => o.Id == nextNode.OfferId.Value);
            if (offer is null)
                throw new KeyNotFoundException($"Offer {nextNode.OfferId.Value} not found");

            session.CompletedAt = DateTime.UtcNow;
            db.SessionOffers.Add(new SessionOffer
            {
                Id = Guid.NewGuid(),
                SessionId = sessionId,
                OfferId = offer.Id,
                AssignedAt = DateTime.UtcNow
            });

            await db.SaveChangesAsync();

            return new SessionStepResponse
            {
                Completed = true,
                Offers =
                [
                    new OfferDto
                    {
                        Id = offer.Id,
                        Name = offer.Name,
                        Description = offer.Description,
                        DigitalPlanDetails = offer.DigitalPlanDetails,
                        WellnessKitDetails = offer.WellnessKitDetails,
                        Why = BuildWhy(offer, context),
                        UpdatedAt = offer.UpdatedAt
                    }
                ]
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
        if (!string.IsNullOrWhiteSpace(offer.Why))
            return offer.Why;

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
