// Handles hashing/salting passwords

using System;
using System.Security.Cryptography;
using System.Text;

public static class EncryptService
{

    //Generating the salt for the password
    public static string GenSalt()
    {

        var saltBytes = new byte[16];

        using (var rng = new RNGCryptoServiceProvider()) 
        {
            rng.GetBytes(saltBytes); // filling the array of bytes with cryptographically strong, random values
        }

        return Convert.ToBase64String(saltBytes);

    }   

    //Hashing the password with the salt
    public static string HashPassword(string password, string salt) 
    {

        string combined = password + salt;
        using (SHA256 sha256 = SHA256.Create()) // using SHA256 to hash combined password and salt together to create a unique hash
        {
            byte[] bytes = Encoding.UTF8.GetBytes(combined); 
            byte[] hashBytes = sha256.ComputeHash(bytes);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }

    }
}