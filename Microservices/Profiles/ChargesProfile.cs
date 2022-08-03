using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class ChargesProfile : Profile
    {
        public ChargesProfile()
        {
            // Source -> Target
            CreateMap<Charges, ChargesDto>().ReverseMap();

            CreateMap<Charges, ChargesIn>().ReverseMap();

            CreateMap<Charges, ChargesDto>().ReverseMap();

            CreateMap<ChargesIn, ChargesDto>().ReverseMap();
        }
    }
}