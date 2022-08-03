using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class NewsTransactionalService : INewsTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public NewsTransactionalService(IMapper mapper, AppDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }


        public void Add(NewsIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var _entity = _mapper.Map<News>(entity);

            _context.News.Add(_entity);

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.News.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _context.News.Remove(_entity);

            _context.SaveChanges();
        }

        public IEnumerable<News> GetAll()
        {
            return _context.News.ToList();
        }

        public News GetById(int id)
        {
            var _entity = _context.News.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            return _entity;
        }

        public void Update(News entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _context.Entry(entity).State = EntityState.Modified;

            _context.SaveChanges();
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}
