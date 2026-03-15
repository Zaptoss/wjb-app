using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WellnessBuilder.Shared.Persistence;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddSharedPersistence(
    builder.Configuration.GetConnectionString("LocalhostConnection")!);

var host = builder.Build();

using var scope = host.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

Console.WriteLine("Applying migrations...");
await db.Database.MigrateAsync();
Console.WriteLine("Done.");