using AutoMapper;
using MailKit;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;
using WebApiTemplate.Services;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;
        private readonly IFilterService _filterService;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        private readonly Helpers.AuthorizationHelper _authorizationHelper;

        public RegisterController(IMapper mapper,
            IRegisterService registerService,
            IFilterService filterService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager,
            Helpers.AuthorizationHelper authorizationHelper)
        {
            _registerService = registerService;
            _filterService = filterService;
            _userTransactionalService = userTransactionalService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _authorizationHelper = authorizationHelper;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<RegisterSmallDto>> GetAll()
        {
            //if (context.Request.Headers.TryGetValue("AccessToken", out StringValues headerValue))
            //{
            //    JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            //    var jwt = tokenHandler.ReadJwtToken(token);

            //    string token = headerValue;
            //    if (!string.IsNullOrEmpty(token) && token.StartsWith(BearerPrefix))
            //    {
            //        token = token.Substring(BearerPrefix.Length);
            //    }

            //    context.Token = token;

            var getAll = _registerService.GetAll();

            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            if (user != null)
            {
                //var userItem = _userTransactionalService.GetUserById(int.Parse(jwtTokenId));
                if (user != null && user.RoleId == 2)
                {
                    //var userZone = _userTransactionalService.GetZoneByUser(int.Parse(jwtTokenId));
                    var userZone = _userTransactionalService.GetZoneByUser(user.Id);

                    //Get Zone
                    getAll = getAll.Where(r => r.ZoneId == userZone.ZoneId); //TODO
                }
            }
            else
            {
                throw new ArgumentNullException("Invalid Object");
            }

            //var jti = jwtToken.Claims.First(claim => claim.Type == "sid").Value;

            //var getAll = _registerService.GetAll();

            return Ok(_mapper.Map<IEnumerable<RegisterSmallDto>>(getAll));
        }

        //private string GetAuthorization(IHeaderDictionary headers)
        //{
        //    //Request.Headers.TryGetValue("Authorization", out var headerValue);
        //    headers.TryGetValue("Authorization", out var headerValue);

        //    var handler = new JwtSecurityTokenHandler();

        //    var jwtTokenId = "";
        //    try
        //    {
        //        var jwtToken = handler.ReadJwtToken(headerValue.ToString().Split(" ")[1]);
        //        jwtTokenId = jwtToken.Claims.First(claim => claim.Type == "certserialnumber").Value;
        //    }
        //    catch (Exception e)
        //    {
        //        throw new ArgumentNullException(nameof(e));
        //    }

        //    return jwtTokenId;
        //}

        [HttpGet("GetAllByFilter")]
        public ActionResult<IEnumerable<RegisterSmallDto>> GetAllByFilter(int filterId)
        {
            var getAllFilters = _filterService.GetFilterRegistersAll().Where(f => f.FilterId == filterId);
            var getAllFiltersId = getAllFilters.Select(f => f.RegisterId);
            //var getAll = _registerService.GetAll();
            var getAll = _registerService.GetAll().Where(r => getAllFiltersId.Contains(r.Id));

            //Request.Headers.TryGetValue("Authorization", out var headerValue);

            //var handler = new JwtSecurityTokenHandler();

            //var jwtTokenId = "";
            //try
            //{
            //    var jwtToken = handler.ReadJwtToken(headerValue.ToString().Split(" ")[1]);
            //    jwtTokenId = jwtToken.Claims.First(claim => claim.Type == "certserialnumber").Value;
            //}
            //catch (Exception e)
            //{
            //    throw new ArgumentNullException(nameof(e));
            //}

            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            if (user != null)
            {
                //var userItem = _userTransactionalService.GetUserById(int.Parse(jwtTokenId));
                if (user != null && user.RoleId == 2)
                {
                    var userZone = _userTransactionalService.GetZoneByUser(user.Id);

                    //Get Zone
                    getAll = getAll.Where(r => r.ZoneId == userZone.ZoneId); //TODO
                }
            }
            else
            {
                throw new ArgumentNullException("Invalid Object");
            }

            //getAll = getAll.Where(r => getAllFilters.Contains(r.Id));

            return Ok(_mapper.Map<IEnumerable<RegisterSmallDto>>(getAll));
        }

        [HttpGet("GetById/{id}")]
        public ActionResult<RegisterDto> GetById(int id)
        {
            var entity = _registerService.GetById(id);

            if (entity != null)
            {
                return Ok(_mapper.Map<RegisterDto>(entity));
            }

            return NotFound();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<RegisterDto>> Create(RegisterIn entityIn)
        {
            _registerService.Add(entityIn);

            var entityDto = _mapper.Map<RegisterDto>(entityIn);

            return Ok(entityDto);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            if (user != null && user.RoleId == 1)
            {
                _registerService.Delete(id);

                return Ok();
            }
            else
            {
                return BadRequest(new UnauthorizedAccessException());
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] RegisterIn entityIn)
        {
            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            if (user != null && user.RoleId == 1)
            {
                _registerService.Update(id, entityIn);

                return Ok();
            }
            else
            {
                //return Unauthorized("Not Authorized");
                return BadRequest(new UnauthorizedAccessException());
            }
        }
    }
}
