using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApiTemplate.Data;
using WebApiTemplate.Helpers;
using WebApiTemplate.Services;
using WebApiTemplate.Services.Client;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000",
                                              "http://localhost:3001",
                                              "https://coloniajardininmo.com",
                                              "https://*.coloniajardininmo.com")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                      });
});

builder.Services.AddControllers();

//builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("InMem"));
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnStr")));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["AppSettings:Secret"])),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddSingleton<JwtAuthenticationManager>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserTransactionalService, UserTransactionalService>();

builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<IRegisterTransactionalService, RegisterTransactionalService>();

builder.Services.AddScoped<IFilterService, FilterService>();
builder.Services.AddScoped<IFilterTransactionalService, FilterTransactionalService>();

builder.Services.AddScoped<IZoneService, ZoneService>();
builder.Services.AddScoped<IZoneTransactionalService, ZoneTransactionalService>();

builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<INewsTransactionalService, NewsTransactionalService>();

builder.Services.AddScoped<IChargesService, ChargesService>();
builder.Services.AddScoped<IChargesTransactionalService, ChargesTransactionalService>();

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddTransient<IMailService, MailService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<TokenValidationHelper>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

var app = builder.Build();

//app.UseCors(MyAllowSpecificOrigins);

app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

//PrepDb.PrepPopulation(app);

app.MapControllers();

app.Run();
