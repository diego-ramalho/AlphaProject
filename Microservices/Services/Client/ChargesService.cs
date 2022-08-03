using AutoMapper;
using WebApiTemplate.Data;
using WebApiTemplate.Dtos;
using WebApiTemplate.Models;

namespace WebApiTemplate.Services.Client
{
    public class ChargesService : IChargesService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IChargesTransactionalService _chargesTransactionalService;

        public ChargesService(AppDbContext context, IMapper mapper,
            IChargesTransactionalService chargesTransactionalService)
        {
            _mapper = mapper;
            _context = context;
            _chargesTransactionalService = chargesTransactionalService;
        }


        public void Add(ChargesIn entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            _chargesTransactionalService.Add(entity);
        }

        public void Delete(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            _chargesTransactionalService.Delete(id);
        }

        public IEnumerable<Charges> GetAll()
        {
            return _context.Charges.ToList();
        }

        public Charges GetById(int id)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _chargesTransactionalService.GetById(id);

            return _entity;
        }

        public void Update(int id, ChargesIn entity)
        {
            if (id == null || id <= 0) throw new ArgumentNullException(nameof(id));

            var _entity = _context.Charges.FirstOrDefault(p => p.Id == id);

            if (_entity == null) throw new ArgumentNullException(nameof(_entity));

            _entity.Value = entity.Value;
            _entity.Description = entity.Description;

            _chargesTransactionalService.Update(_entity);
        }
    }
}
