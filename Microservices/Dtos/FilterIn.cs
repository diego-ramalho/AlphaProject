using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class FilterIn
    {
        [Required]
        public string FilterName { get; set; }
    }
}
