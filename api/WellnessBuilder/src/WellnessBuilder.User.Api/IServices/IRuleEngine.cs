using WellnessBuilder.Shared.Entities.Nodes;

namespace WellnessBuilder.User.Api.IServices;

public interface IRuleEngine
{
    Task<Node?> GetNextNodeAsync(Guid currentNodeId, Dictionary<string, string> context);
}