using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;
using WellnessBuilder.Shared.Contracts.Offers;

namespace WellnessBuilder.Admin.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/admin/offers")]
[Produces("application/json")]
public class OffersController(IOfferService offerService) : ControllerBase
{
    /// <summary>
    /// Returns all offers with their condition groups
    /// </summary>
    [HttpGet]
    [SwaggerOperation(Summary = "Get all offers by flow")]
    [ProducesResponseType(typeof(List<OfferDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetAll([FromQuery] Guid flowId)
    {
        var offers = await offerService.GetAllAsync(flowId);
        return Ok(offers);
    }

    /// <summary>
    /// Returns an offer by ID
    /// </summary>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get offer by ID")]
    [ProducesResponseType(typeof(OfferDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var offer = await offerService.GetByIdAsync(id);
        return Ok(offer);
    }

    /// <summary>
    /// Creates a new offer with condition groups
    /// </summary>
    [HttpPost]
    [SwaggerOperation(Summary = "Create offer", Description = "Creates an offer with condition groups that determine when it is assigned to a user")]
    [ProducesResponseType(typeof(OfferDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Create([FromBody] CreateOfferRequest request)
    {
        var offer = await offerService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = offer.Id }, offer);
    }

    /// <summary>
    /// Updates an existing offer and replaces its condition groups
    /// </summary>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Update offer", Description = "Replaces all condition groups with the ones provided in the request")]
    [ProducesResponseType(typeof(OfferDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateOfferRequest request)
    {
        var offer = await offerService.UpdateAsync(id, request);
        return Ok(offer);
    }

    /// <summary>
    /// Deletes an offer and all its condition groups
    /// </summary>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete offer")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        await offerService.DeleteAsync(id);
        return NoContent();
    }
}