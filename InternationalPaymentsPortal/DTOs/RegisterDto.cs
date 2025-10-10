// Registration request
using System.ComponentModel.DataAnnotations;

namespace InternationalPaymentsPortal.DTOs
{
    // Registration request
    public class RegisterDto
    {
        [Required]
        [StringLength(
            100,
            MinimumLength = 2,
            ErrorMessage = "Full name must be between 2 and 100 characters."
        )]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Account number must be exactly 10 digits.")]
        public string AccountNumber { get; set; }

        [Required]
        [StringLength(
            100,
            MinimumLength = 8,
            ErrorMessage = "Password must be at least 8 characters long."
        )]
        public string Password { get; set; }
    }
}
