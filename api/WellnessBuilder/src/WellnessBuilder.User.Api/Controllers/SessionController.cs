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
    /// Створює нову сесію і повертає перший вузол графа
    /// </summary>
    /// <returns>ID сесії та перший вузол для відображення</returns>
    /// <response code="201">Сесію створено успішно</response>
    /// <response code="500">Граф не має стартового вузла</response>
    [HttpPost]
    [SwaggerOperation(Summary = "Створити сесію", Description = "Ініціює нову сесію користувача і повертає перше питання")]
    [ProducesResponseType(typeof(CreateSessionResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateSession()
    {
        var response = await sessionService.CreateAsync();
        return CreatedAtAction(nameof(CreateSession), new { id = response.SessionId }, response);
    }

    /// <summary>
    /// Відправляє відповідь на поточний вузол і отримує наступний
    /// </summary>
    /// <param name="sessionId">ID сесії</param>
    /// <param name="request">ID вузла і значення відповіді</param>
    /// <returns>Наступний вузол або фінальний офер якщо граф завершився</returns>
    /// <response code="200">Наступний крок або завершення з офером</response>
    /// <response code="404">Сесія або вузол не знайдені</response>
    /// <response code="409">Сесія вже завершена</response>
    [HttpPost("{sessionId:guid}/answers")]
    [SwaggerOperation(Summary = "Відповісти на питання", Description = "Зберігає відповідь і повертає наступний вузол. Якщо граф завершився — повертає персоналізований офер")]
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