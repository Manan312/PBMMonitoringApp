using Core.DTO;

namespace Core.Interfaces
{
    public interface IAuthenticationRepository
    {
        public Task<GetUserDetailsDTO> Login(LoginRequestDTO loginRequestDTO);
    }
}
