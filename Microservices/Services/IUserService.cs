using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetUsers();
        IEnumerable<UserRoles> GetUserRoles();
        User GetUserById(int id);
        User ValidateLogin(User _user);
        void CreateUser(UserCreateIn user);
        void DeleteUser(int id);
        string Encrypt(string decrypted_txt);
        string Decrypt(string encrypted_txt);
        bool SaveChanges();
    }
}
