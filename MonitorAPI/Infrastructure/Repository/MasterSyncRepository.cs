using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using Dapper;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Data;

namespace Infrastructure.Repository
{
    public class MasterSyncRepository : IMasterSyncRepository
    {
        private string connectionString;
        private string storedProcedure;
        private readonly IDapperRepository _dapperRepository;
        private readonly DatabaseConnections _databaseConnections;
        private readonly List<SPConfigurations> _spConfigurations;
        public MasterSyncRepository(IDapperRepository dapperRepository, IOptions<DatabaseConnections> options1, IOptions<List<SPConfigurations>> options2)
        {
            _dapperRepository = dapperRepository;
            _databaseConnections = options1.Value;
            _spConfigurations = options2.Value;
        }
        public async Task<List<MasterSyncEntityCountDTO>> GetMasterSyncEntityCountAsync()
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "1");
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetMasterSyncCount").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetMasterSyncCount").Select(x => x.DBConnection).FirstOrDefault();
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
            return await _dapperRepository.ExecuteStoredProcedureListAsync<MasterSyncEntityCountDTO>(storedProcedure, parameters, connectionString);
        }

        public async Task<List<MasterSyncResponseDetailsDTO>> GetMasterSyncResponseDetailsAsync(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO)
        {

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "2");
            if (masterSyncRequestDetailsDTO != null)
            {
                if (masterSyncRequestDetailsDTO.StartDate != null)
                {
                    parameters.Add("@FromDate", masterSyncRequestDetailsDTO.StartDate, DbType.Date);
                }
                else
                {
                    parameters.Add("@FromDate", null);
                }
                if (masterSyncRequestDetailsDTO.StartDate != null)
                {
                    parameters.Add("@ToDate", masterSyncRequestDetailsDTO.EndDate, DbType.Date);
                }
                else
                {
                    parameters.Add("@ToDate", null);
                }
                if (string.IsNullOrEmpty(masterSyncRequestDetailsDTO.ReferenceNo))
                {
                    parameters.Add("@ReferenceNo", null);
                }
                else
                {
                    parameters.Add("@ReferenceNo", masterSyncRequestDetailsDTO.ReferenceNo, DbType.String);
                }

                storedProcedure = _spConfigurations.Where(x => x.Action == "GetMasterSyncResponse").Select(x => x.SPName).FirstOrDefault();
                string connectionType = _spConfigurations.Where(x => x.Action == "GetMasterSyncResponse").Select(x => x.DBConnection).FirstOrDefault();
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
                return await _dapperRepository.ExecuteStoredProcedureListAsync<MasterSyncResponseDetailsDTO>(storedProcedure, parameters, connectionString);
            }
            else
                return null;
        }
        public async Task<List<MasterSyncResponseDetailsDTO>> GetMasterSyncExcel(MasterSyncRequestDetailsDTO masterSyncRequestDetailsDTO)
        {

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@flag", "3");
            if (masterSyncRequestDetailsDTO != null)
            {
                if (masterSyncRequestDetailsDTO.StartDate != null)
                {
                    parameters.Add("@FromDate", masterSyncRequestDetailsDTO.StartDate, DbType.Date);
                }
                else
                {
                    parameters.Add("@FromDate", null);
                }
                if (masterSyncRequestDetailsDTO.StartDate != null)
                {
                    parameters.Add("@ToDate", masterSyncRequestDetailsDTO.EndDate, DbType.Date);
                }
                else
                {
                    parameters.Add("@ToDate", null);
                }
                if (string.IsNullOrEmpty(masterSyncRequestDetailsDTO.ReferenceNo))
                {
                    parameters.Add("@ReferenceNo", null);
                }
                else
                {
                    parameters.Add("@ReferenceNo", masterSyncRequestDetailsDTO.ReferenceNo, DbType.String);
                }

                storedProcedure = _spConfigurations.Where(x => x.Action == "GetMasterSyncResponse").Select(x => x.SPName).FirstOrDefault();
                string connectionType = _spConfigurations.Where(x => x.Action == "GetMasterSyncResponse").Select(x => x.DBConnection).FirstOrDefault();
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
                return await _dapperRepository.ExecuteStoredProcedureListAsync<MasterSyncResponseDetailsDTO>(storedProcedure, parameters, connectionString);
            }
            else
                return null;
        }

    }
}
