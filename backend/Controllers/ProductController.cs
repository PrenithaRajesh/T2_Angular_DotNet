using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        DataContext _dapper;

        public ProductController(IConfiguration config)
        {
            _dapper = new DataContext(config);
        }

        [HttpGet("TestConnection")]
        public DateTime TestConnection()
        {
            return _dapper.LoadDataSingle<DateTime>("SELECT GETDATE()");
        }

        [HttpGet("GetProducts")]
        public IEnumerable<Product> GetProducts()
        {
            string sql = "SELECT * FROM Prenitha.Product";
            return _dapper.LoadData<Product>(sql);
        }

        [HttpPost("AddProduct")]
        public IActionResult AddProduct(Product product)
        {
            string sql = "INSERT INTO Prenitha.Product(PId, PName, Price, Quantity, Category, IsPremium) VALUES (@PId, @PName, @Price, @Quantity, @Category, @IsPremium)";
            if (_dapper.ExecuteSqlWithParams<Product>(sql, product)){
                return Ok();
            }
            throw new Exception("Failed to add Product");
        }

        [HttpPut("UpdateProduct")]
        public IActionResult UpdateProduct(Product product)
        {
            string sql = @"UPDATE Prenitha.Product 
                            SET PName = @PName,
                            Price = @Price,
                            Quantity = @Quantity,
                            Category = @Category,
                            IsPremium = @IsPremium
                            WHERE PId = @PId";
            if (_dapper.ExecuteSqlWithParams<Product>(sql, product)){
                return Ok();
            }
            throw new Exception("Failed to update product");
        }

        [HttpDelete("DeleteProduct/{pId}")]
        public IActionResult DeleteProduct(int pId)
        {
            string sql = $"DELETE FROM Prenitha.Product WHERE PId={pId}";
            
            if (_dapper.ExecuteSqlWithParams<int>(sql, pId))
            {
                return Ok();
            }
            throw new Exception("Failed to delete user");
        }

    }
}