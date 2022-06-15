using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class RegisterFilters
    {
        [Required]
        public int RegisterId { get; set; }

        public Register Register { get; set; }

        [Required]
        public int FilterId { get; set; }

        public Filter Filter { get; set; }
    }
}
