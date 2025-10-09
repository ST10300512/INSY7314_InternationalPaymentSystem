using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace InternationalPaymentsPortal.Services
{
    // A simple model representing a user in the database
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Username")]
        public string Username { get; set; }

        [BsonElement("PasswordHash")]
        public string PasswordHash { get; set; }
    }

    public interface IUserManagementService
    {
        Task<User> RegisterAsync(string username, string password);
        Task<User> LoginAsync(string username, string password);
        Task<User> GetUserByUsernameAsync(string username);
    }

    public class UserManagementService : IUserManagementService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserManagementService(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("InternationalPaymentsDb");
            _usersCollection = database.GetCollection<User>("Users");
        }

        public async Task<User> RegisterAsync(string username, string password)
        {
            var existingUser = await GetUserByUsernameAsync(username);
            if (existingUser != null)
            {
                // A user with this username already exists
                return null;
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var newUser = new User { Username = username, PasswordHash = passwordHash };

            await _usersCollection.InsertOneAsync(newUser);
            return newUser;
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            var user = await GetUserByUsernameAsync(username);
            if (user == null)
            {
                // User not found
                return null;
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

            return isPasswordValid ? user : null;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _usersCollection.Find(u => u.Username == username).FirstOrDefaultAsync();
        }
    }
}
