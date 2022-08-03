using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApiTemplate.Dtos;
using WebApiTemplate.Helpers;
using WebApiTemplate.Services;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class ChargesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IChargesService _chargesService;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        private readonly TokenValidationHelper _tokenValidationHelper;

        public ChargesController(IMapper mapper,
            IChargesService chargesService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager,
            TokenValidationHelper tokenValidationHelper)
        {
            _mapper = mapper;
            _chargesService = chargesService;
            _userTransactionalService = userTransactionalService;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _tokenValidationHelper = tokenValidationHelper;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<ChargesDto>> GetAll()
        {
            var getAll = _chargesService.GetAll();

            return Ok(_mapper.Map<IEnumerable<ChargesDto>>(getAll));
        }

        [HttpGet("GetById/{id}")]
        public ActionResult<ChargesDto> GetById(int id)
        {
            var entity = _chargesService.GetById(id);

            if (entity != null)
            {
                return Ok(_mapper.Map<ChargesDto>(entity));
            }

            return NotFound();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<ChargesDto>> Create(ChargesIn entityIn)
        {
            _chargesService.Add(entityIn);

            var entityDto = _mapper.Map<ChargesDto>(entityIn);

            return Ok(entityDto);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _chargesService.Delete(id);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] ChargesIn entityIn)
        {
            _chargesService.Update(id, entityIn);

            return Ok();
        }
    }
}
