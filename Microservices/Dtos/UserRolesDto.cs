using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class UserRolesDto
    {
        [Required]
        public string Email { get; set; }

        public string Name { get; set; }

        public int RoleId { get; set; }

        public int ZoneId { get; set; }
    }
}
