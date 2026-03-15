using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Admin.Api.Services;

namespace WellnessBuilder.Admin.Api.Controllers;

[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public class AuthController(IAuthService authService) : ControllerBase
{
    /// <summary>
    /// Authenticates an admin and returns a JWT token
    /// </summary>
    [HttpPost("login")]
    [SwaggerOperation(Summary = "Admin login", Description = "Returns a Bearer token to be used in Authorization header")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var token = await authService.LoginAsync(request);
        return Ok(new { token });
    }
}