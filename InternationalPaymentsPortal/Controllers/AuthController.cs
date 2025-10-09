// Handles registration & login (customers & employees)
using System.Threading.Tasks;
using BCrypt.Net;
using InternationalPaymentPortal.Data.Repositories.Interfaces;
using InternationalPaymentsPortal.DTOs;
using InternationalPaymentsPortal.Models;
using Microsoft.AspNetCore.Mvc;

namespace InternationalPaymentsPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public AuthController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
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
