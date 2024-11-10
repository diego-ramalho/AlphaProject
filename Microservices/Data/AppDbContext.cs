using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using WebApiTemplate.Models;

namespace WebApiTemplate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Register> Registers { get; set; }

        public DbSet<Zone> Zones { get; set; }

        public DbSet<Filter> Filters { get; set; }

        public DbSet<Charges> Charges { get; set; }

        public DbSet<News> News { get; set; }

        [NotMapped]
        public DbSet<UserRoles> UserRoles { get; set; }

        [NotMapped]
        public DbSet<UserZones> UserZones { get; set; }

        [NotMapped] 
        public DbSet<RegisterFilters> RegisterFilters { get; set; }

        //public DbSet<RegisterZone> RegistersZones { get; set; }

        public DbSet<Logs> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Write Fluent API configurations here

            //Property Configurations
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasOne<UserRoles>(r => r.UserRoles)
                .WithMany(u => u.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.NoAction);            
            modelBuilder.Entity<User>() // Define que o campo "Email" é único
                .HasIndex(u => u.Email)
                .IsUnique(); // Garantir que o Email seja único

            modelBuilder.Entity<Register>()
                .HasOne<Zone>(r => r.Zone)
                .WithMany(u => u.Registers)
                .HasForeignKey(u => u.ZoneId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<RegisterFilters>()
                .HasKey(rf => new { rf.RegisterId, rf.FilterId });
            modelBuilder.Entity<RegisterFilters>()
                .HasOne(rf => rf.Register)
                .WithMany(r => r.RegisterFilters)
                .HasForeignKey(rf => rf.RegisterId);
            modelBuilder.Entity<RegisterFilters>()
                .HasOne(rf => rf.Filter)
                .WithMany(f => f.RegisterFilters)
                .HasForeignKey(rf => rf.FilterId);

            modelBuilder.Entity<UserZones>()
                .HasKey(uz => new { uz.UserId, uz.ZoneId });
            modelBuilder.Entity<UserZones>()
                .HasOne(uz => uz.User)
                .WithMany(u => u.UserZones)
                .HasForeignKey(uz => uz.UserId);
            modelBuilder.Entity<UserZones>()
                .HasOne(uz => uz.Zone)
                .WithMany(z => z.UserZones)
                .HasForeignKey(uz => uz.ZoneId);



            //modelBuilder.Entity<User>()
            //    .HasOne<UsersRoles>(r => r.UsersRoles)
            //    .WithMany(u => u.Users)
            //    .HasForeignKey(u => u.UsersRolesId)
            //    .OnDelete(DeleteBehavior.NoAction);

            //.HasColumnName("Id")
            //.HasDefaultValue(0)
            //.Ignore(t => t.Budget)
            //.IsRequired()

            // Configure the primary key for the OfficeAssignment
            //modelBuilder.Entity<OfficeAssignment>()
            //    .HasKey(t => t.InstructorID);

            // Map one-to-zero or one relationship
            //modelBuilder.Entity<OfficeAssignment>()
            //    .HasRequired(t => t.Instructor)
            //    .WithOptional(t => t.OfficeAssignment);
        }
    }
}
