using WellnessBuilder.Shared.Entities.Offers;

namespace WellnessBuilder.User.Api.IServices;

public interface IOfferResolver
{
    Task<List<Offer>> ResolveAsync(Dictionary<string, string> context);
}