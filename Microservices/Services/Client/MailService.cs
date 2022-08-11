//using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
//using MimeKit;
using WebApiTemplate.Helpers;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }


        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            MailMessage objEmail = new MailMessage();
            objEmail.From = new MailAddress(_mailSettings.Mail);
            objEmail.To.Add(mailRequest.ToEmail);
            objEmail.Priority = MailPriority.Normal;
            objEmail.IsBodyHtml = true;
            objEmail.Subject = mailRequest.Subject;
            objEmail.Body = mailRequest.Body; // + "<br/><br/> / server:" + _mailSettings.Host + " / port:" + _mailSettings.Port + " / mail:" + _mailSettings.Mail;
            SmtpClient objSmtp = new SmtpClient();
            objSmtp.Host = _mailSettings.Host;
            //objSmtp.Port = _mailSettings.Port;
            objSmtp.Credentials = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            objSmtp.Send(objEmail);

            //var email = new MimeMessage();
            //email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            //email.From.Add(MailboxAddress.Parse(_mailSettings.Mail));
            //email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            //email.Subject = mailRequest.Subject;
            //var builder = new BodyBuilder();
            ////if (mailRequest.Attachments != null)
            ////{
            ////    byte[] fileBytes;
            ////    foreach (var file in mailRequest.Attachments)
            ////    {
            ////        if (file.Length > 0)
            ////        {
            ////            using (var ms = new MemoryStream())
            ////            {
            ////                file.CopyTo(ms);
            ////                fileBytes = ms.ToArray();
            ////            }
            ////            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
            ////        }
            ////    }
            ////}
            //builder.HtmlBody = mailRequest.Body + "<br/><br/> / server:" + _mailSettings.Host + " / port:" + _mailSettings.Port + " / mail:" + _mailSettings.Mail;
            //email.Body = builder.ToMessageBody();
            //using var smtp = new SmtpClient();
            ////smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            //smtp.Connect(_mailSettings.Host, _mailSettings.Port, true);
            //smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            //await smtp.SendAsync(email);
            //smtp.Disconnect(true);
        }
    }
}
