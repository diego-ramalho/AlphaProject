using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApiTemplate.Dtos;
using WebApiTemplate.Services;

namespace WebApiTemplate.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class FileImportController : Controller
    {
        private readonly IRegisterService _registerService;
        private readonly IFilterService _filterService;
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly IMapper _mapper;
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;

        public FileImportController(IMapper mapper,
            IRegisterService registerService,
            IFilterService filterService,
            IUserTransactionalService userTransactionalService,
            Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _registerService = registerService;
            _filterService = filterService;
            _userTransactionalService = userTransactionalService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }



        [HttpPost("ImportJson")]
        public ActionResult<bool> ImportJson(string json_file)
        {
            bool import_result = false;

            List<RegisterIn> items = new List<RegisterIn>();

            try
            {
                using (StreamReader r = new StreamReader($"Files/{json_file}"))
                {
                    string json = r.ReadToEnd();
                    items = JsonConvert.DeserializeObject<List<RegisterIn>>(json);
                }

                import_result = true;
            }
            catch (Exception e)
            {
                import_result = false;

                throw new Exception(e.Message);
            }
            

            _registerService.AddBulk(items);


            return import_result;
        }
    }
}
