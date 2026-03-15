using Core.DTO;

namespace Core.Interfaces
{
    public interface IUserService
    {
        public Task<List<GetUserDetailsDTO>> GetAllUsers();
        public Task<GetUserDetailsDTO> GetUserDetails(int UserId);
        public Task<string> AddUser(AddUserRequestDTO addUserRequestDTO);
    }
}
