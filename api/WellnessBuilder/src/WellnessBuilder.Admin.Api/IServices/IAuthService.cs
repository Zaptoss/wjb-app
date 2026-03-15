using Microsoft.AspNetCore.Identity.Data;

namespace WellnessBuilder.Admin.Api.IServices;

public interface IAuthService
{
    Task<string> LoginAsync(LoginRequest request);
}