using Core.DTO;

namespace Core.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<LoginResponseDTO> Login(LoginRequestDTO loginRequestDTO);
    }
}
