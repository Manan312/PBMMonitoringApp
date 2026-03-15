using AutoMapper;
using Core.DTO;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using MonitorAPI.Models;
using System.Runtime.CompilerServices;

namespace MonitorAPI.Controllers
{
    [Authorize]
    [Route("api/WinService")]
    public class WinServiceController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IWinService _winService;
        private readonly ITokenService _tokenService;
        public WinServiceController(IMapper mapper, IWinService winService, ITokenService tokenService)
        {
            _mapper = mapper;
            _winService = winService;
            _tokenService = tokenService;
        }
        [HttpGet("service-status")]
        public async Task<IActionResult> GetWinServiceStatus()
        {
            var result = await _winService.GetWinServiceStatus();
            if (result == null) return Failure(new List<ApiErrorModel> { new ApiErrorModel() {
            Code="500",Message="Something went wrong"
            } });
            return Success(result);
        }
        [HttpPost("start-service")]
        public async Task<IActionResult> StartWinServiceStatus([FromBody] WinServiceRequestModel winServiceRequestModel)
        {
            var request=_mapper.Map<WinServiceRequestDTO>(winServiceRequestModel);
            string authHeader = Convert.ToString(HttpContext.Request.Headers["Authorization"]);
            string token = null;

            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                token = authHeader.Substring("Bearer ".Length).Trim();
            }
            var User = await _tokenService.GetHeadersFromToken(token);
            var result = await _winService.StartWinService(request, User);
            if (result == null) return Failure(new List<ApiErrorModel> { new ApiErrorModel() {
            Code="500",Message="Something went wrong"
            } });
            return Success(result);
        }
        [HttpPost("stop-service")]
        public async Task<IActionResult> StopWinServiceStatus([FromBody] WinServiceRequestModel winServiceRequestModel)
        {
            var request = _mapper.Map<WinServiceRequestDTO>(winServiceRequestModel);
            string authHeader = Convert.ToString(HttpContext.Request.Headers["Authorization"]);
            string token = null;

            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                token = authHeader.Substring("Bearer ".Length).Trim();
            }
            var User = await _tokenService.GetHeadersFromToken(token);
            var result = await _winService.StopWinService(request,User);
            if (result == null) return Failure(new List<ApiErrorModel> { new ApiErrorModel() {
            Code="500",Message="Something went wrong"
            } });
            return Success(result);
        }
    }
}
