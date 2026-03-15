using Core.DTO;
using Core.Interfaces;
using Infrastructure.Helper;

namespace Infrastructure.Services
{
    public class MasterSyncService : IMasterSyncService
    {
        private readonly IMasterSyncRepository _masterSyncRepository;
        public MasterSyncService(IMasterSyncRepository masterSyncRepository)
        {
            _masterSyncRepository = masterSyncRepository;
        }
        public async Task<List<MasterSyncEntityCountDTO>> GetMasterSyncDatas()
        {
            return await _masterSyncRepository.GetMasterSyncEntityCountAsync();
        }

        public async Task<List<MasterSyncResponseDetailsDTO>> GetMasterSyncResponseDetails(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO)
        {
            return await _masterSyncRepository.GetMasterSyncResponseDetailsAsync(masterSyncRequestDetailsDTO);
        }
        public async Task<byte[]> GetMasterSyncExcel(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO)
        {
            var result= await _masterSyncRepository.GetMasterSyncExcel(masterSyncRequestDetailsDTO);
            var file = Utility.GenerateExcel(result, "MasterSync");
            return file;
        }
    }
}
