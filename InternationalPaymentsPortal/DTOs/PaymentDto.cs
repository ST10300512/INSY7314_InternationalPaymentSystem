// For creating/viewing payments
using System.ComponentModel.DataAnnotations;

namespace InternationalPaymentsPortal.DTOs
{
    public class PaymentDto
    {
        // This ID would be used when viewing an existing payment
        public string? Id { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "Currency must be a 3-letter ISO code.")]
        public string Currency { get; set; } // e.g., "USD", "EUR", "GBP"

        [Required]
        public string RecipientName { get; set; }

        [Required]
        public string RecipientAccountNumber { get; set; }

        [Required]
        public string RecipientBankSwiftBic { get; set; }

        public string? Reference { get; set; }

        // The following properties are typically set by the server and used for viewing payments
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
