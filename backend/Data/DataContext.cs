using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;

namespace Backend.Data{
    public class DataContext{
        private readonly IConfiguration _config;
        public DataContext(IConfiguration config){
            _config = config;
        }

        public IEnumerable<T> LoadData<T>(string sql){
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.Query<T>(sql);
        }

        public T LoadDataSingle<T>(string sql){
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.QuerySingle<T>(sql);
        }

        public bool ExecuteSqlWithParams<T>(string sql, T data){
            IDbConnection dbConnection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            return dbConnection.Execute(sql,data) > 0;
        }
        
    }
}