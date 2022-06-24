using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class UserCreateIn
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public int RoleId { get; set; }
    }
}
