using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class UserCreateIn
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
        
        public string Password { get; set; }

        [Required]
        public int RoleId { get; set; }

        [Required]
        public int ZoneId { get; set; }
    }
}
