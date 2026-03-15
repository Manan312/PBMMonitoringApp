using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using Dapper;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class UserRepository : IUserRepository
    {
        private string connectionString;
        private string storedProcedure;
        private readonly IDapperRepository _dapperRepository;
        private readonly DatabaseConnections _databaseConnections;
        private readonly List<SPConfigurations> _spConfigurations;
        public UserRepository(IDapperRepository dapperRepository, IOptions<DatabaseConnections> options1, IOptions<List<SPConfigurations>> options2)
        {
            _dapperRepository = dapperRepository;
            _databaseConnections = options1.Value;
            _spConfigurations = options2.Value;
        }
        public async Task<string> AddUser(AddUserRequestDTO addUserRequestDTO)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Flag", "1");
            parameters.Add("@JsonString", JsonConvert.SerializeObject(addUserRequestDTO));
            storedProcedure = _spConfigurations.Where(x => x.Action == "AddUser").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "AddUser").Select(x => x.DBConnection).FirstOrDefault();
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
            return await _dapperRepository.ExecuteStoredProcedure<string>(storedProcedure, parameters, connectionString);
        }

        public async Task<List<GetUserDetailsDTO>> GetAllUsers()
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Flag", "2");

            storedProcedure = _spConfigurations
                .Where(x => x.Action == "GetMenus")
                .Select(x => x.SPName)
                .FirstOrDefault();

            string connectionType = _spConfigurations
                .Where(x => x.Action == "GetMenus")
                .Select(x => x.DBConnection)
                .FirstOrDefault();

            connectionString = string.Equals(connectionType, "RW", StringComparison.OrdinalIgnoreCase)
                ? _databaseConnections.ToshfaReadWriteDB
                : _databaseConnections.ToshfaReadOnlyDB;

            if (string.IsNullOrEmpty(connectionString))
                throw new NullReferenceException("Connection String is null");

            if (string.IsNullOrEmpty(storedProcedure))
                throw new NullReferenceException("SP Name is null");

            var result = await _dapperRepository.ExecuteReturnMultipleTables(
                storedProcedure,
                parameters,
                connectionString,
                typeof(GetUserDetailsDTO),
                typeof(MenuResponseDTO)
            );

            var users = ((IEnumerable<GetUserDetailsDTO>)result[0]).ToList();
            var menus = ((IEnumerable<MenuResponseDTO>)result[1]).ToList();

            foreach (var user in users)
            {
                var l = menus
                    .Where(x => x.UserId == user.UserId)
                    .Select(x=>x.FormName)
                    .ToList();
                user.UserMenus = l;
            }

            return users;
        }

        public async Task<GetUserDetailsDTO> GetUserDetails(int UserId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Flag", "3");
            parameters.Add("@UserId", UserId, DbType.Int32);
            storedProcedure = _spConfigurations.Where(x => x.Action == "GetMenus").Select(x => x.SPName).FirstOrDefault();
            string connectionType = _spConfigurations.Where(x => x.Action == "GetMenus").Select(x => x.DBConnection).FirstOrDefault();
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
                                typeof(GetUserDetailsDTO),
                                typeof(string)
                                );
            var header = ((IEnumerable<GetUserDetailsDTO>)result[0]).FirstOrDefault();

            var menus =
                ((IEnumerable<string>)result[1]).ToList();
            header.UserMenus = menus;
            return header;
        }
    }
}
