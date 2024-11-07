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

        public IEnumerable<Logs> GetAll()
        {
            return _context.Logs.OrderBy(r => r.Id).OrderByDescending(x => x.UpdateTime).ToList();
        }

        public Logs GetById(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _logsTransactionalService.GetById(id);

            return _entity;
        }
    }
}
