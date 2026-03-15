using Dapper;

namespace Core.Interfaces
{
    public interface IDapperRepository
    {
        public Task<T> ExecuteStoredProcedure<T>(string storedProcedureName, DynamicParameters parameters, string connectionString);
        public Task<T> ExecuteStoredProcedureWithoutParams<T>(string storedProcedureName, string connectionString);
        public Task<List<T>> ExecuteStoredProcedureListAsync<T>(string storedProcedureName, DynamicParameters parameters, string connectionString);
        public Task<List<object>> ExecuteReturnMultipleTables(string storedProcedureName, DynamicParameters parameters, string connectionString, params Type[] resultTypes);
    }
}
