using System.Text;
using InternationalPaymentPortal.Data.Repositories;
using InternationalPaymentPortal.Data.Repositories.Interfaces;
using InternationalPaymentPortal.Models;
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
