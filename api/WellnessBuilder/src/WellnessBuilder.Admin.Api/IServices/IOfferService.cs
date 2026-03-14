using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Offers;

namespace WellnessBuilder.Admin.Api.Services;

public interface IOfferService
{
    Task<List<OfferDto>> GetAllAsync();
    Task<OfferDto> GetByIdAsync(Guid id);
    Task<OfferDto> CreateAsync(CreateOfferRequest request);
    Task<OfferDto> UpdateAsync(Guid id, UpdateOfferRequest request);
    Task DeleteAsync(Guid id);
}