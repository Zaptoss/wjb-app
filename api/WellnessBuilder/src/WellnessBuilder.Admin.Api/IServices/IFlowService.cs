using WellnessBuilder.Admin.Api.Contracts.Flows;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Common;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.IServices;

public interface IFlowService
{
    Task<PagedResponse<FlowDto>> GetAllAsync(PagedRequest request);
    Task<FlowDto> GetByIdAsync(Guid id);
    Task<FlowDto> CreateAsync(CreateFlowRequest request);
    Task<FlowDto> UpdateAsync(Guid id, UpdateFlowRequest request);
    Task<AdminFlowGraphDto> GetGraphAsync(Guid id);
    Task<AdminFlowGraphDto> SaveGraphAsync(Guid id, SaveFlowGraphRequest request);
    Task DeleteAsync(Guid id);
    Task ActivateAsync(Guid id);
    Task DeactivateAsync(Guid id);
}
