using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class RegisterProfile : Profile
    {
        public RegisterProfile()
        {
            // Source -> Target
            CreateMap<Register, RegisterDto>().ReverseMap();

            CreateMap<Register, RegisterIn>().ReverseMap();

            CreateMap<Register, RegisterDto>().ReverseMap();

            CreateMap<RegisterIn, RegisterDto>().ReverseMap();
        }
    }
}
