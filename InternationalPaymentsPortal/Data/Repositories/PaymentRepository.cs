using InternationalPaymentPortal.Data.Repositories.Interfaces;
using InternationalPaymentPortal.Models;
using MongoDB.Driver;

namespace InternationalPaymentPortal.Data.Repositories
{
    // Repository for managing Payment entities in MongoDB
    // CRUD Operations
    public class PaymentRepository : IPaymentRepository
    {
        private readonly IMongoCollection<Payment> _payments;

        public PaymentRepository(IMongoDatabase database)
        {
            _payments = database.GetCollection<Payment>("payments");
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            return await _payments.Find(_ => true).ToListAsync();
        }

        public async Task<Payment?> GetByIdAsync(string id)
        {
            return await _payments.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Payment>> GetByCustomerIdAsync(string customerId)
        {
            return await _payments.Find(x => x.CustomerId == customerId).ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetByStatusAsync(string status)
        {
            return await _payments.Find(x => x.Status == status).ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetPendingAsync()
        {
            return await _payments.Find(x => x.Status == "Pending").ToListAsync();
        }

        public async Task<IEnumerable<Payment>> GetByDateRangeAsync(
            DateTime startDate,
            DateTime endDate
        )
        {
            return await _payments
                .Find(x => x.CreatedAt >= startDate && x.CreatedAt <= endDate)
                .ToListAsync();
        }

        public async Task CreateAsync(Payment payment)
        {
            await _payments.InsertOneAsync(payment);
        }

        public async Task UpdateAsync(string id, Payment payment)
        {
            await _payments.ReplaceOneAsync(x => x.Id == id, payment);
        }

        public async Task UpdateStatusAsync(string id, string status)
        {
            var update = Builders<Payment>.Update.Set(x => x.Status, status);
            await _payments.UpdateOneAsync(x => x.Id == id, update);
        }

        public async Task DeleteAsync(string id)
        {
            await _payments.DeleteOneAsync(x => x.Id == id);
        }

        public async Task<bool> ExistsAsync(string id)
        {
            var count = await _payments.CountDocumentsAsync(x => x.Id == id);
            return count > 0;
        }

        public async Task<decimal> GetTotalAmountByCustomerAsync(string customerId)
        {
            var payments = await _payments
                .Find(x => x.CustomerId == customerId && x.Status == "Completed")
                .ToListAsync();
            return payments.Sum(p => p.Amount);
        }
    }
}
