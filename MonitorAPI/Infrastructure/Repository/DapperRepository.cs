using Core.Interfaces;
using Dapper;
using System.Data;
using System.Data.SqlClient;


namespace Infrastructure.Repository
{
    public class DapperRepository : IDapperRepository
    {
        public async Task<T> ExecuteStoredProcedure<T>(string storedProcedureName, DynamicParameters parameters, string connectionString)
        {
            using (var conn = new SqlConnection(connectionString))
            {
                try
                {
                    await conn.OpenAsync();
                    var result = await conn.QueryFirstOrDefaultAsync<T>(
                        storedProcedureName,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                    return result;
                }
                catch (Exception ex)
                { throw; }
                finally
                {
                    await conn.CloseAsync();
                }
            }
        }
        public async Task<List<T>> ExecuteStoredProcedureListAsync<T>(string storedProcedure, DynamicParameters parameters, string connectionString)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                try
                {
                    await connection.OpenAsync();
                    var result = await connection.QueryAsync<T>(
                        storedProcedure,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                    return result.ToList();
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    await connection.CloseAsync();
                }
            }
        }

        public Task<T> ExecuteStoredProcedureWithoutParams<T>(string storedProcedureName, string connectionString)
        {
            throw new NotImplementedException();
        }
        public async Task<List<object>> ExecuteReturnMultipleTables(string storedProcedureName, DynamicParameters parameters, string connectionString, params Type[] resultTypes)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                try
                {
                    await connection.OpenAsync();
                    var results = new List<object>();
                    using var multi = await connection.QueryMultipleAsync(
                        storedProcedureName,
                        parameters,
                        commandType: CommandType.StoredProcedure);

                    foreach (var type in resultTypes)
                    {
                        var method = typeof(SqlMapper.GridReader)
                            .GetMethods()
                            .First(m => m.Name == "Read" && m.IsGenericMethod && m.GetParameters().Length == 1)
                            .MakeGenericMethod(type);

                        var data = method.Invoke(multi, new object[] { true });

                        results.Add(data);
                    }

                    return results;
                }
                catch (Exception ex)
                {
                    throw;
                }
                finally
                {
                    await connection.CloseAsync();
                }
            }
        }
    }
}
