using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class NewsIn
    {
        public string Link { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
