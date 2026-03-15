using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/edges")]
[Produces("application/json")]
public class EdgesController(IEdgeService edgeService) : ControllerBase
{
    /// <summary>
    /// Creates a new edge between two nodes with optional transition conditions
    /// </summary>
    [HttpPost]
    [SwaggerOperation(Summary = "Create edge", Description = "Connects two nodes. If no condition groups are provided, the edge acts as a fallback transition")]
    [ProducesResponseType(typeof(EdgeDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Create([FromBody] CreateEdgeRequest request)
    {
        var edge = await edgeService.CreateAsync(request);
        return CreatedAtAction(nameof(Create), new { id = edge.Id }, edge);
    }

    /// <summary>
    /// Deletes an edge and all its condition groups
    /// </summary>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete edge")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await edgeService.DeleteAsync(id);
        return NoContent();
    }

    /// <summary>
    /// Adds a condition group to an existing edge
    /// </summary>
    [HttpPost("{edgeId:guid}/condition-groups")]
    [SwaggerOperation(Summary = "Add condition group", Description = "Adds an AND group of conditions to an edge. Multiple groups are evaluated with OR logic")]
    [ProducesResponseType(typeof(EdgeDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddConditionGroup(
        Guid edgeId,
        [FromBody] CreateConditionGroupRequest request)
    {
        var edge = await edgeService.AddConditionGroupAsync(edgeId, request);
        return Ok(edge);
    }

    /// <summary>
    /// Deletes a condition group and all its conditions
    /// </summary>
    [HttpDelete("condition-groups/{groupId:guid}")]
    [SwaggerOperation(Summary = "Delete condition group")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteConditionGroup(Guid groupId)
    {
        await edgeService.DeleteConditionGroupAsync(groupId);
        return NoContent();
    }
}