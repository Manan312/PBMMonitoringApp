using Core.DTO;

namespace Core.Interfaces
{
    public interface IPBMSyncService
    {
        public Task<List<PBMDataCountDTO>> GetPBMDataCounts();
        public Task<List<PBMDenialCodeDataCountDTO>> GetPBMDenialCodeDatas();
        public Task<PreApprovalDetailsDTO> GetApprovalRequestDetailsDTO(PreApprovalRequestDTO preApprovalRequestDTO);
        public Task<byte[]> GetPBMDailyDump(PBMDumpRequestDTO pbmDumpRequestDTO);
        public Task<List<PreApprovalSyncDTO>> GetPBMSyncLog();
    }
}
