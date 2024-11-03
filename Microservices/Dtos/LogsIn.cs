using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class LogsIn
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int RelatedId { get; set; }

        public string UserName { get; set; }

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
