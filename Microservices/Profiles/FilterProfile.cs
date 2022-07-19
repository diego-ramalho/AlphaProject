using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class FilterProfile : Profile
    {
        public FilterProfile()
        {
            // Source -> Target
            CreateMap<Filter, FilterDto>().ReverseMap();

            CreateMap<Filter, FilterIn>().ReverseMap();

            CreateMap<Filter, FilterDto>().ReverseMap();

            CreateMap<FilterIn, FilterDto>().ReverseMap();

            CreateMap<RegisterFilters, FilterRegisterDto>();
        }
    }
}
