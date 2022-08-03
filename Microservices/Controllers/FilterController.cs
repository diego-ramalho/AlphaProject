using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApiTemplate.Dtos;
using WebApiTemplate.Services;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
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

        [HttpGet("GetFilterRegistersAll")]
        public ActionResult<IEnumerable<FilterRegisterDto>> GetFilterRegistersAll()
        {
            var getAll = _filterService.GetFilterRegistersAll();

            return Ok(_mapper.Map<IEnumerable<FilterRegisterDto>>(getAll));
        }

        [HttpGet("GetByRegisterId/{id}")]
        public ActionResult<List<string>> GetByRegisterId(int id)
        {
            var getByRegisterId = _filterService.GetAll();
            var getAllFilters = _filterService.GetFilterRegistersAll().Where(f => f.RegisterId == id);
            var getAllFiltersId = getAllFilters.Select(f => f.Filter.FilterName);
            //var getAll = getByRegisterId.Where(r => getAllFiltersId.Contains(r.Id));

            if (getByRegisterId != null)
            {
                return Ok(getAllFiltersId.ToList());
            }

            return NotFound();
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

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _filterService.Delete(id);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] FilterIn entityIn)
        {
            _filterService.Update(id, entityIn);

            return Ok();
        }
    }
}
