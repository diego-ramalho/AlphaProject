namespace WebApiTemplate.Dtos
{
    public class LogsDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public string EventType { get; set; }

        public string EventMethod { get; set; }

        public string EventResult { get; set; }

        //public string PreviousData { get; set; }
        public RegisterDto PreviousData { get; set; }

        //public string UpdatedData { get; set; }
        public RegisterDto UpdatedData { get; set; }

        public DateTime UpdateTime { get; set; }
    }
}
