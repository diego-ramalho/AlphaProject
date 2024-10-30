using AutoMapper;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class LogsProfile : Profile
    {
        public LogsProfile()
        {
            // Source -> Target
            //CreateMap<Logs, LogsDto>().ReverseMap();

            CreateMap<Logs, LogsIn>().ReverseMap();

            //CreateMap<Logs, LogsSmallDto>().ReverseMap();

            //CreateMap<LogsIn, LogsDto>().ReverseMap();
        }
    }
}
