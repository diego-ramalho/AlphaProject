using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Models;

namespace WebApiTemplate.Data
{
    public class PrepDb
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<AppDbContext>());
            }
        }

        private static void SeedData(AppDbContext context)
        {
            if (!context.Users.Any())
            {
                Console.WriteLine("--> Seeding Data...");

                context.Users.AddRange(
                    new User() { Name = "User 01", Email = "user01@email.com", Password = "1234" },
                    new User() { Name = "User 02", Email = "user02@email.com", Password = "3456" },
                    new User() { Name = "User 03", Email = "user03@email.com", Password = "5678" }
                );

                context.SaveChanges();
            }
            else
            {
                Console.WriteLine("--> We already have data");
            }
        }
    }
}
