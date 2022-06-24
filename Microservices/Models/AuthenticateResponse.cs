using WebApiTemplate.Dtos;

namespace WebApiTemplate.Models
{
    public class AuthenticateResponse
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Role { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserLoginDto user, string token)
        {
            Name = user.Name;
            Email = user.Email;
            Role = (user.RoleId == 1) ? true : false;
            Token = token;
        }
    }
}