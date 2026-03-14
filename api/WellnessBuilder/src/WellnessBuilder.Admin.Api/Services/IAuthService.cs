using Microsoft.AspNetCore.Identity.Data;

namespace WellnessBuilder.Admin.Api.Services;

public interface IAuthService
{
    Task<string> LoginAsync(LoginRequest request);
}