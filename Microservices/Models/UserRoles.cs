﻿namespace WebApiTemplate.Models
{
    public class UserRoles
    {
        public int Id { get; set; }
        public string RoleName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
