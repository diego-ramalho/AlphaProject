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
using WebApiTemplate.Services.Client;

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
        private readonly ILogsService _logsService;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        private readonly Helpers.AuthorizationHelper _authorizationHelper;

        public RegisterController(IMapper mapper,
            IRegisterService registerService,
            IFilterService filterService,
            IUserTransactionalService userTransactionalService,
            ILogsService logsService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager,
            Helpers.AuthorizationHelper authorizationHelper)
        {
            _registerService = registerService;
            _filterService = filterService;
            _userTransactionalService = userTransactionalService;
            _logsService = logsService;
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
            LogsIn logs = LoggingInit();

            var entityDto = new RegisterDto();

            try
            {
                _registerService.Add(entityIn);

                entityDto = _mapper.Map<RegisterDto>(entityIn);

                logs.Description = "Register : Create : Success";
                //logs.RegisterId = entityDto.Id;
                _logsService.Add(logs);
            }
            catch (Exception e)
            {
                logs.Description = "Register : Create : Error : " + e.Message;
                //logs.RegisterId = 0;
                _logsService.Add(logs);
            }

            //entityDto = _mapper.Map<RegisterDto>(entityIn);

            return Ok(entityDto);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            LogsIn logs = LoggingInit();

            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            if (user != null && user.RoleId == 1)
            {
                try
                {
                    _registerService.Delete(id);

                    logs.Description = "Register : Delete : Success";
                    logs.RegisterId = id;
                    _logsService.Add(logs);
                }
                catch (Exception e)
                {
                    logs.Description = "Register : Delete : Error : " + e.Message;
                    logs.RegisterId = id;
                    _logsService.Add(logs);
                }

                return Ok();
            }
            else
            {
                logs.Description = "Register : Delete : Unauthorized Access";
                logs.RegisterId = id;
                _logsService.Add(logs);

                return BadRequest(new UnauthorizedAccessException());
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] RegisterIn entityIn)
        {
            LogsIn logs = LoggingInit();

            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            //if (user != null && user.RoleId == 1)
            if (user != null)
            {
                if (user.RoleId == 1)
                {
                    try
                    {
                        _registerService.Update(id, entityIn);

                        logs.Description = "Register : Update (Admin) : Success";
                        logs.RegisterId = id;
                        _logsService.Add(logs);
                    }
                    catch (Exception e)
                    {
                        logs.Description = "Register : Update (Admin) : Error : " + e.Message;
                        logs.RegisterId = id;
                        _logsService.Add(logs);
                    }

                    return Ok();
                }
                else
                {
                    var entidade = _registerService.GetById(id);
                    if (entidade != null)
                    {
                        entityIn.Address = entidade.Address;
                        entityIn.Name = entidade.Name;

                        try
                        {
                            _registerService.Update(id, entityIn);

                            logs.Description = "Register : Update (Not Admin) : Success";
                            logs.RegisterId = id;
                            _logsService.Add(logs);
                        }
                        catch (Exception e)
                        {
                            logs.Description = "Register : Update (Not Admin) : Error : " + e.Message;
                            logs.RegisterId = id;
                            _logsService.Add(logs);
                        }

                        return Ok();
                    }
                    else
                    {
                        logs.Description = "Register : Update (Not Admin) : Null Reference";
                        logs.RegisterId = id;
                        _logsService.Add(logs);

                        return BadRequest(new NullReferenceException());
                    }
                }
            }
            else
            {
                logs.Description = "Register : Update : Unauthorized Access";
                logs.RegisterId = id;
                _logsService.Add(logs);

                //return Unauthorized("Not Authorized");
                return BadRequest(new UnauthorizedAccessException());
            }
        }




        private LogsIn LoggingInit()
        {
            User user = _authorizationHelper.GetAuthorization(Request.Headers);
            LogsIn logs = new LogsIn();
            logs.UserId = user.Id;
            logs.UpdateTime = ParseCET(DateTime.Now.ToString());
            return logs;
        }

        public static DateTime ParseCET(string dt)
        {
            var cet = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
            var localTime = DateTime.Parse(dt);
            return TimeZoneInfo.ConvertTimeFromUtc(localTime, cet);
        }
    }
}
