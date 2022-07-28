using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class Charges
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Value { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
