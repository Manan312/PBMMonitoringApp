using AutoMapper;
using Core.DTO;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonitorAPI.Models;

namespace MonitorAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PBMSyncController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IPBMSyncService _pbmSyncService;
        public PBMSyncController(IMapper mapper, IPBMSyncService pbmSyncService )
        {
            _mapper = mapper;
            _pbmSyncService = pbmSyncService;
        }
        [HttpGet("getPbmCounts")]
        public async Task<IActionResult> GetPBMDataCounts()
        {
            var result= await _pbmSyncService.GetPBMDataCounts();
            if(result==null)
            {
                return DataNotFound();
            }
            return Success(result);
        }
        [HttpGet("getPBMDenialCodes")]
        public async Task<IActionResult> GetPBMDenialCodeDatas()
        {
            var result = await _pbmSyncService.GetPBMDenialCodeDatas();
            if (result == null)
            {
                return DataNotFound();
            }
            return Success(result);
        }
        [HttpPost("GetPBMData")]
        public async Task<IActionResult> GetApprovalRequestDetails([FromBody]PreApprovalRequestModel preApprovalRequestModel)
        {
            var request=_mapper.Map<PreApprovalRequestDTO>(preApprovalRequestModel);
            var result = await _pbmSyncService.GetApprovalRequestDetailsDTO(request);
            if (result == null)
            {
                return DataNotFound();
            }
            return Success(result);
        }
        [HttpGet("GetPBMSyncLog")]
        public async Task<IActionResult> GetPBMSyncLog()
        {
            var result = await _pbmSyncService.GetPBMSyncLog();
            if (result == null)
            {
                return DataNotFound();
            }
            return Success(result);
        }
        [HttpPost("getpbmdump")]
        public async Task<IActionResult> GetPBMDump([FromBody] PBMDumpRequestModel pbmDumpRequestModel)
        {
            var request = _mapper.Map<PBMDumpRequestDTO>(pbmDumpRequestModel);
            var result = await _pbmSyncService.GetPBMDailyDump(request);
            if (result == null)
            {
                return DataNotFound();
            }
            else
            {
                return File(
                    result,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "PBMDumpReport.xlsx"
                );
            }
        }
    }
}
