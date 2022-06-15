using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class User
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public int RoleId { get; set; }

        public UserRoles? UserRoles { get; set; }

        public virtual ICollection<UserZones>? UserZones { get; set; }
    }
}
