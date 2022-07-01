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
    public class RegisterController : ControllerBase
    {
        private readonly IRegisterService _registerService;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;

        public RegisterController(IMapper mapper, IRegisterService registerService, Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _registerService = registerService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<RegisterDto>> GetAll()
        {
            var getAll = _registerService.GetAll();

            return Ok(_mapper.Map<IEnumerable<RegisterDto>>(getAll));
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
            _registerService.Delete(id);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] RegisterIn entityIn)
        {
            _registerService.Update(id, entityIn);

            return Ok();
        }
    }
}
