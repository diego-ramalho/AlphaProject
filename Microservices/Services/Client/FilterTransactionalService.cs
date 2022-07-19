using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class FilterTransactionalService : IFilterTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IMailService _mailService;

        public FilterTransactionalService(IMapper mapper, AppDbContext context, IMailService mailService)
        {
            _mapper = mapper;
            _context = context;
            _mailService = mailService;
        }

        public IEnumerable<Filter> GetAll()
        {
            return _context.Filters.ToList();
        }

        public IEnumerable<RegisterFilters> GetFilterRegistersAll()
        {
            return _context.RegisterFilters.ToList();
        }

        public Filter GetById(int id)
        {
            var _entity = _context.Filters.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            return _entity;
        }

        public void Add(FilterIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var _entity = _mapper.Map<Filter>(entity);

            _context.Filters.Add(_entity);

            _context.SaveChanges();
        }

        public void Update(Filter entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _context.Entry(entity).State = EntityState.Modified;

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Filters.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _context.Filters.Remove(_entity);

            _context.SaveChanges();
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}
