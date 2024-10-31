namespace WebApiTemplate.Dtos
{
    public class RegisterSmallDto
    {
        public int Id { get; set; }

        public string Address { get; set; }

        public string Name { get; set; }

        public string Number { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Dni { get; set; }

        public DateTime LastUpdate { get; set; }

        public int ZoneId { get; set; }
    }
}
