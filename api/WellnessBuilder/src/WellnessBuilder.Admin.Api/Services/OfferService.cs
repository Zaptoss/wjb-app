using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Offers;
using WellnessBuilder.Shared.Entities.Offers;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class OfferService(AppDbContext db) : IOfferService
{
    public async Task<List<OfferDto>> GetAllAsync()
    {
        return await db.Offers
            .Select(o => MapToDto(o))
            .ToListAsync();
    }

    public async Task<OfferDto> GetByIdAsync(Guid id)
    {
        var offer = await db.Offers.FirstOrDefaultAsync(o => o.Id == id);

        if (offer is null)
            throw new KeyNotFoundException($"Offer {id} not found");

        return MapToDto(offer);
    }

    public async Task<OfferDto> CreateAsync(CreateOfferRequest request)
    {
        var offer = new Offer
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            DigitalPlanDetails = request.DigitalPlanDetails,
            WellnessKitDetails = request.WellnessKitDetails,
            Why = request.Why
        };

        db.Offers.Add(offer);
        await db.SaveChangesAsync();

        return MapToDto(offer);
    }

    public async Task<OfferDto> UpdateAsync(Guid id, UpdateOfferRequest request)
    {
        var offer = await db.Offers.FirstOrDefaultAsync(o => o.Id == id);

        if (offer is null)
            throw new KeyNotFoundException($"Offer {id} not found");

        offer.Name = request.Name;
        offer.Description = request.Description;
        offer.DigitalPlanDetails = request.DigitalPlanDetails;
        offer.WellnessKitDetails = request.WellnessKitDetails;
        offer.Why = request.Why;

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
            WellnessKitDetails = offer.WellnessKitDetails,
            Why = offer.Why,
            UpdatedAt = offer.UpdatedAt
        };
    }
}
