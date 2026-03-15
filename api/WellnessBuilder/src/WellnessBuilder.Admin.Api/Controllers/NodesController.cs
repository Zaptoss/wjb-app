using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;
using WellnessBuilder.Shared.Contracts.Graph;

namespace WellnessBuilder.Admin.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/nodes")]
[Produces("application/json")]
public class NodesController(INodeService nodeService) : ControllerBase
{
    /// <summary>
    /// Returns all graph nodes
    /// </summary>
    [HttpGet]
    [SwaggerOperation(Summary = "Get all nodes by flow")]
    [ProducesResponseType(typeof(List<NodeDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetAll([FromQuery] Guid flowId)
    {
        var nodes = await nodeService.GetAllAsync(flowId);
        return Ok(nodes);
    }

    /// <summary>
    /// Returns a node by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get node by ID")]
    [ProducesResponseType(typeof(NodeDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var node = await nodeService.GetByIdAsync(id);
        return Ok(node);
    }

    /// <summary>
    /// Creates a new node
    /// </summary>
    [HttpPost]
    [SwaggerOperation(Summary = "Create node", Description = "Creates a Question or Info node with optional answer options")]
    [ProducesResponseType(typeof(NodeDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateNodeRequest request)
    {
        var node = await nodeService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = node.Id }, node);
    }

    /// <summary>
    /// Updates an existing node
    /// </summary>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Update node")]
    [ProducesResponseType(typeof(NodeDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateNodeRequest request)
    {
        var node = await nodeService.UpdateAsync(id, request);
        return Ok(node);
    }

    /// <summary>
    /// Deletes a node and all its edges
    /// </summary>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete node")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await nodeService.DeleteAsync(id);
        return NoContent();
    }
}