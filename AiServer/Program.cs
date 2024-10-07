using AiServer.ServiceInterface;

Licensing.RegisterLicense("OSS GPL-3.0 2024 https://github.com/ServiceStack/ai-server sbKiw/DD/5tZyY2/b+l8sW1Sm8M14s0AMTN8aLxDahXoOx45yFGpmG9Hpoyk79MetXWGTjW2U7peGLjrB/k79YeL8vrxD4xgl2kNiBK+kSWNHkxBiUK+qkzXj6V1uEnQpdem5tY8+l4HkUO+oLo21/r51kKmx7wxhPLumy72uQc=");

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

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

app.Run();
