using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class UserCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
