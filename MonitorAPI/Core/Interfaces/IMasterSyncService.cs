using Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IMasterSyncService
    {
        public Task<List<MasterSyncEntityCountDTO>> GetMasterSyncDatas();
        public Task<List<MasterSyncResponseDetailsDTO>> GetMasterSyncResponseDetails(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO);
        public Task<byte[]> GetMasterSyncExcel(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO);
    }
}
