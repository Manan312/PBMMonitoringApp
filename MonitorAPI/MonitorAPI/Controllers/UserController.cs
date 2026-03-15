using AutoMapper;
using Core.DTO;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using MonitorAPI.Models;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace MonitorAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, ITokenService tokenService, IMapper mapper)
        {
            _userService = userService;
            _tokenService = tokenService;
            _mapper = mapper;
        }
        [HttpGet("user-details")]
        public async Task<IActionResult> GetUserDetails()
        {
            string authHeader = Convert.ToString(HttpContext.Request.Headers["Authorization"]);
            string token = null;

            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                token = authHeader.Substring("Bearer ".Length).Trim();
            }
            if (string.IsNullOrEmpty(token))
            {
                return Failure(
                    new List<ApiErrorModel>
                    {
                        new ApiErrorModel()
                        {
                            Code = "401",
                            Message = "Unauthorized Access",
                        }
                    }
                );
            }
            else
            {
                var User = await _tokenService.GetHeadersFromToken(token);
                if (User == null)
                {
                    return Failure(
                        new List<ApiErrorModel>
                        {
                            new ApiErrorModel()
                            {
                                Code = "401",
                                Message = "Unauthorized Access",
                            }
                        }
                    );
                }
                var userDetails = await _userService.GetUserDetails(User.UserId);
                if (userDetails == null)
                {
                    return Failure(
                        new List<ApiErrorModel>
                        {
                            new ApiErrorModel()
                            {
                                Code = "500",
                                Message = "Something Went Wrong",
                            }
                        }
                    );
                }
                return Success(userDetails);
            }
        }
        [HttpGet("get-all-users")]
        public async Task<IActionResult> GetUserMenus()
        {
            var users = await _userService.GetAllUsers();
            if (users == null)
            {
                return Failure(
                    new List<ApiErrorModel>
                    {
                            new ApiErrorModel()
                            {
                                Code = "500",
                                Message = "Something Went Wrong",
                            }
                    }
                );
            }
            return Success(users);
        }
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] AddUserRequestModel addUserRequestModel)
        {
            var addUserDetails = _mapper.Map<AddUserRequestDTO>(addUserRequestModel);
            var result = await _userService.AddUser(addUserDetails);
            return Created(result);
        }
    }
}
