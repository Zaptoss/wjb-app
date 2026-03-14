using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.User.Api.Services;

public interface IOfferResolver
{
    Task<List<Offer>> ResolveAsync(Dictionary<string, string> context);
}