﻿using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services
{
    public interface IUserTransactionalService
    {
        IEnumerable<User> GetUsers();

        IEnumerable<UserRoles> GetUserRoles();

        void CreateUser(UserCreateIn user);
        void DeleteUser(int id);

        void UpdateUser(int id, UserCreateIn user);

        UserLoginDto ValidateLogin(UserLoginIn user);

        User GetUserById(int id);

        //AuthenticateResponse Authenticate(AuthenticateRequest model);

        string generateJwtToken(User user);

        string Encrypt(string decrypted_txt);

        string Decrypt(string encrypted_txt);

        string NewPassword(string email);

        void SendMail(MailRequest request);

        bool SaveChanges();
    }
}