using Core.DTO;
using Core.Interfaces;
using Infrastructure.Helper;
using Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class PBMSyncService : IPBMSyncService
    {
        private readonly IPBMSyncRepository _pbmSyncRepository;
        public PBMSyncService(IPBMSyncRepository pbmSyncRepository)
        {
            _pbmSyncRepository = pbmSyncRepository;
        }

        public async Task<PreApprovalDetailsDTO> GetApprovalRequestDetailsDTO(PreApprovalRequestDTO preApprovalRequestDTO)
        {
            return await _pbmSyncRepository.GetApprovalRequestDetailsDTO(preApprovalRequestDTO);
        }

        public async Task<byte[]> GetPBMDailyDump(PBMDumpRequestDTO pbmDumpRequestDTO)
        {
            var result = await _pbmSyncRepository.GetPBMDailyDump(pbmDumpRequestDTO);
            var file = Utility.GenerateExcel(result, "PBMDump");
            return file;
        }

        public async Task<List<PBMDataCountDTO>> GetPBMDataCounts()
        {
            return await _pbmSyncRepository.GetPBMDataCounts();
        }

        public async Task<List<PBMDenialCodeDataCountDTO>> GetPBMDenialCodeDatas()
        {
            return await _pbmSyncRepository.GetPBMDenialCodeDatas();
        }
        public async Task<List<PreApprovalSyncDTO>> GetPBMSyncLog()
        {
            return await _pbmSyncRepository.GetPBMSyncLog();
        }
    }
}
