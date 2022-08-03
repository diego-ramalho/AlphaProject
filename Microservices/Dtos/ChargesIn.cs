using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class ChargesIn
    {
        [Required]
        public string Value { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
