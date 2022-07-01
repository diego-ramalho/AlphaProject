using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;

        public ZoneController(IMapper mapper, IZoneService zoneService, Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _zoneService = zoneService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<ZoneDto>> GetAll()
        {
            var getAll = _zoneService.GetAll();

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
