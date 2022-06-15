using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IUserService
    {
        bool SaveChanges();

        IEnumerable<User> GetUsers();
        User GetUserById(int id);
        User ValidateLogin(User _user);
        void CreateUser(User user);
        string Encrypt(string decrypted_txt);
        string Decrypt(string encrypted_txt);
    }
}
