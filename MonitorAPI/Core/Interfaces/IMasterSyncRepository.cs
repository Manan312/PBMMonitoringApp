using Core.DTO;
namespace Core.Interfaces
{
    public interface IMasterSyncRepository
    {
        public Task<List<MasterSyncEntityCountDTO>> GetMasterSyncEntityCountAsync();
        public Task<List<MasterSyncResponseDetailsDTO>> GetMasterSyncResponseDetailsAsync(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO);
        public Task<List<MasterSyncResponseDetailsDTO>> GetMasterSyncExcel(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO);
    }
}
