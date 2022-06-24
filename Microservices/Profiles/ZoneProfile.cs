using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class ZoneProfile : Profile
    {
        public ZoneProfile()
        {
            // Source -> Target
            CreateMap<Zone, ZoneDto>().ReverseMap();

            CreateMap<Zone, ZoneIn>().ReverseMap();

            CreateMap<Zone, ZoneDto>().ReverseMap();

            CreateMap<ZoneIn, ZoneDto>().ReverseMap();
        }
    }
}
