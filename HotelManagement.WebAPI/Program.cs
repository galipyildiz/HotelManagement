
using HotelManagement.Service.Data;
using HotelManagement.Service.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Models;
using HotelManagement.Service.Services;
using HotelManagement.Services.Services.Concrete;
using HotelManagement.Services.Services.Abstract;

namespace HotelManagement.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            #region postgres

            builder.Services.AddDbContext<HotelManagementDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("HotelManagementConnection")));

            builder.Services.AddDbContext<IdentityDbContext>(optionsAction => optionsAction.UseNpgsql(builder.Configuration.GetConnectionString("IdentityConnection")));

            builder.Services.AddIdentityApiEndpoints<IdentityUser>()
                .AddEntityFrameworkStores<IdentityDbContext>();


            #endregion

            #region swagger-token

            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                            {
                            Reference = new OpenApiReference
                            {
                                    Type=ReferenceType.SecurityScheme,
                                    Id="Bearer"
                            }
                    },
                        Array.Empty<string>()
                    }
                });
            });

            #endregion

            #region cors
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("*")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
            #endregion

            builder.Services.AddScoped(typeof(IRepository<>), typeof(EFRepository<>));

            builder.Services.AddScoped<IBuildingService, BuildingService>();
            builder.Services.AddScoped<IStorageService, StorageService>();
            builder.Services.AddScoped<IRoomService, RoomService>();
            builder.Services.AddScoped<IInventoryItemService, InventoryItemService>();

            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
            builder.Services.AddProblemDetails();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseExceptionHandler();

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.MapGroup("/api").MapIdentityApi<IdentityUser>();

            app.MapControllers();

            app.Run();
        }
    }
}
