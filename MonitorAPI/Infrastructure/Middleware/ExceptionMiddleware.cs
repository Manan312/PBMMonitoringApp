using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using NLog;

namespace Infrastructure.Middleware
{
    public class ApiErrorModel
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }
    public class ExceptionMiddleware
    {
        private static readonly ILogger _errorLogger =
            LogManager.GetLogger("ErrorLog");

        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(
            HttpContext context,
            Exception exception)
        {
            int statusCode;
            string message;
            statusCode = StatusCodes.Status500InternalServerError;
            message = "An unexpected error occurred.";
            // 🔴 Log only server errors
            if (statusCode >= 500)
            {
                _errorLogger.Error(exception,
                    "Unhandled exception | Path: {0} | Method: {1} | TraceId: {2}",
                    context.Request.Path,
                    context.Request.Method,
                    context.TraceIdentifier);
            }

            var response = new
            {
                Success = false,
                Message = message,
                Errors= new List<ApiErrorModel>
                {
                    new ApiErrorModel(){
                        Code="500",
                        Message="An unexpected error occurred."
                    }
                },
                TraceId = context.TraceIdentifier
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            await context.Response.WriteAsync(
                JsonConvert.SerializeObject(response));
        }
    }

}
