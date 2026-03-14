

using Microsoft.EntityFrameworkCore;
using WellnessBuilder.Shared.Persistence;

namespace WellnessBuilder.User.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddSharedPersistence(
            builder.Configuration.GetConnectionString("Default") 
            ?? throw new Exception("Missing connection string"));
        
        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();
        }
        
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}