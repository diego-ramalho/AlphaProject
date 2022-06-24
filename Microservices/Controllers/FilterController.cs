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
    public class FilterController : ControllerBase
    {
        private readonly IFilterService _filterService;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;

        public FilterController(IMapper mapper, IFilterService filterService, Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _filterService = filterService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<FilterDto>> GetAll()
        {
            var getAll = _filterService.GetAll();

            return Ok(_mapper.Map<IEnumerable<FilterDto>>(getAll));
        }

        [HttpGet("GetById/{id}")]
        public ActionResult<FilterDto> GetById(int id)
        {
            var entity = _filterService.GetById(id);

            if (entity != null)
            {
                return Ok(_mapper.Map<FilterDto>(entity));
            }

            return NotFound();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<FilterDto>> Create(FilterIn entityIn)
        {
            _filterService.Add(entityIn);

            var entityDto = _mapper.Map<FilterDto>(entityIn);

            return Ok(entityDto);
        }
    }
}
