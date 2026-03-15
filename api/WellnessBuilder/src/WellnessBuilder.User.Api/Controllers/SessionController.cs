using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WellnessBuilder.Shared.Contracts.Sessions;
using WellnessBuilder.User.Api.IServices;

namespace WellnessBuilder.User.Api.Controllers;

[ApiController]
[Route("api/sessions")]
[Produces("application/json")]
public class SessionsController(ISessionService sessionService) : ControllerBase
{
    /// <summary>
    /// Creates a new session and returns the first graph node
    /// </summary>
    /// <returns>Session ID and the first node to display</returns>
    /// <response code="201">Session created successfully</response>
    /// <response code="500">Graph has no starting node</response>
    [HttpPost]
    [SwaggerOperation(Summary = "Create session", Description = "Initiates a new user session and returns the first question")]
    [ProducesResponseType(typeof(CreateSessionResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateSession()
    {
        var response = await sessionService.CreateAsync();
        return CreatedAtAction(nameof(CreateSession), new { id = response.SessionId }, response);
    }

    /// <summary>
    /// Submits an answer to the current node and returns the next one
    /// </summary>
    /// <param name="sessionId">Session ID</param>
    /// <param name="request">Node ID and answer value</param>
    /// <returns>Next node or final offer if the graph is completed</returns>
    /// <response code="200">Next step or completion with personalized offer</response>
    /// <response code="404">Session or node not found</response>
    /// <response code="409">Session is already completed</response>
    [HttpPost("{sessionId:guid}/answers")]
    [SwaggerOperation(Summary = "Submit answer", Description = "Saves the answer and returns the next node. If the graph is completed — returns a personalized offer")]
    [ProducesResponseType(typeof(SessionStepResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> SubmitAnswer(
        Guid sessionId,
        [FromBody] AnswerRequest request)
    {
        var response = await sessionService.SubmitAnswerAsync(sessionId, request);
        return Ok(response);
    }
}