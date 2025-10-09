using InternationalPaymentSystem.Data.Repositories.Interfaces;
using InternationalPaymentSystem.Models;
using MongoDB.Driver;

namespace InternationalPaymentSystem.Data.Repositories
{
    // Repository for managing Employee entities in MongoDB
    // CRUD Operations
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IMongoCollection<Employee> _employees;

        public EmployeeRepository(IMongoDatabase database)
        {
            _employees = database.GetCollection<Employee>("employees");
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employees.Find(_ => true).ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(string id)
        {
            return await _employees.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Employee?> GetByEmailAsync(string email)
        {
            return await _employees.Find(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Employee>> GetByRoleAsync(string role)
        {
            return await _employees.Find(x => x.Role == role).ToListAsync();
        }

        public async Task CreateAsync(Employee employee)
        {
            await _employees.InsertOneAsync(employee);
        }

        public async Task UpdateAsync(string id, Employee employee)
        {
            await _employees.ReplaceOneAsync(x => x.Id == id, employee);
        }

        public async Task DeleteAsync(string id)
        {
            await _employees.DeleteOneAsync(x => x.Id == id);
        }

        public async Task<bool> ExistsAsync(string id)
        {
            var count = await _employees.CountDocumentsAsync(x => x.Id == id);
            return count > 0;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            var count = await _employees.CountDocumentsAsync(x => x.Email == email);
            return count > 0;
        }
    }
}
