// Handles registration & login (customers & employees)
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using InternationalPaymentPortal.Data.Repositories.Interfaces;
using InternationalPaymentsPortal.DTOs;
using InternationalPaymentsPortal.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace InternationalPaymentsPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IConfiguration _configuration;

        public AuthController(
            ICustomerRepository customerRepository,
            IEmployeeRepository employeeRepository,
            IConfiguration configuration
        )
        {
            _customerRepository = customerRepository;
            _employeeRepository = employeeRepository;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            // 1. Check if user is a customer
            var customer = await _customerRepository.GetByEmailAsync(loginDto.Email);
            if (customer != null)
            {
                if (BCrypt.Net.BCrypt.Verify(loginDto.Password, customer.PasswordHash))
                {
                    var token = GenerateJwtToken(customer.Id!, customer.Email, customer.Role);
                    return Ok(new { token, role = customer.Role });
                }
            }

            // 2. If not a customer, check if user is an employee
            var employee = await _employeeRepository.GetByEmailAsync(loginDto.Email);
            if (employee != null)
            {
                if (BCrypt.Net.BCrypt.Verify(loginDto.Password, employee.PasswordHash))
                {
                    var token = GenerateJwtToken(employee.Id, employee.Email, employee.Role);
                    return Ok(new { token, role = employee.Role });
                }
            }

            // 3. If user not found in either or password incorrect
            return Unauthorized(new { message = "Invalid email or password." });
        }

        private string GenerateJwtToken(string userId, string email, string role)
        {
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
            );
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim("role", role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                    return BadRequest(new { message = "Email and password are required." });

                var existing = await _customerRepository.GetByEmailAsync(dto.Email);
                if (existing != null)
                    return Conflict(new { message = "Email already registered." });

                var customer = new Customer
                {
                    FullName = dto.FullName,
                    AccountNumber = dto.AccountNumber,
                    Email = dto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                    CreatedAt = DateTime.UtcNow,
                };

                await _customerRepository.CreateAsync(customer);

                return Ok(new { message = "Registered" });
            }
            catch (Exception ex)
            {
                // Log the error details
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return StatusCode(
                    500,
                    new { message = "Internal server error", error = ex.Message }
                );
            }
        }
    }
}
