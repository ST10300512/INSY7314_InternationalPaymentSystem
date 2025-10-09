// Registration request
using System.ComponentModel.DataAnnotations;

namespace InternationalPaymentsPortal.DTOs
{
    // Registration request
    public class RegisterDto
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string AccountNumber { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
