using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class NewsProfile : Profile
    {
        public NewsProfile()
        {
            // Source -> Target
            CreateMap<News, NewsDto>().ReverseMap();

            CreateMap<News, NewsIn>().ReverseMap();

            CreateMap<News, NewsDto>().ReverseMap();

            CreateMap<NewsIn, NewsDto>().ReverseMap();
        }
    }
}