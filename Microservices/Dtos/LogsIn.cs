using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class LogsIn
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int RegisterId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime UpdateTime { get; set; }
    }
}
