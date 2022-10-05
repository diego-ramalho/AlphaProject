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
        public string Name { get; set; }

        [Required]
        public string Number { get; set; }

        public string Phone { get; set; }

        public string Dni { get; set; }

        public string LastContact { get; set; }

        public string Email { get; set; }

        public string Observation { get; set; }

        public string Tracing { get; set; }

        public int ZoneId { get; set; }

        public Zone Zone { get; set; }

        public virtual ICollection<RegisterFilters> RegisterFilters { get; set; }
    }
}
