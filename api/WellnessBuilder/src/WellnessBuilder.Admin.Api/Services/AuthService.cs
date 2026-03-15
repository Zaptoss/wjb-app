using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WellnessBuilder.Admin.Api.IServices;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Services;

public class AuthService(AppDbContext db, IConfiguration configuration) : IAuthService
{
    public async Task<string> LoginAsync(LoginRequest request)
    {
        var admin = await db.Admins
            .FirstOrDefaultAsync(a => a.Email == request.Email);

        if (admin is null || !BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

        return GenerateToken(admin);
    }

    private string GenerateToken(Shared.Entities.Admin admin)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
            new Claim(ClaimTypes.Email, admin.Email)
        };

        var token = new JwtSecurityToken(
            configuration["Jwt:Issuer"],
            configuration["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}