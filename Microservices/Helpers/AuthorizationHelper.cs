using AutoMapper;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IdentityModel.Tokens.Jwt;
using WebApiTemplate.Models;
using WebApiTemplate.Services;
using WebApiTemplate.Services.Client;

namespace WebApiTemplate.Helpers
{
    public class AuthorizationHelper
    {

        private readonly UserTransactionalService _userTransactionalService;
        private readonly IMapper _mapper;

        public AuthorizationHelper(IMapper mapper,
            UserTransactionalService userTransactionalService)
        {
            _userTransactionalService = userTransactionalService;
            _mapper = mapper;
        }

        public User GetAuthorization(IHeaderDictionary headers)
        {
            headers.TryGetValue("Authorization", out var headerValue);

            var handler = new JwtSecurityTokenHandler();

            var jwtTokenId = "";
            User userItem;
            try
            {
                var jwtToken = handler.ReadJwtToken(headerValue.ToString().Split(" ")[1]);
                jwtTokenId = jwtToken.Claims.First(claim => claim.Type == "certserialnumber").Value;
                userItem = _userTransactionalService.GetUserById(int.Parse(jwtTokenId));
            }
            catch (Exception e)
            {
                throw new ArgumentNullException(nameof(e));
            }

            //return jwtTokenId;
            return userItem;
        }

        public string GetAuthorizationTokenString(IHeaderDictionary headers)
        {
            headers.TryGetValue("Authorization", out var headerValue);

            var handler = new JwtSecurityTokenHandler();

            var jwtTokenId = "";
            string token;
            try
            {
                var jwtToken = handler.ReadJwtToken(headerValue.ToString().Split(" ")[1]);
                jwtTokenId = jwtToken.Claims.First(claim => claim.Type == "certserialnumber").Value;
                token = jwtToken.EncodedPayload;
            }
            catch (Exception e)
            {
                throw new ArgumentNullException(nameof(e));
            }

            //return jwtTokenId;
            return token;
        }
    }
}
