using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IUserTransactionalService
    {
        IEnumerable<User> GetUsers();

        IEnumerable<UserRoles> GetUserRoles();

        IEnumerable<Zone> GetUserZones();

        UserZones GetZoneByUser(int userId);


        void CreateUser(UserCreateIn user);

        void DeleteUser(int id);

        void UpdateUser(int id, UserCreateIn user);

        void UpdateUserPassword(int id, string pass);

        UserLoginDto ValidateLogin(UserLoginIn user);

        User GetUserById(int id);

        int GetZoneByUserId(int id);

        int GetUserIdByEmail(string email);

        User GetUserByEmail(string email);

        //AuthenticateResponse Authenticate(AuthenticateRequest model);

        string generateJwtToken(User user);

        string Encrypt(string decrypted_txt);

        string Decrypt(string encrypted_txt);

        string NewPassword(string email);

        void SendMail(MailRequest request);

        bool SaveChanges();
    }
}
