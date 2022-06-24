using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class RegisterTransactionalService : IRegisterTransactionalService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IMailService _mailService;

        public RegisterTransactionalService(IMapper mapper, AppDbContext context, IMailService mailService)
        {
            _mapper = mapper;
            _context = context;
            _mailService = mailService;
        }

        public IEnumerable<Register> GetAll()
        {
            return _context.Registers.ToList();
        }

        public Register GetById(int id)
        {
            var _entity = _context.Registers.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            return _entity;
        }

        public void Add(RegisterIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var _entity = _mapper.Map<Register>(entity);

            _context.Registers.Add(_entity);

            _context.SaveChanges();
        }

        public void Update(Register entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _context.Entry(entity).State = EntityState.Modified;

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Registers.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _context.Registers.Remove(_entity);

            _context.SaveChanges();
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}
