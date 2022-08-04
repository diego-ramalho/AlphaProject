using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class NewsIn
    {
        [Required]
        public string Title { get; set; }

        public string Link { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
