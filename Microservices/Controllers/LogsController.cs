using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using WebApiTemplate.Dtos;
using WebApiTemplate.Helpers;
using WebApiTemplate.Models;
using WebApiTemplate.Services;
using WebApiTemplate.Services.Client;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class LogsController : ControllerBase
    {

        private readonly ILogsService _logsService;
        private readonly IMapper _mapper;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        private readonly TokenValidationHelper _tokenValidationHelper;

        public LogsController(IMapper mapper,
            ILogsService logsService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager,
            TokenValidationHelper tokenValidationHelper)
        {
            _logsService = logsService;
            _mapper = mapper;
            _userTransactionalService = userTransactionalService;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _tokenValidationHelper = tokenValidationHelper;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<LogsSmallDto>> GetAll()
        {
            var getAll = _logsService.GetAll();

            return Ok(_mapper.Map<IEnumerable<LogsSmallDto>>(getAll));
        }

        [HttpGet("GetById/{id}")]
        public ActionResult<LogsDto> GetById(int id)
        {
            var entity = _logsService.GetById(id);

            if (entity != null)
            {
                return Ok(_mapper.Map<LogsDto>(entity));
            }

            return NotFound();
        }
    }
}
