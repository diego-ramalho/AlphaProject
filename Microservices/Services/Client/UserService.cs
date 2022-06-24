using Microsoft.Extensions.Options;
using System.Text;
using WebApiTemplate.Data;
using WebApiTemplate.Helpers;
using WebApiTemplate.Models;
using System.Security.Cryptography;
using WebApiTemplate.Dtos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace WebApiTemplate.Services.Client
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly AppSettings _appSettings;
        private readonly IUserTransactionalService _userTransactionalService;

        public UserService(AppDbContext context, IMapper mapper, IOptions<AppSettings> appSettings,
            IUserTransactionalService userTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _appSettings = appSettings.Value;
            _userTransactionalService = userTransactionalService;
        }

        public void CreateUser(UserCreateIn user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var _user = _mapper.Map<User>(user);

            _context.Users.Add(_user);
        }

        public void DeleteUser(int id)
        {
            if (id == null || id <= 0)
            {
                throw new ArgumentNullException(nameof(id));
            }

            var _user = _context.Users.FirstOrDefault(p => p.Id == id);

            _context.Entry(_user).State = EntityState.Deleted;
            _context.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public IEnumerable<UserRoles> GetUserRoles()
        {
            return _context.UserRoles.ToList();
        }

        public User GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(p => p.Id == id);
        }

        public User ValidateLogin(User _user)
        {
            return _context.Users.FirstOrDefault(p => p.Email == _user.Email && p.Password == _user.Password);
        }

        //public string Encrypt(string decrypted_txt)
        //{
        //    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

        //    return decrypted_txt;
        //}

        public string Encrypt(string DecryptText)
        {
            byte[] SrctArray;
            byte[] EnctArray = Encoding.UTF8.GetBytes(DecryptText);
            SrctArray = Encoding.UTF8.GetBytes(_appSettings.Secret);
            TripleDESCryptoServiceProvider objt = new TripleDESCryptoServiceProvider();
            MD5CryptoServiceProvider objcrpt = new MD5CryptoServiceProvider();
            SrctArray = objcrpt.ComputeHash(Encoding.UTF8.GetBytes(_appSettings.Secret));
            objcrpt.Clear();
            objt.Key = SrctArray;
            objt.Mode = CipherMode.ECB;
            objt.Padding = PaddingMode.PKCS7;
            ICryptoTransform crptotrns = objt.CreateEncryptor();
            byte[] resArray = crptotrns.TransformFinalBlock(EnctArray, 0, EnctArray.Length);
            objt.Clear();
            return Convert.ToBase64String(resArray, 0, resArray.Length);
        }
        public string Decrypt(string EncryptText)
        {
            byte[] SrctArray;
            byte[] DrctArray = Convert.FromBase64String(EncryptText);
            SrctArray = Encoding.UTF8.GetBytes(_appSettings.Secret);
            TripleDESCryptoServiceProvider objt = new TripleDESCryptoServiceProvider();
            MD5CryptoServiceProvider objmdcript = new MD5CryptoServiceProvider();
            SrctArray = objmdcript.ComputeHash(Encoding.UTF8.GetBytes(_appSettings.Secret));
            objmdcript.Clear();
            objt.Key = SrctArray;
            objt.Mode = CipherMode.ECB;
            objt.Padding = PaddingMode.PKCS7;
            ICryptoTransform crptotrns = objt.CreateDecryptor();
            byte[] resArray = crptotrns.TransformFinalBlock(DrctArray, 0, DrctArray.Length);
            objt.Clear();
            return Encoding.UTF8.GetString(resArray);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}
