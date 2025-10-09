using System.Text;
using InternationalPaymentPortal.Data.Repositories;
using InternationalPaymentPortal.Data.Repositories.Interfaces;
using InternationalPaymentPortal.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// ---------- MongoDB configuration ----------
// bind MongoDbSettings from configuration (appsettings.json or env)
var mongoSection = builder.Configuration.GetSection("MongoDbSettings");
builder.Services.Configure<MongoDbSettings>(mongoSection);

var mongoSettings = mongoSection.Get<MongoDbSettings>();
if (string.IsNullOrWhiteSpace(mongoSettings?.ConnectionString))
{
    throw new InvalidOperationException("MongoDbSettings:ConnectionString is not configured.");
}

// Correctly configure and register a single MongoClient
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = MongoClientSettings.FromConnectionString(mongoSettings.ConnectionString);
    settings.ServerApi = new ServerApi(ServerApiVersion.V1);
    return new MongoClient(settings);
});

// Register IMongoDatabase as scoped (per-request)
builder.Services.AddScoped(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(settings.DatabaseName);
});

// Register your repositories
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();

// ---------- JWT Authentication ----------
var jwtKey = builder.Configuration["Jwt:Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException(
        "JWT Key is not configured. Please set 'Jwt:Key' in appsettings.json."
    );
}

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };
    });

// ---------- CORS ----------
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowReactDev",
        p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()
    );
});

// ---------- Build app ----------
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactDev");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
