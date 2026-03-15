using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WellnessBuilder.Admin.Api.Contracts.Flows;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/flows")]
[Produces("application/json")]
public class FlowsController(IFlowService flowService) : ControllerBase
{
    /// <summary>
    /// Returns all flows
    /// </summary>
    [HttpGet]
    [SwaggerOperation(Summary = "Get all flows")]
    [ProducesResponseType(typeof(List<FlowDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetAll()
    {
        var flows = await flowService.GetAllAsync();
        return Ok(flows);
    }

    /// <summary>
    /// Returns a flow by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get flow by ID")]
    [ProducesResponseType(typeof(FlowDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var flow = await flowService.GetByIdAsync(id);
        return Ok(flow);
    }

    /// <summary>
    /// Returns the full editor graph for a flow
    /// </summary>
    [HttpGet("{id:guid}/graph")]
    [SwaggerOperation(Summary = "Get flow graph")]
    [ProducesResponseType(typeof(AdminFlowGraphDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetGraph(Guid id)
    {
        var flow = await flowService.GetGraphAsync(id);
        return Ok(flow);
    }

    /// <summary>
    /// Creates a new flow
    /// </summary>
    [HttpPost]
    [SwaggerOperation(Summary = "Create flow", Description = "Creates a new inactive flow. Use /activate to make it active")]
    [ProducesResponseType(typeof(FlowDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateFlowRequest request)
    {
        var flow = await flowService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = flow.Id }, flow);
    }

    /// <summary>
    /// Updates an existing flow
    /// </summary>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Update flow")]
    [ProducesResponseType(typeof(FlowDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFlowRequest request)
    {
        var flow = await flowService.UpdateAsync(id, request);
        return Ok(flow);
    }

    /// <summary>
    /// Saves the full editor graph for a flow
    /// </summary>
    [HttpPut("{id:guid}/graph")]
    [SwaggerOperation(Summary = "Save flow graph")]
    [ProducesResponseType(typeof(AdminFlowGraphDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SaveGraph(Guid id, [FromBody] SaveFlowGraphRequest request)
    {
        var flow = await flowService.SaveGraphAsync(id, request);
        return Ok(flow);
    }

    /// <summary>
    /// Deletes a flow. Cannot delete an active flow
    /// </summary>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete flow")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await flowService.DeleteAsync(id);
        return NoContent();
    }

    /// <summary>
    /// Activates a flow. Only one flow can be active at a time
    /// </summary>
    [HttpPost("{id:guid}/activate")]
    [SwaggerOperation(Summary = "Activate flow", Description = "Makes the flow active. Deactivate the current active flow first")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Activate(Guid id)
    {
        await flowService.ActivateAsync(id);
        return NoContent();
    }

    /// <summary>
    /// Deactivates a flow
    /// </summary>
    [HttpPost("{id:guid}/deactivate")]
    [SwaggerOperation(Summary = "Deactivate flow")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Deactivate(Guid id)
    {
        await flowService.DeactivateAsync(id);
        return NoContent();
    }
}
