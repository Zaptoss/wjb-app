using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Offers;
using WellnessBuilder.Shared.Entities.Offers;
using WellnessBuilder.Shared.Enums;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class OfferService(AppDbContext db) : IOfferService
{
    public async Task<List<OfferDto>> GetAllAsync()
    {
        return await db.Offers
            .Include(r => r.ConditionGroups)
            .ThenInclude(g => g.Conditions)
            .Select(o => MapToDto(o))
            .ToListAsync();
    }

    public async Task<OfferDto> GetByIdAsync(Guid id)
    {
        var offer = await db.Offers
            .Include(o => o.ConditionGroups)
            .ThenInclude(g => g.Conditions)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (offer is null)
            throw new KeyNotFoundException($"Offer {id} not found");

        return MapToDto(offer);
    }

    public async Task<OfferDto> CreateAsync(CreateOfferRequest request)
    {
        var offer = new Offer
        {
            Id = Guid.NewGuid(),
            FlowId = request.FlowId,
            Name = request.Name,
            Description = request.Description,
            DigitalPlanDetails = request.DigitalPlanDetails,
            WellnessKitDetails = request.WellnessKitDetails,
            ConditionGroups = request.ConditionGroups.Select(g => new OfferConditionGroup
            {
                Id = Guid.NewGuid(),
                Conditions = g.Conditions.Select(c => new OfferCondition
                {
                    Id = Guid.NewGuid(),
                    AttributeKey = c.AttributeKey,
                    Operator = Enum.Parse<ConditionOperator>(c.Operator, ignoreCase: true),
                    Value = c.Value
                }).ToList()
            }).ToList()
        };

        db.Offers.Add(offer);
        await db.SaveChangesAsync();

        return MapToDto(offer);
    }

    public async Task<OfferDto> UpdateAsync(Guid id, UpdateOfferRequest request)
    {
        var offer = await db.Offers
            .Include(r => r.ConditionGroups)
            .ThenInclude(g => g.Conditions)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (offer is null)
            throw new KeyNotFoundException($"Offer {id} not found");

        offer.Name = request.Name;
        offer.Description = request.Description;
        offer.DigitalPlanDetails = request.DigitalPlanDetails;
        offer.WellnessKitDetails = request.WellnessKitDetails;

        db.OfferConditionGroups.RemoveRange(offer.ConditionGroups);
        offer.ConditionGroups = request.ConditionGroups.Select(g => new OfferConditionGroup
        {
            Id = Guid.NewGuid(),
            OfferId = id,
            Conditions = g.Conditions.Select(c => new OfferCondition
            {
                Id = Guid.NewGuid(),
                AttributeKey = c.AttributeKey,
                Operator = Enum.Parse<ConditionOperator>(c.Operator, true),
                Value = c.Value
            }).ToList()
        }).ToList();

        await db.SaveChangesAsync();

        return MapToDto(offer);
    }

    public async Task DeleteAsync(Guid id)
    {
        var offer = await db.Offers.FirstOrDefaultAsync(o => o.Id == id);

        if (offer is null)
            throw new KeyNotFoundException($"Offer {id} not found");

        db.Offers.Remove(offer);
        await db.SaveChangesAsync();
    }

    private static OfferDto MapToDto(Offer offer)
    {
        return new OfferDto
        {
            Id = offer.Id,
            Name = offer.Name,
            Description = offer.Description,
            DigitalPlanDetails = offer.DigitalPlanDetails,
            WellnessKitDetails = offer.WellnessKitDetails
        };
    }
}