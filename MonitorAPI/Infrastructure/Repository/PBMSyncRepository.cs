using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using Dapper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Infrastructure.Repository
{
    public class PBMSyncRepository : IPBMSyncRepository
    {
        private string connectionString;
        private string storedProcedure;
        private readonly IDapperRepository _dapperRepository;
        private readonly DatabaseConnections _databaseConnections;
        private readonly List<SPConfigurations> _spConfigurations;
        public PBMSyncRepository(IDapperRepository dapperRepository, IOptions<DatabaseConnections> options1, IOptions<List<SPConfigurations>> options2)
        {
            _dapperRepository = dapperRepository;
            _databaseConnections = options1.Value;
            _spConfigurations = options2.Value;
        }
        public async Task<PreApprovalDetailsDTO> GetApprovalRequestDetailsDTO(PreApprovalRequestDTO preApprovalRequestDTO)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "3");
            if (!string.IsNullOrEmpty(preApprovalRequestDTO.PBMReferenceNo))
                parameters.Add("@PBMReferenceNo", preApprovalRequestDTO.PBMReferenceNo);
            if (!string.IsNullOrEmpty(preApprovalRequestDTO.LivaReferenceNo))
                parameters.Add("@LivaReferenceNo", preApprovalRequestDTO.LivaReferenceNo);
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetApprovalRequest").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetApprovalRequest").Select(x => x.DBConnection).FirstOrDefault();
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
            var result = await _dapperRepository.ExecuteReturnMultipleTables(
                                storedProcedure,
                                parameters,
                                connectionString,
                                typeof(PreApprovalDetailsDTO),
                                typeof(ApprovalDiagnosisDetailsDTO),
                                typeof(ApprovalServiceDetailsDTO));
            var header = ((IEnumerable<PreApprovalDetailsDTO>)result[0]).FirstOrDefault();

            var diagnosis =
                ((IEnumerable<ApprovalDiagnosisDetailsDTO>)result[1]).ToList();

            var services =
                ((IEnumerable<ApprovalServiceDetailsDTO>)result[2]).ToList();

            header.ApprovalDiagnosisDetails = diagnosis;
            header.ApprovalServiceDetails = services;
            return header;
        }

        public async Task<List<PBMServiceReportDTO>> GetPBMDailyDump(PBMDumpRequestDTO pbmDumpRequestDTO)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@StartDate", pbmDumpRequestDTO.StartDate);
            parameters.Add("@EndDate", pbmDumpRequestDTO.EndDate);
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetPBMDailyDump").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetPBMDailyDump").Select(x => x.DBConnection).FirstOrDefault();
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
            return await _dapperRepository.ExecuteStoredProcedureListAsync<PBMServiceReportDTO>(storedProcedure, parameters, connectionString);
        }

        public async Task<List<PBMDataCountDTO>> GetPBMDataCounts()
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "1");
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetPBMCount").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetPBMCount").Select(x => x.DBConnection).FirstOrDefault();
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
            return await _dapperRepository.ExecuteStoredProcedureListAsync<PBMDataCountDTO>(storedProcedure, parameters, connectionString);
        }

        public async Task<List<PBMDenialCodeDataCountDTO>> GetPBMDenialCodeDatas()
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "2");
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetPBMDenialCode").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetPBMDenialCode").Select(x => x.DBConnection).FirstOrDefault();
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
            return await _dapperRepository.ExecuteStoredProcedureListAsync<PBMDenialCodeDataCountDTO>(storedProcedure, parameters, connectionString);
        }
        public async Task<List<PreApprovalSyncDTO>> GetPBMSyncLog()
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "4");
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetApprovalRequest").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetApprovalRequest").Select(x => x.DBConnection).FirstOrDefault();
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
            return await _dapperRepository.ExecuteStoredProcedureListAsync<PreApprovalSyncDTO>(storedProcedure, parameters, connectionString);
        }
    }
}
