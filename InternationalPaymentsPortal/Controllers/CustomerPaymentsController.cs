// Customers payment actions
using System.Security.Claims;
using System.Threading.Tasks;
using InternationalPaymentPortal.Data.Repositories.Interfaces;
using InternationalPaymentPortal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InternationalPaymentPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Customer")]
    public class CustomerPaymentsController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;

        public CustomerPaymentsController(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        [HttpGet("mine")]
        public async Task<IActionResult> GetMyPayments()
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(customerId))
            {
                return Unauthorized();
            }

            var payments = await _paymentRepository.GetByCustomerIdAsync(customerId);
            return Ok(payments);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePayment([FromBody] Payment paymentDto)
        {
            var customerId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(customerId))
            {
                return Unauthorized();
            }

            var payment = new Payment
            {
                CustomerId = customerId,
                Amount = paymentDto.Amount,
                Currency = paymentDto.Currency,
                Provider = paymentDto.Provider,
                SwiftCode = paymentDto.SwiftCode,
                PayeeAccount = paymentDto.PayeeAccount,
                Status = "Pending", // Default status
                CreatedAt = System.DateTime.UtcNow,
            };

            await _paymentRepository.CreateAsync(payment);

            return CreatedAtAction(nameof(GetMyPayments), new { id = payment.Id }, payment);
        }
    }
}
