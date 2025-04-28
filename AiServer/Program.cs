using AiServer.ServiceInterface;
using Microsoft.AspNetCore.Server.Kestrel.Core;

Licensing.RegisterLicense("OSS GPL-3.0 2025 https://github.com/ServiceStack/ai-server B2fSVlQ1mYLSxRYTSvsS1aORN0Og++8DTDsxY0+2lBt8Wj7VwLZYbHJY4/UnJFpaagxoQepeXXHMPfZcmP9eUjyhRaqWe3OJI4+3ct/2Wr+rfR5roBrUer8mzJhrQDj1t3L3x42dy/pZiOQKMccAShk4psGLS/TG86MTzuPk2XE=");

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.Configure<KestrelServerOptions>(options => {
    options.Limits.MaxRequestBodySize = int.MaxValue; // if don't set default value is: 30 MB
    options.Limits.MaxRequestBodySize = 50 * 1024 * 1024; //50MB
});

services.AddServiceStack(typeof(MyServices).Assembly);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseStaticFiles();
app.MapGet("/admin/{**path}", (IWebHostEnvironment env) => 
    Results.File(env.WebRootPath.CombineWith("/admin/index.html"), "text/html"));

app.UseServiceStack(new AppHost(), options => {
    options.MapEndpoints();
});

app.MapFallbackToFile("index.html");

app.Run();
