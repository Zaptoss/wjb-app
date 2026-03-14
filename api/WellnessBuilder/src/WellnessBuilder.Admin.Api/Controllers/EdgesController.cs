using Microsoft.AspNetCore.Mvc;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;

namespace WellnessBuilder.Admin.Api.Controllers;

[ApiController]
[Route("api/admin/edges")]
public class EdgesController : ControllerBase
{
    private readonly IEdgeService _edgeService;

    public EdgesController(IEdgeService edgeService)
    {
        _edgeService = edgeService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateEdgeRequest request)
    {
        var edge = await _edgeService.CreateAsync(request);
        return CreatedAtAction(nameof(Create), new { id = edge.Id }, edge);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _edgeService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{edgeId:guid}/condition-groups")]
    public async Task<IActionResult> AddConditionGroup(
        Guid edgeId,
        CreateConditionGroupRequest request)
    {
        var edge = await _edgeService.AddConditionGroupAsync(edgeId, request);
        return Ok(edge);
    }

    [HttpDelete("condition-groups/{groupId:guid}")]
    public async Task<IActionResult> DeleteConditionGroup(Guid groupId)
    {
        await _edgeService.DeleteConditionGroupAsync(groupId);
        return NoContent();
    }
}