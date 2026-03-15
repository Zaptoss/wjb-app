using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Persistence;
using WellnessBuilder.User.Api.IServices;
using WellnessBuilder.User.Api.Middleware;
using WellnessBuilder.User.Api.Services;

namespace WellnessBuilder.User.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddSharedPersistence(
            builder.Configuration.GetConnectionString("LocalhostConnection")
            ?? throw new Exception("Missing connection string"));

        builder.Services.AddScoped<IRuleEngine, RuleEngine>();
        builder.Services.AddScoped<IOfferResolver, OfferResolver>();
        builder.Services.AddScoped<ISessionService, SessionService>();
        
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.MapGet("/health", () => Results.Ok(new
        {
            status = "API running"
        }));


        app.UseExceptionHandler();

        app.MapControllers();
        app.Run();
    }
}