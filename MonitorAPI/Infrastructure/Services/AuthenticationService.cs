using Core.DTO;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository;
        private readonly ITokenService _tokenService;
        public AuthenticationService(IAuthenticationRepository authenticationRepository, ITokenService tokenService)
        {
            _authenticationRepository = authenticationRepository;
            _tokenService = tokenService;
        }
        public async Task<LoginResponseDTO>  Login(LoginRequestDTO loginRequestDTO)
        {
            var userDetailsDTO = await _authenticationRepository.Login(loginRequestDTO);
            if (userDetailsDTO != null)
            {
                return await _tokenService.GenerateToken(userDetailsDTO);
            }
            else
            {
                return null;
            }
        }
    }
}
