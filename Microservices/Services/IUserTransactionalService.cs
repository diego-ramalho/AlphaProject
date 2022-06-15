using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IUserTransactionalService
    {
        IEnumerable<User> GetUsers();

        void CreateUser(User user);
        
        UserLoginDto ValidateLogin(UserLoginIn user);

        User GetUserById(int id);
        string Encrypt(string decrypted_txt);
        string Decrypt(string encrypted_txt);

        bool SaveChanges();
    }
}
