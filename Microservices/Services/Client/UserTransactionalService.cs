using System.Text;
using WebApiTemplate.Data;
using WebApiTemplate.Models;
using System.Security.Cryptography;
using WebApiTemplate.Helpers;
using Microsoft.Extensions.Options;
using WebApiTemplate.Dtos;
using AutoMapper;

namespace WebApiTemplate.Services.Client
{
    public class UserTransactionalService : IUserTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly AppSettings _appSettings;

        public UserTransactionalService(IMapper mapper, AppDbContext context, IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _context = context;
            _appSettings = appSettings.Value;
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public void CreateUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Add(user);
        }

        public UserLoginDto ValidateLogin(UserLoginIn user)
        {
            var _user = _context.Users.FirstOrDefault(p => p.Email == user.Email && p.Password == this.Encrypt(user.Password));
            var UserLoginDto = _mapper.Map<UserLoginDto>(_user);
            return UserLoginDto;
        }

        public User GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(p => p.Id == id);
        }

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
