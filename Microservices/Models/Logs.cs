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

        public string UserName { get; set; }

        public int RelatedId { get; set; }

        public string IP { get; set; }

        public string Session { get; set; }

        public string Origin { get; set; }

        public string PreviousData { get; set; }

        public string UpdatedData { get; set; }

        public string EventType { get; set; }

        public string EventMethod { get; set; }

        public string EventResult { get; set; }

        public string EventMessage { get; set; }

        [Required]
        public DateTime UpdateTime { get; set; }
    }
}
