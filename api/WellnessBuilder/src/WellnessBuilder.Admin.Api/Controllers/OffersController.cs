using Microsoft.AspNetCore.Mvc;
using WellnessBuilder.Admin.Api.Requests;
using WellnessBuilder.Admin.Api.Services;

namespace WellnessBuilder.Admin.Api.Controllers;

[ApiController]
[Route("api/admin/offers")]
public class OffersController(IOfferService offerService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var offers = await offerService.GetAllAsync();
        return Ok(offers);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var offer = await offerService.GetByIdAsync(id);
        return Ok(offer);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateOfferRequest request)
    {
        var offer = await offerService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = offer.Id }, offer);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateOfferRequest request)
    {
        var offer = await offerService.UpdateAsync(id, request);
        return Ok(offer);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await offerService.DeleteAsync(id);
        return NoContent();
    }
}