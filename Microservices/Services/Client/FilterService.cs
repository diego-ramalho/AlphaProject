using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class FilterService : IFilterService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IFilterTransactionalService _filterTransactionalService;

        public FilterService(AppDbContext context, IMapper mapper,
            IFilterTransactionalService filterTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _filterTransactionalService = filterTransactionalService;
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
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _filterTransactionalService.GetById(id);

            return _entity;
        }

        public void Add(FilterIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _filterTransactionalService.Add(entity);
        }

        public void Update(int id, FilterIn entity)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Filters.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _entity.FilterName = entity.FilterName;

            _filterTransactionalService.Update(_entity);
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            _filterTransactionalService.Delete(id);
        }
    }
}
