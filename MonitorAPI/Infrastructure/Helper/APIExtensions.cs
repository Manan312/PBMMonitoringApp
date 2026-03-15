using Core.Entities;
using Core.Interfaces;
using Infrastructure.Middleware;
using Infrastructure.Repository;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Infrastructure.Helper
{
    public static class APIExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddControllers()
                .AddJsonOptions(
                    options =>
                    {
                        // Keep property names as-is (PascalCase)
                        options.JsonSerializerOptions.PropertyNamingPolicy = null;

                        // Optional: Ignore null values in responses
                        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;

                        // Optional: Handle enums as strings
                        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                    }
                );
            var DatabaseConnection = configuration.GetSection("DatabaseConnections");
            services.Configure<DatabaseConnections>(DatabaseConnection);
            var SpConfiguration = configuration.GetSection("SPConfigurations");
            services.Configure<List<SPConfigurations>>(SpConfiguration);
            var WinServiceConfiguration = configuration.GetSection("WindowSeriveConfiguration");
            services.Configure<List<WindowSeriveConfiguration>>(WinServiceConfiguration);
            var authenticationSettingsconfig = configuration.GetSection("AuthenticationSettings");
            services.Configure<AuthenticationSettings>(authenticationSettingsconfig);
            services.AddEndpointsApiExplorer();
            services.AddHttpContextAccessor();
            var AuthSettings = configuration.GetSection("AuthenticationSettings");
            var authenticationSettings = AuthSettings.Get<AuthenticationSettings>();
            var key = Encoding.ASCII.GetBytes(authenticationSettings.Secret);
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = true,

                };
                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var expiryTime = context.SecurityToken.ValidTo;
                        if (expiryTime < DateTime.UtcNow)
                        {
                            context.Fail("Token expired");
                        }
                        return System.Threading.Tasks.Task.CompletedTask;
                    }
                };
            });
            services.AddSwaggerGen();
            #region Services
            services.AddScoped<IMasterSyncService, MasterSyncService>();
            services.AddScoped<IPBMSyncService, PBMSyncService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IWinService, WinService>();
            #endregion
            #region Repository
            services.AddScoped<IDapperRepository, DapperRepository>();
            services.AddScoped<IPBMSyncRepository, PBMSyncRepository>();
            services.AddScoped<IMasterSyncRepository, MasterSyncRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
            #endregion
            var corsSection = configuration.GetSection("CorsPolicies");
            var allowedOrigins = corsSection.GetSection("AllowedOrigins").Get<string[]>();
            services.AddCors(options =>
            {
                options.AddPolicy("Allowed", policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });
            return services;
        }
        public static void WebApplicationConfiguration(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors("Allowed");
            app.UseMiddleware<ExceptionMiddleware>();
            

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }
}
