using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class UserZones
    {
        [Required]
        public int UserId { get; set; }

        public User User { get; set; }

        [Required]
        public int ZoneId { get; set; }

        public Zone Zone { get; set; }
    }
}
