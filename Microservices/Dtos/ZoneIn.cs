using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class ZoneIn
    {
        [Required]
        public string ZoneName { get; set; }
    }
}
