using AutoMapper;
using Core.DTO;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using MonitorAPI.Models;
using System.Threading.Tasks;

namespace MonitorAPI.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/Auth")]
    public class AuthenticationController : BaseController
    {
        private readonly IAuthenticationService _authenticationService;
        private readonly IMapper _mapper;
        public AuthenticationController(IAuthenticationService authenticationService,IMapper mapper)
        {
            _authenticationService = authenticationService;
            _mapper = mapper;
        }
        [HttpGet("Test")]
        public IActionResult Test()
        {
            return Ok("Api is working");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginRequestModel loginRequestModel)
        {
            var loginRequestDTO= _mapper.Map<LoginRequestDTO>(loginRequestModel);
            var loginResponse= await _authenticationService.Login(loginRequestDTO);
            if (loginResponse != null)
            {
                return Success(loginResponse);
            }
            else
            {
                List<ApiErrorModel> errors = new List<ApiErrorModel>() { new ApiErrorModel { Code="400",Message="Invalid Login"} };
                return Failure(errors);
            }
        }
    }
}
