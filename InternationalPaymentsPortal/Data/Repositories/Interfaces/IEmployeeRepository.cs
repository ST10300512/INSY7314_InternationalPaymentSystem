using InternationalPaymentPortal.Models;

namespace InternationalPaymentPortal.Data.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee?> GetByIdAsync(string id);
        Task<Employee?> GetByEmailAsync(string email);
        Task<IEnumerable<Employee>> GetByRoleAsync(string role);

        // Basic CRUD operations
        Task CreateAsync(Employee employee);
        Task UpdateAsync(string id, Employee employee);
        Task DeleteAsync(string id);
        Task<bool> ExistsAsync(string id);
        Task<bool> EmailExistsAsync(string email);
    }
}
