using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;

namespace WellnessBuilder.Admin.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/nodes")]
public class NodesController(INodeService nodeService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var nodes = await nodeService.GetAllAsync();
        return Ok(nodes);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var node = await nodeService.GetByIdAsync(id);
        return Ok(node);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateNodeRequest request)
    {
        var node = await nodeService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = node.Id }, node);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateNodeRequest request)
    {
        var node = await nodeService.UpdateAsync(id, request);
        return Ok(node);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await nodeService.DeleteAsync(id);
        return NoContent();
    }
}