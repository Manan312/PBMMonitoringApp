using Core.DTO;

namespace Core.Interfaces
{
    public interface IWinService
    {
        public Task<List<WinServiceResponseDetailsDTO>> GetWinServiceStatus();
        public Task<WinServiceResponseDetailsDTO> GetWinServiceStatus(WinServiceRequestDTO winServiceRequestDTO);
        public Task<WinServiceResponseDetailsDTO> StopWinService(WinServiceRequestDTO winServiceRequestDTO,GetUserDetailsDTO userDetailsDTO);
        public Task<WinServiceResponseDetailsDTO> StartWinService(WinServiceRequestDTO winServiceRequestDTO,GetUserDetailsDTO userDetailsDTO);
    }
}
