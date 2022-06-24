using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // Source -> Target
            CreateMap<User, UserReadDto>();
            CreateMap<UserCreateDto, User>();

            CreateMap<User, UserCreateIn>();
            CreateMap<UserCreateIn, User>();

            CreateMap<UserCreateDto, UserCreateIn>();
            CreateMap<UserCreateIn, UserCreateDto>();

            CreateMap<UserReadDto, UserCreateIn>().ReverseMap();

            CreateMap<User, UserLoginDto>();
            CreateMap<UserLoginIn, User>();

            CreateMap<UserRoles, UserRolesReadDto>();
            CreateMap<UserRolesReadDto, UserRoles>();

            //CreateMap<PlatformReadDto, PlatformPublishedDto>();
            //CreateMap<Platform, GrpcPlatformModel>()
            //    .ForMember(dest => dest.PlatformId, opt => opt.MapFrom(src => src.Id))
            //    .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //    .ForMember(dest => dest.Publisher, opt => opt.MapFrom(src => src.Publisher));
        }
    }
}
