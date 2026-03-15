using AutoMapper;
using Core.DTO;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonitorAPI.Models;
using System.Runtime.CompilerServices;

namespace MonitorAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class MasterSyncController : BaseController
    {
        private readonly IMasterSyncService _masterSyncService;
        private readonly IMapper _mapper;
        public MasterSyncController(IMasterSyncService masterSyncService, IMapper mapper)
        {
            _masterSyncService = masterSyncService;
            _mapper = mapper;
        }
        [HttpGet("get-master-count")]
        public async Task<IActionResult> GetMasterSyncCount()
        {
            var masterSyncCount = await _masterSyncService.GetMasterSyncDatas();
            if (masterSyncCount == null)
            {
                return DataNotFound();
            }
            return Success(masterSyncCount);
        }
        [HttpPost("get-master-details")]
        public async Task<IActionResult> GetMasterSyncResponseDetails([FromBody] MasterSyncRequestDetailsModel masterSyncRequestDetailsModel)
        {
            var masterRequest = _mapper.Map<MasterSyncRequestDetailsDTO>(masterSyncRequestDetailsModel);
            var result = await _masterSyncService.GetMasterSyncResponseDetails(masterRequest);
            if (result == null)
            {
                return DataNotFound();
            }
            else
            {
                return Success(result);
            }
        }
        [HttpPost("getExcelFile")]
        public async Task<IActionResult> GetMasterSyncExcel([FromBody] MasterSyncRequestDetailsModel masterSyncRequestDetailsModel)
        {
            var masterRequest = _mapper.Map<MasterSyncRequestDetailsDTO>(masterSyncRequestDetailsModel);
            var result = await _masterSyncService.GetMasterSyncExcel(masterRequest);
            if (result == null)
            {
                return DataNotFound();
            }
            else
            {
                return File(
                    result,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "MasterSyncReport.xlsx"
                );
            }
        }
    }
}
