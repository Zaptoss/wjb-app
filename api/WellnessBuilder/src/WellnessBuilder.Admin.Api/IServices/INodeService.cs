using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.IServices;

public interface INodeService
{
    Task<List<NodeDto>> GetAllAsync(Guid flowId);
    Task<NodeDto> GetByIdAsync(Guid id);
    Task<NodeDto> CreateAsync(CreateNodeRequest request);
    Task<NodeDto> UpdateAsync(Guid id, UpdateNodeRequest request);
    Task DeleteAsync(Guid id);
}