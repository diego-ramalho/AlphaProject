using AutoMapper;
using IdentityModel;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class LogsTransactionalService : ILogsTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public LogsTransactionalService(IMapper mapper, AppDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public void Add(LogsIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var _entity = _mapper.Map<Logs>(entity);

            _context.Logs.Add(_entity);

            _context.SaveChanges();
        }

        public IEnumerable<Logs> GetAll()
        {
            return _context.Logs.ToList();
        }

        public Logs GetById(int id)
        {
            var _entity = _context.Logs.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            return _entity;
        }
    }
}
