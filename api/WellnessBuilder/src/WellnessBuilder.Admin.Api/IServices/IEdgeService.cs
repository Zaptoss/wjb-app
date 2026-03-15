using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.IServices;

public interface IEdgeService
{
    Task<List<EdgeDto>> GetAllAsync(Guid flowId);
    Task<EdgeDto> CreateAsync(CreateEdgeRequest request);
    Task DeleteAsync(Guid id);
    Task<EdgeDto> AddConditionGroupAsync(Guid edgeId, CreateConditionGroupRequest request);
    Task DeleteConditionGroupAsync(Guid groupId);
}