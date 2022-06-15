using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class Filter
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string FilterName { get; set; }

        public virtual ICollection<RegisterFilters> RegisterFilters { get; set; }
    }
}
