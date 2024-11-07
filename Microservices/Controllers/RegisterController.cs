using AutoMapper;
using MailKit;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Sockets;
using System.Security.Claims;
using System.Text;
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
        private readonly string _connectionString;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        private readonly Helpers.AuthorizationHelper _authorizationHelper;

        public RegisterController(IMapper mapper,
            IRegisterService registerService,
            IFilterService filterService,
            IUserTransactionalService userTransactionalService,
            ILogsService logsService,
            IConfiguration connectionString,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager,
            Helpers.AuthorizationHelper authorizationHelper)
        {
            _registerService = registerService;
            _filterService = filterService;
            _userTransactionalService = userTransactionalService;
            _logsService = logsService;
            _connectionString = connectionString.GetConnectionString("DefaultConnStr");
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
            entityIn.LastUpdate = ParseCET(DateTime.Now.ToString());
            LogsIn logs = LoggingInit();
            Register previousEntity = new Register();
            previousEntity.LastUpdate = ParseCET(DateTime.Now.ToString());
            logs.PreviousData = EncodeToBase64(previousEntity, _mapper);
            //var updatedEntity = new Register();
            logs.UpdatedData = EncodeToBase64(entityIn, _mapper);

            var entityDto = new RegisterDto();

            try
            {
                var registerCreatedId = _registerService.Add(entityIn);

                entityDto = _mapper.Map<RegisterDto>(entityIn);

                logs.EventType = "Register";
                logs.EventMethod = "Create";
                logs.EventResult = "Success";
                logs.RelatedId = registerCreatedId;
                _logsService.Add(logs);
            }
            catch (Exception e)
            {
                logs.EventType = "Register";
                logs.EventMethod = "Create";
                logs.EventResult = "Error : " + e.Message;
                logs.RelatedId = 0;
                _logsService.Add(logs);
            }

            //entityDto = _mapper.Map<RegisterDto>(entityIn);

            return Ok(entityDto);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            LogsIn logs = LoggingInit();
            Register previousEntity = _registerService.GetById(id);
            logs.PreviousData = EncodeToBase64(previousEntity, _mapper);
            Register updatedEntity = new Register();
            updatedEntity.LastUpdate = ParseCET(DateTime.Now.ToString());
            logs.UpdatedData = EncodeToBase64(updatedEntity, _mapper);

            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            if (user != null && user.RoleId == 1)
            {
                try
                {
                    _registerService.Delete(id);

                    //logs.Description = "Register : Delete : Success";
                    logs.EventType = "Register";
                    logs.EventMethod = "Delete";
                    logs.EventResult = "Success";
                    logs.RelatedId = id;
                    _logsService.Add(logs);
                }
                catch (Exception e)
                {
                    //logs.Description = "Register : Delete : Error : " + e.Message;
                    logs.EventType = "Register";
                    logs.EventMethod = "Delete";
                    logs.EventResult = "Error : " + e.Message;
                    logs.RelatedId = id;
                    _logsService.Add(logs);
                }

                return Ok();
            }
            else
            {
                //logs.Description = "Register : Delete : Unauthorized Access";
                logs.EventType = "Register";
                logs.EventMethod = "Delete";
                logs.EventResult = "Unauthorized Access";
                logs.RelatedId = id;
                _logsService.Add(logs);

                return BadRequest(new UnauthorizedAccessException());
            }
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] RegisterIn entityIn)
        {
            entityIn.LastUpdate = ParseCET(DateTime.Now.ToString());

            LogsIn logs = LoggingInit();
            Register previousEntity = _registerService.GetById(id);
            logs.PreviousData = EncodeToBase64(previousEntity, _mapper);
            //var updatedEntity = new Register();
            logs.UpdatedData = EncodeToBase64(entityIn, _mapper);

            User user = _authorizationHelper.GetAuthorization(Request.Headers);

            //if (user != null && user.RoleId == 1)
            if (user != null)
            {
                if (user.RoleId == 1)
                {
                    try
                    {
                        _registerService.Update(id, entityIn);

                        //logs.Description = "Register : Update (Admin) : Success";
                        logs.EventType = "Register";
                        logs.EventMethod = "Update (Admin)";
                        logs.EventResult = "Success";
                        logs.RelatedId = id;
                        _logsService.Add(logs);
                    }
                    catch (Exception e)
                    {
                        //logs.Description = "Register : Update (Admin) : Error : " + e.Message;
                        logs.EventType = "Register";
                        logs.EventMethod = "Update (Admin)";
                        logs.EventResult = "Error : " + e.Message;
                        logs.RelatedId = id;
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

                            //logs.Description = "Register : Update (Not Admin) : Success";
                            logs.EventType = "Register";
                            logs.EventMethod = "Update (Not Admin)";
                            logs.EventResult = "Success";
                            logs.RelatedId = id;
                            _logsService.Add(logs);
                        }
                        catch (Exception e)
                        {
                            //logs.Description = "Register : Update (Not Admin) : Error : " + e.Message;
                            logs.EventType = "Register";
                            logs.EventMethod = "Update (Not Admin)";
                            logs.EventResult = "Error : " + e.Message;
                            logs.RelatedId = id;
                            _logsService.Add(logs);
                        }

                        return Ok();
                    }
                    else
                    {
                        //logs.Description = "Register : Update (Not Admin) : Null Reference";
                        logs.EventType = "Register";
                        logs.EventMethod = "Update (Not Admin)";
                        logs.EventResult = "Null Reference";
                        logs.RelatedId = id;
                        _logsService.Add(logs);

                        return BadRequest(new NullReferenceException());
                    }
                }
            }
            else
            {
                //logs.Description = "Register : Update : Unauthorized Access";
                logs.EventType = "Register";
                logs.EventMethod = "Update";
                logs.EventResult = "Unauthorized Access";
                logs.RelatedId = id;
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
            logs.UserName = user.Name;
            logs.IP = GetPublicIp() + "|" + GetPrivateIp();
            logs.Origin = Request.Headers["User-Agent"];
            logs.EventMessage = "CRM Logging";
            logs.Session = _authorizationHelper.GetAuthorizationTokenString(Request.Headers);
            logs.UpdateTime = ParseCET(DateTime.Now.ToString());
            return logs;
        }

        public static DateTime ParseCET(string dt)
        {
            var cet = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time");
            var localTime = DateTime.Parse(dt);
            return TimeZoneInfo.ConvertTimeFromUtc(localTime, cet);
        }

        static string GetPrivateIp()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork) // IPv4
                {
                    return ip.ToString();
                }
            }
            return "-";  //"IP Privado não encontrado";
        }

        static string GetPublicIp()
        {
            using (var client = new WebClient())
            {
                try
                {
                    return client.DownloadString("https://api.ipify.org");
                }
                catch
                {
                    return "-"; //"IP Público não encontrado";
                }
            }
        }

        static string EncodeToBase64(RegisterIn entity, IMapper mapper)
        {
            Register fullEntity = mapper.Map<Register>(entity);

            // Serializando o objeto para JSON
            string jsonString = JsonConvert.SerializeObject(fullEntity);

            // Convertendo a string JSON para um array de bytes
            byte[] byteArray = Encoding.UTF8.GetBytes(jsonString);

            // Codificando o array de bytes em Base64
            return Convert.ToBase64String(byteArray);
        }

        static string EncodeToBase64(Register entity, IMapper mapper)
        {
            // Serializando o objeto para JSON
            string jsonString = JsonConvert.SerializeObject(entity);

            // Convertendo a string JSON para um array de bytes
            byte[] byteArray = Encoding.UTF8.GetBytes(jsonString);

            // Codificando o array de bytes em Base64
            return Convert.ToBase64String(byteArray);
        }

        static string EncodeToBase64(RegisterDto entity, IMapper mapper)
        {
            Register fullEntity = mapper.Map<Register>(entity);

            // Serializando o objeto para JSON
            string jsonString = JsonConvert.SerializeObject(fullEntity);

            // Convertendo a string JSON para um array de bytes
            byte[] byteArray = Encoding.UTF8.GetBytes(jsonString);

            // Codificando o array de bytes em Base64
            return Convert.ToBase64String(byteArray);
        }

        static Register DecodeFromBase64(string base64String)
        {
            // Decodificando a string Base64 para um array de bytes
            byte[] byteArray = Convert.FromBase64String(base64String);

            // Convertendo o array de bytes de volta para uma string JSON
            string jsonString = Encoding.UTF8.GetString(byteArray);

            // Desserializando a string JSON de volta para um objeto Pessoa
            return JsonConvert.DeserializeObject<Register>(jsonString);
        }
    }
}
