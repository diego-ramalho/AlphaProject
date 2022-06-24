using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class RegisterIn
    {
        [Required]
        public string Address { get; set; }

        [Required]
        public string Number { get; set; }

        public int ZoneId { get; set; }
    }
}
