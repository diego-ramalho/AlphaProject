﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        private readonly Helpers.JwtAuthenticationManager _jwtAuthenticationManager;
        //private readonly ICommandDataClient _commandDataClient;
        //private readonly IMessageBusClient _messageBusClient;

        public UserController(IMapper mapper, IUserTransactionalService userTransactionalService, Helpers.JwtAuthenticationManager jwtAuthenticationManager)
        {
            _userTransactionalService = userTransactionalService;
            _mapper = mapper;
            _jwtAuthenticationManager = jwtAuthenticationManager;
        }

        [Authorize(Roles = "User")]
        [HttpGet("GetUsers")]
        public ActionResult<IEnumerable<UserReadDto>> GetUsers()
        {
            var getUsers = _userTransactionalService.GetUsers();

            return Ok(_mapper.Map<IEnumerable<UserReadDto>>(getUsers));
        }

        
        [HttpGet("GetUserRoles")]
        public ActionResult<IEnumerable<UserRolesReadDto>> GetUserRoles()
        {
            var getUserRoles = _userTransactionalService.GetUserRoles();

            return Ok(_mapper.Map<IEnumerable<UserRolesReadDto>>(getUserRoles));
        }

        [HttpPost("Create")]
        public async Task<ActionResult<UserCreateDto>> CreateUser(UserCreateIn user)
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

        [HttpDelete]
        public async Task<ActionResult> DeleteUser(int id)
        {
            _userTransactionalService.DeleteUser(id);
            _userTransactionalService.SaveChanges();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] UserCreateIn user)
        {
            _userTransactionalService.UpdateUser(id, user);
            _userTransactionalService.SaveChanges();

            return Ok();
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

        [AllowAnonymous]
        [HttpPost("login", Name = "ValidateLogin")]
        public ActionResult<UserRolesDto> ValidateLogin(UserLoginIn _user)
        {
            var userItem = _userTransactionalService.ValidateLogin(_user);
            if (userItem != null)
            {
                return Ok(userItem);
            }

            return NotFound();
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Authorize([FromBody] User usr)
        {
            var token = _jwtAuthenticationManager.Authenticate(usr);
            if (string.IsNullOrEmpty(token))
                return Unauthorized();
            return Ok(token);
        }

        [HttpGet("TesteAuth")]
        public IActionResult TestRoute()
        {
            return Ok("Authorized");
        }


        [HttpGet("NewPassword")]
        public ActionResult<string> NewPassword(string email)
        {
            var getNewPassword = _userTransactionalService.NewPassword(email);

            return Ok(getNewPassword);
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