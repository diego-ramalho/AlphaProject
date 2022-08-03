using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class ChargesTransactionalService : IChargesTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public ChargesTransactionalService(IMapper mapper, AppDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }


        public void Add(ChargesIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var _entity = _mapper.Map<Charges>(entity);

            _context.Charges.Add(_entity);

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Charges.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _context.Charges.Remove(_entity);

            _context.SaveChanges();
        }

        public IEnumerable<Charges> GetAll()
        {
            return _context.Charges.ToList();
        }

        public Charges GetById(int id)
        {
            var _entity = _context.Charges.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            return _entity;
        }

        public void Update(Charges entity)
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
