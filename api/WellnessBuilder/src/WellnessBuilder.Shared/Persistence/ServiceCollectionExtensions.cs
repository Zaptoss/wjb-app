using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace WellnessBuilder.Shared.Persistence;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSharedPersistence(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString));

        return services;
    }
}