using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApiTemplate.Models
{
    public class CsvImport
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }

    public class CsvImportSerialize
    {
        public string Address { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Phone { get; set; }
        public string Observation { get; set; }
        public string Tracing { get; set; }
        public int ZoneId { get; set; }
    }
}
