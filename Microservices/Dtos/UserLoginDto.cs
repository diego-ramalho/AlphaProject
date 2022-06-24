using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class UserLoginDto
    {
        [Required]
        public string Email { get; set; }

        public string Name { get; set; }

        public int RoleId { get; set; }

        public string Token { get; set; }
    }
}
