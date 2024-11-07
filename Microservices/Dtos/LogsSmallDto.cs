namespace WebApiTemplate.Dtos
{
    public class LogsSmallDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public string EventType { get; set; }

        public string EventMethod { get; set; }

        public string EventResult { get; set; }

        public DateTime UpdateTime { get; set; }
    }
}
