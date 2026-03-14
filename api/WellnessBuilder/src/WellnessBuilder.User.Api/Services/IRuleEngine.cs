using WellnessBuilder.Shared.Entities;

namespace WellnessBuilder.User.Api.Services;

public interface IRuleEngine
{
    Task<Node?> GetNextNodeAsync(Guid currentNodeId, Dictionary<string, string> context);
}