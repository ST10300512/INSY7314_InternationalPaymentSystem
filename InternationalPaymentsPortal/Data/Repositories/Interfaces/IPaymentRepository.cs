using InternationalPaymentSystem.Models;

namespace InternationalPaymentSystem.Data.Repositories.Interfaces
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(string id);
        Task<IEnumerable<Payment>> GetByCustomerIdAsync(string customerId);
        Task<IEnumerable<Payment>> GetByStatusAsync(string status);
        Task<IEnumerable<Payment>> GetPendingAsync();
        Task<IEnumerable<Payment>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);

        // CRUD operations
        Task CreateAsync(Payment payment);
        Task UpdateAsync(string id, Payment payment);
        Task UpdateStatusAsync(string id, string status);
        Task DeleteAsync(string id);
        Task<bool> ExistsAsync(string id);
        Task<decimal> GetTotalAmountByCustomerAsync(string customerId);
    }
}
