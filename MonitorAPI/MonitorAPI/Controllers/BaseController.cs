using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace MonitorAPI.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected IActionResult Success<T>(T data)
            => Ok(APIResponseModel<T>.Success(data));
        protected IActionResult Failure(List<ApiErrorModel> errors)
            => BadRequest(APIResponseModel<object>.Failure(errors));
        protected IActionResult Created<T>(T data)
            => StatusCode(201,APIResponseModel<T>.Success(data));
        protected IActionResult DataNotFound()
            => NotFound();
    }
}
