using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class LogsIn
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime UpdateTime { get; set; }
    }
}
