using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class Register
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Number { get; set; }

        public int ZoneId { get; set; }

        public Zone Zone { get; set; }

        public virtual ICollection<RegisterFilters> RegisterFilters { get; set; }
    }
}
