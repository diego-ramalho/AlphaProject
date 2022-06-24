using System.Text;
using WebApiTemplate.Data;
using WebApiTemplate.Models;
using System.Security.Cryptography;
using WebApiTemplate.Helpers;
using Microsoft.Extensions.Options;
using WebApiTemplate.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using IdentityModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace WebApiTemplate.Services.Client
{
    public class UserTransactionalService : IUserTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly AppSettings _appSettings;
        private readonly IMailService _mailService;
        private readonly JwtAuthenticationManager _jwtAuthenticationManager;
        
        public UserTransactionalService(IMapper mapper, 
            AppDbContext context, 
            IOptions<AppSettings> appSettings, 
            IMailService mailService,
            JwtAuthenticationManager jwtAuthenticationManager)
        {
            _mapper = mapper;
            _context = context;
            _appSettings = appSettings.Value; 
            _mailService = mailService;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public IEnumerable<UserRoles> GetUserRoles()
        {
            return _context.UserRoles.ToList();
        }

        public void CreateUser(UserCreateIn user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            var _user = _mapper.Map<User>(user);

            _user.Password = Encrypt(NewPassword(null));

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

        public void UpdateUser(int id, UserCreateIn user)
        {
            if (id == null || id <= 0)
            {
                throw new ArgumentNullException(nameof(id));
            }

            var _user = _context.Users.FirstOrDefault(p => p.Id == id);

            _user.Name = user.Name;
            _user.Email = user.Email;
            _user.RoleId = user.RoleId;

            _context.Users.Update(_user);
            _context.SaveChanges();
        }

        public UserLoginDto ValidateLogin(UserLoginIn user)
        {
            var _user = _context.Users.FirstOrDefault(p => p.Email == user.Email && p.Password == this.Encrypt(user.Password));

            if (_user == null)
            {
                throw new ArgumentNullException(nameof(_user));
            }

            //var token = generateJwtToken(_user);
            //JwtAuthenticationManager jwtAuthenticationManager = new JwtAuthenticationManager(_appSettings.Secret);
            var token = _jwtAuthenticationManager.Authenticate(_user);

            var userDto = _mapper.Map<UserLoginDto>(_user);
            userDto.Token = token;

            return userDto;
        }

        public User GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(p => p.Id == id);
        }

        //public AuthenticateResponse Authenticate(AuthenticateRequest model)
        //{
        //    //var user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);
        //    string _password = model.Password;
        //    string _new_password = Encrypt(_password);

        //    //var loginItem = await _context.LoginItems.FindAsync(id);
        //    var user = _context.Users.SingleOrDefault(acc => acc.Email == model.Email && acc.Password == _new_password);

        //    // return null if user not found
        //    if (user == null) return null;

        //    // authentication successful so generate jwt token
        //    var token = generateJwtToken(user);

        //    return new AuthenticateResponse(user, token);
        //}

        public string generateJwtToken(User user)
        {
            ClaimsIdentity subjectByRoles = new ClaimsIdentity();
            if (user.RoleId == 1)
            {
                subjectByRoles = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim(ClaimTypes.Role, "Admin") });
            }
            else
            {
                subjectByRoles = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim(ClaimTypes.Role, "User") });
            }

            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {                
                Subject = subjectByRoles,
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
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

        public string NewPassword(string? email)
        {
            var opts = new PasswordOptions()
            {
                RequiredLength = 8,
                RequiredUniqueChars = 4,
                RequireDigit = true,
                RequireLowercase = true,
                RequireNonAlphanumeric = true,
                RequireUppercase = true
            };

            string[] randomChars = new[] {
                "ABCDEFGHJKLMNOPQRSTUVWXYZ",    // uppercase 
                "abcdefghijkmnopqrstuvwxyz",    // lowercase
                "0123456789",                   // digits
                "!@$?_-"                        // non-alphanumeric
            };

            CryptoRandom rand = new CryptoRandom();
            List<char> chars = new List<char>();

            if (opts.RequireUppercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[0][rand.Next(0, randomChars[0].Length)]);

            if (opts.RequireLowercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[1][rand.Next(0, randomChars[1].Length)]);

            if (opts.RequireDigit)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[2][rand.Next(0, randomChars[2].Length)]);

            if (opts.RequireNonAlphanumeric)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[3][rand.Next(0, randomChars[3].Length)]);

            for (int i = chars.Count; i < opts.RequiredLength
                || chars.Distinct().Count() < opts.RequiredUniqueChars; i++)
            {
                string rcs = randomChars[rand.Next(0, randomChars.Length)];
                chars.Insert(rand.Next(0, chars.Count),
                    rcs[rand.Next(0, rcs.Length)]);
            }

            if(!String.IsNullOrEmpty(email))
                SendMail(new MailRequest() { ToEmail = email , Subject = "Nova Password", Body = new string(chars.ToArray()) });

            return new string(chars.ToArray());
        }

        public async void SendMail(MailRequest request)
        {
            try
            {
                await _mailService.SendEmailAsync(request);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}
