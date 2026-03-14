using Microsoft.AspNetCore.Mvc;
using WellnessBuilder.Shared.Contracts.Sessions;
using WellnessBuilder.User.Api.IServices;

namespace WellnessBuilder.User.Api.Controllers;

[ApiController]
[Route("api/sessions")]
public class SessionsController(ISessionService sessionService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> CreateSession()
    {
        var response = await sessionService.CreateAsync();
        return CreatedAtAction(nameof(CreateSession), new { id = response.SessionId }, response);
    }

    [HttpPost("{sessionId:guid}/answers")]
    public async Task<IActionResult> SubmitAnswer(Guid sessionId, AnswerRequest request)
    {
        var response = await sessionService.SubmitAnswerAsync(sessionId, request);
        return Ok(response);
    }
}