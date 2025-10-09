// Handles registration & login (customers & employees) 

public class AuthController : BaseController
{

    private readonly DbContext_context;


    public AuthController(DbContext_context context)
    {
        _context = context;
    }


    public IActionResult Register(string Email, string Password)
    {

        // Basic validation
        if (string.IsNullOrWhiteSpace(Email))
            return BadRequest("Email field cannot be empty"); // checks for empty email field


        if (_context.Users.Any(u => u.Email == Email))
            return BadRequest("Email already in use"); // checks if email is already in use


        if (string.IsNullOrWhiteSpace(Password) || Password.Length < 8)
            return BadRequest("Password must be at least 8 characters long"); // checks for empty password field or if password is too short
        
        // Hashing & salting the password
        string salt = EncryptService.GenSalt();
        string hashedPassword = EncryptService.HashPassword(Password, salt);

        // Creating the user
        var newUser = new User
        {
            Email = Email,
            PasswordHash = hashedPassword,
            Salt = salt,
        };

        // Saving the user to the database
        _context.Users.Add(newUser);
        _context.SaveChanges();

        return Ok("User has been registered.");

    }



    public IActionResult Login()
    {
        var user = _context.Users.SingleOrDefault(u => u.Email == Email);
        if (user == null)
            return Unauthorized("Invalid email or password"); // checks if user exists

        string hashedInputPassword = EncryptService.HashPassword(Password, user.Salt);
        if (hashedInputPassword != user.PasswordHash)
            return Unauthorized("Invalid email or password"); // checks if password is correct

        string token = GenerateJwtToken(user);
        return Ok(new { Token = token });
    }



}