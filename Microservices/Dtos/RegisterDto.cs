﻿using System.ComponentModel.DataAnnotations;

namespace WebApiTemplate.Dtos
{
    public class RegisterDto
    {
        public int Id { get; set; }

        public string Address { get; set; }

        public string Name { get; set; }

        public string Number { get; set; }

        public string Phone { get; set; }

        public string Dni { get; set; }

        public string LastContact { get; set; }

        public string Email { get; set; }

        public string SaleDate { get; set; }

        public string Adviser { get; set; }

        public string FinalSalePrice { get; set; }

        public string Reduction { get; set; }

        public string Particular { get; set; }

        public string RealEstate { get; set; }

        public string Fee { get; set; }

        public string Observation { get; set; }

        public string Tracing { get; set; }

        public int ZoneId { get; set; }
    }
}
