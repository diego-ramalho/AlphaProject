using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
