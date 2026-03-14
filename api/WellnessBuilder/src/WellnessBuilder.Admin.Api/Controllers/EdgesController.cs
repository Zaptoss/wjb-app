using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;

namespace WellnessBuilder.Admin.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/edges")]
public class EdgesController(IEdgeService edgeService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateEdgeRequest request)
    {
        var edge = await edgeService.CreateAsync(request);
        return CreatedAtAction(nameof(Create), new { id = edge.Id }, edge);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await edgeService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{edgeId:guid}/condition-groups")]
    public async Task<IActionResult> AddConditionGroup(
        Guid edgeId,
        CreateConditionGroupRequest request)
    {
        var edge = await edgeService.AddConditionGroupAsync(edgeId, request);
        return Ok(edge);
    }

    [HttpDelete("condition-groups/{groupId:guid}")]
    public async Task<IActionResult> DeleteConditionGroup(Guid groupId)
    {
        await edgeService.DeleteConditionGroupAsync(groupId);
        return NoContent();
    }
}