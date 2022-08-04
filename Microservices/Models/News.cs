using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class News
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Link { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
