using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.Services;

public interface IEdgeService
{
    Task<EdgeDto> CreateAsync(CreateEdgeRequest request);
    Task DeleteAsync(Guid id);
    Task<EdgeDto> AddConditionGroupAsync(Guid edgeId, CreateConditionGroupRequest request);
    Task DeleteConditionGroupAsync(Guid groupId);
}