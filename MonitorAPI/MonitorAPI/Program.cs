using Infrastructure.Helper;
using MonitorAPI.AutoMapper;
using NLog;

var logger = LogManager.GetCurrentClassLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddAutoMapper(typeof(MapperProfile));
    builder.Services.AddServices(builder.Configuration);
    var app = builder.Build();

    app.WebApplicationConfiguration();
}
catch (Exception ex)
{
    logger.Error(ex, "Host terminated unexpectedly");
    throw;
}
finally
{
    LogManager.Shutdown();
}