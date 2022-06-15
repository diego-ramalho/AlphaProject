using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class Zone
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string ZoneName { get; set; }

        public ICollection<Register> Registers { get; set; }

        public virtual ICollection<UserZones> UserZones { get; set; }
    }
}
