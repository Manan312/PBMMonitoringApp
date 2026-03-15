using Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        public Task<LoginResponseDTO> GenerateToken(GetUserDetailsDTO getUserDetailsDTO);
        public Task<GetUserDetailsDTO> GetHeadersFromToken(string token);
    }
}
