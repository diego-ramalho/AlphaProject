using System.IdentityModel.Tokens.Jwt;

namespace WebApiTemplate.Helpers
{
    public class TokenValidationHelper
    {
        public string GetUserIdByToken(HttpRequest request)
        {
            request.Headers.TryGetValue("Authorization", out var headerValue);

            var handler = new JwtSecurityTokenHandler();

            var jwtTokenId = "";
            try
            {
                var jwtToken = handler.ReadJwtToken(headerValue.ToString().Split(" ")[1]);
                jwtTokenId = jwtToken.Claims.First(claim => claim.Type == "certserialnumber").Value;
            }
            catch (Exception e)
            {
                throw new ArgumentNullException(nameof(e));
            }

            return jwtTokenId;
        }
    }
}
