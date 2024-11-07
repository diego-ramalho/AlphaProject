using AutoMapper;
using Newtonsoft.Json;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Profiles
{
    public class LogsProfile : Profile
    {
        public LogsProfile()
        {
            // Source -> Target
            CreateMap<Logs, LogsSmallDto>().ReverseMap();

            CreateMap<Logs, LogsDto>()
                .ForMember(dest => dest.PreviousData, opt => opt.MapFrom(src => src.PreviousData != null ? DecodeBase64ToRegisterDto(src.PreviousData) : null))
                .ForMember(dest => dest.UpdatedData, opt => opt.MapFrom(src => src.UpdatedData != null ? DecodeBase64ToRegisterDto(src.UpdatedData) : null))
                .ReverseMap();

            CreateMap<Logs, LogsIn>().ReverseMap();

            //CreateMap<Logs, LogsSmallDto>().ReverseMap();

            //CreateMap<LogsIn, LogsDto>().ReverseMap();
        }

        private RegisterDto DecodeBase64ToRegisterDto(string base64String)
        {
            if (string.IsNullOrEmpty(base64String)) return null;

            // Decodificando a string Base64 para JSON
            var jsonString = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(base64String));

            // Usando o JsonConvert para deserializar o JSON para o objeto RegisterDto
            return JsonConvert.DeserializeObject<RegisterDto>(jsonString);
        }
    }
}
