// Handles hashing/salting passwords
using BCrypt.Net;

namespace InternationalPaymentsPortal.Services
{
    public class EncryptionService
    {
        // Hashes a plain-text password using BCrypt.
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Verifies that a plain-text password matches a stored hash.
        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
