using AutoMapper;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class LogsService : ILogsService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly ILogsTransactionalService _logsTransactionalService;

        public LogsService(AppDbContext context, IMapper mapper,
            ILogsTransactionalService logsTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _logsTransactionalService = logsTransactionalService;
        }

        public void Add(LogsIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _logsTransactionalService.Add(entity);
        }
    }
}
