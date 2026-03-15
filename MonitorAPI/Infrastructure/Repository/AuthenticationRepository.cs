using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using Dapper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Infrastructure.Repository
{
    public class AuthenticationRepository : IAuthenticationRepository
    {
        private string connectionString;
        private string storedProcedure;
        private readonly IDapperRepository _dapperRepository;
        private readonly DatabaseConnections _databaseConnections;
        private readonly List<SPConfigurations> _spConfigurations;
        public AuthenticationRepository(IDapperRepository dapperRepository, IOptions<DatabaseConnections> options1, IOptions<List<SPConfigurations>> options2)
        {
            _dapperRepository = dapperRepository;
            _databaseConnections = options1.Value;
            _spConfigurations = options2.Value;
        }
        public async Task<GetUserDetailsDTO> Login(LoginRequestDTO loginRequestDTO)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Flag", "4");
            parameters.Add("@JsonString", JsonConvert.SerializeObject(loginRequestDTO));
            storedProcedure = _spConfigurations.Where(x => x.Action == "Login").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "Login").Select(x => x.DBConnection).FirstOrDefault();
            if (string.Equals(connectionType, "RW", StringComparison.OrdinalIgnoreCase))
            {
                connectionString = _databaseConnections.ToshfaReadWriteDB;
            }
            else
            {
                connectionString = _databaseConnections.ToshfaReadOnlyDB;
            }
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new NullReferenceException("Connection String is null");
            }
            if (string.IsNullOrEmpty(storedProcedure))
            {
                throw new NullReferenceException("SP Name is null");
            }
            var getUserDetails = await _dapperRepository.ExecuteStoredProcedure<GetUserDetailsDTO>(storedProcedure, parameters, connectionString);
            return getUserDetails;
        }
    }
}
