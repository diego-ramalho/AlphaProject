using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using WebApiTemplate.Dtos;
using WebApiTemplate.Services;

namespace WebApiTemplate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ZoneController : ControllerBase
    {
        private readonly IZoneService _zoneService;
        private readonly IMapper _mapper;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;

        public ZoneController(IMapper mapper, 
            IZoneService zoneService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _zoneService = zoneService;
            _mapper = mapper;
            _userTransactionalService = userTransactionalService;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<ZoneDto>> GetAll()
        {
            var getAll = _zoneService.GetAll();


            Request.Headers.TryGetValue("Authorization", out var headerValue);

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

            if (!String.IsNullOrEmpty(jwtTokenId))
            {
                var userItem = _userTransactionalService.GetUserById(int.Parse(jwtTokenId));
                if (userItem != null && userItem.RoleId == 2)
                {
                    var userZone = _userTransactionalService.GetZoneByUser(int.Parse(jwtTokenId));

                    //Get Zone
                    getAll = getAll.Where(r => r.Id == userZone.ZoneId); //TODO
                }
            }




            return Ok(_mapper.Map<IEnumerable<ZoneDto>>(getAll));
        }

        [HttpGet("GetById/{id}")]
        public ActionResult<ZoneDto> GetById(int id)
        {
            var entity = _zoneService.GetById(id);

            if (entity != null)
            {
                return Ok(_mapper.Map<ZoneDto>(entity));
            }

            return NotFound();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<ZoneDto>> Create(ZoneIn entityIn)
        {
            _zoneService.Add(entityIn);

            var entityDto = _mapper.Map<ZoneDto>(entityIn);

            return Ok(entityDto);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _zoneService.Delete(id);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] ZoneIn entityIn)
        {
            _zoneService.Update(id, entityIn);

            return Ok();
        }
    }
}
