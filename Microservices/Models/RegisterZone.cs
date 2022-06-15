using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class RegisterZone
    {
        [Key]
        [Required]
        public int RegisterId { get; set; }

        [Key]
        [Required]
        public int ZoneId { get; set; }
    }
}
