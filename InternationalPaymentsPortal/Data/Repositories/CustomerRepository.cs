using InternationalPaymentSystem.Data.Repositories.Interfaces;
using InternationalPaymentSystem.Models;
using MongoDB.Driver;

namespace InternationalPaymentSystem.Data.Repositories
{
    // Repository for managing Customer entities in MongoDB
    // CRUD Operations
    public class CustomerRepository : ICustomerRepository
    {
        private readonly IMongoCollection<Customer> _customers;

        public CustomerRepository(IMongoDatabase database)
        {
            _customers = database.GetCollection<Customer>("customers");
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _customers.Find(_ => true).ToListAsync();
        }

        public async Task<Customer?> GetByIdAsync(string id)
        {
            return await _customers.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Customer?> GetByEmailAsync(string email)
        {
            return await _customers.Find(x => x.Email == email).FirstOrDefaultAsync();
        }

        public async Task<Customer?> GetByAccountNumberAsync(string accountNumber)
        {
            return await _customers
                .Find(x => x.AccountNumber == accountNumber)
                .FirstOrDefaultAsync();
        }

        public async Task CreateAsync(Customer customer)
        {
            await _customers.InsertOneAsync(customer);
        }

        public async Task UpdateAsync(string id, Customer customer)
        {
            await _customers.ReplaceOneAsync(x => x.Id == id, customer);
        }

        public async Task DeleteAsync(string id)
        {
            await _customers.DeleteOneAsync(x => x.Id == id);
        }

        public async Task<bool> ExistsAsync(string id)
        {
            var count = await _customers.CountDocumentsAsync(x => x.Id == id);
            return count > 0;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            var count = await _customers.CountDocumentsAsync(x => x.Email == email);
            return count > 0;
        }

        public async Task<bool> AccountNumberExistsAsync(string accountNumber)
        {
            var count = await _customers.CountDocumentsAsync(x => x.AccountNumber == accountNumber);
            return count > 0;
        }
    }
}
