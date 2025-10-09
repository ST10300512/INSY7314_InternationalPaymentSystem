using InternationalPaymentSystem.Models;

namespace InternationalPaymentSystem.Data.Repositories.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllAsync();
        Task<Customer?> GetByIdAsync(string id);
        Task<Customer?> GetByEmailAsync(string email);
        Task<Customer?> GetByAccountNumberAsync(string accountNumber);

        // CRUD operations
        Task CreateAsync(Customer customer);
        Task UpdateAsync(string id, Customer customer);
        Task DeleteAsync(string id);
        Task<bool> ExistsAsync(string id);
        Task<bool> EmailExistsAsync(string email);
        Task<bool> AccountNumberExistsAsync(string accountNumber);
    }
}
