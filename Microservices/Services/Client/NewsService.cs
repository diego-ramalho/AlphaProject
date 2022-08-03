using AutoMapper;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class NewsService : INewsService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly INewsTransactionalService _newsTransactionalService;

        public NewsService(AppDbContext context, IMapper mapper,
            INewsTransactionalService newsTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _newsTransactionalService = newsTransactionalService;
        }


        public void Add(NewsIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _newsTransactionalService.Add(entity);
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            _newsTransactionalService.Delete(id);
        }

        public IEnumerable<News> GetAll()
        {
            return _context.News.ToList();
        }

        public News GetById(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _newsTransactionalService.GetById(id);

            return _entity;
        }

        public void Update(int id, NewsIn entity)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.News.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _entity.Link = entity.Link;
            _entity.Description = entity.Description;

            _newsTransactionalService.Update(_entity);
        }
    }
}
