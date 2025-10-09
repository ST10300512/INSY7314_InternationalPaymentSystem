// Payment entity
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternationalPaymentPortal.Models
{
    public class Payment
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        public string CustomerId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
        public string Provider { get; set; } = string.Empty;
        public string SwiftCode { get; set; } = string.Empty;
        public string PayeeAccount { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
