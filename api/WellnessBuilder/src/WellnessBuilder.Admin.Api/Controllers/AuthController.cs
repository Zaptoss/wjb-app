using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WellnessBuilder.Admin.Api.Services;

namespace WellnessBuilder.Admin.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var token = await authService.LoginAsync(request);
        return Ok(new { token });
    }
}