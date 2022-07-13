using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApiTemplate.Data;
using WebApiTemplate.Models;

namespace WebApiTemplate.Helpers
{
    public class JwtAuthenticationManager
    {
        //key declaration
        private readonly IConfiguration _configuration;

        //private readonly IDictionary<string, string> users = new Dictionary<string, string>
        //{ {"test", "password"}, {"test1", "password1"}, {"user", "password"} };

        public JwtAuthenticationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //public string? Authenticate(string username, string password)
        //{
        //    //auth failed - creds incorrect
        //    //if (!users.Any(u => u.Key == username && u.Value == password))
        //    //{
        //    //    return null;
        //    //}

        //    ClaimsIdentity subjectByRoles = new ClaimsIdentity();
        //    if (user.RoleId == 1)
        //    {
        //        subjectByRoles = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username), new Claim(ClaimTypes.Role, "Admin") });
        //    }
        //    else
        //    {
        //        subjectByRoles = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username), new Claim(ClaimTypes.Role, "User") });
        //    }

        //    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        //    var tokenKey = Encoding.ASCII.GetBytes(_configuration["AppSettings:Secret"]);
        //    SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
        //    {
        //        Subject = new ClaimsIdentity(new Claim[]
        //        {
        //            new Claim(ClaimTypes.Name, username)
        //        }),
        //        // Duration of the Token
        //        // Now the the Duration to 1 Hour
        //        Expires = DateTime.UtcNow.AddHours(1),

        //        SigningCredentials = new SigningCredentials(
        //            new SymmetricSecurityKey(tokenKey),
        //            SecurityAlgorithms.HmacSha256Signature) //setting sha256 algorithm
        //    };
        //    var token = tokenHandler.CreateToken(tokenDescriptor);

        //    return tokenHandler.WriteToken(token);
        //}

        public string? Authenticate(User user)
        {
            //auth failed - creds incorrect
            //if (!users.Any(u => u.Key == user.Email && u.Value == user.Password))
            //{
            //    return null;
            //}

            //var _userZone = new UserZones();

            //if (user.RoleId == 2) //Not Admin
            //    _userZone = _context.UserZones.FirstOrDefault(p => p.UserId == user.Id);

            ClaimsIdentity subjectByRoles = new ClaimsIdentity();
            if (user.RoleId == 1)
            {
                subjectByRoles = new ClaimsIdentity(new[] { new Claim(ClaimTypes.SerialNumber, user.Id.ToString()), new Claim(ClaimTypes.Name, user.Name), new Claim(ClaimTypes.Role, "Admin") });
            }
            else
            {
                subjectByRoles = new ClaimsIdentity(new[] { new Claim(ClaimTypes.SerialNumber, user.Id.ToString()), new Claim(ClaimTypes.Name, user.Name), new Claim(ClaimTypes.Role, "User") });
            }

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(_configuration["AppSettings:Secret"]);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = subjectByRoles,
                // Duration of the Token
                // Now the the Duration to 1 Hour
                Expires = DateTime.UtcNow.AddHours(1),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature) //setting sha256 algorithm
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
