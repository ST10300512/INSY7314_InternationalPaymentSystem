// Whitelist/RegEx input validation
using System.Text.RegularExpressions;

namespace InternationalPaymentsPortal.Services
{
    public class ValidationService
    {
        // A simple regex to validate the format of an email address.
        private static readonly Regex EmailRegex = new Regex(
            @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
            RegexOptions.Compiled | RegexOptions.IgnoreCase);

        public bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }
            return EmailRegex.IsMatch(email);
        }

        // Example for validating an account number format (e.g., exactly 10 digits)
        public bool IsValidAccountNumber(string accountNumber)
        {
            if (string.IsNullOrWhiteSpace(accountNumber))
            {
                return false;
            }
            return Regex.IsMatch(accountNumber, @"^\d{10}$");
        }
    }
}