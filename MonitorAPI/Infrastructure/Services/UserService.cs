using Core.DTO;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<string> AddUser(AddUserRequestDTO addUserRequestDTO)
        {
            return await _userRepository.AddUser(addUserRequestDTO);
        }
        public async Task<List<GetUserDetailsDTO>> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }
        public async Task<GetUserDetailsDTO> GetUserDetails(int UserId)
        {
            return await _userRepository.GetUserDetails(UserId);
        }
    }
}
