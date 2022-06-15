using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;
using WebApiTemplate.Services;

namespace WebApiTemplate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    public class UserController : ControllerBase
    {
        private readonly IUserTransactionalService _userTransactionalService;
        private readonly IMapper _mapper;
        //private readonly ICommandDataClient _commandDataClient;
        //private readonly IMessageBusClient _messageBusClient;

        public UserController(IMapper mapper, IUserTransactionalService userTransactionalService)
        {
            _userTransactionalService = userTransactionalService;
            _mapper = mapper;
        }

        [HttpGet("GetUsers")]
        public ActionResult<IEnumerable<UserReadDto>> GetUsers()
        {
            var getUsers = _userTransactionalService.GetUsers();

            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(getUsers));
        }

        [HttpPost]
        public async Task<ActionResult<UserReadDto>> CreateUser(User user)
        {
            //var user = _mapper.Map<User>(UserCreateDto);

            _userTransactionalService.CreateUser(user);
            _userTransactionalService.SaveChanges();

            var UserReadDto = _mapper.Map<UserReadDto>(user);

            // Send Sync Message
            //try
            //{
            //    await _commandDataClient.SendPlatformToCommand(UserReadDto);
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"--> Could not send synchronously: {ex.Message}");
            //}

            //Send Async Message
            //try
            //{
            //    var platformPublishedDto = _mapper.Map<PlatformPublishedDto>(UserReadDto);
            //    platformPublishedDto.Event = "Platform_Published";
            //    _messageBusClient.PublishNewPlatform(platformPublishedDto);
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"--> Could not send asynchronously: {ex.Message}");
            //}

            return CreatedAtRoute(nameof(GetUserById), new { Id = UserReadDto.Id }, UserReadDto);
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public ActionResult<UserReadDto> GetUserById(int id)
        {
            var userItem = _userTransactionalService.GetUserById(id);
            if (userItem != null)
            {
                return Ok(_mapper.Map<UserReadDto>(userItem));
            }

            return NotFound();
        }

        [HttpPost("login", Name = "ValidateLogin")]
        public ActionResult<UserLoginDto> ValidateLogin(UserLoginIn _user)
        {
            var userItem = _userTransactionalService.ValidateLogin(_user);
            if (userItem != null)
            {
                return Ok(userItem);
            }

            return NotFound();
        }

        //[HttpGet("GetPass")]
        //public ActionResult<string> GetPass()
        //{
        //    // Admin // #Yuc5B0AG$
        //    // User // 12345
        //    var getPass = _userRepository.Encrypt("12345");

        //    return Ok(getPass);
        //}

        //[HttpPost("login", Name = "ValidateLogin")]
        //public ActionResult<UserReadDto> ValidateLogin(User _user)
        //{
        //    var platformItem = _userRepository.ValidateLogin(_user);
        //    if (platformItem != null)
        //    {
        //        return Ok(_mapper.Map<UserReadDto>(platformItem));
        //    }

        //    return NotFound();
        //}

        //[HttpGet("{id}", Name = "GetUserById")]
        //public ActionResult<UserReadDto> GetUserById(int id)
        //{
        //    var platformItem = _userRepository.GetUserById(id);
        //    if (platformItem != null)
        //    {
        //        return Ok(_mapper.Map<UserReadDto>(platformItem));
        //    }

        //    return NotFound();
        //}

        //[HttpPost]
        //public async Task<ActionResult<UserReadDto>> CreateUser(UserCreateDto UserCreateDto)
        //{
        //    var platformModel = _mapper.Map<User>(UserCreateDto);
        //    _userRepository.CreateUser(platformModel);
        //    _userRepository.SaveChanges();

        //    var UserReadDto = _mapper.Map<UserReadDto>(platformModel);

        //    // Send Sync Message
        //    //try
        //    //{
        //    //    await _commandDataClient.SendPlatformToCommand(UserReadDto);
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    Console.WriteLine($"--> Could not send synchronously: {ex.Message}");
        //    //}

        //    //Send Async Message
        //    //try
        //    //{
        //    //    var platformPublishedDto = _mapper.Map<PlatformPublishedDto>(UserReadDto);
        //    //    platformPublishedDto.Event = "Platform_Published";
        //    //    _messageBusClient.PublishNewPlatform(platformPublishedDto);
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    Console.WriteLine($"--> Could not send asynchronously: {ex.Message}");
        //    //}

        //    return CreatedAtRoute(nameof(GetUserById), new { Id = UserReadDto.Id }, UserReadDto);
        //}
    }
}
