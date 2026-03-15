using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        public TokenService(IOptions<AuthenticationSettings> options1)
        {
            this._authenticationSettings = options1.Value;
            this._tokenHandler = new JwtSecurityTokenHandler();
        }
        public async Task<LoginResponseDTO> GenerateToken(GetUserDetailsDTO getUserDetailsDTO)
        {
            var key = Encoding.ASCII.GetBytes(this._authenticationSettings.Secret);
            var expires = DateTime.Now.AddDays(Convert.ToInt32(this._authenticationSettings.ExpiryTokenLimitinMins));

            var claims = new List<Claim>
            {
                new Claim("UserId", Convert.ToString(getUserDetailsDTO.UserId)),
                new Claim("UserName", Convert.ToString(getUserDetailsDTO.UserName)),
                new Claim("Role", Convert.ToString(getUserDetailsDTO.Role)),
                new Claim("Name", Convert.ToString(getUserDetailsDTO.Name)),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var accessToken = this._tokenHandler.CreateToken(tokenDescriptor);

            return new LoginResponseDTO
            {
                Token = this._tokenHandler.WriteToken(accessToken),
                ExpiryDate = expires
            };
        }
        public async Task<GetUserDetailsDTO> GetHeadersFromToken(string token)
        {

            var tokenCanBeRead = this._tokenHandler.CanReadToken(token);

            if (!tokenCanBeRead)
            {
                return null;
            }

            SecurityToken validatedToken;
            var key = Encoding.ASCII.GetBytes(this._authenticationSettings.Secret);

            var parameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var user = this._tokenHandler.ValidateToken(token, parameters, out validatedToken);

            return this.ToUserDetails(user);
        }
        private GetUserDetailsDTO ToUserDetails(ClaimsPrincipal principal)
        {
            var userid = principal.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value;
            var userName = principal.Claims.FirstOrDefault(c => c.Type == "UserName")?.Value;
            var name = principal.Claims.FirstOrDefault(c => c.Type == "Name")?.Value;
            var role = principal.Claims.FirstOrDefault(c => c.Type == "Role")?.Value;
            return new GetUserDetailsDTO
            {
                UserId = Convert.ToInt32(userid),
                UserName = userName,
                Role = role,
                Name=name
            };
        }
    }
}
