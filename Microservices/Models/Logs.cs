using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Models
{
    public class Logs
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        public int RegisterId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime UpdateTime { get; set; }
    }
}
