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
    public class NewsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INewsService _newsService;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        private readonly TokenValidationHelper _tokenValidationHelper;

        public NewsController(IMapper mapper,
            INewsService newsService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager,
            TokenValidationHelper tokenValidationHelper)
        {
            _mapper = mapper;
            _newsService = newsService;
            _userTransactionalService = userTransactionalService;
            _jwtAuthenticationManager = jwtAuthenticationManager;
            _tokenValidationHelper = tokenValidationHelper;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<NewsDto>> GetAll()
        {
            var getAll = _newsService.GetAll();

            return Ok(_mapper.Map<IEnumerable<NewsDto>>(getAll));
        }

        [HttpGet("GetById/{id}")]
        public ActionResult<NewsDto> GetById(int id)
        {
            var entity = _newsService.GetById(id);

            if (entity != null)
            {
                return Ok(_mapper.Map<NewsDto>(entity));
            }

            return NotFound();
        }

        [HttpPost("Create")]
        public async Task<ActionResult<NewsDto>> Create(NewsIn entityIn)
        {
            _newsService.Add(entityIn);

            var entityDto = _mapper.Map<NewsDto>(entityIn);

            return Ok(entityDto);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            _newsService.Delete(id);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(int id, [FromBody] NewsIn entityIn)
        {
            _newsService.Update(id, entityIn);

            return Ok();
        }
    }
}
