using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.Admin.Api.Infrastructure;

public class DefaultAdminSeeder(IServiceProvider serviceProvider) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = serviceProvider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

        if (await db.Admins.AnyAsync(cancellationToken))
            return;

        var email = configuration["DefaultAdmin:Email"];
        var passwordHash = configuration["DefaultAdmin:PasswordHash"];

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(passwordHash))
        {
            Console.WriteLine("WARNING: DefaultAdmin credentials not configured. Skipping seeding.");
            return;
        }

        db.Admins.Add(new Shared.Entities.Admin
        {
            Id = Guid.NewGuid(),
            Email = email,
            PasswordHash = passwordHash
        });

        await db.SaveChangesAsync(cancellationToken);
        Console.WriteLine($"Default admin created: {email}");
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}