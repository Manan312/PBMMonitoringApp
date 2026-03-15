using Core.DTO;

namespace Core.Interfaces
{
    public interface IPBMSyncRepository
    {
        public Task<List<PBMDataCountDTO>> GetPBMDataCounts();
        public Task<List<PBMDenialCodeDataCountDTO>> GetPBMDenialCodeDatas();
        public Task<PreApprovalDetailsDTO> GetApprovalRequestDetailsDTO(PreApprovalRequestDTO preApprovalRequestDTO);
        public Task<List<PBMServiceReportDTO>> GetPBMDailyDump(PBMDumpRequestDTO pbmumpRequestDTO);
        public Task<List<PreApprovalSyncDTO>> GetPBMSyncLog();
    }
}
