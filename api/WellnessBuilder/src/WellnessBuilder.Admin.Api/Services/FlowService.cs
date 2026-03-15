using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;
using WellnessBuilder.Shared.Entities;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class FlowService(AppDbContext db) : IFlowService
{
    public async Task<List<FlowDto>> GetAllAsync()
    {
        return await db.Flows
            .Select(f => MapToDto(f))
            .ToListAsync();
    }

    public async Task<FlowDto> GetByIdAsync(Guid id)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        return MapToDto(flow);
    }

    public async Task<FlowDto> CreateAsync(CreateFlowRequest request)
    {
        var flow = new Flow
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Description = request.Description,
            IsActive = false
        };

        db.Flows.Add(flow);
        await db.SaveChangesAsync();

        return MapToDto(flow);
    }

    public async Task<FlowDto> UpdateAsync(Guid id, UpdateFlowRequest request)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        flow.Title = request.Title;
        flow.Description = request.Description;

        await db.SaveChangesAsync();

        return MapToDto(flow);
    }

    public async Task DeleteAsync(Guid id)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        if (flow.IsActive)
            throw new InvalidOperationException("Cannot delete an active flow. Deactivate it first.");

        db.Flows.Remove(flow);
        await db.SaveChangesAsync();
    }

    public async Task ActivateAsync(Guid id)
    {
        var hasActiveFlow = await db.Flows.AnyAsync(f => f.IsActive && f.Id != id);

        if (hasActiveFlow)
            throw new InvalidOperationException("Another flow is already active. Deactivate it first.");

        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        flow.IsActive = true;
        await db.SaveChangesAsync();
    }

    public async Task DeactivateAsync(Guid id)
    {
        var flow = await db.Flows.FirstOrDefaultAsync(f => f.Id == id);

        if (flow is null)
            throw new KeyNotFoundException($"Flow {id} not found");

        if (!flow.IsActive)
            throw new InvalidOperationException($"Flow {id} is not active.");

        flow.IsActive = false;
        await db.SaveChangesAsync();
    }

    private static FlowDto MapToDto(Flow flow) => new()
    {
        Id = flow.Id,
        Title = flow.Title,
        Description = flow.Description,
        IsActive = flow.IsActive
    };
}