// Customer entity
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace InternationalPaymentsPortal.Models
{
    public class Customer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("FullName")]
        public required string FullName { get; set; }

        [BsonElement("Email")]
        public required string Email { get; set; }

        [BsonElement("AccountNumber")]
        public required string AccountNumber { get; set; }

        [BsonElement("PasswordHash")]
        public required string PasswordHash { get; set; }

        [BsonElement("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
