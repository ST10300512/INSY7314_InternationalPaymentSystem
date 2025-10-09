// Middleware helpers (anti-XSS, anti-CSRF, etc.)
using System.Text.Encodings.Web;

namespace InternationalPaymentsPortal.Services
{
    public class SecurityService
    {
        private readonly HtmlEncoder _htmlEncoder;

        public SecurityService(HtmlEncoder htmlEncoder)
        {
            _htmlEncoder = htmlEncoder;
        }

        // Encodes a string to be safe for inclusion in HTML content.
        // This prevents scripts from being inadvertently executed.
        public string SanitizeHtml(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return string.Empty;
            }
            return _htmlEncoder.Encode(input);
        }
    }
}